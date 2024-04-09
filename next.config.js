/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    
  },
  webpack(config) {
    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false, // the solution
      tls: false,
      net: false,
    };
    config.optimization = {
      minimize: false
    }
    return config;
  },
};

module.exports = nextConfig;
