"use client";

import { useMemo } from "react";
import { Tree } from "antd";
import { useAppSelector } from "@/strore/hooks";
import { makeTree } from "@/utils/tree";

export const CategoryList: React.FC = () => {
  return null;
  // const categories = useAppSelector((state) => state.categories.items);

  // const treeData = useMemo(
  //   () =>
  //     makeTree(categories, (item) => ({
  //       key: item.id,
  //       title: item.title,
  //       children: [],
  //     })),
  //   [categories],
  // );

  // return <Tree treeData={treeData} blockNode />;
};
