class IsEmpty {
  isEmpty = (
    value?: unknown
  ): value is Array<never> | undefined | null | "" => {
    if (typeof value !== "number" && !value) return true;

    if (typeof value === "object") {
      return Array.isArray(value)
        ? this.isEmptyArray(value)
        : this.isEmptyObject(
            value as unknown as Record<string | number | symbol, unknown>
          );
    }

    return false;
  };

  private isEmptyArray = (value: unknown[]): value is Array<never> =>
    value.length === 0;

  private isEmptyObject = (
    value: Record<string | number | symbol, unknown>
  ): value is Record<string, never> => Object.keys(value).length === 0;
}

export const is = {
  array: (value: unknown): value is Array<unknown> => Array.isArray(value),
  boolean: (value: unknown): value is boolean => typeof value === "boolean",
  date: (value: unknown): value is Date =>
    is.object(value) && value instanceof Date,
  empty: new IsEmpty().isEmpty,
  error: (value: unknown): value is Error =>
    is.object(value) && value instanceof Error,
  false: (value: unknown): value is false => value === false,
  falsy: (value: unknown): value is false | "" | undefined | null | 0 =>
    Boolean(value) === false,
  function: (value: unknown): value is Function => typeof value === "function",
  nan: (value: unknown): value is number => isNaN(value as number),
  nil: (value: unknown): value is null | undefined =>
    is.undefined(value) || is.null(value),
  null: (value: unknown): value is null => value === null,
  number: (value: unknown): value is number => typeof value === "number",
  object: (value: unknown): value is {} => typeof value === "object",
  primitive: (value: unknown): value is number | string | boolean =>
    is.string(value) || is.number(value) || is.boolean(value),
  string: (value: unknown): value is string => typeof value === "string",
  true: (value: unknown): value is true => value === true,
  truthy: (value: unknown): value is true => Boolean(value),
  undefined: (value: unknown): value is undefined => value === undefined,
};
