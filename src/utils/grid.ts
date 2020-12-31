export function* coordinates2d({
  height,
  width
}: {
  height: number,
  width: number
}) {
  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      yield {row, column};
    }
  }
}

export function* coordinates3d(
  minx: number,
  maxx: number,
  miny: number,
  maxy: number,
  minz: number,
  maxz: number,
) {
  for (let z = minz; z <= maxz; z++) {
    for (let y = miny; y <= maxy; y++) {
      for (let x = minx; x <= maxx; x++) {
        yield [x, y, z];
      }
    }
  }
}

export function* coordinates4d(
  minx: number,
  maxx: number,
  miny: number,
  maxy: number,
  minz: number,
  maxz: number,
  minw: number,
  maxw: number,
) {
  for (let w = minw; w <= maxw; w++) {
    for (let z = minz; z <= maxz; z++) {
      for (let y = miny; y <= maxy; y++) {
        for (let x = minx; x <= maxx; x++) {
          yield [x, y, z, w];
        }
      }
    }
  }
}

export function* coordinatesAnyD(limits: [number, number][]) {
  const current: number[] = limits.map(([min]) => min);

  let SAFE = 1e6;

  outer:
  while (true) {
    if (!--SAFE) {throw new Error("Unsafe")}

    let i = limits.length - 1;

    yield [...current];

    while (true) {
      const next = current[i] + 1;

      if (next > limits[i][1]) {
        if (i > 0) {
          current[i] = limits[i][0];
          i -= 1;
        }
        else {
          break outer;
        }
      }
      else {
        current[i] = next;
        break;
      }
    }
  }
}

export function* neighboursAnyD(center: number[]) {
  const limits: [number, number][] = center.map(c => [c - 1, c + 1]);

  for (const neighbour of coordinatesAnyD(limits)) {
    if (neighbour.reduce((b, c, i) => (b && c === center[i]), true)) {
      continue;
    }
    yield neighbour;
  }
}

export function getKeyAnyD(keys: number[], dim: number): string {
  return JSON.stringify(Object.assign(Array(dim).fill(0), keys).slice(0, dim));
}

export function parseKeyAnyD(key: string, dim: number): number[] {
  return Object.assign(Array(dim).fill(0), JSON.parse(key)).slice(0, dim);
}

export function* neighbours3d(
  cx: number,
  cy: number,
  cz: number
) {
  for (const [x, y, z] of coordinates3d(
    cx - 1, cx + 1,
    cy - 1, cy + 1,
    cz - 1, cz + 1
  )) {
    if (x === cx && y === cy && z === cz) {
      continue;
    }
    yield [x, y, z];
  }
}

export function* neighbours4d(
  cx: number,
  cy: number,
  cz: number,
  cw: number
) {
  for (const [x, y, z, w] of coordinates4d(
    cx - 1, cx + 1,
    cy - 1, cy + 1,
    cz - 1, cz + 1,
    cw - 1, cw + 1
  )) {
    if (x === cx && y === cy && z === cz && w === cw) {
      continue;
    }
    yield [x, y, z, w];
  }
}