import { mockCategories } from "@/mock-data/categories";

export const fetchCategories = async () => {
  return Promise.resolve(mockCategories);
};
