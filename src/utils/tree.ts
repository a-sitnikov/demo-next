import { Key } from "react";
import { is } from "./type-guards";

interface TDataWithParent {
  id: Key;
  parent?: Key;
}

interface TNodeWithChildren {
  children?: this[];
}

type TGetNodeKey<TTreeNode> = (node: TTreeNode) => Key;

interface IGetParentNodesParams<TTreeNode> {
  tree: TTreeNode[];
  key?: Key;
  getNodeKey: TGetNodeKey<TTreeNode>;
}

export const makeTree = <
  TData extends TDataWithParent,
  TTreeNode extends TNodeWithChildren
>(
  items: TData[],
  mapItemToTreeNode: (item: TData) => TTreeNode
) => {
  const tree = [] as TTreeNode[];

  const itemsMap = new Map(
    items.map((item) => [item.id, mapItemToTreeNode(item)])
  );

  for (const project of items) {
    const node = itemsMap.get(project.id);
    if (is.empty(node)) continue;

    const parentID = project.parent;
    const parenNode = is.empty(parentID) ? undefined : itemsMap.get(parentID);

    if (!is.empty(parenNode)) {
      if (is.empty(parenNode.children)) {
        parenNode.children = [node];
      } else {
        parenNode.children.push(node);
      }
    } else {
      tree.push(node);
    }
  }

  return tree;
};

export const findTreeNode = <TTreeNode extends TNodeWithChildren>(
  tree: TTreeNode[],
  callback: (node: TTreeNode) => boolean
): TTreeNode | undefined => {
  for (const node of tree) {
    if (callback(node)) return node;

    const result = findTreeNode(node.children as TTreeNode[], callback);
    if (!is.undefined(result)) {
      return result;
    }
  }

  return undefined;
};

export const getParentNodes = <TTreeNode extends TNodeWithChildren>({
  tree,
  key,
  getNodeKey,
}: IGetParentNodesParams<TTreeNode>) => {
  const loop = (path: TTreeNode[], node: TTreeNode): TTreeNode[] =>
    getNodeKey(node) === key
      ? [...path, node]
      : (node.children || []).reduce(
          (acc, child) => acc.concat(loop([...path, node], child as TTreeNode)),
          [] as TTreeNode[]
        );

  return tree.reduce(
    (acc, child) => acc.concat(loop([], child as TTreeNode)),
    [] as TTreeNode[]
  );
};

export const getParentNodesKeys = <TData extends TDataWithParent>(
  item: TData,
  items: TData[]
) => {
  let parentID = item.parent;

  const keys: Key[] = [];
  for (;;) {
    if (is.empty(parentID)) break;

    keys.push(parentID);
    parentID = items.find((_item) => _item.id === parentID)?.parent;
  }

  return keys;
};

export const getNodesWithChildren = <TTreeNode extends TNodeWithChildren>(
  tree: TTreeNode[]
) => {
  const nodes: TTreeNode[] = [];
  tree.forEach((node) => {
    if (!is.empty(node.children)) {
      nodes.push(node);

      const subNodes = getNodesWithChildren(node.children);
      subNodes.forEach((item) => nodes.push(item as TTreeNode));
    }
  });

  return nodes;
};

export const filterTree = <TTreeNode extends TNodeWithChildren>(
  tree: TTreeNode[],
  filterCallback: (item: TTreeNode) => boolean
): TTreeNode[] => {
  return tree.reduce((acc, item) => {
    if (!is.empty(item.children)) {
      const filtered = filterTree(item.children as TTreeNode[], filterCallback);
      if (!is.empty(filtered)) return [...acc, { ...item, children: filtered }];
    }

    return filterCallback(item) ? [...acc, { ...item, children: [] }] : acc;
  }, [] as TTreeNode[]);
};

export const isFlatList = <TTreeNode extends TNodeWithChildren>(
  tree: TTreeNode[]
) => !tree.some((item) => !is.empty(item.children));
