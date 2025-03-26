<script setup lang='ts'>
import { computed, ref } from 'vue';
type enumLisType = { check: 'unchecked' | "checked", value: [aliasName: string, value: string] }

const props = withDefaults(defineProps<{
    modelValue?: string[],
    enumStrsList: [aliasName: string, value: string][],
    withUndefined: boolean,
    defaultValue: string[],
    readonly?: boolean
}>(), { readonly: false })

const emits = defineEmits(["update:modelValue"]);
const showOption = ref(false)

const checkStr = {
    unchecked: "\u2610",
    checked: "\u2611"
}

const countOccurrences = (arr: string[], val: string) => arr.filter((item) => item === val).length;

const enumList = computed(() => {
    const list = props.modelValue ?? props.defaultValue
    const { enumStrsList } = props
    let enums: enumLisType[] = []
    enumStrsList.forEach(it => {
        const flag = countOccurrences(list, it[1])
        const item: enumLisType = {
            check: (flag === 0) ? 'unchecked' : 'checked',
            value: it
        }
        enums.push(item)
    })
    return enums
})

const setValue = () => {
    emits('update:modelValue', props.defaultValue)
}
const toUndefined = () => {
    emits('update:modelValue', undefined)
    showOption.value = false
}

const findItem = (list: enumLisType[]) => {
    let itemList: string[] = []
    list.forEach(it => {
        if (it.check === "checked") {
            itemList.push(it.value[1])
        }
    })
    emits('update:modelValue', itemList)
}

const getValue = computed(() => {
    const list = props.modelValue ?? props.defaultValue
    return list.join(',')
})

const selcetItem = (check: 'unchecked' | "checked", index: number) => {
    const list = [...JSON.parse(JSON.stringify(enumList.value))] as enumLisType[];
    list[index].check = check === 'unchecked' ? "checked" : 'unchecked';
    findItem([...list])
}

</script>

<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div v-if="modelValue === undefined">
            <span>未设置</span><span class="undefined_settting" @click="setValue()" title="设置属性值">⚙</span>
        </div>
        <div class="value-str" v-if="(modelValue !== undefined)" @click="showOption = !showOption">
            {{ getValue }}
            <span class="value-str-icon" :class="showOption ? 'icon-open' : ''">▸</span>
        </div>
        <div class="value-item" v-show="showOption">
            <div class="item" v-for="(item, index) in enumList" :key="index" :value="item.value[1]"
                @click="selcetItem(item.check, index)">
                <span style="font-size: 14px;">{{ checkStr[item.check] }}</span> {{ item.value[0] }}
            </div>
        </div>
        <span v-if="withUndefined && (modelValue !== undefined)" class="undefined_settting" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div>
</template>

<style scoped>
.value-str {
    height: 20px;
    text-align: left;
    line-height: 18px;
    width: calc(100% - 54px);
    border: 1px solid #00212b;
    background: #065164;
    color: #fff;
    font-size: 12px;
    padding: 0 10px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
}

.value-str-icon {
    position: absolute;
    font-size: 14px;
    width: 10px;
    height: 10px;
    right: 5px;
    top: 5px;
    display: inline-block;
    line-height: 10px;
}

.icon-open {
    transform: rotate(90deg);
}


.value-item {
    max-height: 150px;
    line-height: 18px;
    width: calc(100% - 34px);
    border: 1px solid #00212b;
    background: #065164;
    position: absolute;
    font-size: 14px;
    top: 20px;
    z-index: 2;
    overflow: auto;
}

.item {
    width: calc(100% - 10px);
    padding-left: 10px;
    text-align: left;
    height: 25px;
    line-height: 25px;
    border-bottom: 1px solid #00212b;
}

.item:hover {
    background-color: #383838;
}

.undefined_settting {
    cursor: pointer;
    display: inline-block;
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

.readonly_flag {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}

.readonly_true {
    pointer-events: none;
}
</style>
