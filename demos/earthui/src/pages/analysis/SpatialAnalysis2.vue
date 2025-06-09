<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import SkylineAnalysis from './spatial/SkylineAnalysis.vue'; //表面积组件
export default defineComponent({
    components: {
        SkylineAnalysis,
    }
})
</script>
<script setup lang='ts'>
import RightList from '../../components/RightList.vue';
import Button from '../../components/Button.vue';
const controlList: { type: string, zh: string, icon: string, leftButton: boolean, }[] = [
    {
        type: 'SkylineAnalysis',
        zh: '天际线',
        icon: 'tiji',
        leftButton: true
    }

];
const type = ref('')
const changeType = (value: string) => {
    type.value = type.value === value ? '' : value
}
const emits = defineEmits(['closeObj'])
</script>

<template>
    <RightList :title="'空间分析2'">
        <div class="control-list">
            <Button v-for="item in controlList" :name="item.icon" :content="item.zh"
                :click="() => { changeType(item.type) }" :actived="type === item.type"
                :left-button="item.leftButton"></Button>
            <component :is="type" />
        </div>

    </RightList>
</template>

<style scoped>
.control-list {
    display: flex;
    flex-direction: column;
}
</style>