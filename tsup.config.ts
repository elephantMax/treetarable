import {defineConfig} from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  minify: true,
  dts: true,
  treeshake: true,
  target: ["node20"],
});
