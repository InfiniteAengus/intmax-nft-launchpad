/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "beige-personal-nightingale-17.mypinata.cloud",
      },
      {
        protocol: "https",
        hostname: "nftymeta.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;
