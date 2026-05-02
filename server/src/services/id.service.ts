import { getAndIncrement } from '../services/zk.service';

let current = 0;
let max = 0;

const RANGE_SIZE = 1000;

export const getNextId = async (): Promise<number> => {
  if (current >= max) {
    const start = await getAndIncrement(); 
    current = start * RANGE_SIZE;
    max = current + RANGE_SIZE;
  }

  return current++;
};  