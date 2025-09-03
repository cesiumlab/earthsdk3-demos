<script setup lang='ts'>
import { watch, onMounted, ref } from "vue";
import { vClickOutside } from 'earthsdk-ui';
import SliderTime from "./SliderTime.vue";

interface Props {
    label?: string,
    modelValue: number | number,
    placeholder?: string,
    defaultValue?: number,
    step?: number,
    min?: number,
    max?: number,
    width?: number
}
const props = withDefaults(defineProps<Props>(), {
    label: "内容",
    placeholder: '请输入内容',
    defaultValue: 0,
    step: 1,
    width: 154,

})
const emits = defineEmits(["update:modelValue"]);

const type = ref('default')
let timer: any
const newValue = ref()
const newSliderValue = ref()
const clickOutside = () => {
    type.value = 'default'
}
const click = () => {
    timer = setTimeout(() => {
        mouseFlag.value = false
        if (type.value !== 'default') return
        type.value = 'slider'
    }, 300)
}
const dblclick = () => {
    mouseFlag.value = false
    clearTimeout(timer)
    if (type.value !== 'default') return
    type.value = 'input'
}
const resetDefult = () => {
    newValue.value = props.defaultValue
}
const modelValueChange = (val: any) => {
    if (props.step === 0.01) {
        newValue.value = val / 100
    } else if (props.step === 0.02) {
        newValue.value = Number((val / 5 - 10).toFixed(2))
    } else {
        newValue.value = val
    }
}
onMounted(() => {
    console.log(1111111,props.modelValue, props.defaultValue);
    
    newValue.value = props.modelValue ?? props.defaultValue
})
watch(newValue, (val) => {
    if (props.step === 0.01) {
        newSliderValue.value = val * 100
        if (newSliderValue.value > 100) {
            newSliderValue.value = 100
        } else if (newSliderValue.value < 0) {
            newSliderValue.value = 0
        }
    } else if (props.step === 0.02) {
        newSliderValue.value = (val + 10) * 5
    } else {
        newSliderValue.value = val
    }
    emits("update:modelValue", Number(val ? val.toFixed(2) : ''))
})
const mouseFlag = ref(false)
const changeNewValue = (e: any) => {
    if (props.step === 0.01) {
        if (e.target.value > 1) {
            newValue.value = 1
        } else if (e.target.value < 0) {
            newValue.value = 0
        } else {
            newValue.value = Number(e.target.value)
        }
    } else if (props.step === 0.02) {
        if (e.target.value > 10) {
            newValue.value = 10
        } else if (e.target.value < -10) {
            newValue.value = -10
        } else {
            newValue.value = Number(e.target.value)
        }
    } else {
        if (props.max && props.min) {
            if (e.target.value > props.max) {
                newValue.value = props.max
            } else if (e.target.value < props.min) {
                newValue.value = props.min
            } else {
                newValue.value = Number(e.target.value)
            }
        } else {
            if (e.target.value > 100) {
                newValue.value = 100
            } else if (e.target.value < 0) {
                newValue.value = 0
            } else {
                newValue.value = Number(e.target.value)
            }
        }

    }

}
</script>
<template>
    <div class="label_input" v-click-outside="clickOutside" @click.stop.prevent="click"
        @dblclick.stop.prevent="dblclick">
        <label class="label" for="" :title="label">{{ label }}</label>
        <div class="input1" v-if="type === 'default'">{{ newValue }}
        </div>
        <div class="input" v-else-if="type === 'slider'">
            <SliderTime :min="min" :max="max" :width="width" v-model:value="newSliderValue" @change="modelValueChange"
                :realVal="`${newValue.toFixed(2)}`" />
        </div>
        <div class="input" v-else-if="type === 'input'"><input class="input_number" type="number" :value="newValue"
                @blur="changeNewValue($event)" @keydown.enter="changeNewValue($event)" :placeholder="placeholder">
        </div>
        <div v-if="newValue !== defaultValue" class="checkbox" @click.stop.prevent="resetDefult"
            @mouseover="mouseFlag = true" @mouseout="mouseFlag = false">
            <es-icon :name="'huaban'" :color="mouseFlag ? 'rgba(230, 230, 230, 1)' : 'rgba(230, 230, 230, 0.4)'"
                :size="15" />
        </div>
    </div>
</template>

<style scoped>
.label_input {
    width: 100%;
    margin-bottom: 10px;
    height: 26px;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 26px;
    color: rgba(230, 230, 230, 1);

}

.label_input>.label {
    display: inline-block;
    width: 60px;
    height: 26px;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 26px;
    font-size: 14px;
}

.label_input>.input {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    cursor: pointer;
}

.label_input>.input1 {
    flex: 1;
    box-sizing: border-box;
    background: rgba(28, 28, 29, 0.6);
    cursor: pointer;
    padding-left: 11px;
    border: 1px solid transparent;
    height: 100%;
    border-radius: 4px;


}

.label_input>.input>input {
    width: 100%;
    display: inline-block;
    height: 26px;
    border-radius: 4px;
    margin-right: 0;
    color: rgba(230, 230, 230, 1);
    padding-left: 11px;
    box-sizing: border-box;
    background: none;
    border: 1px solid #3b3c40;
    background: rgba(28, 28, 29, 0.6);
}

.label_input>.checkbox {
    width: 26px;
    height: 26px;
    cursor: pointer;
    border: 1px solid rgba(230, 230, 230, 0.4);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-left: 10px;
}

.label_input>.input>input:hover {
    border: 1px solid #2c68f7;
}

.label_input>.input>input:focus {
    border: 1px solid #2c68f7;
}

.input_number::-webkit-outer-spin-button,
.input_number::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.input_number[type="number"] {
    -moz-appearance: textfield;
}
</style>
