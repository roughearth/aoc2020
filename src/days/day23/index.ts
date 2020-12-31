// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';
import { generateArray } from '../../utils';

export const meta = {
  manualStart: true
};

export function part1() {
  const order = runGame(input, 9, 100, 9);

  // 76385429
  return order.join("");
}

export function part2() {
  const [a, b] = runGame(input, 1e6, 1e7, 3);

  // 12621748849
  return a * b;
}

function runGame(startPack: string, packSize: number, gameLength: number, limit: number) {
  let {current, index} = createCircle(startPack, packSize);

  for (let ct = 0; ct < gameLength; ct++) {
    const excluded = extract3(current, index);
    const after = getNextInsert(current, excluded, index);
    insert3(excluded, after, index);
    current = <number>index.get(current);
  }

  return getOrder(index, {limit}).slice(1);
}

function getNextInsert(current: number, excluded: number[], index: Circle['index']) {
  const ex = new Set(excluded);
  const {size} = index;

  do {
    current -= 1;
    if (current === 0) {
      current = size;
    }
  }
  while(ex.has(current));

  return current;
}

function extract3(after: number, index: Circle['index']) {
  const first = <number>index.get(after);
  const middle = <number>index.get(first);
  const last = <number>index.get(middle);
  const post = <number>index.get(last);

  const excluded = [
    first, middle, last
  ];

  index.set(after, post);

  return excluded;
}

function insert3([first, middle, last]: number[], after: number, index: Circle['index']) {
  const post = <number>index.get(after);
  index.set(after, first);
  index.set(first, middle);
  index.set(middle, last);
  index.set(last, post);
}

function getOrder(index: Circle['index'], {start = 1, limit = 10} = {}): number[] {
  let current = <number>index.get(start);

  let order = [start];
  do {
    order.push(current);
    current = <number>index.get(current);
  }
  while(current !== start && order.length < limit)

  return order;
}

function createCircle(input: string, length = input.length) {
  const cups: number[] = generateArray(
    length,
    i => {
      if (i >= 9) {
        return i + 1;
      }
      return Number(input[i]);
    }
  );

  const index = new Map<number, number>();

  for (let i = 1; i <= length; i++) {
    if (i <= 10) {
      index.set(i, cups[(cups.indexOf(i) + 1) % length]);
    }
    else if (i === length) {
      index.set(i, cups[0]);
    }
    else {
      index.set(i, i + 1);
    }

  }

  return {current: cups[0], index};
}

type Circle = ReturnType<typeof createCircle>;
