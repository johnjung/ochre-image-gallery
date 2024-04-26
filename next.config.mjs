/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ochre.lib.uchicago.edu",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
