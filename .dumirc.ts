import { defineConfig } from 'dumi';
import path from 'path';

const basePath = process.env.GH_PAGES ? '/tabs/' : '/';
const publicPath = basePath;

export default defineConfig({
  alias: {
    '@rc-component/tabs$': path.resolve('src'),
    '@rc-component/tabs/es': path.resolve('src'),
    '@rc-component/tabs/assets': path.resolve('assets'),
  },
  mfsu: false,
  favicons: ['https://avatars0.githubusercontent.com/u/9441414?s=200&v=4'],
  themeConfig: {
    name: 'Tabs',
    logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  },
  outputPath: 'docs-dist',
  base: basePath,
  publicPath,
});
