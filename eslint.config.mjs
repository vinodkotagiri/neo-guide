import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disable the unused vars rule
      "react-hooks/exhaustive-deps": "off", // Disable exhaustive-deps rule
      "prefer-const": "off", // Disable prefer-const rule
      "react/jsx-no-bind": "off", // Optionally disable no-bind rule if you want
    },
  },
];

export default eslintConfig;
