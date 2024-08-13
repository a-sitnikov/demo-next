"use client";

import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { getCategories } from "@/strore/slices";
import { StatusEnum } from "@/strore/types";
import { makeTree } from "@/utils/tree";
import { Tree } from "antd";
import { useEffect, useMemo } from "react";

export const CategoryList: React.FC = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.categories.status);
  const categories = useAppSelector((state) => state.categories.items);

  useEffect(() => {
    if (status === StatusEnum.Init) {
      dispatch(getCategories());
    }
  }, [status, dispatch]);

  const treeData = useMemo(
    () =>
      makeTree(categories, (item) => ({
        key: item.id,
        title: item.title,
        children: [],
      })),
    [categories]
  );

  return <Tree treeData={treeData} blockNode />;
};
