// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';
import {
  getKeyAnyD,
  neighboursAnyD,
  coordinatesAnyD,

  cleanAndParse,
  coordinates2d,
  coordinates3d,
  coordinates4d,
  neighbours3d,
  neighbours4d
} from '../../utils';


export const meta = {
  manualStart: true
};

export function part1() {
  let space = getSpace(input, 3);

  for (let g = 0; g < 6; g++) {
    space = getNextSpace(space, 3);
  }

  //301
  return countActive(space);
}

export function part2() {
  let space = getSpacePart2(input);

  for (let g = 0; g < 6; g++) {
    space = getNextSpacePart2(space);
  }

  //2424
  return countActivePart2(space);
}

/*
 _    . .    _
|_||\| Y    | \
| || | |    |_/
*/

function countActive(space: Space): number {
  return Array.from(space.cubes.values()).filter(v => !!v).length;
}

function getNextSpace(space: Space, dims: number): Space {
  const cubes = new Map();
  const range: [number, number][] = space.range.map(
    ([min, max]) => [min - 1, max + 1]
  );

  for (const coord of coordinatesAnyD(range)) {
    const ct = countActiveNeighbours(coord, space.cubes, dims);
    const k = getKeyAnyD(coord, dims);
    const state = !!space.cubes.get(k);

    if (state && [2, 3].includes(ct)) {
      cubes.set(k, true);
    }
    else if (!state && ct === 3) {
      cubes.set(k, true);
    }
  }

  return {
    cubes,
    range
  }
}

function countActiveNeighbours(coord: number[], cubes: Space['cubes'], dims: number) {
  let t = 0;

  for (const neighbour of neighboursAnyD(coord)) {
    const k = getKeyAnyD(neighbour, dims);

    if (cubes.get(k) === true) {
      t++;
    }
  }

  return t;
}

function getSpace(input: string, dims: number) {
  const data = cleanAndParse(input, l => Array.from(l));
  const cubes = new Map<string, boolean>();

  const {length: height, 0: {length: width}} = data;

  for (const {row: y, column: x} of coordinates2d({width, height})) {
    cubes.set(getKeyAnyD([x, y], dims), data[y][x] === "#")
  }

  const range: [number, number][] = [
    [0, width - 1],
    [0, height - 1]
  ];

  while (range.length < dims) {
    range.push([0, 0]);
  }

  return {
    cubes,
    range
  }
}

type Space = ReturnType<typeof getSpace>;


/*
 _  _  _ ___   __
|_)|_||_) |     _)
|  | || \ |    /__
*/


function getKeyPart2(x: number, y: number, z: number, w: number) {
  return JSON.stringify([x, y, z, w]);
}

function countActivePart2(space: SpacePart2): number {
  const minx = space.x[0];
  const maxx = space.x[1];
  const miny = space.y[0];
  const maxy = space.y[1];
  const minz = space.z[0];
  const maxz = space.z[1];
  const minw = space.w[0];
  const maxw = space.w[1];

  let total = 0;

  for (const [x, y, z, w] of coordinates4d(
    minx, maxx,
    miny, maxy,
    minz, maxz,
    minw, maxw,
  )) {
    const k = getKeyPart2(x, y, z, w);
    const state = !!space.cubes.get(k);

    if (state) {
      total += 1;
    }
  }

  return total;
}


function getNextSpacePart2(space: SpacePart2): SpacePart2 {
  const cubes = new Map();
  const minx = space.x[0] - 1;
  const maxx = space.x[1] + 1;
  const miny = space.y[0] - 1;
  const maxy = space.y[1] + 1;
  const minz = space.z[0] - 1;
  const maxz = space.z[1] + 1;
  const minw = space.w[0] - 1;
  const maxw = space.w[1] + 1;

  for (const [x, y, z, w] of coordinates4d(
    minx, maxx,
    miny, maxy,
    minz, maxz,
    minw, maxw,
  )) {
    const ct = countActiveNeighboursPart2(x, y, z, w, space.cubes);
    const k = getKeyPart2(x, y, z, w);
    const state = !!space.cubes.get(k);

    if (state && [2, 3].includes(ct)) {
      cubes.set(k, true);
    }
    else if (!state && ct === 3) {
      cubes.set(k, true);
    }
  }

  return {
    cubes,
    x: [minx, maxx],
    y: [miny, maxy],
    z: [minz, maxz],
    w: [minw, maxw],
  }
}

function countActiveNeighboursPart2(x: number, y: number, z: number, w: number, cubes: SpacePart2['cubes']): number {
  let t = 0;

  for (const [nx, ny, nz, nw] of neighbours4d(x, y, z, w)) {
    const k = getKeyPart2(nx, ny, nz, nw);

    if (cubes.get(k) === true) {
      t++;
    }
  }
  return t;
}

function getSpacePart2(input: string) {
  const data = cleanAndParse(input, l => Array.from(l));
  const cubes = new Map<string, boolean>();

  const {length: height, 0: {length: width}} = data;

  for (const {row: y, column: x} of coordinates2d({width, height})) {
    cubes.set(getKeyPart2(x, y, 0, 0), data[y][x] === "#")
  }

  return {
    cubes,
    x: [0, width - 1],
    y: [0, height - 1],
    z: [0, 0],
    w: [0, 0],
  };
}

type SpacePart2 = ReturnType<typeof getSpacePart2>;

/*
 _  _  _ ___
|_)|_||_) |    /|
|  | || \ |     |
*/




function getKeyPart1(x: number, y: number, z: number) {
  return JSON.stringify([x, y, z]);
}

function countActivePart1(space: SpacePart1): number {
  const minx = space.x[0];
  const maxx = space.x[1];
  const miny = space.y[0];
  const maxy = space.y[1];
  const minz = space.z[0];
  const maxz = space.z[1];

  let total = 0;

  for (const [x, y, z] of coordinates3d(
    minx, maxx,
    miny, maxy,
    minz, maxz,
  )) {
    const k = getKeyPart1(x, y, z);
    const state = !!space.cubes.get(k);

    if (state) {
      total += 1;
    }
  }

  return total;
}


function getNextSpacePart1(space: SpacePart1): SpacePart1 {
  const cubes = new Map();
  const minx = space.x[0] - 1;
  const maxx = space.x[1] + 1;
  const miny = space.y[0] - 1;
  const maxy = space.y[1] + 1;
  const minz = space.z[0] - 1;
  const maxz = space.z[1] + 1;

  for (const [x, y, z] of coordinates3d(
    minx, maxx,
    miny, maxy,
    minz, maxz,
  )) {
    const ct = countActiveNeighboursPart1(x, y, z, space.cubes);
    const k = getKeyPart1(x, y, z);
    const state = !!space.cubes.get(k);

    if (state && [2, 3].includes(ct)) {
      cubes.set(k, true);
    }
    else if (!state && ct === 3) {
      cubes.set(k, true);
    }
  }

  return {
    cubes,
    x: [minx, maxx],
    y: [miny, maxy],
    z: [minz, maxz],
  }
}

function countActiveNeighboursPart1(x: number, y: number, z: number, cubes: SpacePart1['cubes']): number {
  let t = 0;

  for (const [nx, ny, nz] of neighbours3d(x, y, z)) {
    const k = getKeyPart1(nx, ny, nz);

    if (cubes.get(k) === true) {
      t++;
    }
  }
  return t;
}

function getSpacePart1(input: string) {
  const data = cleanAndParse(input, l => Array.from(l));
  const cubes = new Map<string, boolean>();

  const {length: height, 0: {length: width}} = data;

  for (const {row: y, column: x} of coordinates2d({width, height})) {
    cubes.set(getKeyPart1(x, y, 0), data[y][x] === "#")
  }

  return {
    cubes,
    x: [0, width - 1],
    y: [0, height - 1],
    z: [0, 0]
  };
}

type SpacePart1 = ReturnType<typeof getSpacePart1>;
