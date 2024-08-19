export const isNumber = (key: string) => {
  return /[0-9\.,]/.test(key);
};

export const isCorrectNumber = (value: string) => {
  return /^\d*[\.]?\d*$/.test(value);
};

export enum SpecialKeys {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  Enter = "Enter",
  Escape = "Escape",
  Backspace = "Backspace",
  Delete = "Delete",
}

export const isSpecialKey = (key: string) => {
  return Object.values<string>(SpecialKeys).includes(key);
};
