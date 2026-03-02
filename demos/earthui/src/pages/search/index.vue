<script setup lang="ts">
import { gget } from '@/api'
import { $g_config, $g_objm } from '@/global'
import { Jiahao, Search } from 'earthsdk-icon'
import { ESPoi2D } from 'earthsdk3'
import { ElInput, ElMessage } from 'element-plus'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { createSceneObjTreeItemFromJson } from '../plotting/esObj/fun'
import { getUuid } from '@/utils'

const xbsjEarthUi = $g_objm();
const { locationKeywordsQuery } = $g_config().requestUrls; // 搜索接口地址
const locationKeywords = ref('')
const searchList = ref<any[]>([])
const liActive = ref(-1)
let sceneObject: ESPoi2D | undefined

// 判断是否全是空格
function isAllSpaces(input: string) {
  return /^\s*$/.test(input)
}

// 搜索功能
const search = async () => {
  const keyword = locationKeywords.value?.trim()
  if (!keyword || isAllSpaces(keyword)) {
    ElMessage.warning('请输入搜索内容')
    return
  }

  liActive.value = -1
  const url = locationKeywordsQuery.replace('{keywords}', encodeURIComponent(keyword))
  try {
    const res: any = await gget(url);
    if (res.pois && res.pois.length > 0) {
      searchList.value = res.pois
    } else {
      searchList.value = []
      ElMessage.info('未检索到相关信息')
    }
  } catch (error) {
    console.error('搜索失败:', error)
    ElMessage.error('搜索失败，请稍后重试')
    searchList.value = []
  }
}

// 飞到指定位置
const flyToLocation = (item: any, index: number) => {
  if (!item.location) {
    ElMessage.warning('该地点没有位置信息')
    return
  }

  liActive.value = index;

  try {
    const [lng, lat] = item.location.split(',').map((v: string) => Number(v.trim()))

    if (isNaN(lng) || isNaN(lat)) {
      ElMessage.error('位置信息格式错误')
      return
    }

    if (sceneObject) {
      sceneObject.name = item.name || '未命名地点'
      sceneObject.show = true
      sceneObject.position = [lng, lat, 0]

      setTimeout(() => {
        sceneObject?.flyTo()
      }, 100)
    }
  } catch (error) {
    console.error('飞行失败:', error)
    ElMessage.error('定位失败')
  }
}

// 添加到场景树
const addToSceneTree = () => {
  if (!sceneObject || !sceneObject.show) {
    ElMessage.warning('请先选择搜索结果')
    return
  }

  try {
    const json = sceneObject.json as any
    createSceneObjTreeItemFromJson(xbsjEarthUi, { ...json, id: getUuid() });
    ElMessage.success(`已添加 ${sceneObject.name}`)
  } catch (error) {
    console.error('添加失败:', error)
    ElMessage.error('添加到场景树失败')
  }
}

// 清空搜索
const clearSearch = () => {
  locationKeywords.value = ''
  searchList.value = []
  liActive.value = -1
  sceneObject && (sceneObject.show = false);
}

// 监听输入框变化
watch(locationKeywords, (newVal) => {
  if (!newVal || isAllSpaces(newVal)) {
    searchList.value = []
    liActive.value = -1
    if (sceneObject) {
      sceneObject.show = false
    }
  }
})

onMounted(() => {
  sceneObject = xbsjEarthUi.createSceneObject('ESPoi2D') as ESPoi2D
  sceneObject.show = false
  sceneObject.mode = 'CircularH02'
})

onBeforeUnmount(() => {
  if (sceneObject) {
    xbsjEarthUi.destroySceneObject(sceneObject)
    sceneObject = undefined
  }
})
</script>

<template>
  <div class="sub_content">
    <el-input :prefix-icon="Search" v-model="locationKeywords" placeholder="搜索地点" clearable @keydown.enter="search"
      @clear="clearSearch" />

    <div class="location_list" v-if="searchList.length > 0">
      <div class="location_item" v-for="(item, index) in searchList" :key="item.id || index"
        @click="flyToLocation(item, index)" :class="{ active: liActive === index }">
        <img class="location_icon" draggable="false" src="../../assets/search/location.png" alt="位置图标" />
        <div class="location_info">
          <div class="location_name">{{ item.name }}</div>
          <div class="location_address">{{ item.address || '暂无地址信息' }}</div>
        </div>
        <div v-if="liActive === index" class="location_add" title="添加到场景树" @click.stop="addToSceneTree()">
          <Jiahao />
        </div>
      </div>
    </div>

    <div v-else class="no_search_info">
      暂无信息
    </div>
  </div>
</template>

<style scoped lang="scss">
.sub_content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}

.location_list {
  width: 100%;
  height: calc(100% - 42px);
  overflow-y: auto;
  margin-top: 10px;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar {
    width: 3px;
    background-color: var(--el-bg-color);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--el-border-color);
    border-radius: 2px;
  }
}

.location_item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.location_item:hover {
  background-color: var(--el-color-primary-light-8);
}

.location_item.active {
  background-color: var(--el-color-primary-light-8);
}

.location_icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  flex-shrink: 0;
  pointer-events: none;
}

.location_info {
  flex: 1;
  min-width: 0;
}

.location_name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.location_address {
  font-size: 12px;
  color: #909399;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.location_add {
  width: 30px;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.3s;

  &:hover {
    color: var(--el-color-primary);
  }
}

.no_search_info {
  text-align: center;
  color: #909399;
  font-size: 14px;
  margin-top: 40px;
  pointer-events: none;
}
</style>
