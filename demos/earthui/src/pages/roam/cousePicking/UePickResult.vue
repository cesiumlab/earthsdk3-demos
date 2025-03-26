<template>
    <div class="type">
        <DraggablePopup :title="'UE对象属性'" :left="'calc(100% - 463px)'" @close="close" :width="463" :height="'340px'"
            :top="500">
            <textarea name="" id="">{{ jsonResult }}</textarea>
        </DraggablePopup>
    </div>
</template>
<script setup lang="ts">
import DraggablePopup from "../../../components/DraggablePopup2.vue";
withDefaults(defineProps<{
    jsonResult: string
}>(), {

});
const emits = defineEmits(['close'])
const close = () => {
    emits('close')
}
</script>
<style scoped>
textarea {
    width: 100%;
    height: calc(100% - 5px);
    background: transparent;
    border: 1px solid #3b3c40;
    resize: none;
    outline: none;
    color: #fff;
    box-sizing: border-box;
    overflow-x: hidden;
}

textarea:focus {
    border: 1px solid #2c68f7;
}

textarea:hover {
    border: 1px solid #2c68f7;
}
</style>