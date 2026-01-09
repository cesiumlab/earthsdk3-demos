<template>
  <div class="sectional_echarts" ref="sectionalEcharts">
    <div ref="chartContainer" style="width: 100%; height: 100%" id="chart_Container"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, inject, onBeforeUnmount, watch } from 'vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import * as echarts from 'echarts'
const props = withDefaults(defineProps<{ heightList: number[] }>(), {})
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sectionalEcharts = ref<HTMLElement>() //dom元素
const chartContainer = ref<HTMLElement>() //dom元素
let chartInstance: any = null
const heights = ref<number[]>([])
const heightsName = ref<string[]>([])
watch(
  () => props.heightList,
  () => {
    heightsName.value = []
    if (props.heightList.length > 0) {
      heights.value = props.heightList

      heights.value.forEach((item, index) => {
        heightsName.value.push(`插值点${index + 1}`)
      })
      setTimeout(() => {
        initChart()
      }, 100)
    }
  },
  { immediate: true }
)
const initChart = () => {
  const minvalue = Number(Math.min(...heights.value).toFixed(2))
  const maxvalue = Number(Math.max(...heights.value).toFixed(2))
  let min
  let max
  if (minvalue === maxvalue) {
    min = minvalue - 2
    max = maxvalue + 2
  } else {
    min = Number((minvalue - (maxvalue - minvalue) / 2).toFixed(2))
    max = maxvalue + 1
  }
  const option = {
    title: {
      text: ''
    },
    grid: {
      top: '20px',
      left: '70px',
      bottom: '30px',
      right: '10px'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#57617B'
        }
      }
    },
    backgroundColor: 'rgba(37, 38, 42, 0)',
    xAxis: {
      axisTick: {
        show: false
      },

      axisLine: {
        show: false,
        lineStyle: {
          color: '#57617B'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 13
        }
      },
      data: heightsName.value
    },
    yAxis: {
      axisTick: {
        show: false
      },

      axisLine: {
        show: false,
        lineStyle: {
          color: '#57617B'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 13
        }
      },
      splitLine: {
        //网格线
        lineStyle: {
          type: 'dashed',
          color: 'rgba(183, 183, 183, 0.4)' //设置网格线类型 dotted：虚线   solid:实线
        },
        show: true //隐藏或显示
      },
      min: min,
      max: max
    },
    series: [
      {
        name: '高程',
        color: '#FF3100',
        type: 'line',
        itemStyle: {
          normal: {
            color: '#3c49ff'
          }
        },
        data: heights.value
      }
    ]
  }
  chartInstance.setOption(option)
}

onMounted(() => {
  if (chartContainer.value) {
    chartInstance = echarts.init(chartContainer.value)
  }
  // initChart()
  //动态修改整的dom元素的宽度
  xbsjEarthUi.navigatorManager.dispose(
    xbsjEarthUi.navigatorManager.timeLineWidthChanged.disposableOn((val) => {
      if (sectionalEcharts.value) {
        sectionalEcharts.value.style.width = val
      }
    })
  )
  //初始化整个dom的宽度
  if (sectionalEcharts.value) {
    sectionalEcharts.value.style.width = xbsjEarthUi.navigatorManager.timeLineWidth
  }
})
onBeforeUnmount(() => {
  chartInstance && chartInstance.dispose()
})
</script>
<style></style>
