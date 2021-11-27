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
import Label from '../atoms/label';
import InputString from '../atoms/inputString';
// import InputNumber from '../atoms/inputNumber';
import Submit from '../atoms/submit';

const berlinMapCor = [13.402, 52.51];
const mapZoom = 11;

export default function World(): ReactElement {
  const { publicAddress, universalProfileAddress } = useContext(Context);

  const [startCreateMap, setStart] = useState<boolean>(true);
  const [selected, setSelected] = useState<null | Tile>(null);
  const [onMap, setOnMap] = useState(true);
  const [onModal, setOnModal] = useState(false);
  const [loadingOn, setLoadingOn] = useState(true);
  const [newOwner, setNewOwner] = useState(universalProfileAddress ? universalProfileAddress : '');

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
    setOnModal(false);
    if (!publicAddress || !selected?.price || !selected?.id || !newOwner) return;
    buyTile(publicAddress, selected?.price, selected?.id, newOwner);
  };

  return (
    <Fragment>
      {loadingOn &&
        <Loader info={'Creating a map'} />
      }
      <Button classes={'button button--refresh'} onClick={() => setOnMap(!onMap)}>
        Refresh map
      </Button>
      <Modal isOn={onModal}>
        <div className={'modal__panel__header'}>
          <h4>Do you want to buy a tile?</h4>
        </div>
        <div className={'modal__panel__header'}>
          <h5>
            After purchase, the value of the tile will be doubled. When someone buys the tile from you, you will get its value. The commission is charged on the purchase.
          </h5>
        </div>
        <div className={'modal__panel__body'}>
          <div className={'modal__panel__body__info'}>
            id: {selected?.id}
            <br />
            owner: {selected?.owner}
            <br />
            price: {selected?.price}
            <br />
            polygon: {selected?.polygon[0][0]} {selected?.polygon[1][0]} {selected?.polygon[0][1]}{' '}
            {selected?.polygon[1][1]}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {/* <Label>
            Gas:
            <InputNumber
              value={gas}
              onChange={(event) => setGas((event.target as HTMLTextAreaElement).value)}
              required
            />
          </Label>
          <Label>
            Gas price:
            <InputNumber
              value={gasPrice}
              onChange={(event) => setGasPrice((event.target as HTMLTextAreaElement).value)}
              required
            />
          </Label> */}
          <Label>
            New owner:
            <InputString
              value={newOwner}
              onChange={(event) => setNewOwner((event.target as HTMLTextAreaElement).value)}
              required
            />
          </Label>
          <Submit value='Yes' />
          <Button classes={'button--margin button--width'} onClick={() => setOnModal(false)}>
            No
          </Button>
        </form>
      </Modal>
      {onMap && <div id={'map'} className={'map'}></div>}
    </Fragment>
  );
}
