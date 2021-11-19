import React, { ReactElement, useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import { OSM, Vector } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import * as turf from '@turf/turf';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import * as proj from 'ol/proj';
import { FeatureCollection, Polygon } from '@turf/turf';

const berlinMapCor = [13.44, 52.51];
const mapZoom = 11;
const sideBoxA = 0.05;
const sideBoxB = 0.05;
const numberTilesInCol = 6;
const numberCols = 15;
const firstPointsOnMap = [
  [13, 52.70],
  [13, 52.75],
  [13.05, 52.75],
  [13.05, 52.70]
];

interface Tile {
  id: number;
  owner: string;
  price: number;
  polygon: number[][];
}

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
  const [startCreateMap, setStart] = useState<boolean>(false);
  const [selected, setSelected] = useState<null | Tile>(null);
  const [mainMap, setMainMap] = useState<Map | null>(null);
  const [xy, setXY] = useState<{ x: number, y: number } | null>(null);
  const [turnOnMouseMovePanel, setTurnOnMouseMovePanel] = useState<boolean>(false);

  function zoomMap(map: Map) {
    map.getView().setCenter(proj.transform(berlinMapCor, 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(mapZoom);
  }

  function createTiles() {
    let sideA = sideBoxA;
    let sideB = sideBoxB;
    let arrayLength = 0;

    const allTiles = [];
    for (let i = 0; i < numberCols; i++) {
      for (let j = 0; j < numberTilesInCol; j++) {
        sideA = sideA + sideBoxA;

        const poly = [
          [firstPointsOnMap[0][0] + sideB, firstPointsOnMap[0][1] - sideA],
          [firstPointsOnMap[1][0] + sideB, firstPointsOnMap[1][1] - sideA],
          [firstPointsOnMap[2][0] + sideB, firstPointsOnMap[2][1] - sideA],
          [firstPointsOnMap[3][0] + sideB, firstPointsOnMap[3][1] - sideA],
          [firstPointsOnMap[0][0] + sideB, firstPointsOnMap[0][1] - sideA]
        ];

        const info: Tile = {
          id: arrayLength,
          owner: 'dummy',
          price: 0,
          polygon: poly
        };

        allTiles[arrayLength] = turf.polygon([poly], info);
        arrayLength++;
      }
      sideA = sideBoxA;
      sideB = sideB + sideBoxB;
    }

    return allTiles;
  }

  function createMap(features: FeatureCollection<Polygon, Tile>) {
    const vectorLayer = new VectorLayer({
      source: new Vector({
        features: (new GeoJSON()).readFeatures(features, {
          featureProjection: 'EPSG:3857'
        })
      })
    });

    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      target: 'map',
      view: new View()
    });

    return map;
  }

  useEffect(() => {
    if (!startCreateMap) {
      const allTiles = createTiles();
      const features = turf.featureCollection(allTiles);
      const map = createMap(features);
      setMainMap(map);
      zoomMap(map);
      let selectedTiles: { setStyle: (arg0: undefined) => void; } | null = null;

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
            setXY({
              x: x,
              y: y
            });
          }

          return true;
        });
        return true;
      });

      return setStart(true);
    }
  }, [startCreateMap]);

  return (
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
  );
}
