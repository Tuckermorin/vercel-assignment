import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force Pages Router by ensuring no App Router directory
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;