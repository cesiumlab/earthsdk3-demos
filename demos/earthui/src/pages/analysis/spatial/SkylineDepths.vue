<template>
    <DraggablePopup2 :title="`二维天际线`" :width="450" :height="'340px'" :left="1050" :top="400" @close="changeCancel"
        :showButton="false">
        <div class="echart" ref="echart"></div>
    </DraggablePopup2>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive, defineProps, watch, inject } from "vue";

import DraggablePopup2 from "../../../components/DraggablePopup2.vue";
import * as echarts from "echarts";
const props = withDefaults(defineProps<{ depths: number[] }>(), {})
const echart = ref(null)
const myChart = ref(null)
const emits = defineEmits(["changeShow"])
// 对象管理器
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const option = reactive<any>({
    xAxis: {
        type: 'category',
        show: false
    },
    yAxis: {
        type: 'value',
        min: 0,
        max: 1,
        textStyle: {
            color: '#fff' // 设置图例文字颜色为白色
        },
        splitLine: { //网格线
            lineStyle: {
                type: 'dashed', //设置网格线类型 dotted：虚线 solid:实线
                color: '#ccc',
            },
            show: true //隐藏或显示
        }
    },
    tooltip: {
        show: true, // 是否显示提示组件
        trigger: 'item', // 提示组件触发类型
        axisPointer: {
            type: 'line', // 指示器类型
            label: {
                show: true, // 是否显示文本标签
                formatter: '{value}单位' // 文本标签格式器
            }
        }
    },
    series: [
        {
            data: props.depths,
            type: 'line'
        }
    ]
}
)
watch(() => props.depths, () => {
    // 绘制图表
    init()
}, { deep: true })


onMounted(() => {
    // @ts-ignore
    myChart.value = echarts.init(echart.value);
    init();

})

const init = () => {
    // @ts-ignore
    if (myChart.value) myChart.value.clear()
    try {
        option.series[0].data = props.depths.map(item => {
            return 1 - (item[1] / xbsjEarthUi.activeViewer.container.offsetHeight)
        })
    } catch (error) {

    }
    // @ts-ignore
    myChart.value.setOption(option);
}


const changeCancel = () => {
    emits("changeShow", false);
}
</script>

<style scoped>
.echart {
    height: 100%;
    width: 100%;
}
</style>
