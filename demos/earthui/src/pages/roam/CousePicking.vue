<script setup lang="ts">
import { $g_objm } from '@/global'
import { DraggableDialog, ESColorPicker } from 'earthsdk-ui'
import { ES3DTileset, ESGeoJson, ESJColor, SceneTree } from 'earthsdk3'
import { ElMessage, ElSwitch } from 'element-plus'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import Button from '@/components/Button.vue'
import RightList from '@/components/RightList.vue'
import PopList from '@/components/PopList.vue'

const xbsjEarthUi = $g_objm()
const sceneTree = inject('sceneTree') as SceneTree

// 响应式状态
const mousePick = ref(false)
const checkedColor = ref<ESJColor>([1, 0, 0, 1])
const propertyIsShow = ref(false)
const pickResult = ref({
  type: '拾取信息',
  info: undefined as any
})

// 全局变量
let clickEventDispose: (() => void) | null = null
let selectedSceneObject: ES3DTileset | null = null

// 工具函数
const isAllDigits = (str: any): boolean => {
  return str && !isNaN(str)
}

const formatNumericValue = (value: any): any => {
  return isAllDigits(value) ? Number(value).toFixed(2) : value
}

// 清理点击事件
const destroyClickEvent = () => {
  if (clickEventDispose) {
    clickEventDispose()
    clickEventDispose = null
  }
}

// 重置场景对象样式
const resetSceneObjectStyle = () => {
  if (selectedSceneObject) {
    selectedSceneObject.resetFeatureStyle()
    selectedSceneObject = null
  }
}

// 处理场景树选择
const handleSceneTreeSelection = (sceneObjectId: string) => {
  const treeItem = sceneTree.getTreeItemFromSceneObjId(sceneObjectId)
  if (treeItem) {
    sceneTree.uiTree.clearAllSelectedItems()
    treeItem.uiTreeObject.selected = true
    xbsjEarthUi.propSceneTree = treeItem
  }
}

// 处理 GeoJSON 拾取
const handleGeoJsonPick = (result: any) => {
  if (propertyIsShow.value) return

  const { geojsonPickInfo } = result
  const { properties, geometry } = geojsonPickInfo

  pickResult.value = {
    type: 'GEOJSON 拾取信息',
    info: properties && geometry
      ? { ...properties, ...geometry }
      : { ...geojsonPickInfo }
  }
}

// 处理 3DTileset 拾取
const handle3DTilesetPick = (result: any) => {
  selectedSceneObject = result.sceneObject;
  selectedSceneObject?.resetFeatureStyle();

  const tilesetPickInfo = result.tilesetPickInfo;
  if (!tilesetPickInfo || Object.keys(tilesetPickInfo).length === 0) return;

  // 设置选中颜色
  const { id } = tilesetPickInfo
  if (id) {
    const style = [{ value: id, rgba: checkedColor.value }]
    result.sceneObject.setFeatureColor('id', style)
  } else {
    ElMessage.warning('未在该瓦片的属性表中找到ID字段，无法实现选中着色功能。')
  }

  if (propertyIsShow.value) return;

  // 格式化数值属性
  const formattedInfo = { ...tilesetPickInfo }
  for (const key in formattedInfo) {
    if (key !== 'name' && !key.toLowerCase().includes('id')) {
      formattedInfo[key] = formatNumericValue(formattedInfo[key])
    }
  }

  pickResult.value = {
    type: '3DTileset 拾取信息',
    info: formattedInfo
  }
}

// 处理拾取事件
const handlePickEvent = async (e: any) => {
  const viewer = xbsjEarthUi.activeViewer;
  if (!e.screenPosition || !mousePick.value || !viewer) return;
  const result = await viewer.pick(e.screenPosition)

  console.log('拾取结果:', result)

  if (!result?.sceneObject) return

  // 处理场景树选择
  handleSceneTreeSelection(result.sceneObject.id)

  // 根据对象类型处理拾取
  if (result.geojsonPickInfo && result.sceneObject instanceof ESGeoJson) {
    handleGeoJsonPick(result)
  } else if (result.sceneObject instanceof ES3DTileset) {
    handle3DTilesetPick(result)
  }
}

// 初始化点击事件监听
const initClickEventListener = () => {
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return;

  clickEventDispose = viewer.clickEvent.don(handlePickEvent)
}

// 切换鼠标拾取状态
const changeMousePick = () => {
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return

  viewer.changeToMap()
  xbsjEarthUi.roamMode = 'Map'
  mousePick.value = !mousePick.value

  if (!mousePick.value) {
    resetSceneObjectStyle()
  }
}

// 生命周期钩子
onMounted(() => {
  initClickEventListener()

  const viewerChangedDispose = xbsjEarthUi.activeViewerChanged.disposableOnce(initClickEventListener)

  onBeforeUnmount(() => {
    viewerChangedDispose()
    destroyClickEvent()
    resetSceneObjectStyle()
  })
})
</script>

<template>
  <RightList :title="'鼠标拾取'">
    <Button :name="'shubiaoshiqu'" :content="'鼠标拾取'" :click="changeMousePick" :actived="mousePick"
      :left-button="true" />

    <PopList :title="'鼠标拾取配置'" v-if="mousePick">
      <div class="roam_pick" style="margin-top: 10px">
        <label>3DTileset 选中着色</label>
        <div style="width: 190px">
          <ESColorPicker v-model="checkedColor" :size="'mini'" />
        </div>
      </div>
      <div class="roam_pick" style="margin-top: 10px">
        <label>隐藏属性信息</label>
        <el-switch v-model="propertyIsShow" @click.stop :size="'small'" />
      </div>
    </PopList>
  </RightList>

  <DraggableDialog @close="pickResult.info = undefined" :title="pickResult.type"
    :model-value="pickResult.info && !propertyIsShow" :left-top="[650, 250]" :widthHeight="[600, 400]"
    :minWidthHeight="[600, 400]">
    <div class="bottom-content">
      <div class="bottom" v-for="(value, key) in pickResult.info" :key="key">
        <div class="left-name">{{ key }}</div>
        <div class="right-name">{{ value }}</div>
      </div>
    </div>
  </DraggableDialog>
</template>

<style scoped lang="scss">
.bottom-content {
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 14px;
  box-sizing: border-box;
  overflow: auto;

  >div:last-child {
    border-bottom: var(--el-border);
  }
}

.bottom {
  width: 100%;
  border-top: var(--el-border);
  display: flex;
  line-height: 20px;
  padding: 10px 0;
}

.left-name {
  width: 100px;
  text-align: center;
  padding-right: 10px;
  border-right: var(--el-border);
  color: var(--el-text-color-regular);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.right-name {
  flex: 1;
  text-align: left;
  padding-left: 20px;
  color: var(--el-text-color-regular);
  overflow-wrap: break-word;
  overflow: hidden;
}

.roam_pick {
  label {
    width: 150px;
    color: var(--el-text-color-regular);
  }
}
</style>
