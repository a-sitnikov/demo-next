import FormItem from "antd/es/form/FormItem";
import { IFilter } from "@/app/api/catalog/route";
import { BoolFilter } from "@/ui/filters/bool-filter";
import { ListFilter } from "@/ui/filters/list-filter";
import { RadioFilter } from "@/ui/filters/radio-filter";
import { RangeFilter } from "@/ui/filters/range-filter";
import { SmallListFilter } from "@/ui/filters/small-list-filter";

interface IProps {
  filter: IFilter;
}

export const FilterComponent: React.FC<IProps> = ({ filter }) => {
  switch (filter.type) {
    case "Range":
      return (
        <FormItem name={filter.id} noStyle>
          <RangeFilter min={filter.min} max={filter.max} />
        </FormItem>
      );
    case "Radio":
      return (
        <FormItem name={filter.id} noStyle>
          <RadioFilter options={filter.options} />
        </FormItem>
      );
    case "SmallList":
      return (
        <FormItem name={filter.id} noStyle>
          <SmallListFilter options={filter.options} />
        </FormItem>
      );
    case "List":
      return (
        <FormItem name={filter.id} noStyle>
          <ListFilter options={filter.options} />
        </FormItem>
      );

    default:
      return null;
  }
};
