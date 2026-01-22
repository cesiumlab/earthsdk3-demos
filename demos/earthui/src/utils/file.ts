import { JsonValue } from 'earthsdk3'
import { ElMessage } from 'element-plus'

/**
 * 保存json文件
 * @param json
 * @param name
 */
export const downloadJson = async (json: JsonValue, name?: string, flag: boolean = false) => {
  try {
    // 判断如果是字符串直接使用，否则转换为JSON字符串
    const content = typeof json === 'string' ? json : JSON.stringify(json, null, 2)
    // 创建Blob对象
    const blob = new Blob([content], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = name || '未命名.json'
    document.body.appendChild(link)
    link.click()
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    }, 100)
    flag && ElMessage.success('下载成功')
    return true
  } catch (error) {
    console.error(error)
    flag && ElMessage.error('下载失败')
    return false
  }
}

// 复制
export const copyClipboard = async (text: string) => {
  try {
    await window.navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // 这里就是复制异常
    console.error('Clipboard copy failed:', err)
    return false
  }
}

//accept：'.json,.txt'
export function selectLocalFiles(
  options?: {
    accept?: string,
    multiple?: boolean
  }): Promise<File[]> {
  return new Promise((resolve) => {
    try {
      const input = document.createElement('input')
      input.type = 'file'
      input.style.display = 'none'

      if (options?.accept) input.accept = options.accept
      if (options?.multiple) input.multiple = options.multiple

      input.onchange = () => {
        resolve(input.files ? Array.from(input.files) : [])
        document.body.removeChild(input)
      }

      document.body.appendChild(input)
      input.click()

    } catch (error) {
      console.error(error);
      resolve([])
    }
  })
}
