import Map from 'ol/Map';
import View from 'ol/View';
import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import { OSM, Vector } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { FeatureCollection, Polygon } from '@turf/turf';

export function createMap(features: FeatureCollection<Polygon>): Map {
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
