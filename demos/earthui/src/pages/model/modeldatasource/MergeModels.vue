<template>
  <DraggablePopup2 :title="'3dtiles服务合并工具'" :width="800" :height="'400px'" :left="300" :top="100" @close="close">
    <div class="mergemodel">
      <div class="mergemodel_top">
        <div class="mergemodel_list">
          <div class="mergemodel_list_head">
            <div class="mergemodel_list_head_index">序号</div>
            <div class="mergemodel_list_head_url">服务地址</div>
            <div class="mergemodel_list_head_change">
              <span style="cursor: pointer" @click.stop="addModelUrl" title="添加服务地址" @mouseenter="hoverliIndex = true"
                @mouseleave="hoverliIndex = false"><es-icon :name="'tianjia'" :color="hoverliIndex ? '#fff' : '#575B66'"
                  :size="13" /></span>
            </div>
          </div>
          <div class="mergemodel_list_data">
            <div class="mergemodel_list_data_input" v-for="(item, index) in modelListsData">
              <div class="mergemodel_list_head_index">{{ index + 1 }}</div>
              <div class="mergemodel_list_head_url">
                <input type="text" :value="item" @input="changeValue($event, index)" />
              </div>

              <div class="mergemodel_list_head_change">
                <span style="cursor: pointer" @click.stop="deleteModelUrl(index)" title="删除服务地址"
                  @mouseenter="hoverlideleteIndex = index" @mouseleave="hoverlideleteIndex = -2"><es-icon
                    :name="'shanchu_2'" :color="hoverlideleteIndex === index ? '#fff' : '#575B66'" :size="13" /></span>
              </div>
              <div class="mergemodel_list_head_tip" :title="getTipMessage(index)">
                {{ getTipMessage(index) }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <ESEditor :language="'json'" :readonly="false" @load="loadIframe" ref="editorContainer">
          </ESEditor>
        </div>
      </div>
      <div class="mergemodel_bottom">
        <button @click="generate">生成</button>
        <button @click="copy">复制</button>
        <button @click="download">下载</button>
      </div>
    </div>
  </DraggablePopup2>
</template>
<script setup lang="ts">
import { copyClipboard, downloadJson } from '@/utils'
import { ESEditor, messageBox } from 'earthsdk-ui'
import { merge3dTilesServer } from 'earthsdk3-cesium'
import { ElMessage } from 'element-plus'
import { ref, useTemplateRef } from 'vue'
import DraggablePopup2 from '../../../components/DraggablePopup2.vue'
const emits = defineEmits(['close'])
const close = () => {
  emits('close')
}
const editorContainer = useTemplateRef('editorContainer')
const hoverlideleteIndex = ref(-2)
const hoverliIndex = ref(false)
const modelListsData = ref<any[]>(['', ''])
const tipListsData = ref<any[]>([])
const changeValue = (event: any, index: number) => {
  tipListsData.value = []
  const v = event.target.value
  modelListsData.value[index] = v
}
const addModelUrl = () => {
  tipListsData.value = []
  modelListsData.value.push('')
}
const deleteModelUrl = (index: number) => {
  tipListsData.value = []
  messageBox({ text: '确认删除这一个服务地址吗？' })
    .then(() => {
      modelListsData.value.splice(index, 1)
    })
    .catch((err) => { })
}
const getTipMessage = (index: number) => {
  let info = ''
  tipListsData.value.forEach((item) => {
    if (index === item.index) {
      info = item.message
      return
    }
  })
  return info
}
const generate = () => {
  //生成
  if (modelListsData.value.length < 2) {
    ElMessage.error('请填入至少两个服务地址')
    return
  }
  let a = 0
  modelListsData.value.forEach((item) => {
    if (item === '') {
      a++
    }
  })
  if (a > 0) {
    ElMessage.error('服务地址不能为空')
    return
  }
  merge3dTilesServer(modelListsData.value)
    .then((res) => {
      if (res.state === 'success') {
        if (res.tilesUrl) {
          tipListsData.value = []
          ElMessage.success('生成成功')
          editorContainer.value?.setVal(JSON.stringify(res.tilesUrl, undefined, '    '))
        }
      } else {
        if (res.info) {
          tipListsData.value = res.info
        }
        if (res.tilesUrl) {
          editorContainer.value?.setVal(JSON.stringify(res.tilesUrl, undefined, '    '))
        } else {
          editorContainer.value?.setVal(JSON.stringify('', undefined, '    '))
        }
        ElMessage.error('存在错误服务，请检查')
        return
      }
    })
    .catch((error) => {
      ElMessage.error(error)
      console.log('error', error)
    })
}
const copy = async () => {
  const str = editorContainer.value?.getVal()
  if (str) {
    const flag = await copyClipboard(str);
    if (flag) {
      ElMessage.success('复制成功')
    } else {
      ElMessage.warning('复制异常,请检查浏览器环境或手动复制')
    }
  }
}
const download = () => {
  //下载
  try {
    const str = editorContainer.value?.getVal() as any
    const json = JSON.parse(str)
    downloadJson(json, 'tileset.json', true)
  } catch (error) {
    console.log('JSON格式错误!!!', error)
  }
}
//json编辑器初始化
const loadIframe = () => {
  editorContainer.value?.setVal(JSON.stringify('', undefined, '    '))
}
</script>
