<script setup lang="ts">
import { XbsjEarthUi } from "../../scripts/xbsjEarthUi";
import { ESJEditingMode, ESVisualObject, SceneTree } from "earthsdk3";
import { computed, inject, onBeforeMount, onMounted, ref } from "vue";
const sceneTree = inject('sceneTree') as SceneTree
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const enditingList = ref([
    {
        name: '单点放置编辑',
        icon: 'place',
        type: ESJEditingMode.Place,
        allowEditing: false,
    },
    {
        name: '平移编辑',
        icon: 'translation',
        type: ESJEditingMode.Translation,
        allowEditing: false
    },
    {
        name: '旋转编辑',
        icon: 'rotation',
        type: ESJEditingMode.Rotation,
        allowEditing: false
    },
    {
        name: '缩放编辑',
        icon: 'scale',
        type: ESJEditingMode.Scale,
        allowEditing: false
    },
    {
        name: '双点追加编辑',
        icon: 'a-Doublepointsappend',
        type: ESJEditingMode.DoublePointsAppend,
        allowEditing: false
    },
    {
        name: '双点修改编辑',
        icon: 'a-Doublepointsmodify',
        type: ESJEditingMode.DoublePointsModify,
        allowEditing: false
    },
    {
        name: '折线追加点编辑',
        icon: 'a-Linestringappend',
        type: ESJEditingMode.LineStringAppend,
        allowEditing: false
    },
    {
        name: '折线插入点编辑',
        icon: 'a-LinestringInsert',
        type: ESJEditingMode.LineStringInsert,
        allowEditing: false
    },
    {
        name: '环形追加点编辑',
        icon: 'a-Circularappend',
        type: ESJEditingMode.CircularAppend,
        allowEditing: false
    },
    {
        name: '环形插入点编辑',
        icon: 'a-CircularInsert',
        type: ESJEditingMode.CircularInsert,
        allowEditing: false
    },
    {
        name: '散点追加编辑',
        icon: 'a-Scatterappend',
        type: ESJEditingMode.ScatterAppend,
        allowEditing: false
    },
    {
        name: '散点修改编辑',
        icon: 'a-Scattermodify',
        type: ESJEditingMode.ScatterModify,
        allowEditing: false
    },
    {
        name: '通视追加编辑',
        icon: 'a-visibilityappend',
        type: ESJEditingMode.VisibilityAppend,
        allowEditing: false
    },
    {
        name: '通视修改编辑',
        icon: 'a-visibilitymodify',
        type: ESJEditingMode.VisibilityModify,
        allowEditing: false
    },
    {
        name: '高度修改编辑',
        icon: 'a-Heightmodify',
        type: ESJEditingMode.HeightModify,
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
    xbsjEarthUi.activeViewer?.editingEvent.disposableOn((val) => {
        if (val) {
            // console.log(val);

            if (val.type === 'end') {
                currentMode.value = ''
            }

        }
    })

})
const checkColor = {
    default: "#FFFFFF",
    checked: "#5788FF",
    indeterminate: "#525252",
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
    if (currentMode.value === item.type) return
    currentMode.value = ''
    currentMode.value = item.type
    const lastSelectedItem = sceneTree.lastSelectedItem
    if (lastSelectedItem && lastSelectedItem.sceneObject) {
        const sceneObject = lastSelectedItem.sceneObject as ESVisualObject
        const viewer = xbsjEarthUi.activeViewer
        if (viewer) {
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
    background-color: #525252;
}

.disabled-element {
    pointer-events: none !important;
    cursor: not-allowed !important;
}
</style>