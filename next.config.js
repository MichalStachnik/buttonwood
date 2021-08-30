/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  exportPathMap: function () {
    return {
      '/': { page: '/' },
    };
  },
  // images: {
  //   loader: 'imgix',
  //   path: 'https://noop/',
  // },
};
