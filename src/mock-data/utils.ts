export const resolveWithDelay = <T>(data: T, delay: number): Promise<T> => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(data), delay);
  });
};

export const rejectWithDelay = <T>(data: T, delay: number): Promise<T> => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => reject(data), delay);
  });
};
