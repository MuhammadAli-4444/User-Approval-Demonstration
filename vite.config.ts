// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Set the base path for your application.
  // This should match your GitHub repository name, including leading and trailing slashes.
  // For your repository 'User-Approval-Demonstration', it should be '/User-Approval-Demonstration/'.
  base: "/User-Approval-Demonstration/",
});
