<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
    modelValue?: any,
    enumStrsList: [aliasName: any, value: any][],
    withUndefined: boolean,
    defaultValue?: any,
    readonly?: boolean,
    isBan?: boolean,
    isStyleEdit?: boolean
}>(), { readonly: false, isBan: false, isStyleEdit: false })

const emits = defineEmits(["update:modelValue", 'clickli']);
const modelValueRef = ref<any>('')
const modelValueName = ref<number | string | undefined>('')
const leftulisShow = ref(false)
watch(modelValueName, (val) => {
    emits('update:modelValue', val)
})
const changeSelect = (item: any) => {
    mouseFlag.value = false
    leftulisShow.value = false
    if (props.isStyleEdit) {
        emits('clickli', item)
    } else {
        modelValueRef.value = item[0]
        modelValueName.value = item[1]
        emits('clickli')
    }

}
const mouseFlag = ref(false)
const resetDefult = () => {
    emits('update:modelValue', props.defaultValue)
    const item = props.enumStrsList.find(item => item[1] === props.defaultValue)
    if (item) {
        modelValueRef.value = item[0]
        modelValueName.value = item[1]
    }
}
watch(() => props.modelValue, (val) => {
    const item = props.enumStrsList.find(item => item[1] === val)
    if (item) {
        modelValueRef.value = item[0]
        modelValueName.value = item[1]
    } else {
        modelValueRef.value = val
        modelValueName.value = val
    }
}, { immediate: true })
</script>

<template>
    <div class="select">
        <div class="enum_prop">
            <div class="enum_prop_model" :class="{ 'enum_prop_model_ban': isBan }"
                @click.stop.prevent="leftulisShow = !leftulisShow" :title="modelValueRef">{{
                    modelValueRef }}
                <span class="images_xiaosanjiao" :class="leftulisShow ? 'images_xiaosanjiao_transform' : ''"></span>
            </div>
            <ul v-show="leftulisShow">
                <li v-for="item in enumStrsList" :title="item[0]" :class="{ actived: item[0] === modelValueRef }"
                    @click="changeSelect(item)">
                    {{ item[0] }}</li>
            </ul>
        </div>
        <div class="checkbox1">
            <div v-if="!readonly && defaultValue !== undefined && modelValue !== defaultValue" class="checkbox"
                @click.stop.prevent="resetDefult" @mouseover="mouseFlag = true" @mouseout="mouseFlag = false">
                <es-icon :name="'huaban'" :color="mouseFlag ? 'rgba(230, 230, 230, 1)' : 'rgba(230, 230, 230, 0.4)'"
                    :size="14" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.select {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    line-height: 26px;
    color: rgba(230, 230, 230, 1);
    position: relative;
}

.enum_prop {
    flex: 1;
    position: relative;
}

.select>.enum_prop>.enum_prop_model {
    height: 26px;
    width: 100%;
    background: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
    border: 1px solid #3b3c40;
    color: rgba(230, 230, 230, 1);
    padding: 0 11px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    overflow-wrap: anywhere;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.enum_prop_model_ban {
    background: rgba(48, 48, 48, 0.6) !important;
}

.select>.enum_prop>ul {
    position: absolute;
    z-index: 20;
    max-height: 130px;
    left: 0;
    top: 28px;
    overflow-y: auto;
    background: #292a2e;
    box-shadow: 0px 2px 6px 0px rgba(26, 26, 28, 0.68);
    border-radius: 4px;
    overflow-x: hidden;
    width: 100%;
    margin: 0;
    box-sizing: border-box;
}

.select>.enum_prop>ul::-webkit-scrollbar {
    width: 3px;
    background-color: rgba(41, 42, 46, 1);
    border-radius: 2px;
}

.select>.enum_prop>ul::-webkit-scrollbar-thumb {
    background-color: rgba(183, 183, 183, 1);
    border-radius: 2px;
}

.select>.enum_prop>ul>li {
    list-style: none;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    text-align: left;
    padding-left: 10px;
    margin-left: -40px;
    white-space: nowrap;
    color: rgba(230, 230, 230, 1);
}

.select>.enum_prop>ul>li:hover {
    background: #37393e;
}

.actived {
    background: #455767 !important;
}

.checkbox1 {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    margin-left: 10px;
    margin-top: 2px;
}

.checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
    border: 1px solid rgba(230, 230, 230, 0.4);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}
</style>
