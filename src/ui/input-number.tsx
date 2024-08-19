"use client";

import { forwardRef } from "react";
import { Input, InputProps, InputRef } from "antd";
import { isCorrectNumber, isNumber, isSpecialKey } from "@/utils/string";
import { is } from "@/utils/type-guards";

interface IProps extends Omit<InputProps, "onChange"> {
  onChange?: (value: string | undefined) => void;
}

const _InputNumber: React.ForwardRefRenderFunction<InputRef, IProps> = (
  { onChange, ...props },
  ref,
) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (is.empty(onChange)) return;

    if (is.empty(event.target.value)) {
      onChange(undefined);
    }

    const newValue = event.target.value.replaceAll(",", ".");
    if (!isCorrectNumber(newValue)) return;

    onChange(newValue);
  };

  const preventLetters = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isNumber(event.key) && !isSpecialKey(event.key)) {
      event.preventDefault();
    }
  };

  return <Input ref={ref} onChange={handleChange} onKeyDown={preventLetters} {...props} />;
};

export const InputNumber = forwardRef(_InputNumber);
