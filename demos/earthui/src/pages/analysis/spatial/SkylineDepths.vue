<template>
    <DraggablePopup2 :title="`天际线二维深度值`" :width="600" :height="'440px'" :left="650" :top="200" @close="changeCancel"
        :showButton="false">
        <div class="echart" ref="echart"></div>

    </DraggablePopup2>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive, defineProps, watch } from "vue";

import DraggablePopup2 from "../../../components/DraggablePopup2.vue";
import * as echarts from "echarts";
const props = withDefaults(defineProps<{ depths: number[] }>(), {})
const echart = ref(null)
const myChart = ref(null)
// 定义图表配置的类型（可进一步细化）
interface SeriesData {
    name: string;
    type: string;
    smooth: boolean;
    symbol: string;
    areaStyle: Record<string, any>;
    data: number[]; // 与 props.depths 类型一致
}

interface ChartOption {
    tooltip: Record<string, any>;
    title: Record<string, any>;
    toolbox: Record<string, any>;
    xAxis: Record<string, any>;
    yAxis: Record<string, any>;
    dataZoom: Record<string, any>[];
    series: SeriesData[];
}
const option = reactive<ChartOption>({
    title: {
        text: '天际线二维深度值',
        left: 10
    },
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        bottom: 90
    },
    dataZoom: [
        {
            type: 'inside'
        },
        {
            type: 'slider'
        }
    ],
    xAxis: {
        data: props.depths,
        silent: false,
        splitLine: {
            show: false
        },
        splitArea: {
            show: false
        }
    },
    yAxis: {
        splitArea: {
            show: false
        }
    },
    series: [
        {
            type: 'bar',
            data: props.depths,
            large: true
        }
    ]
}
)
watch(() => props.depths, () => {
    option.series[0].data = props.depths
    // 绘制图表
    if (myChart.value) myChart.value.setOption(option);
})


onMounted(() => {
    myChart.value = echarts.init(echart.value);
    // 绘制图表
    myChart.value.setOption(option);
})


const changeCancel = () => {
}
</script>

<style scoped>
.echart {
    height: 100%;
    width: 100%;
}
</style>
