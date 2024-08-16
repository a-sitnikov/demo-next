/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 100,
  importOrder: [
    "^next(.*)$",
    "^react(.*)$",
    "^usehooks-ts$",
    "^antd(.*)$",
    "^@ant-design/(.*)$",
    "^@/(.*)$",
    "^@store/(.*)$",
    "^@ui/(.*)$",
    "^@utils/(.*)$",
    "^[./]"
  ],
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"]
};

export default config;