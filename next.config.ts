import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [new URL("https://testimonialapi.vercel.app/avatar/**")],
  },
};

export default nextConfig;
