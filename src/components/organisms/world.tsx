import React, { FormEvent, Fragment, ReactElement, useContext, useEffect, useState } from 'react';
import Map from 'ol/Map';
import 'ol/ol.css';
import * as turf from '@turf/turf';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import * as proj from 'ol/proj';
import { createTiles, Tile } from '../../generators/createTiles';
import { createMap } from '../../generators/createMap';
import Modal from '../molecules/modal';
import Button from '../atoms/button';
import Loader from '../atoms/loader';
import { buyTile } from '../../utils/buyTile';
import { Context } from '../../Context';
import Submit from '../atoms/submit';
import getERC725InstanceForOwners from '../../helpers/getERC725InstanceForOwners';
import { LSP3Profile, LSP3ProfileJSON } from '@lukso/lsp-factory.js';
import { getWeb3 } from '../../helpers/getWeb3';

const berlinMapCor = [13.402, 52.51];
const mapZoom = 11;

const gameMaster = '0x1e19655764Ca86846C6561E2023EA68FB9D04FCF';

export default function World(): ReactElement {
  const { publicAddress, universalProfileAddress } = useContext(Context);
  const web3 = getWeb3();
  const [startCreateMap, setStart] = useState<boolean>(true);
  const [selected, setSelected] = useState<null | Tile>(null);
  const [onMap, setOnMap] = useState(true);
  const [onModal, setOnModal] = useState(false);
  const [loadingOn, setLoadingOn] = useState(true);
  const [transactionLoadingOn, setTransactionLoadingOn] = useState(false);
  const [selectedUP, setSelectedUP] = useState<null | LSP3Profile>(null);
  const [successOn, setSuccessOn] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  function zoomMap(map: Map) {
    map.getView().setCenter(proj.transform(berlinMapCor, 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(mapZoom);
    map.getView().setMaxZoom(mapZoom);
    map.getView().setMinZoom(mapZoom);
  }

  function turnOnModal(tile: Tile) {
    setSelected(tile);
    setOnModal(true);
  }

  async function getUsersData(UPaddress: string | null | undefined) {
    if (UPaddress && UPaddress !== gameMaster) {
      await setSelectedUP(null);
      const erc725 = getERC725InstanceForOwners(UPaddress);
      const fetchProfile = await erc725.fetchData('LSP3Profile');
      const profileJSON = fetchProfile['LSP3Profile'] as LSP3ProfileJSON;
      setSelectedUP(profileJSON.LSP3Profile);
    } else {
      setSelectedUP(null);
    }
  }

  useEffect(() => {
    if (onModal) {
      getUsersData(selected?.owner);
    }
  }, [onModal, selected?.owner]);

  useEffect(() => {
    if (!startCreateMap && !onMap) {
      setOnMap(!onMap);
      setStart(!startCreateMap);
      setLoadingOn(true);
    }
  }, [onMap, startCreateMap]);

  useEffect(() => {
    async function start() {
      const allTiles: turf.helpers.Feature<turf.helpers.Polygon, Tile>[] = await createTiles();
      const features = turf.featureCollection(allTiles);
      const map = createMap(features);
      zoomMap(map);
      let selectedTiles: { setStyle: (arg0: undefined) => void } | null = null;

      map.on('singleclick', function (e) {
        map.forEachFeatureAtPixel(e.pixel, function (f) {
          const tile: Tile = {
            id: f.get('id'),
            owner: f.get('owner'),
            price: f.get('price'),
            polygon: f.get('polygon'),
          };
          turnOnModal(tile);

          return true;
        });
        return true;
      });

      map.on('pointermove', function (e) {
        if (selectedTiles !== null) {
          selectedTiles.setStyle(undefined);
          selectedTiles = null;
        }

        map.forEachFeatureAtPixel(e.pixel, function (f: any) {
          selectedTiles = f;
          const myText = 'id: ' + f.get('id');
          const highlightStyle = new Style({
            fill: new Fill({
              color: 'rgba(255,255,255,0.7)',
            }),
            stroke: new Stroke({
              color: '#3399CC',
              width: 2,
            }),
            text: new Text({
              text: myText,
            }),
          });
          f.setStyle(highlightStyle);

          return true;
        });
        return true;
      });

      setLoadingOn(false);
      return setStart(false);
    }
    if (startCreateMap) {
      start();
    }
  }, [startCreateMap]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTransactionLoadingOn(true);
    setOnModal(true);
    if (selected?.owner && universalProfileAddress && selected?.owner.toLowerCase() !== universalProfileAddress.toLowerCase()) {
      if (!publicAddress || !selected?.price || !selected?.id || !universalProfileAddress) return;
      const response = await buyTile(publicAddress, selected?.price, selected?.id, universalProfileAddress);

      if (response === true) {
        setSuccessOn(true);
        setError(null);
      } else {
        setError(response ? response : null);
        setSuccessOn(false);
      }
    } else {
      setSuccessOn(false);
      setError(new Error('You cannot buy your own tile'));
    }
    setTransactionLoadingOn(true);
    setOnModal(true);
  };

  return (
    <Fragment>
      {loadingOn && <Loader classes='loader--absolute' info={'Creating a map'} />}
      <Button classes={'button button--refresh'} onClick={() => setOnMap(false)}>
        Refresh map
      </Button>
      <Modal isOn={onModal}>
        {transactionLoadingOn ? (
          <>
            {!successOn && !error ? (
              <>
                <Loader info={'Transaction in progress'} />
                <Button classes={'button--margin button--width'} onClick={() => {
                  setOnModal(false);
                  setTransactionLoadingOn(false);
                }}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                {successOn &&
                  <>
                    <div style={{ color: 'green' }}>
                      Success
                    </div>
                    <Button classes={'button--margin button--width'} onClick={() => {
                      setOnModal(false);
                      setTransactionLoadingOn(false);
                      setOnMap(false);
                      setSuccessOn(false);
                      setError(null);
                    }}>
                      Refresh map
                    </Button>
                  </>
                }
                {error &&
                  <>
                    <div style={{ color: 'red' }}>
                      {error.toString()}
                    </div>
                    <Button classes={'button--margin button--width'} onClick={() => {
                      setOnModal(false);
                      setTransactionLoadingOn(false);
                      setError(null);
                      setSuccessOn(false);
                    }}>
                      Cancel
                    </Button>
                  </>
                }
              </>
            )}
          </>
        ) : (
          <>
            <div className={'modal__panel__header'}>
              <h4>Do you want to buy a tile?</h4>
              <h5>
                After the purchase, the value and price of the tile will be doubled. When someone buys a tile from you, you will get increased value. The commission is charged on the purchase.
              </h5>
              <br />
              {selected?.owner !== gameMaster ? (
                <>
                  <h4>Owner:</h4>
                  <h4>{selectedUP?.name}</h4>
                  <h5>{selectedUP?.description}</h5>
                </>
              ) : (
                <>
                  <h4>Owner:</h4>
                  <h5>none</h5>
                </>
              )}
            </div>
            <div className={'modal__panel__body'}>
              <div className={'modal__panel__body__info'}>
                <h5> id: {selected?.id}</h5>
                <h5>polygon: {selected?.polygon[0][0].toFixed(2)} {selected?.polygon[1][0].toFixed(2)} {selected?.polygon[0][1].toFixed(2)} {selected?.polygon[1][1].toFixed(2)}</h5>
                <br />
                <h4>value: {selected?.price && web3.utils.fromWei(selected?.price.toString(), 'ether')} LYXt</h4>
                <h4>price: {selected?.price && web3.utils.fromWei((selected?.price * 2).toString(), 'ether')} LYXt</h4>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <Submit value='Yes' />
              <Button classes={'button--margin button--width'} onClick={() => setOnModal(false)}>
                No
              </Button>
            </form>
          </>
        )}
      </Modal>
      {onMap && <div id={'map'} className={'map'}></div>}
    </Fragment >
  );
}
