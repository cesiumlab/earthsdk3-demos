import { ref, Ref, watch, onMounted, onBeforeUnmount, ShallowRef } from 'vue'
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { createAnimateFrameWithStartValues, Processing } from 'earthsdk3'
import { createVueDisposer, toVR } from 'earthsdk-ui'

/**
 * 比例尺刻度数组，用于选择合适的显示刻度
 */
const niceScales = [
  1, 2, 5,
  10, 20, 50,
  100, 200, 500,
  1000, 2000, 5000,
  10000, 20000, 50000,
  100000, 200000, 500000,
  1000000, 2000000, 5000000
]

/**
 * 比例尺信息接口
 */
interface ScaleInfo {
  /** 显示的文本 */
  text: string
  /** 线段宽度（像素） */
  width: number
}

/**
 * 比例尺组合式函数
 * @param xbsjEarthUi - EarthUI实例
 * @param scaleRef - 比例尺DOM引用
 */
export function useScale(
  xbsjEarthUi: XbsjEarthUi,
  scaleRef: Readonly<ShallowRef<HTMLDivElement | null>>
) {
  // 响应式数据
  const lengthInPixel = ref<string | undefined>()
  const scaleWidth = ref<number>(100) // 比例尺线段宽度
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

  /**
   * 根据实际距离选择合适的比例尺刻度
   * @param distanceInMeters - 实际距离（米）
   * @param pixelWidth - 参考像素宽度
   * @returns 比例尺信息
   */
  const getNiceScale = (distanceInMeters: number, pixelWidth: number): ScaleInfo => {
    // 计算每像素代表的米数
    const metersPerPixel = distanceInMeters / pixelWidth

    // 目标像素范围：60-120像素之间
    const minPixels = 60
    const maxPixels = 120

    // 查找最合适的刻度
    let bestScale = niceScales[0]
    let bestPixels = bestScale / metersPerPixel

    for (const scale of niceScales) {
      const pixels = scale / metersPerPixel

      // 如果在理想范围内，直接使用
      if (pixels >= minPixels && pixels <= maxPixels) {
        bestScale = scale
        bestPixels = pixels
        break
      }

      // 如果超过最大值，使用上一个刻度
      if (pixels > maxPixels) {
        break
      }

      // 更新最佳刻度
      bestScale = scale
      bestPixels = pixels
    }

    // 格式化显示文本
    let text: string
    if (bestScale >= 1000) {
      text = `${(bestScale / 1000).toFixed(0)}km`
    } else {
      text = `${bestScale.toFixed(0)}m`
    }

    return {
      text,
      width: Math.round(bestPixels)
    }
  }

  /**
   * 获取比例尺信息并更新显示
   */
  const getLengthInfo = async (): Promise<void> => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return

    try {
      // getLengthInPixel返回的是每像素代表的距离（单位可能是米）
      const inPixel = await viewer.getLengthInPixel()

      if (inPixel && inPixel >= 0) {
        // 假设inPixel是每像素的米数，参考宽度100像素
        const referencePixels = 100
        const distanceInMeters = inPixel * referencePixels

        // 获取合适的比例尺
        const scaleInfo = getNiceScale(distanceInMeters, referencePixels)

        lengthInPixel.value = scaleInfo.text
        scaleWidth.value = scaleInfo.width
      }
    } catch (error) {
      console.error('获取比例尺信息失败:', error)
    }
  }

  /**
   * 销毁动画帧
   */
  const destroyAnimateFrame = (): void => {
    if (animateFrame) {
      animateFrame.destroy()
      animateFrame = undefined
    }
  }

  /**
   * 初始化动画帧
   */
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
    lengthInPixel,
    scaleWidth
  }
}
