export const calculateSum = (price: number, qty: number) => {
  return (Math.round(100 * price) * qty) / 100;
};

export const isServer = () => {
  return typeof window === "undefined";
};
