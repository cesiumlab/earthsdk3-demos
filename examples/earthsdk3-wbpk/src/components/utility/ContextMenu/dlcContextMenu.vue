
<script setup lang='ts'>
import { StyleValue, computed, onBeforeMount, onMounted, ref } from 'vue';
import ContextMenu, { MenuItem } from '.';

const props = withDefaults(defineProps<{
    itemWidth: number,
    itemHeight: number,
    menuList: MenuItem[]
}>(), {});

const close = () => ContextMenu.close()

const menubox = ref<HTMLElement>()

const itemStyle = computed(() => {
    let style: Partial<StyleValue> = {}
    const { itemWidth, itemHeight } = props
    style.width = `${itemWidth}px`
    style.height = `${itemHeight}px`
    style.lineHeight = `${itemHeight}px`
    return style
})

const clickFunc = (it: MenuItem) => {
    if (it.type !== "normal") return
    it.callback();
    close();
}

const isContains = (e: MouseEvent) => {
    if (!menubox.value) return
    const isSelf = menubox.value.contains(e.target as Node)
    if (!isSelf) close()
}

const showRef = ref(false)

onMounted(() => {
    setTimeout(() => showRef.value = true, 20)
    document.addEventListener('click', isContains)
    onBeforeMount(() => {
        document.removeEventListener('click', isContains)
        showRef.value = false
    })
})

const getDisabled = (disabled?: boolean) => {
    const flag = disabled ?? false
    return flag ? 'disabled-item' : ''
}

const iconStyle = () => ({
    width: `${props.itemHeight - 10}px`,
    height: `${props.itemHeight - 10}px`,
    marginRight: '5px'
})

</script>

<template>
    <transition name="down">
        <div class="menu-box" ref="menubox" v-show="showRef">
            <template v-for="(item, index) in menuList" :key="index">
                <div v-if="item.type == 'divider'" class="divideron">
                </div>
                <div v-if="item.type === 'normal'" class="normal-item" :class="getDisabled(item.disabled)"
                    @click="clickFunc(item)" :style="itemStyle">
                    <span>{{ item.name }}</span>
                    <div class="icon-tips">
                        <img v-if="item.icon" :style="iconStyle()" :src="item.icon">
                        <span class="tips">{{ item.tips }}</span>
                    </div>
                </div>
            </template>
        </div>
    </transition>
</template>

<style scoped>
.menu-box {
    background: #001a23;
    color: #ccc;
    border-radius: 3px;
    -webkit-box-shadow: 0 2px 12px 2px rgba(68, 73, 77, .16);
    box-shadow: 0 2px 12px 2px rgba(68, 73, 77, .16);
    padding: 5px 0px;
}

.normal-item {
    cursor: pointer;
    text-align: left;
    padding: 0px 10px;
    margin: 5px;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.disabled-item {
    pointer-events: none;
    color: #747474;
}

.icon-tips {
    display: flex;
    justify-content: center;
    align-items: center;
}

.tips {
    color: #747474;
}

.divideron {
    margin-left: 10px;
    width: calc(100% - 20px);
    height: 1px;
    line-height: 1px;
    background: rgb(168, 168, 168);
    opacity: 0.3;
}

.normal-item:hover {
    background: #003440;
}

.normal-item span {
    display: inline-block;
    font-size: 12px;
}

.down-enter-from {
    transform: translateY(-10px);
    opacity: 0;
}

.down-enter-to {
    transform: translateY(0px);
}

.down-enter-active,
.down-leave-active {
    transition: all 0.3s;
}

.down-leave-from {
    transform: translateY(0px);
    opacity: 1;
}

.down-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
</style>
