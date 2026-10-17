import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
// https://medium.com/@pushplaybang/absolutely-dont-use-relative-paths-imports-in-your-vite-react-project-c8593f93bbea

// 플러그인마다 다른 vite 타입 복사본을 물면 배열 합칠 때 TS2321(스택 폭주) → 개별 unknown 캐스트
const toPlugin = (plugin: unknown): PluginOption => plugin as PluginOption;

export default defineConfig({
  plugins: [
    toPlugin(react()),
    toPlugin(tailwindcss()),
    toPlugin(tsconfigPaths()),
    toPlugin(svgr()),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // src 디렉토리를 @로 설정
    },
  },
});
