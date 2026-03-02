<script setup lang="ts">
import { $g_objm } from '@/global';
import { ESJEditingMode, ESVisualObject, SceneTree } from 'earthsdk3';
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { ElTooltip } from 'element-plus';

/** 编辑项类型定义 */
interface EditingItem {
  name: string;
  icon: string;
  type: ESJEditingMode;
  allowEditing: boolean;
}

/** 注入场景树实例 */
const sceneTree = inject('sceneTree') as SceneTree;
/** 注入 EarthUI 实例 */
const xbsjEarthUi = $g_objm();

/** 编辑模式列表配置 */
const enditingList = ref<EditingItem[]>([
  {
    name: '单点放置编辑',
    icon: 'place',
    type: ESJEditingMode.Place,
    allowEditing: false
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
  }
]);

/** 当前激活的编辑模式 */
const currentMode = ref<ESJEditingMode | ''>('');

/** 计算属性：只返回当前支持的编辑模式 */
const supportedEditingList = computed(() => {
  return enditingList.value.filter(item => item.allowEditing);
});

/** 事件监听器清理函数集合 */
let disposeEditingEvent: (() => void) | undefined;
let disposeViewerChanged: (() => void) | undefined;
let disposeSelectionChanged: (() => void) | undefined;

/**
 * 注册编辑结束事件监听
 * 当编辑操作结束时，清空当前模式
 */
const registerEditingEndEvent = () => {
  // 清理旧的监听器
  if (disposeEditingEvent) {
    disposeEditingEvent();
  }

  // 注册新的监听器
  disposeEditingEvent = xbsjEarthUi.activeViewer?.editingEvent.don(
    (val) => {
      if (val?.type === 'end') {
        currentMode.value = '';
      }
    }
  );
};

/**
 * 更新编辑按钮的可用状态
 * @param selectedObject - 选中的可视化对象
 */
const updateEditingAvailability = (selectedObject: ESVisualObject | null) => {
  if (!selectedObject) {
    // 没有选中对象，禁用所有按钮
    enditingList.value.forEach(item => {
      item.allowEditing = false;
    });
    xbsjEarthUi.activeViewer?.stopEditing();
    return;
  }

  // 获取对象支持的编辑模式（只调用一次）
  const supportedModes = selectedObject.supportEditingModes();

  // 更新每个按钮的可用状态
  enditingList.value.forEach(item => {
    item.allowEditing = supportedModes.includes(item.type);
  });
};


/**
 * 切换编辑模式
 * @param item - 编辑项
 */
const changeCurrentMode = (item: EditingItem) => {
  // 如果已经是当前模式，不做处理
  if (currentMode.value === item.type) {
    return;
  }

  const sceneObject = sceneTree.lastSelectedItem?.sceneObject as ESVisualObject;
  if (!sceneObject) {
    return;
  }

  // 延迟设置当前模式，避免与编辑结束事件冲突
  setTimeout(() => {
    currentMode.value = item.type;
  }, 100);


  const multiSelect = sceneTree.selectedItems.length > 1;
  if (multiSelect) {
    const sceneObjects = [...sceneTree.selectedItems].map(item => item.sceneObject as ESVisualObject);
    const sceneObjectList = sceneObjects.filter(item => item.supportEditingModes().includes(ESJEditingMode.Translation));
    xbsjEarthUi.activeViewer?.moveObjects(sceneObjectList);
  } else {
    // 启动编辑模式
    xbsjEarthUi.activeViewer?.startEditing(sceneObject, [item.type]);
  }
};

/** 组件挂载时初始化 */
onMounted(() => {
  // 注册编辑结束事件
  registerEditingEndEvent();

  // 监听活动视图变化
  disposeViewerChanged = xbsjEarthUi.activeViewerChanged.don(() => {
    registerEditingEndEvent();
  });

  // 监听场景树选中项变化
  if (sceneTree) {
    disposeSelectionChanged = xbsjEarthUi.d(
      sceneTree.selectedItems.changedEvent.don((selectedItems) => {
        const [lastSelectedItem] = [...selectedItems];

        // 检查是否只选中了一个可视化对象
        const isValidSelection =
          selectedItems.length === 1 &&
          lastSelectedItem?.sceneObject &&
          lastSelectedItem.sceneObject instanceof ESVisualObject;


        //多选对象时
        const multiSelect = selectedItems.length > 1;
        if (multiSelect) {
          enditingList.value.forEach(item => {
            item.allowEditing = (item.type === ESJEditingMode.Translation);
          });
          return
        }

        // 更新按钮可用状态
        updateEditingAvailability(
          isValidSelection ? (lastSelectedItem.sceneObject as ESVisualObject) : null
        );
      })
    );

    // 初始化时检查是否已有选中对象
    const selectedItems = sceneTree.selectedItems;
    if (selectedItems.length === 1) {
      const lastSelectedItem = sceneTree.lastSelectedItem;
      if (lastSelectedItem?.sceneObject && lastSelectedItem.sceneObject instanceof ESVisualObject) {
        updateEditingAvailability(lastSelectedItem.sceneObject as ESVisualObject);
      }
    }

    //多选对象时
    const multiSelect = selectedItems.length > 1;
    if (multiSelect) {
      enditingList.value.forEach(item => {
        item.allowEditing = (item.type === ESJEditingMode.Translation);
      });
      return
    }
  }
});

/** 组件卸载前清理资源 */
onBeforeUnmount(() => {
  // 停止编辑
  xbsjEarthUi.activeViewer?.stopEditing();

  // 清理所有事件监听器
  if (disposeEditingEvent) {
    disposeEditingEvent();
  }
  if (disposeViewerChanged) {
    disposeViewerChanged();
  }
  if (disposeSelectionChanged) {
    disposeSelectionChanged();
  }
});
</script>
<template>
  <div class="table" :key="supportedEditingList.length">
    <template v-if="supportedEditingList.length > 0" v-for="(item) in supportedEditingList">
      <el-tooltip :content="item.name" placement="top" effect="light">
        <div class="cell" :title="item.name" @click="changeCurrentMode(item)">
          <es-icon :name="item.icon" />
        </div>
      </el-tooltip>
    </template>
    <div v-else class="empty-tip">请选择可编辑的图层</div>
  </div>
</template>
<style scoped>
.table {
  display: flex;
  justify-content: flex-start;
  gap: 0 5px;
  align-items: center;
  box-sizing: content-box;
  margin: 0 10px;
  height: 30px;
}

.cell {
  width: 30px;
  height: 30px;
  font-size: 12px;
  border-radius: 50%;
  line-height: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.cell:hover {
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-8);
}


.empty-tip {
  width: 100%;
  height: 24px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--el-text-color-regular);
  user-select: none;
}
</style>
