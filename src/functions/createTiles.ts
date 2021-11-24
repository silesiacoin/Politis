import * as turf from '@turf/turf';
import getCityContract from './getCityContract';

export interface Tile {
  id: number;
  owner: string | null;
  price: number | null;
  polygon: number[][];
}

const sideBoxA = 0.05;
const sideBoxB = 0.05;
const numberTilesInCol = 6;
const numberCols = 11;
const firstPointsOnMap = [
  [13, 52.7],
  [13, 52.75],
  [13.05, 52.75],
  [13.05, 52.7]
];

export async function createTiles(): Promise<turf.helpers.Feature<turf.helpers.Polygon, Tile>[]> {
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

      let citiesContract;
      let tileResponse;

      try {
        citiesContract = getCityContract();
        tileResponse = await citiesContract.methods.tiles(arrayLength).call();
      } catch {
        new Error('Error fetching tile data');
      }

      const info: Tile = {
        id: arrayLength,
        owner: tileResponse?.owner,
        price: tileResponse?.currentPrice,
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
