
<script setup lang='ts'>
import { ref } from "vue";
interface Props {
    title?: string,
    isTop?:boolean,
}
const props = withDefaults(defineProps<Props>(), {
    title: "设置",
    isTop:false,
})
const developContent = ref(true)
</script>
<template>
    <div class="relative">
        <div class="relative_type" @click.stop="developContent = !developContent" :class="{'relative_type_top':isTop}">
            <span class="relative_type_title">{{ title }}</span>
            <span class="develop_icon" :class="developContent ? '' : 'icon_transform'">
                <es-icon :name="'shouqi'" :color="'#fff'" :size="12" />
            </span>
        </div>
        <es-fold :show="developContent">
            <div class="relative_box" >
                <slot></slot>
            </div>
        </es-fold>
    </div>
</template>

<style scoped>
.relative {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.relative_type {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    background-color: rgba(27, 27, 27, 1);
    color: #fff;
    white-space: nowrap;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing: border-box;
    user-select: none;
    border-top: 1px solid rgba(183, 183, 183, 0.28);
    cursor: pointer;
}
.relative_type_top {
    border-top: none;
}
.relative_box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    /* height: auto; */
}
.relative_box_padding {
    padding-left: 0px;
}
.relative_type_title {
    margin-right: 5px;
    flex: 1;
    overflow: hidden;
}

.develop_icon {
    display: inline-block;
    height: 100%;
    cursor: pointer;
    transition: .5s;
    width: 12px;
}

.icon_transform {
    transform-origin: 50% 45%;
    transform: rotate(-180deg);
}
</style>
