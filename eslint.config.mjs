import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Thêm block rules vào đây
  {
    rules: {
      // 1. Chặn build (CI fail) nếu có lỗi sau:
      "no-unused-vars": "error", // Biến khai báo nhưng không dùng
      "no-console": "error", // Cấm console.log trên môi trường production
      "prefer-const": "error", // Bắt buộc dùng const nếu không gán lại giá trị

      // 2. Chỉ cảnh báo (CI không fail):
      "react/no-unescaped-entities": "warn",

      // 3. Tắt những rule gây phiền nhiễu:
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  // Override default ignores
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
