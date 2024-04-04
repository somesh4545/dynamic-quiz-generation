/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MYSQL_HOST: "mysql-28621c8e-someshsomani457-3bc6.a.aivencloud.com",
    MYSQL_PORT: "17375",
    MYSQL_DATABASE: "defaultdb",
    MYSQL_USER: "avnadmin",
    MYSQL_PASSWORD: "AVNS_dkYTZ4lwtiwkCdA9ELX",
    // use your own openai api key
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
