import { IBasketEntity } from "@/strore/slices";
import { mockItems } from "./items";
import { calculateSum } from "@/utils/common";

export const mockBasket: IBasketEntity[] = [
  {
    item: mockItems[0],
    qty: 2,
    sum: calculateSum(mockItems[0].price, 2),
  },
  {
    item: mockItems[2],
    qty: 4,
    sum: calculateSum(mockItems[2].price, 4),
  },
];
