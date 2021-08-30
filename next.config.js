/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  exportTrailingSlash: true,
  exportPathMap: function () {
    return {
      '/': { page: '/' },
    };
  },
};
