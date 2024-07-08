export interface IItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  description: string;
}

export interface ICategory {
  id: string;
  name: string;
  children?: ICategory[];
}
