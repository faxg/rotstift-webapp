/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],


  output: 'export',
  //Optional: Change the output directory `out` -> `dist`
  distDir: 'dist',
};
 
