import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';


// https://vitejs.dev/config/
// https://medium.com/@pushplaybang/absolutely-dont-use-relative-paths-imports-in-your-vite-react-project-c8593f93bbea

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), svgr()] as any,
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // src 디렉토리를 @로 설정
    },
  },
});
