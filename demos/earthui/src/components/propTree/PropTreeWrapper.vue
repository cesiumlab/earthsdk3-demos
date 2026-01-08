<template>
  <div class="prop-tree-wrapper">
    <Expand :dragEnableX="false" :showResize="sign == '∨'">
      <div
        class="sign_title"
        @mouseenter="sign == '∨' ? (showSet = true) : (showSet = false)"
        @mouseleave="showSet = false"
        @click.stop="openDiv"
      >
        <div class="sign_set_box" style="cursor: pointer">
          <div class="sign" :style="signStyle()">{{ sign }}</div>
          <div class="scence_tree_name">{{ props.nameTitle }}</div>
        </div>
        <div class="sign_set_box" v-show="showSet">
          <img
            class="sign_set"
            src="../img/select.png"
            alt=""
            title="复选"
            @click.stop="showCheckBox = !showCheckBox"
          />
          <img
            class="sign_set"
            src="../img/fold.png"
            alt=""
            title="折叠"
            @click.stop="propTree.uiTree.collapseAll()"
          />
        </div>
      </div>
      <div
        v-if="sign == '∨'"
        @mouseenter="showSet = true"
        @mouseleave="showSet = false"
        class="prop-tree-comp"
      >
        <PropTreeCom
          :propTree="propTree"
          :showCheckBox="showCheckBox"
          @callback="callback"
        ></PropTreeCom>
      </div>
    </Expand>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { GroupPropTreeItem, LeafPropTreeItem, PropTree } from 'earthsdk3'
import Expand from '../commom/Expand.vue'
import PropTreeCom from './PropTree.vue'
import { PropertyCompCallbackFuncParamsType } from '../eSPropPanel/propertiesMenu/commons'

const props = withDefaults(
  defineProps<{
    propTree: PropTree
    nameTitle: string
  }>(),
  {
    nameTitle: '属性管理器'
  }
)
const emits = defineEmits<{
  (
    e: 'callback',
    params: PropertyCompCallbackFuncParamsType & {
      treeItem: GroupPropTreeItem | LeafPropTreeItem
      propTree: PropTree
    }
  ): any
}>()

const { propTree } = props

const callback = (
  params: PropertyCompCallbackFuncParamsType & {
    treeItem: GroupPropTreeItem | LeafPropTreeItem
    propTree: PropTree
  }
): any => {
  emits('callback', params)
}

const showSet = ref(false)
const showCheckBox = ref(false)
const sign = ref('∨')
const openDiv = () => {
  if (sign.value == '＞') {
    sign.value = '∨'
    showSet.value = true
  } else {
    showSet.value = false
    sign.value = '＞'
  }
}
const signStyle = () => {
  return {
    transform: `${
      sign.value == '＞' ? 'scaleX(.6)' : sign.value == '∨' ? 'scaleY(.6)' : 'scale(1)'
    }`
  }
}
</script>

<style scoped>
.prop-tree-wrapper {
  height: 100%;
  /* min-width: 260px; */
  /* background: rgba(71, 71, 71, 0.8); */
}

.prop-tree-comp {
  width: 100%;
  height: calc(100% - 30px);
}

.scence_tree_name {
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sign_title {
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sign_title:hover {
  background: rgba(0, 0, 0, 0.51);
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
  width: 14px;
  height: 14px;
}

.sign_set_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.sign_set_box img {
  cursor: pointer;
  margin: 0 5px;
}
</style>
