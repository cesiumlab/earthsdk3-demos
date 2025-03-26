
<script setup lang='ts'>
import { computed } from 'vue';

type headListType = {
    icon: any;
    title: string;
    func: () => void;
}[]
const props = withDefaults(defineProps<{ sceneHeadList: headListType, isShowTree: boolean, nameTitle: string }>(), {});
const emits = defineEmits(["changeShowTree"]);

const sign = computed(() => {
    const isShow = props.isShowTree
    if (!isShow) {
        return "＞"
    } else {
        return "∨"
    }
})

const openSceneTree = () => {
    const flag = !props.isShowTree
    emits('changeShowTree', flag)
}

const signStyle = () => {
    return {
        transform: `${sign.value == "＞"
            ? "scaleX(.6)"
            : sign.value == "∨"
                ? "scaleY(.6)"
                : "scale(1)"
            }`,
    };
};

</script>

<template>
    <div class="sign_title" @click.stop="openSceneTree">
        <div class="sign_set_box" style="cursor: pointer">
            <div class="sign" :style="signStyle()">{{ sign }}</div>
            <div class="scence_tree_name">{{ nameTitle }}</div>
        </div>
        <div class="sign_set_box" v-show="sign === '∨'">
            <img v-for="item in sceneHeadList" class="sign_set" :key="item.title" :src="item.icon" :title="item.title"
                @click.stop="item.func()" />
        </div>
    </div>
</template>

<style scoped>
.sign_title {
    width: 100%;
    height: 24px;
    border: 1px solid #004052;
    background: #1a343c;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sign_title:hover {
    border: 1px solid #0383aa;
}

.scence_tree_name {
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}

.sign_title div {
    font-size: 12px;
    color: #fff;
}

.sign {
    width: 18px;
    font-size: 18px !important;
}

.sign_set {
    width: 16px;
    height: 16px;
}

.sign_set_box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.sign_set_box img {
    cursor: pointer;
    user-select: none;
    margin: 0 5px;
    border-radius: 3px;
}

img:hover {
    background-color: #383838;
}
</style>
