"use client";

import { useMemo } from "react";
import { Tree } from "antd";
import { ICategory } from "@/api/types";
import { makeTree } from "@/utils/tree";
import { useCatalogContext } from "../context";

interface IProps {
  items: ICategory[];
}

export const _CategoryTree: React.FC<IProps> = ({ items }) => {
  const treeData = useMemo(() => {
    return makeTree(items, (item) => ({
      key: item.id,
      title: item.title,
      children: [],
    }));
  }, [items]);

  return <Tree treeData={treeData} blockNode />;
};

export const CategoryTree: React.FC<Omit<IProps, "items">> = (props) => {
  const { categories } = useCatalogContext();

  return <_CategoryTree items={categories} {...props} />;
};
