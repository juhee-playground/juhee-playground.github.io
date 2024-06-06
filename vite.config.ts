import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
// https://medium.com/@pushplaybang/absolutely-dont-use-relative-paths-imports-in-your-vite-react-project-c8593f93bbea
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/_variables";
        @import "./src/styles/_mixins";
        @import "./src/styles/_reset";
        @import "./src/styles/_mediaQueries";`,
      },
    },
  },
});
