import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListProps } from "react-virtualized";
import { TDefaultListOption } from ".";
import { ListRow } from "./list-row";

interface IProps<TOption extends TDefaultListOption> {
  options: TOption[];
  onChange: (id: TOption["id"], checked: boolean) => void;
  isChecked: (itemID: TOption["id"]) => boolean;
}

export const VirtualList = <TOption extends TDefaultListOption>({
  options,
  onChange,
  isChecked,
}: IProps<TOption>) => {
  const cache = new CellMeasurerCache({
    defaultHeight: 29,
    fixedWidth: true,
  });

  const rowRenderer: ListProps["rowRenderer"] = ({ key, index, style, parent }) => {
    const item = options[index];

    return (
      <CellMeasurer cache={cache} columnIndex={0} key={item.id} parent={parent} rowIndex={index}>
        <ListRow item={item} checked={isChecked(item.id)} onChange={onChange} style={style} />
      </CellMeasurer>
    );
  };

  return (
    <AutoSizer style={{ height: "100%", width: "100%" }}>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          rowCount={options.length}
          rowHeight={cache.rowHeight}
          rowRenderer={rowRenderer}
          overscanRowCount={2}
          deferredMeasurementCache={cache}
          className="c-thin-scroll"
        />
      )}
    </AutoSizer>
  );
};
