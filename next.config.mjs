/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "pivoo.themepreview.xyz",
      },
      {
        protocol: "https",
        hostname: "thatix.progressionstudios.com",
      },
      {
        protocol: "https",
        hostname: "point.moxcreative.com",
      },
    ],
  },
};

export default nextConfig;
