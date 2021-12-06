/** @type {import('next').NextConfig} */
module.exports = {
  // reactStrictMode: true,
  // {
  //   webpack(config, options)
  env: {
    googleAnalyticsID: 'G-CQ2JRBJ8CK',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]',
      },
    });

    return config;
  },
};
