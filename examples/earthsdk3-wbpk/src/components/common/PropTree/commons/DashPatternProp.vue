<script setup lang='ts'>

withDefaults(defineProps<{
    modelValue?: number,
    withUndefined: Boolean,
    defaultValue?: number,
    readonly?: boolean
}>(), { readonly: false })

const emits = defineEmits(["update:modelValue"]);

function getBitFromValue(int16: number | undefined, index: number) {
    const flag = !!((int16 ?? 255) & (1 << index));
    return flag
}

function setBit(int16: number | undefined, index: number, boolValue: boolean) {
    if (boolValue) {
        return ((int16 ?? 255) | (1 << index));
    } else {
        return ((int16 ?? 255) & ~(1 << index));
    }
}


const changeItemFlag = (value: number | undefined, index: number) => {
    const bv = getBitFromValue(value, index);
    const numVal = setBit(value, index, !bv);
    emits('update:modelValue', numVal)
}


const toNumber = (defaultValue: number | undefined) => {
    const num = defaultValue ?? 255
    emits('update:modelValue', num)
}

const toUndefined = () => {
    emits('update:modelValue', undefined)
}

</script>

<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div v-if="modelValue === undefined">
            <span>未设置</span><span class="undefined_settting" @click="toNumber(defaultValue)" title="设置属性值">⚙</span>
        </div>
        <div class='default_style' v-if="(modelValue !== undefined)">
            <div class="item_flag" v-for="(_, index) in [...new Array(16).keys()]" :key="index"
                @click="changeItemFlag(modelValue, index)">
                <div :class="getBitFromValue(modelValue, index) ? 'flag_bgk_true' : 'flag_bgk_false'">
                </div>
            </div>
        </div>
        <span v-if="withUndefined && (modelValue !== undefined)" class="undefined_settting" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div>
</template>

<style scoped>
.default_style {
    width: calc(100% - 36px);
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}


.undefined_settting {
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    margin-left: 10px;
    border-radius: 3px;
    text-align: center;
}

.undefined_settting:hover {
    background-color: #383838;
}


.item_flag {
    width: 10px;
    height: 10px;
    margin: 0 1px;
    line-height: 20px;
}

.flag_bgk_true {
    background-color: #fff;
    width: 10px;
    height: 10px;

}

.flag_bgk_false {
    background-color: #383838;
    width: 10px;
    height: 10px;
}

.readonly_flag {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.readonly_true {
    pointer-events: none;
}
</style>
