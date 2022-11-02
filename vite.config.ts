import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';

const env = loadEnv(process.env.NODE_ENV as any, process.cwd());
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style/index`,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/view': resolve(__dirname, 'src/view'),
      '@/assets': resolve(__dirname, 'src/assets'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {

      },
    },
  },
  base: process.env.NODE_ENV === 'production' ? './' : './', // 打包基础路径 不配置打包后可能会找不到资源
  server: {
    host: '0.0.0.0',
    open: false,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' ? env.VITE_APP_SERVER_URL : env.VITE_APP_BASE_URL, // 后端服务实际地址
        changeOrigin: true, // 开启代理
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    port: 8888, // 启动时的默认占用端口
  },
});
