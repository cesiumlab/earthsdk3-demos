<script setup lang="ts">
import { ESVisualObject, SceneTree } from "earthsdk3";
import { inject, onMounted } from "vue";
const sceneTree = inject('sceneTree') as SceneTree
const enditingList1 = [
    {
        name: '单点放置编辑',
        icon: 'aa',
        type: 'place',
        allowEditing: false
    },
    {
        name: '平移编辑',
        icon: 'aa',
        type: 'translation',
        allowEditing: false
    },
    {
        name: '旋转编辑',
        icon: 'aa',
        type: 'rotation',
        allowEditing: false
    },
    {
        name: '缩放编辑',
        icon: 'aa',
        type: 'scale',
        allowEditing: false
    },
    {
        name: '双点追加编辑',
        icon: 'aa',
        type: 'DoublePointsAppend',
        allowEditing: false
    },
    {
        name: '双点修改编辑',
        icon: 'aa',
        type: 'DoublePointsModify',
        allowEditing: false
    },
    {
        name: '折线追加点编辑',
        icon: 'aa',
        type: 'LinestringAppend',
        allowEditing: false
    },
    {
        name: '折线插入点编辑',
        icon: 'aa',
        type: 'LinestringInsert',
        allowEditing: false
    }
]
const enditingList2 = [
    {
        name: '环形追加点编辑',
        icon: 'aa',
        type: 'CircularAppend',
        allowEditing: false
    },
    {
        name: '环形插入点编辑',
        icon: 'aa',
        type: 'CircularInsert',
        allowEditing: false
    },
    {
        name: '散点追加编辑',
        icon: 'aa',
        type: 'ScatterAppend',
        allowEditing: false
    },
    {
        name: '散点修改编辑',
        icon: 'aa',
        type: 'ScatterModify',
        allowEditing: false
    },
    {
        name: '通视追加编辑',
        icon: 'aa',
        type: 'visibilityAppend',
        allowEditing: false
    },
    {
        name: '通视修改编辑',
        icon: 'aa',
        type: 'visibilityModify',
        allowEditing: false
    },
    {
        name: '高度修改编辑',
        icon: 'aa',
        type: 'HeightModify',
        allowEditing: false
    },
    {
        name: '圆形编辑',
        icon: 'aa',
        type: 'circle',
        allowEditing: false
    }
]
onMounted(() => {
    const lastSelectedItem = sceneTree.lastSelectedItem
    if (lastSelectedItem && lastSelectedItem.sceneObject) {
        const sceneObject = lastSelectedItem.sceneObject as ESVisualObject
        const modes = sceneObject.supportEditingModes()
    }
})
</script>
<template>
    <div class="table">
        <div class="row">
            <div class="cell" v-for="(item, index) in enditingList1" :key="item.name" :title="item.name">{{ index }}
            </div>
        </div>
        <div class="row">
            <div class="cell" v-for="(item, index) in enditingList2" :key="item.name" :title="item.name">{{ index }}
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
    border: 1px solid #5a5a5aa3;
    box-sizing: border-box;
}

.row {
    width: 100%;
    height: 50%;
    display: flex;
}

.cell {
    flex: 1;
    height: 100%;
    border-right: 1px solid #5a5a5aa3;
    border-bottom: 1px solid #5a5a5aa3;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 去掉最后一列和最后一行的边框 */
.row:last-child .cell {
    border-bottom: none;
    /* 去掉最后一行的下边框 */
}

.cell:last-child {
    border-right: none;
    /* 去掉最后一列的右边框 */
}
</style>