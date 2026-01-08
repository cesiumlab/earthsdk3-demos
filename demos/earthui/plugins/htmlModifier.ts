// plugins/htmlModifier.ts
import type { PluginOption } from 'vite'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

interface HtmlModifierOptions {
  /**
   * 需要添加相对路径的资源前缀列表
   * @default ['cesium/']
   */
  prefixes?: string[]
  /**
   * 输出目录
   * @default 'dist'
   */
  outDir?: string
}

export default function htmlModifierPlugin(options?: HtmlModifierOptions): PluginOption {
  const { prefixes = ['cesium/'], outDir = 'dist' } = options || {}

  return {
    name: 'html-modifier',
    apply: 'build',
    closeBundle() {
      try {
        const filePath = resolve(__dirname, '..', outDir, 'index.html')
        if (!existsSync(filePath)) {
          console.warn('⚠️ index.html not found in dist directory')
          return
        }
        let html = readFileSync(filePath, 'utf-8')
        // 为每个前缀添加相对路径
        prefixes.forEach((prefix) => {
          const regex = new RegExp(`(href|src)="${prefix.replace(/\//g, '\\/')}`, 'g')
          html = html.replace(regex, `$1="./${prefix}`)
        })
        writeFileSync(filePath, html)
        console.log('✅ index.html modified successfully')
      } catch (error) {
        console.error('❌ Error modifying index.html:', error)
        throw error
      }
    }
  }
}
