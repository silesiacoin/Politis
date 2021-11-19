import React, { ReactElement, useEffect, useState } from 'react';
import Map from 'ol/Map';
import 'ol/ol.css';
import * as turf from '@turf/turf';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import * as proj from 'ol/proj';
import { createTiles, Tile } from '../../functions/createTiles';
import { createMap } from '../../functions/createMap';

const berlinMapCor = [13.44, 52.51];
const mapZoom = 11;

const highlightStyle = new Style({
  fill: new Fill({
    color: 'rgba(255,255,255,0.7)'
  }),
  stroke: new Stroke({
    color: '#3399CC',
    width: 3
  })
});

export default function World(): ReactElement {
  const [startCreateMap, setStart] = useState<boolean>(true);
  const [selected, setSelected] = useState<null | Tile>(null);
  const [xy, setXY] = useState<{ x: number, y: number } | null>(null);
  const [turnOnMouseMovePanel, setTurnOnMouseMovePanel] = useState<boolean>(false);
  const [onMap, setOnMap] = useState(true);

  function zoomMap(map: Map) {
    map.getView().setCenter(proj.transform(berlinMapCor, 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(mapZoom);
    map.getView().setMaxZoom(mapZoom);
    map.getView().setMinZoom(mapZoom);
  }

  useEffect(() => {
    if (!startCreateMap && !onMap) {
      setOnMap(!onMap);
      setStart(!startCreateMap);
    }
  }, [onMap, startCreateMap]);

  useEffect(() => {
    if (startCreateMap) {
      const allTiles = createTiles();
      const features = turf.featureCollection(allTiles);
      const map = createMap(features);
      zoomMap(map);
      let selectedTiles: { setStyle: (arg0: undefined) => void; } | null = null;

      map.on('singleclick', function (e) {
        map.forEachFeatureAtPixel(e.pixel, function (f) {
          console.log('click click: ' + f.get('id'),)

          return true;
        });
        return true;
      });

      map.on('pointermove', function (e) {
        if (selectedTiles !== null) {
          selectedTiles.setStyle(undefined);
          selectedTiles = null;
          setTurnOnMouseMovePanel(false);
        }

        map.forEachFeatureAtPixel(e.pixel, function (f: any) {
          selectedTiles = f;
          const tile: Tile = {
            id: f.get('id'),
            owner: f.get('owner'),
            price: f.get('price'),
            polygon: f.get('polygon'),
          };
          setSelected(tile);
          f.setStyle(highlightStyle);
          setTurnOnMouseMovePanel(true);

          document.onmousemove = function (e) {
            const x = e.clientX;
            const y = e.clientY;
            setXY({ x: x + 10, y: y + 10 });
          }

          return true;
        });
        return true;
      });


      return setStart(false);
    }
  }, [startCreateMap]);

  return (
    <>
      <button onClick={() => {
        setStart(!startCreateMap);
        setOnMap(!onMap);
      }}>
        refresh
      </button>
      {onMap &&
        <div id={'map'} className={'map'}>
          {turnOnMouseMovePanel &&
            <div className={'select-tile-panel'} style={{
              top: xy?.y,
              left: xy?.x
            }}>
              <div>id: {selected?.id}</div>
              <div>owner: {selected?.owner}</div>
              <div>price: {selected?.price}</div>
              <div>polygon: {selected?.polygon[0][0].toFixed(2)} {selected?.polygon[0][1].toFixed(2)} {selected?.polygon[1][1].toFixed(2)} {selected?.polygon[1][0].toFixed(2)}</div>
            </div>
          }
        </div>
      }
    </>
  );
}
