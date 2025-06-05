<template>
    <DraggablePopup2 v-if="props.isShow" :title="`UE材质管理`" :width="600" :height="'400px'" :left="800" :top="300"
        @close="changeCancel" :showButton="true" @ok="changeOk">
        <div class="selectMaterial">
            <div class="item" :class="{ active: currentUEMaterial == item }"
                v-for="(item, index) in props.tilesetUEMaterial" :key="index" @click="selectMaterial(item)">
                <div class="thumbnail"></div>
                <p>{{ item }}</p>
            </div>
        </div>
    </DraggablePopup2>

</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import DraggablePopup2 from "../../DraggablePopup2.vue";

// 传入事件
const props = withDefaults(defineProps<{ isShow: boolean, currentUEMaterial: string | undefined, tilesetUEMaterial: any[] }>(), {});
// 分发事件
const emits = defineEmits(["cancel", "ok"]);
// 当前选中材质
const currentUEMaterial = ref<string | undefined>(props.currentUEMaterial);

watch(() => props.currentUEMaterial, (newValue: string | undefined) => {
    currentUEMaterial.value = newValue
}, { immediate: true, deep: true });

/**
 * 取消材质
 */
const changeCancel = () => {
    emits("cancel");
}

/**
 * 确认材质
 */
const changeOk = async () => {
    emits("ok", currentUEMaterial.value);
}

/**
 * 选择材质
 * @param item 
 */
const selectMaterial = (item: string) => {
    currentUEMaterial.value = currentUEMaterial.value == item ? '' : item
}


</script>
<style scoped>
.selectMaterial {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    padding: 15px;
}

.item {
    width: 60px;
    margin: 10px;
    cursor: pointer !important;
}

.item p {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}

.thumbnail {
    width: 100%;
    height: 60px;
    background: #3E3E41;
    border-radius: 4px;
}

.active>div {
    border: 1px solid #2C68F7;
    box-sizing: border-box;
}
</style>
