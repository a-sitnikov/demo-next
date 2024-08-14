"use client";

import { ICategory } from "@/api/types";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { getCategories } from "@/strore/slices";
import { StatusEnum } from "@/strore/types";
import { makeTree } from "@/utils/tree";
import { is } from "@/utils/type-guards";
import { Tree } from "antd";
import { useEffect, useMemo } from "react";

interface IProps {
  items?: ICategory[];
}

export const CategoryTree: React.FC<IProps> = ({ items }) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.categories.status);
  const categories = useAppSelector((state) => state.categories.items);

  useEffect(() => {
    if (status === StatusEnum.Init) {
      dispatch(getCategories());
    }
  }, [status, dispatch]);

  const treeData = useMemo(() => {
    if (is.empty(items) && is.empty(categories)) return;

    return makeTree(items || categories, (item) => ({
      key: item.id,
      title: item.title,
      children: [],
    }));
  }, [items, categories]);

  return <Tree treeData={treeData} blockNode />;
};
