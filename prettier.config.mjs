/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 100,
  importOrder: [
    "^next(.*)$",
    "^react(.*)$",
    "^antd(.*)$",
    "^@ant-design/(.*)$",
    "^@/(.*)$",
    "^@store/(.*)$",
    "^@ui/(.*)$",
    "^[./]"
  ],
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"]
};

export default config;