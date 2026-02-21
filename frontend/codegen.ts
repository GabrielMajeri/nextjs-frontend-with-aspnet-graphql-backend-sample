import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5000/graphql",
  documents: "src/**/*.{ts,tsx}",
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
      ],
      config: {
        scalars: {
          DateOnly: "string",
          DateTime: "string",
          Decimal: "number",
          LocalDate: "string",
        },
      },
    },
  },
};

export default config;
