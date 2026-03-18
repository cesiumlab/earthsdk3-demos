<script setup lang="ts">
interface Props {
    title: string
    link?: string
}
withDefaults(defineProps<Props>(), { title: '标题', link: '' })
</script>
<template>
    <div class="poplist_header">
        <div class="header_left"><span></span>{{ title }}</div>
        <div class="header_right" v-show="link">
            <a :href="`${link}`" target="_blank"> {{ link }}</a>
        </div>
    </div>
</template>

<style scoped>
.poplist_header {
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    border-bottom: var(--el-border);
    font-size: 12px;
}

.header_left {
    position: relative;
    color: var(--el-text-color);
    user-select: none;
}

.header_left>span {
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 2px;
    background: var(--el-color-primary);
}

.header_right {
    color: var(--el-text-color);
    padding: 3px 10px;
    border-radius: 4px;
    overflow: hidden;
}

.header_right>a {
    width: 100%;
    height: 100%;
    white-space: nowrap;
    cursor: pointer;
    font-size: 12px;
    color: var(--el-text-color);
    text-decoration: none;
}
</style>
