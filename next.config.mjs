/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/socket.io",
      destination: "/api/socket",
    },
  ],
};

export default nextConfig;
