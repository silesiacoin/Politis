import React, { ReactElement, useEffect, useState } from 'react';
import Map from 'ol/Map';
import 'ol/ol.css';
import * as turf from '@turf/turf';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import * as proj from 'ol/proj';
import { createTiles, Tile } from '../../functions/createTiles';
import { createMap } from '../../functions/createMap';
import Modal from '../molecules/modal';
import { LSPFactory } from '@lukso/lsp-factory.js';
import { RPC_URL } from '../../constants/chain';
import { getSigner } from '../../functions/getSigner';
import LSP8IdentifiableDigitalAsset from '@lukso/universalprofile-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';
import Web3 from 'web3';

const berlinMapCor = [13.44, 52.51];
const mapZoom = 11;

export default function World(): ReactElement {
  const [startCreateMap, setStart] = useState<boolean>(true);
  const [selected, setSelected] = useState<null | Tile>(null);
  const [onMap, setOnMap] = useState(true);
  const [onModal, setOnModal] = useState(false);

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
    }
  }, [onMap, startCreateMap]);

  useEffect(() => {
    if (startCreateMap) {
      const allTiles: turf.helpers.Feature<turf.helpers.Polygon, Tile>[] = createTiles();
      const features = turf.featureCollection(allTiles);
      const map = createMap(features);
      zoomMap(map);
      let selectedTiles: { setStyle: (arg0: undefined) => void; } | null = null;

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
              color: 'rgba(255,255,255,0.7)'
            }),
            stroke: new Stroke({
              color: '#3399CC',
              width: 2
            }),
            text: new Text({
              text: myText
            })
          });
          f.setStyle(highlightStyle);

          return true;
        });
        return true;
      });

      return setStart(false);
    }
  }, [startCreateMap]);

  return (
    <>
      <button className={'refresh-button'} style={{top: 160}} onClick={async () => {
        const signer = await getSigner();
        const provider = RPC_URL;
        const web3 = new Web3(provider);

        if (signer !== null) {
          const lspFactory = new LSPFactory(provider, signer);
          const myDigitalAsset = await lspFactory.DigitalAsset.deployLSP8IdentifiableDigitalAsset({
            name: 'My token',
            symbol: 'TKN',
            ownerAddress: '0xd546712237e80335Ef1F5AF619176ECA28cf6023', // Account which will own the Token Contract
          });

          const abi: any = LSP8IdentifiableDigitalAsset.abi;
          const myNFT = new web3.eth.Contract(
            abi,
            myDigitalAsset.LSP8IdentifiableDigitalAsset.address
          );

          console.log(myNFT);

          const d = myNFT.methods.totalSupply().call();

          console.log(d)
        }
      }}>
        create assets
      </button>
      <button className={'refresh-button'} onClick={() => {
        setOnMap(!onMap);
      }}>
        refresh map
      </button>
      <Modal
        selected={selected}
        isOn={onModal}
        onFunction={() => setOnModal(!onModal)}
        clickYes={() => {
          //
        }}
      >
        <div className={'modal__header'}>
          <div className={'modal__header__title'}>
            Do you want to buy a tile?
          </div>
        </div>
        <div className={'modal__body'}>
          <div className={'modal__body__info'}>
            id: {selected?.id}
            <br />
            owner: {selected?.owner}
            <br />
            price: {selected?.price}
            <br />
            polygon: {selected?.polygon[0][0]} {selected?.polygon[1][0]} {selected?.polygon[0][1]} {selected?.polygon[1][1]}
          </div>
        </div>
      </Modal>
      {onMap &&
        <div id={'map'} className={'map'}>
        </div>
      }
    </>
  );
}
