import { Key } from "react";
import { is } from "./type-guards";

interface TOption {
  id: Key;
}

export const getCheckedOptions = <T extends TOption>(options: T[], checked: T["id"][]) => {
  const result: T[] = [];
  checked.forEach((id) => {
    const option = options.find((option) => option.id === id);
    if (!is.empty(option)) {
      result.push(option);
    }
  });

  return result;
};

export const getUncheckedOptions = <T extends TOption>(
  options: T[],
  checked: T["id"][],
  count: number,
) => {
  const result: T[] = [];
  if (count <= 0) return result;

  let i = 0;
  while (result.length < count) {
    const option = options[i];
    if (!checked.some((id) => id === option.id)) {
      result.push(option);
    }
    i++;
  }

  return result;
};

const compareArrays = <T>(ar1: T[], arr2: T[]) => {
  for (let i = 0; i < ar1.length; i++) {
    if (ar1[i] < arr2[i]) return -1;
    if (ar1[i] > arr2[i]) return 1;
  }

  return 0;
};

export const sortValuesByOptions = <T extends TOption>(
  values: T["id"][],
  options: T[],
  fields: (keyof T)[],
) => {
  return values.sort((a, b) => {
    const opA = options.find((option) => option.id === a);
    if (is.empty(opA)) return 0;

    const opB = options.find((option) => option.id === b);
    if (is.empty(opB)) return 0;

    const opAValues = fields.map((f) => opA[f]);
    const opBValues = fields.map((f) => opB[f]);

    return compareArrays(opAValues, opBValues);
  });
};
