import { ElMessage } from 'element-plus'
export async function copyClipboard(text: string | undefined): Promise<void> {
  if (!text) return

  // 检查clipboard API是否可用
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success('复制成功')
  } catch (e) {
    fallbackCopyTextToClipboard(text)
  }
}

// 备用复制方法
function fallbackCopyTextToClipboard(text: string): void {
  try {
    // 方法1：使用document.execCommand（已废弃但兼容性好）
    const textArea = document.createElement('textarea')
    textArea.value = text
    // 避免滚动到视图中
    textArea.style.position = 'fixed'
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.width = '2em'
    textArea.style.height = '2em'
    textArea.style.padding = '0'
    textArea.style.border = 'none'
    textArea.style.outline = 'none'
    textArea.style.boxShadow = 'none'
    textArea.style.background = 'transparent'
    textArea.style.opacity = '0'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    const successful = document.execCommand('copy')
    document.body.removeChild(textArea)

    if (successful) {
      ElMessage.success('复制成功')
    } else {
      throw new Error('复制失败')
    }
  } catch (err) {
    promptUserToCopy(text)
  }
}

// 方法2：提示用户手动复制
function promptUserToCopy(text: string): void {
  // 创建包含文本的输入框让用户手动复制
  const input = document.createElement('input')
  input.value = text
  input.style.position = 'fixed'
  input.style.top = '0'
  input.style.left = '0'
  input.style.opacity = '0'
  document.body.appendChild(input)

  input.select()
  input.focus()

  try {
    const successful = document.execCommand('copy')
    document.body.removeChild(input)

    if (successful) {
      ElMessage.success('复制成功')
    } else {
      ElMessage.error('复制失败')
    }
  } catch (err) {
    document.body.removeChild(input)
    ElMessage.error(`复制失败`)
  }
}
