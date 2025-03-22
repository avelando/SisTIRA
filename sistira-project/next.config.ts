import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "standalone",
    basePath: '/sistira',
    assetPrefix: '/sistira/'
};

export default nextConfig;
