<template>
  <el-dialog :model-value="props.show" title="数据服务解析" width="600px" :before-close="cancel" @opened="handleOpened">
    <div class="dialog-content">
      <el-input clearable ref="urlInputRef" v-model="urlRef" placeholder="请输入服务地址" @input="checkType">
        <template #prepend>{{ '服务地址' }}</template>
        <template #append>
          <span style="cursor: pointer;" @click="checkType">解析</span>
        </template>
      </el-input>

      <el-select v-model="typeRef" placeholder="请解析或选择" clearable>
        <template #prefix>
          <span style="padding: 0 15px;"> {{ `服务类型` }}</span>
        </template>
        <el-option v-for="option in typeOptions" :key="option.value" :label="option.label + ` ( ${option.value} ) `"
          :value="option.value" />
      </el-select>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="ok()"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElButton, ElDialog, ElInput, ElMessage, ElOption, ElSelect } from 'element-plus';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    show: boolean,
    resolve: (opt?: { type: string, url: string, name?: string }) => void
  }>(),
  {
    show: true,
  }
)

const typeRef = ref('');
const urlRef = ref('');
/** 输入框引用 */
const urlInputRef = ref<InstanceType<typeof ElInput>>();

/**
 * 服务类型选项列表
 */
const typeOptions = [
  { value: 'ES3DTileset', label: '3DTileset 服务' },
  { value: 'ESTerrainLayer', label: '地形服务' },
  { value: 'ESImageryLayer', label: '影像图层' },
  { value: 'ESMVTLayer', label: '矢量瓦片' },
  { value: 'ESGeoJson', label: 'GeoJSON 数据' },
  { value: 'ESKml', label: 'KML 数据' },
  { value: 'ESCzml', label: 'CZML 数据' },
  { value: 'ESImageLabel', label: '图片' },
  { value: 'ESGltfModel', label: '模型服务' },
];

/**
 * 对话框打开后的回调，自动聚焦输入框
 */
const handleOpened = () => {
  urlInputRef.value?.focus();
};

const checkType = () => {
  if (!urlRef.value) return;
  const lowerUrl = urlRef.value.toLowerCase();
  if (lowerUrl.includes(".gltf") || lowerUrl.includes(".glb")) {
    typeRef.value = "ESGltfModel"
  } else if (lowerUrl.includes("tileset.json")) {
    typeRef.value = "ES3DTileset"
  } else if (lowerUrl.includes("layer.json") || lowerUrl.includes("ion://1")) {
    typeRef.value = "ESTerrainLayer"
  } else if (lowerUrl.includes(".jpg") || lowerUrl.includes(".png") || lowerUrl.includes(".jpeg") || lowerUrl.includes(".webp")
    || lowerUrl.includes("image/jpg") || lowerUrl.includes("image/png") || lowerUrl.includes("image/jpeg") || lowerUrl.includes("image/webp")) {
    typeRef.value = "ESImageLabel"
  } else if (lowerUrl.includes('/tilemapresource.xml') || lowerUrl.includes("ion://") || lowerUrl.includes("wms") || lowerUrl.includes("wmts") || lowerUrl.includes("{x}") || lowerUrl.includes("{y}") || lowerUrl.includes("{z}")) {
    typeRef.value = "ESImageryLayer";
  } else if (lowerUrl.endsWith('.geojson')) {
    typeRef.value = "ESGeoJson";
  } else if (lowerUrl.endsWith('.kml')) {
    typeRef.value = "ESKml";
  } else if (lowerUrl.endsWith('.czml')) {
    typeRef.value = "ESCzml";
  } else if (lowerUrl.includes('.mvt') || lowerUrl.includes('.pbf') || lowerUrl.includes('style.json') || lowerUrl.includes('light.json')) {
    typeRef.value = "ESMVTLayer";
  } else {
    typeRef.value = ''
  }
}

const cancel = () => {
  props.resolve(undefined)
}
const ok = () => {
  if (!typeRef.value || !urlRef.value) {
    ElMessage.warning('参数不能为空！')
    return
  }

  // 如果 urlRef 有引号则去掉
  let cleanUrl = urlRef.value.trim();
  if ((cleanUrl.startsWith('"') && cleanUrl.endsWith('"')) ||
    (cleanUrl.startsWith("'") && cleanUrl.endsWith("'"))) {
    cleanUrl = cleanUrl.slice(1, -1);
  }

  props.resolve({
    type: typeRef.value,
    url: cleanUrl,
    name: typeRef.value + ' 图层'
  })
}
</script>

<style scoped lang="scss">
@use './style.scss';
</style>
