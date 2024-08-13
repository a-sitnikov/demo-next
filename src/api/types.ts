export interface IItem {
  id: string;
  name: string;
  price: number;
  remains: number;
  description: string;
  img: string;
}

export interface ICategory {
  id: string;
  title: string;
  parent?: string;
}
