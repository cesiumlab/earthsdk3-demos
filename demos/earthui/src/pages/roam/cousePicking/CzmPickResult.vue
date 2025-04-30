<template>
    <div class="type">
        <DraggablePopup :title="list.name" :left="'calc(100% - 463px)'" @close="close" :width="463" :height="'340px'"
            :top="500">
            <div class="bottom-content">
                <div class="bottom" v-for="(value, key) in list.value">
                    <div class="left-name">{{ key }}</div>
                    <div class="right-name">{{ value }}</div>
                </div>
            </div>
        </DraggablePopup>
    </div>
</template>
<script setup lang="ts">
import DraggablePopup from "../../../components/DraggablePopup2.vue";
withDefaults(defineProps<{
    list: { [key: string]: any }

}>(), {
});
const emits = defineEmits(['close'])
const close = () => {
    emits('close')
}
</script>
<style scoped>
.type {
    z-index: 10001;
}

.bottom-content {
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 12px;
    box-sizing: border-box;
    overflow: scroll;

}

.bottom-content>div:last-child {
    border-bottom: 1px solid hsla(0, 0%, 91%, .2);
}

.bottom {
    width: 100%;
    border-top: 1px solid hsla(0, 0%, 91%, .2);
    display: flex;
    line-height: 20px;
}


.left-name {
    width: 100px;
    text-align: right;
    padding-right: 10px;
    border-right: 1px solid hsla(0, 0%, 91%, .2);
    color: rgba(230, 230, 230, 1);
    overflow: hidden;
}

.right-name {
    flex: 1;
    text-align: left;
    padding-left: 20px;
    color: rgba(230, 230, 230, 1);
    overflow-wrap: break-word;
    overflow: hidden;
}
</style>