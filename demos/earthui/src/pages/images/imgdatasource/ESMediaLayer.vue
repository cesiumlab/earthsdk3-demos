<template>
    <PopList :title="'媒体图层'" :showLeftButton="true" :showButton="true" @close="emits('close')" @ok="addSceneObjects">
        <div class="media_content">
            <div class="media_item">
                <label>服务地址</label>
                <el-input v-model="serveUrl" type="textarea" size="small" :rows="5" style="flex: 1;"
                    placeholder="支持 video,img,flv,hls 等媒体格式"></el-input>
            </div>
            <div class="media_item">
                <label>数据类型</label>
                <el-select v-model="mediaType" :size="'small'" style="flex: 1;" placeholder="请选择数据类型">
                    <el-option label="视频" value="video"></el-option>
                    <el-option label="图片" value="img"></el-option>
                    <el-option label="FLV" value="flv"></el-option>
                    <el-option label="HLS" value="hls"></el-option>
                </el-select>
            </div>
            <div class="media_item">
                <label>范围</label>
                <div class="media_item_range_container">
                    <div class="media_item_range">
                        <el-input v-model.number="latLng[0]" :size="'small'" placeholder="最小经度">
                            <template #suffix>
                                <span>°</span>
                            </template>
                            <template #prefix>
                                <span>W</span>
                            </template>
                        </el-input>
                        <el-input v-model.number="latLng[1]" flex-grow="1" :size="'small'" placeholder="最小纬度">
                            <template #suffix>
                                <span>°</span>
                            </template>
                            <template #prefix>
                                <span>S</span>
                            </template>
                        </el-input>
                    </div>
                    <div class="media_item_range">
                        <el-input v-model.number="latLng[2]" flex-grow="1" :size="'small'" placeholder="最大经度">
                            <template #suffix>
                                <span>°</span>
                            </template>
                            <template #prefix>
                                <span>E</span>
                            </template>
                        </el-input>
                        <el-input v-model.number="latLng[3]" flex-grow="1" :size="'small'" placeholder="最大纬度">
                            <template #suffix>
                                <span>°</span>
                            </template>
                            <template #prefix>
                                <span>N</span>
                            </template>
                        </el-input>
                    </div>
                </div>


            </div>
        </div>
    </PopList>
</template>
<script setup lang="ts">
import { ESJVector4D, ESMediaLayer, SceneTree } from 'earthsdk3'
import { ElInput, ElMessage, ElOption, ElSelect } from 'element-plus'
import { inject, ref } from 'vue'
import PopList from '../../../components/PopList.vue'
import { getsceneObjNumfromSceneTree, searchMaxZindex } from '../../../scripts/general'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'

const sceneTree = inject('sceneTree') as SceneTree
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const serveUrl = ref('https://arcgis.github.io/arcgis-samples-javascript/sample-data/media-layer/videos/hurricanes_aerosol-aug.mp4')

const latLng = ref<ESJVector4D>([73, 3, 135, 53]);

const emits = defineEmits(['close']);

const mediaType = ref('video');

//增加影像
const addSceneObjects = () => {
    if (!serveUrl.value) ElMessage.error('请输入地址');
    let maxZindex = searchMaxZindex(sceneTree, 'ESMediaLayer')
    if (serveUrl.value) {
        const currentTreeItem = sceneTree.lastSelectedItem
        let newTreeItem
        if (!currentTreeItem) {
            newTreeItem = sceneTree.createSceneObjectTreeItem('ESMediaLayer')
        } else if (currentTreeItem?.type === 'Folder') {
            newTreeItem = sceneTree.createSceneObjectTreeItem(
                'ESMediaLayer',
                undefined,
                currentTreeItem,
                'Inner'
            )
        } else {
            newTreeItem = sceneTree.createSceneObjectTreeItem(
                'ESMediaLayer',
                undefined,
                currentTreeItem,
                'After'
            )
        }
        if (!newTreeItem) return
        sceneTree.uiTree.clearAllSelectedItems()
        newTreeItem.uiTreeObject.selected = true
        if (!newTreeItem.sceneObject) return
        if (newTreeItem.sceneObject.typeName !== 'ESMediaLayer') return
        const sceneObject = newTreeItem.sceneObject as unknown as ESMediaLayer
        xbsjEarthUi.propSceneTree = newTreeItem
        const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESMediaLayer');
        newTreeItem.name = ('媒体图层') + objNum;
        sceneObject.url = serveUrl.value;
        sceneObject.zIndex = maxZindex + 1;
        sceneObject.rectangle = latLng.value;
        sceneObject.videoStreamType = mediaType.value;
        emits('close')
    }
}
</script>

<style scoped>
.media_content {
    display: flex;
    flex-direction: column;
    gap: 10px;

}

.media_item label {
    width: 80px;
    font-size: 12px;
}

.media_item {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.media_item_range_container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
}

.media_item_range {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 8px;
}
</style>
