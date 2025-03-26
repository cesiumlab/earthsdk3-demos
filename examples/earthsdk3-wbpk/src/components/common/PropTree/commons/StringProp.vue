<script setup lang='ts'>
import { ref } from 'vue';
import { copyClipboard } from '../../../utility/copyClipboard';

withDefaults(defineProps<{
    modelValue?: string,
    withUndefined?: boolean,
    defaultValue?: string,
    readonly?: boolean,
    isTextarea?: boolean,
}>(), { withUndefined: false, readonly: false, isTextarea: false })
const emits = defineEmits(["update:modelValue", "ondrop", "ondragover", "ondragleave"]);

const isfocus = ref(false)

const inputHandler = (e: any) => {
    isfocus.value = false
    emits('update:modelValue', (e.target.value).toString())
}

const toTheString = (defaultValue: string | undefined) => {
    const str = defaultValue ?? ''
    emits('update:modelValue', str)
}

const toUndefined = () => {
    emits('update:modelValue', undefined)
}

</script>

<template>
    <div class="readonly_flag" v-if="!readonly" :draggable="isfocus ? 'false' : 'true'" @drop.stop="emits('ondrop', $event)"
        @dragover.stop="emits('ondragover', $event)" @dragleave.stop="emits('ondragleave', $event)">
        <div v-if="modelValue === undefined">
            <span>未设置</span><span class="undefined_settting" @click="toTheString(defaultValue)" title="设置属性值">⚙</span>
        </div>

        <input v-if="(modelValue !== undefined) && !isTextarea" type="text" @focus="isfocus = true" :value="modelValue"
            @blur="inputHandler($event)" @keydown.enter="inputHandler($event)" />

        <textarea v-if="isTextarea" :value="modelValue" @blur="isfocus = false" @focus="isfocus = true"
            @input="inputHandler($event)"></textarea>

        <span v-if="withUndefined && (modelValue !== undefined)" class="undefined_settting" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div>
    <div v-else class="readonly_flag">
        <div @dblclick="copyClipboard(modelValue ?? '')">{{ modelValue }}</div>
    </div>
</template>

<style scoped>
textarea,
input {
    max-width: calc(100% - 56px);
    min-width: calc(100% - 56px);
    background: #065164;
    color: #fff;
    border: 1px solid #065164;
    height: 16px;
    font-size: 12px;
    padding: 0 10px;
    outline-color: #065164;
}
input::selection {
    background: rgb(0, 200, 255);
    color: rgb(23, 22, 23);
}
textarea:focus,
input:focus {
    border: none;
    outline-color: #065164;
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
    user-select: none;

}

.readonly_flag>div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.readonly_true {
    pointer-events: none;
    user-select: none;
}
</style>
