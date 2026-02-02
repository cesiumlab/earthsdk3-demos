import vue from '@vitejs/plugin-vue'
import { defineConfig, normalizePath } from 'vite'
import cesium from 'vite-plugin-cesium'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'
import htmlModifier from './plugins/htmlModifier'

export default defineConfig({
  base: './', // 默认值，应用部署在根路径
  resolve: {
    alias: {
      // 配置Cesium的访问
      cesium: path.resolve(__dirname, 'node_modules/cesium/Source/Cesium'),
      // 配置@别名指向src目录
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    htmlModifier(),
    cesium(),
    // 运行和构建时copy
    viteStaticCopy({
      targets: [
        {
          //此处注意若单独提取项目，路径应该为./node_modules
          src: normalizePath(path.resolve(__dirname, './node_modules/earthsdk3-assets')),
          dest: './js'
        }
      ]
    })
  ],
  build: {
    // 设置chunk大小警告限制为2MB（2048KB）
    chunkSizeWarningLimit: 2048,
    rollupOptions: {
      output: {
        // 手动分包配置
        manualChunks: {
          // Vue 核心库
          'vue-vendor': ['vue'],
          // Element Plus UI库
          'element-plus': ['element-plus'],
          // EarthSDK 相关库
          'earthsdk-vendor': ['earthsdk3', 'earthsdk3-cesium', 'earthsdk3-ol', 'earthsdk3-ue', 'earthsdk-ui'],
          // 图表库
          'charts-vendor': ['echarts'],
          // 其他工具库
          'utils-vendor': ['axios', 'dayjs', 'ol', 'topojson-client', 'x2js', 'search-params']
        },
        // 自定义chunk文件名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        // 自定义入口文件名
        entryFileNames: 'assets/js/[name]-[hash].js',
        // 自定义静态资源文件名
        assetFileNames: (assetInfo) => {
          // 根据文件类型分类存放
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name || '')) {
            return 'assets/images/[name]-[hash][extname]'
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return 'assets/fonts/[name]-[hash][extname]'
          } else if (/\.css$/i.test(assetInfo.name || '')) {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 生成sourcemap用于调试（生产环境可设为false）
    sourcemap: false,
    // 压缩配置（使用esbuild更快）
    minify: 'esbuild'
  }
})
