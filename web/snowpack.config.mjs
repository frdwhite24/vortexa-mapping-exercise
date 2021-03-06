/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-dotenv'],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    port: 8082,
  },
  buildOptions: {
    /* ... */
  },
  alias: {
    '@': './src/',
    '@components': './src/components',
    '@features': './src/features',
    '@store': './src/app/store.js',
    '@constants': './src/constants.js',
    '@services': './src/services',
  },
};
