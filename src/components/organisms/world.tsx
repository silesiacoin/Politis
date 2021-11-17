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
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import RenderFeature from 'ol/render/Feature';

export default function World(): ReactElement {
  const [start, setStart] = useState<boolean>(false);
  const [selected, setSelected] = useState<null | number>(null);

  const features = turf.featureCollection([
    turf.polygon([[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]], { id: 0 }),
    turf.polygon([[[0, -1], [0, 0], [1, 0], [1, -1], [0, -1]]], { id: 1 }),
    turf.polygon([[[1, -1], [1, 0], [2, 0], [2, -1], [1, -1]]], { id: 2 }),
  ]);

  useEffect(() => {
    if (!start) {
      const vectorSource = new Vector({
        features: (new GeoJSON()).readFeatures(features, {
          featureProjection: 'EPSG:3857'
        })
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource
      });

      const highlightStyle = new Style({
        fill: new Fill({
          color: 'rgba(255,255,255,0.7)',
        }),
        stroke: new Stroke({
          color: '#3399CC',
          width: 3,
        }),
      });

      const map = new Map({
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          vectorLayer
        ],
        target: 'map',
        view: new View({
          center: [0, 0],
          zoom: 8
        })
      });

      let selectedTiles: RenderFeature | Feature<Geometry> | null = null;

      map.on('pointermove', function (e) {
        if (selectedTiles !== null) {
          //@ts-ignore
          selectedTiles.setStyle(undefined);
          selectedTiles = null;
        }

        map.forEachFeatureAtPixel(e.pixel, function (f) {
          selectedTiles = f;
          console.log('selected id: ' + selectedTiles.get('id'));
          setSelected(selectedTiles.get('id'));
          //@ts-ignore
          f.setStyle(highlightStyle);

          return true;
        });
      });

      setStart(true);
    }

    return () => {
      //
    }
  }, [features, selected, start])

  return (
    <div id={'map'} style={{ height: '100vh', width: '100vw' }}>
    </div>
  );
}
