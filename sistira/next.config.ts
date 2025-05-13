import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: "/sistira",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
