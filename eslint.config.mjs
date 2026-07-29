import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Legacy effects intentionally hydrate browser state and async availability data.
      // Keep lint actionable until those flows are migrated to external-store patterns.
      "react-hooks/set-state-in-effect": "off",
      // Admin authentication intentionally bypasses locale-aware public routing.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "check_rules.js",
  ]),
]);

export default eslintConfig;
