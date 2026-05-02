let current = 0;
let max = 0;

const RANGE_SIZE = 1000;

const fetchNewRange = async () => {
  current = max;
  max = max + RANGE_SIZE;
};

export const getNextToken = async (): Promise<number> => {
  if (current >= max) {
    await fetchNewRange();
  }

  return current++;
};