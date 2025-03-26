<script setup lang='ts'>
import { ref } from 'vue'
// import Window from "../../WindowPop.vue";
import Window from "../../Window.vue";
const props = withDefaults(defineProps<{
    modelValue?: string[],
    withUndefined?: boolean,
    defaultValue?: string[],
    readonly?: boolean,
    propertyName?: string
}>(), { withUndefined: true, propertyName: '属性值', readonly: false })

const strinsPropDom = ref()

const stringsRef = ref<string[]>([])
const viewsShow = ref(false);

const toTheString = () => {
    if (props.modelValue === undefined) {
        const arr = JSON.parse(JSON.stringify(props.defaultValue ?? [])) as string[]
        stringsRef.value = [...arr]
    } else {
        const arr = JSON.parse(JSON.stringify(props.modelValue)) as string[]
        stringsRef.value = [...arr]
    }
    viewsShow.value = true
}
const emits = defineEmits(["update:modelValue", "ondrop", "ondragover", "ondragleave"]);

const addString = () => {
    stringsRef.value.push('')
}
const deleteString = (index: number) => {
    stringsRef.value.splice(index, 1)
}

const inputHandler = (e: any, index: number) => {
    if (!stringsRef.value) return
    const numsArr = JSON.parse(JSON.stringify(stringsRef.value))
    numsArr[index] = String(e.target.value)
    stringsRef.value = [...numsArr]
}

const cancel = () => {
    viewsShow.value = false
    stringsRef.value = []
}
const ok = () => {
    const numsArr = JSON.parse(JSON.stringify(stringsRef.value))
    emits('update:modelValue', [...numsArr])
    viewsShow.value = false
}

</script>

<template>
    <div class="prop_box">
        <div class="prop_edit">
            <span class="is_undefined"> {{ (modelValue === undefined) ? '未设置' : '' }}</span>
            <span class="set_btn" @click.stop="toTheString" :title="`${readonly ? '查看' : '设置'}${propertyName}`">⚙</span>
        </div>
        <span v-if="withUndefined && (modelValue !== undefined) && !readonly" class="set_btn"
            @click="emits('update:modelValue', undefined)" title="设为undefined">╳</span>
    </div>
    <!-- <Window :title="propertyName" :footervisible="true" v-if="viewsShow" :readonly="readonly" @cancel="cancel" @ok="ok"
        :width="600" :height="400">
        <div class="prop_list" :class="{ 'readonly_style': readonly }">
            <div class="value_box">
                <span class="set_btn" @click="addNumber()" title="添加" :class="{ 'readonly_true': readonly }">+</span>
            </div>
            <div class="value_box" v-for="(_, index) in numbersRef" :key="index">
                <input type="number" v-model.lazy="numbersRef[index]" @input="inputHandler($event, index)"
                    :disabled="readonly" />
                <span class="set_btn" @click="deleteNumber(index)" title="删除"
                    :class="{ 'readonly_true': readonly }">╳</span>
            </div>
        </div>
    </Window> -->
    <Window :show="viewsShow" :title="propertyName" :onlyButton="false" :readonly="readonly" :width="600" :height="400"
        :isFocus="true" @cancel="cancel" @ok="ok">
        <div class="prop_list" :class="{ 'readonly_style': readonly }">
            <div class="value_box">
                <span class="set_btn" @click="addString()" title="添加" :class="{ 'readonly_true': readonly }">+</span>
            </div>
            <div class="value_box" v-for="(_, index) in stringsRef" :key="index"
                @drop.stop="emits('ondrop', { $event, strinsPropDom, index })" @dragover.stop="emits('ondragover', $event)"
                @dragleave.stop="emits('ondragleave', $event)" ref="strinsPropDom">
                <input type="string" v-model.lazy="stringsRef[index]" @input="inputHandler($event, index)"
                    :disabled="readonly" />
                <span class="set_btn" @click="deleteString(index)" title="删除"
                    :class="{ 'readonly_true': readonly }">╳</span>
            </div>
        </div>
    </Window>
</template>

<style scoped>
.prop_box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}


.prop_box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}


.prop_edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
}

.prop_list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}


.value_box {
    width: 90%;
    display: flex;
    justify-content: flex-end;
    margin: 5px 0px;
    align-items: center;
}

.value_box>input {
    width: 90%;
    height: 20px;
    background: #065164;
    color: #fff;
    border: 1px solid #00212b;
    font-size: 12px;
    margin-right: 1px;
    padding: 0 10px;
}

input::selection {
    background: rgb(0, 200, 255);
    color: rgb(23, 22, 23);
}

.set_btn {
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 22px;
    margin-left: 10px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
}

.is_undefined {
    width: 36px;
    font-size: 12px;
    text-align: center;
}

.set_btn:hover {
    background-color: #383838;
}

.readonly_true {
    pointer-events: none;
    user-select: none;
}

.readonly_style {
    cursor: not-allowed;
    cursor: no-drop;
    user-select: none;
}
</style>
