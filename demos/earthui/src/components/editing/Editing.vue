<script setup lang="ts">
import { XbsjEarthUi } from "@/scripts/xbsjEarthUi";
import { ESVisualObject, SceneTree } from "earthsdk3";
import { inject, onMounted, ref } from "vue";
const sceneTree = inject('sceneTree') as SceneTree
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const enditingList = ref([
    {
        name: '单点放置编辑',
        icon: 'place',
        type: 'Place',
        allowEditing: false,
    },
    {
        name: '平移编辑',
        icon: 'translation',
        type: 'Translation',
        allowEditing: false
    },
    {
        name: '旋转编辑',
        icon: 'rotation',
        type: 'Rotation',
        allowEditing: false
    },
    {
        name: '缩放编辑',
        icon: 'scale',
        type: 'Scale',
        allowEditing: false
    },
    {
        name: '双点追加编辑',
        icon: 'a-Doublepointsappend',
        type: 'DoublePointsAppend',
        allowEditing: false
    },
    {
        name: '双点修改编辑',
        icon: 'a-Doublepointsmodify',
        type: 'DoublePointsModify',
        allowEditing: false
    },
    {
        name: '折线追加点编辑',
        icon: 'a-Linestringappend',
        type: 'LineStringAppend',
        allowEditing: false
    },
    {
        name: '折线插入点编辑',
        icon: 'a-LinestringInsert',
        type: 'LineStringInsert',
        allowEditing: false
    },
    {
        name: '环形追加点编辑',
        icon: 'a-Circularappend',
        type: 'CircularAppend',
        allowEditing: false
    },
    {
        name: '环形插入点编辑',
        icon: 'a-CircularInsert',
        type: 'CircularInsert',
        allowEditing: false
    },
    {
        name: '散点追加编辑',
        icon: 'a-Scatterappend',
        type: 'ScatterAppend',
        allowEditing: false
    },
    {
        name: '散点修改编辑',
        icon: 'a-Scattermodify',
        type: 'ScatterModify',
        allowEditing: false
    },
    {
        name: '通视追加编辑',
        icon: 'a-visibilityappend',
        type: 'VisibilityAppend',
        allowEditing: false
    },
    {
        name: '通视修改编辑',
        icon: 'a-visibilitymodify',
        type: 'VisibilityModify',
        allowEditing: false
    },
    {
        name: '高度修改编辑',
        icon: 'a-Heightmodify',
        type: 'HeightModify',
        allowEditing: false
    },
    // {
    //     name: '圆形编辑',
    //     icon: 'circle',
    //     type: 'circle',
    //     allowEditing: false
    // }
])
const currentMode = ref('')
onMounted(() => {
    const lastSelectedItem = sceneTree.lastSelectedItem
    if (lastSelectedItem && lastSelectedItem.sceneObject) {
        const sceneObject = lastSelectedItem.sceneObject as ESVisualObject
        const modes = sceneObject.supportEditingModes()
        enditingList.value = enditingList.value.map(item => {
            // 如果当前项的 type 在数组 a 中，则 allowEditing = true，否则保持不变
            return {
                ...item,
                allowEditing: modes.includes(item.type)
            };
        });
    }
})
const checkColor = {
    default: "#FFFFFF",
    checked: "#5788FF",
    indeterminate: "#97999A",
}
const hoverIndex = ref(-1)
const iconColor = (item: any, index: number) => {
    if (item.allowEditing) {
        if (currentMode.value === item.type) {
            return checkColor.checked
        } else if (hoverIndex.value === index) {
            return checkColor.checked
        } else {
            return checkColor.default
        }
    } else {
        return checkColor.indeterminate
    }
}
const changeCurrentMode = (item: any) => {
    currentMode.value = item.type
    const lastSelectedItem = sceneTree.lastSelectedItem
    if (lastSelectedItem && lastSelectedItem.sceneObject) {
        const sceneObject = lastSelectedItem.sceneObject as ESVisualObject
        const viewer=xbsjEarthUi.activeViewer
        if(viewer){
            viewer.startEditing(sceneObject, [item.type])
        }
    }
}
</script>
<template>
    <div class="table">
        <div class="row">
            <div class="cell" v-for="(item, index) in enditingList" :key="item.name" :title="item.name"
                @click="changeCurrentMode(item)" @mouseenter="hoverIndex = index" @mouseleave="hoverIndex = -1"
                :class="{ 'disabled-element': !item.allowEditing }"><es-icon :name="item.icon"
                    :color="iconColor(item, index)" :size="16" />
                <div class="short-border" v-if="index !== 7"></div>
            </div>
        </div>

    </div>
</template>
<style scoped>
.table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* border: 1px solid #5a5a5aa3; */
    box-sizing: border-box;
}

.row {
    width: 100%;
    height: 50%;
    display: flex;
    flex-wrap: wrap;
}

.cell {
    width: 12.5%;
    height: 100%;
    /* border-right: 1px solid #5a5a5aa3; */
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
}

.short-border {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 30%;
    width: 1px;
    background-color: #a4a4a4c3;
}

.disabled-element {
    pointer-events: none !important;
    cursor: not-allowed !important;
}
</style>