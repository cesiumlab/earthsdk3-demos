<script setup lang='ts'>
import { inject, onMounted, ref, watch } from 'vue';
import Button from '../../components/Button.vue';
import LabelInput from "../../components/LabelInput.vue";
import PopList from '../../components/PopList.vue';
import RightList from '../../components/RightList.vue';
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi';
import { ESColor } from "earthsdk-ui"

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const slope = ref(false)//坡度
const aspect = ref(false)//坡向
const elevationRamp = ref(false)//高程
const elevationContour = ref(false)//等高线
const color = ref([1, 0, 0, 1])//等高线颜色
const newColor = ref()//等高线
const spacing = ref(150)//等高线空间
const width = ref(2)//等高线宽度
const type = ref('none')
const controlList: { type: string, zh: string, icon: string, leftButton: boolean, fun: () => void }[] = [
    {
        type: 'elevationRamp',
        zh: '高程',
        icon: 'gaocheng',
        leftButton: true,
        fun: () => {
            elevationRamp.value = !elevationRamp.value
            if (elevationRamp.value) { type.value = 'elevationRamp' } else { type.value = 'none' }
            slope.value = false
            aspect.value = false
            changeTerrainShader()
        }
    },
    {
        type: 'slope',
        zh: '坡度',
        icon: 'podu',
        leftButton: false,
        fun: () => {
            slope.value = !slope.value
            if (slope.value) { type.value = 'slope' } else { type.value = 'none' }
            elevationRamp.value = false
            aspect.value = false
            changeTerrainShader()
        }
    },
    {
        type: 'aspect',
        zh: '坡向',
        icon: 'poxiang',
        leftButton: true,
        fun: () => {
            aspect.value = !aspect.value
            if (aspect.value) { type.value = 'aspect' } else { type.value = 'none' }
            elevationRamp.value = false
            slope.value = false
            changeTerrainShader()
        }
    }
];
const controlList2: { type: string, zh: string, icon: string, leftButton: boolean, fun: () => void }[] = [

    {
        type: 'elevationContour',
        zh: '等高线',
        icon: 'denggaoxian',
        leftButton: false,
        fun: () => {
            elevationContour.value = !elevationContour.value
            changeTerrainShader()
        }
    }
];
const changeTerrainShader = () => {
    if (!xbsjEarthUi.activeViewer) return
    xbsjEarthUi.activeViewer.terrainShader = {
        "slope": {
            "show": slope.value
        },
        "aspect": {
            "show": aspect.value
        },
        "elevationRamp": {
            "show": elevationRamp.value
        },
        "elevationContour": {
            "show": elevationContour.value,
            "color": color.value,
            "spacing": spacing.value,
            "width": width.value,
        }
    }
}
const okHandler = (rgba: { r: number, g: number, b: number, a: number }) => {
    const rgbaArr = [rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a]
    color.value = rgbaArr
    changeTerrainShader()
}
watch([spacing, width], changeTerrainShader)
watch(color, (val) => {
    if (val) {
        newColor.value = {
            r: Number(val[0]) * 255,
            g: Number(val[1]) * 255,
            b: Number(val[2]) * 255,
            a: Number(val[3])
        }
    } else {
        newColor.value = {
            r: 255, g: 255, b: 255, a: 1
        }
    }
}, { immediate: true })
onMounted(() => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    const terrainShader = viewer.terrainShader
    slope.value = terrainShader.slope.show
    aspect.value = terrainShader.aspect.show
    elevationRamp.value = terrainShader.elevationRamp.show
    elevationContour.value = terrainShader.elevationContour.show
    color.value = terrainShader.elevationContour.color
    spacing.value = terrainShader.elevationContour.spacing
    width.value = terrainShader.elevationContour.width
    if (slope.value) {
        type.value = 'slope'
    } else if (aspect.value) {
        type.value = 'aspect'
    } else if (elevationRamp.value) {
        type.value = 'elevationRamp'
    }
})
</script>
<template>
    <RightList :title="'着色'">
        <Button v-for="item in controlList" :name="item.icon" :content="item.zh" :click="item.fun"
            :left-button="item.leftButton" :actived="type === item.type"></Button>
        <Button v-for="item in controlList2" :name="item.icon" :content="item.zh" :click="item.fun"
            :left-button="item.leftButton" :actived="elevationContour"></Button>
        <PopList :title="'等高线'" v-if="elevationContour">
            <LabelInput v-model="spacing" :inputType="'number'" :label="'等高距'" :unit="'m'" :min="0"></LabelInput>
            <LabelInput v-model="width" :inputType="'number'" :label="'线宽'" :unit="'m'" :min="0"></LabelInput>
            <div class="roam_pick" style="margin-top: 10px;">
                <label for="">{{ '颜色' }}</label>
                <div style="width: 190px;">
                    <ESColor :color="newColor" @ok="okHandler"></ESColor>
                </div>
            </div>

        </PopList>
    </RightList>
</template>