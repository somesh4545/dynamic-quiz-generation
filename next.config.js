/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MYSQL_HOST: "sql6.freesqldatabase.com",
    MYSQL_PORT: "3306",
    MYSQL_DATABASE: "sql6696398",
    MYSQL_USER: "sql6696398",
    MYSQL_PASSWORD: "dfedvfAgUE",
    // use your own openai api key
    OPENAI_API_KEY: "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",
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
