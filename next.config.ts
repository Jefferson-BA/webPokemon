import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // Del Pokédex
      },
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com', // NUEVO: Para Rick and Morty
      },
    ],
  },
};

export default nextConfig;