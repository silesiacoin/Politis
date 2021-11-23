import * as turf from '@turf/turf';
import fetchAdminProfile from './fetchAdminProfile';

export interface Tile {
  id: number;
  owner: string | null;
  price: number | null;
  polygon: number[][];
}

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

export function createTiles(): turf.helpers.Feature<turf.helpers.Polygon, Tile>[] {
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

      // TODO
      // fetchAdminProfile('ADMIN universalProfileAddress', 'ADMIN publicAddress');

      const info: Tile = {
        id: arrayLength,
        owner: null,
        price: null,
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
