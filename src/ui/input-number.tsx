"use client";

import { forwardRef, useEffect, useState } from "react";
import { Input, InputProps, InputRef } from "antd";
import { isCorrectNumber, isNumber, isSpecialKey } from "@/utils/string";
import { is } from "@/utils/type-guards";

interface IProps extends Omit<InputProps, "onChange"> {
  onChange?: (value: string | undefined) => void;
}

const _InputNumber: React.ForwardRefRenderFunction<InputRef, IProps> = (
  { onChange, value: propsValue, ...props },
  ref,
) => {
  const [value, setValue] = useState<string | undefined>(propsValue as string);
  useEffect(() => {
    setValue(propsValue as string);
  }, [propsValue]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value.replaceAll(",", ".");
    if (!isCorrectNumber(newValue)) return;

    setValue(newValue);
  };

  const handlePressEnter = () => {
    if (is.empty(onChange)) return;

    onChange(value);
  };

  const handleBlur = () => {
    if (is.empty(onChange)) return;

    onChange(value);
  };

  const preventLetters = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isNumber(event.key) && !isSpecialKey(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <Input
      ref={ref}
      value={value}
      onChange={handleChange}
      onPressEnter={handlePressEnter}
      onBlur={handleBlur}
      onKeyDown={preventLetters}
      {...props}
    />
  );
};

export const InputNumber = forwardRef(_InputNumber);
