/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MYSQL_HOST: "localhost",
    MYSQL_PORT: "3306",
    MYSQL_DATABASE: "quiz",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "",
    // use your own openai api key
    OPENAI_API_KEY: "",
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

    return config;
  },
};

module.exports = nextConfig;
