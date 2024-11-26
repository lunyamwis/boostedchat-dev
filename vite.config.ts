import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";



export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
  const env = loadEnv(mode, process.cwd());
  console.log("Loaded ENV Variables:",  process.env); // Debugging


  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./vitest.setup.mjs",
    },
  });
}
