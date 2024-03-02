/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@acme/shared", "@acme/components"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s4.anilist.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
