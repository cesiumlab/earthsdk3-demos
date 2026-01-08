import { ref, Ref, watch, onMounted, onBeforeUnmount, ShallowRef } from 'vue'
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { createAnimateFrameWithStartValues, Processing } from 'earthsdk3'
import { createVueDisposer, toVR } from 'earthsdk-ui'

// 比例尺组合式函数
export function useScale(
  xbsjEarthUi: XbsjEarthUi,
  scaleRef: Readonly<ShallowRef<HTMLDivElement | null>>
) {
  // 响应式数据
  const lengthInPixel = ref<string | undefined>()
  let animateFrame: Processing | undefined

  const disposer = createVueDisposer(onBeforeUnmount)
  const navigatorScaleRight = toVR<number>(disposer, [
    xbsjEarthUi.navigatorManager,
    'navigatorScaleRight'
  ])

  // 监听右侧位置变化
  watch(
    navigatorScaleRight,
    (val) => {
      if (scaleRef.value) {
        scaleRef.value.style.right = val + 'px'
      }
    },
    { immediate: true }
  )

  // 获取长度信息
  const getLengthInfo = async (): Promise<void> => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    try {
      const inPixel = await viewer.getLengthInPixel()
      let formattedLength: string | undefined

      if (inPixel && inPixel >= 0) {
        if (inPixel * 100 > 1000) {
          formattedLength = `${((inPixel * 100) / 1000).toFixed(0)}km`
        } else {
          formattedLength = `${(inPixel * 100).toFixed(0)}m`
        }
      }

      lengthInPixel.value = formattedLength
    } catch (error) {
      console.error('获取比例尺信息失败:', error)
    }
  }

  // 销毁动画帧
  const destroyAnimateFrame = (): void => {
    if (animateFrame) {
      animateFrame.destroy()
      animateFrame = undefined
    }
  }

  // 初始化动画帧
  const initAnimateFrame = (): void => {
    destroyAnimateFrame()
    getLengthInfo()
    animateFrame = createAnimateFrameWithStartValues(getLengthInfo)
    animateFrame.start()
  }

  // 挂载时初始化
  onMounted(() => {
    initAnimateFrame()
    // 监听视图变化
    const unsubscribe = xbsjEarthUi.activeViewerChanged.don(() => {
      destroyAnimateFrame()
      getLengthInfo()
      animateFrame = createAnimateFrameWithStartValues(getLengthInfo)
      animateFrame.start()
    })

    // 卸载前清理
    onBeforeUnmount(() => {
      destroyAnimateFrame()
      unsubscribe()
    })
  })

  return {
    lengthInPixel
  }
}
