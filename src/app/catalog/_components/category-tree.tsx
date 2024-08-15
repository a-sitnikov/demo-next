"use client";

import { useEffect, useMemo } from "react";
import { Tree } from "antd";
import { ICategory } from "@/api/types";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { getCategories } from "@/strore/slices";
import { StatusEnum } from "@/strore/types";
import { isServer } from "@/utils/common";
import { useIsClientReady } from "@/utils/hooks";
import { makeTree } from "@/utils/tree";
import { is } from "@/utils/type-guards";

interface IProps {
  items: ICategory[];
}

export const CategoryTree: React.FC<IProps> = ({ items }) => {
  const treeData = useMemo(() => {
    return makeTree(items, (item) => ({
      key: item.id,
      title: item.title,
      children: [],
    }));
  }, [items]);

  return <Tree treeData={treeData} blockNode />;
};
