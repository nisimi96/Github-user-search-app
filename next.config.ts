import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Enables static export
  basePath: '/your-repo-name', // Replace with your repository name
  trailingSlash: true, // Ensures correct paths for GitHub Pages
};

export default nextConfig;
