/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "recipepress.inspirythemes.com",
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
      {
        protocol: "https",
        hostname: "gourmand.qodeinteractive.com",
      },
    ],
  },
};

export default nextConfig;
