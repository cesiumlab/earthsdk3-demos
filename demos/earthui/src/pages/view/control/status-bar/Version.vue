<template>
  <div class="version_info_list">
    <div v-for="item in versionItems" :key="item.name">
      <span>{{ item.name }}</span>
      <span style="margin: 0 5px">:</span>
      <span>{{ item.version }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getEarthuiVersion } from '@/scripts/earthuiVersion'
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { ESUeViewer } from 'earthsdk3-ue'
import { inject, onMounted, ref, Ref } from 'vue'
// 定义版本项接口
interface VersionItem {
  name: string
  version: string
}

// 注入地球UI实例
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

// 响应式版本数据
const versionItems: Ref<VersionItem[]> = ref([])

/**
 * 从字符串中提取版本信息（针对UE引擎）
 * @param versionStr 包含版本信息的字符串
 * @returns 提取的版本号
 */
function extractUeVersion(versionStr: string): string {
  const parts = versionStr.split('  ')
  return parts[1] || versionStr
}

/**
 * 处理不同类型的版本信息
 * @param versions 原始版本对象
 * @param viewer 当前视图器实例
 * @returns 格式化后的版本数组
 */
function processVersions(versions: any, viewer: any): VersionItem[] {
  const items: VersionItem[] = []

  for (const key in versions) {
    if (versions.hasOwnProperty(key)) {
      try {
        switch (key) {
          case 'esforue':
            // 仅当使用UE视图器时添加UE版本信息
            if (viewer instanceof ESUeViewer) {
              items.push({
                name: key,
                version: extractUeVersion(versions[key])
              })
            }
            break
          case 'cesium':
            // Cesium版本信息
            items.push({
              name: key,
              version: 'version' in versions[key] ? versions[key].version : versions[key]
            })
            break
          default:
            // 其他组件版本信息
            items.push({
              name: key,
              version: versions[key].version || versions[key]
            })
        }
      } catch (error) {
        console.warn(`处理版本信息 ${key} 时出错:`, error)
        // 即使某个版本信息处理失败，也继续处理其他版本信息
        items.push({
          name: key,
          version: 'unknown'
        })
      }
    }
  }

  // 添加EarthUI版本信息
  items.push({
    name: 'earth-ui',
    version: getEarthuiVersion()
  })

  return items
}

/**
 * 获取并设置版本信息
 */
const loadVersions = async (): Promise<void> => {
  try {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) {
      console.warn('未找到活动的视图器实例')
      return
    }

    const versions = await viewer.getVersion()
    if (!versions) {
      console.warn('未能获取到版本信息')
      return
    }

    versionItems.value = processVersions(versions, viewer)
  } catch (error) {
    console.error('获取版本信息时发生错误:', error)
    versionItems.value = [
      {
        name: 'error',
        version: '无法获取版本信息'
      }
    ]
  }
}

// 组件挂载时加载版本信息
onMounted(() => {
  loadVersions()
})
</script>

<style scoped>
.version_info_list {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.version_info_list > div {
  width: 100%;
  height: 25px;
  line-height: 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
