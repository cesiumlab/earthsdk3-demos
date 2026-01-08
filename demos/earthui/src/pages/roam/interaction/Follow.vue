<template>
  <PopList :title="'跟踪'">
    <LabelInput v-model="objectId" :label="'对象id'"></LabelInput>
    <LabelInput v-model="pitch" :inputType="'number'" :label="'俯仰角'" :unit="'°'"></LabelInput>
    <LabelInput v-model="heading" :inputType="'number'" :label="'偏航角'" :unit="'°'"></LabelInput>
    <LabelInput
      v-model="distance"
      :inputType="'number'"
      :label="'相机距离'"
      :unit="'m'"
      :min="0"
    ></LabelInput>
    <div class="roam_moveOnLineMode" style="margin-top: 10px">
      <div>
        <label for="">相对姿态</label
        ><span
          class="roam_moveOnLineMode_checke"
          :class="{ roam_moveOnLineMode_checke_active: relativeRotation }"
          @click="relativeRotation = !relativeRotation"
        >
          <es-icon :name="relativeRotation ? 'duigou' : ''" :color="'white'" :size="12" />
        </span>
      </div>
    </div>
  </PopList>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import LabelInput from '../../../components/LabelInput.vue'
import { ElMessage } from 'element-plus'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const emits = defineEmits(['close', 'ok'])
const pitch = ref<number>(-30) //俯仰角
const heading = ref<number>(0) //偏航角
const objectId = ref<string>('') //对象id
const distance = ref<number>(20) //相机距离
const relativeRotation = ref<boolean>(true) //相对姿态

watch([objectId, pitch, heading, distance, relativeRotation], () => {
  if (!objectId.value) {
    ElMessage.warning('请输入对象id')
    return
  }
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return
  viewer.changeToFollow(
    objectId.value,
    distance.value,
    heading.value,
    pitch.value,
    relativeRotation.value
  )
})
onMounted(() => {
  ElMessage.warning('请输入对象id')
  xbsjEarthUi.roamMode = 'Follow'
})
</script>
