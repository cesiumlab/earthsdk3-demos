<template>
  <el-dialog :model-value="props.show" title="高度抬升" width="600px" :before-close="cancel" @opened="handleOpened"
    class="object-lift-height-dialog">
    <div class="dialog-content">
      <!-- tip -->
      <div class="tip-text">
        <el-icon class="icon">
          <InfoFilled />
        </el-icon>
        <span>当前作用对象共： {{ objNumber }} 个</span>
      </div>

      <!-- 高度改为 xx m 或者 高度累加 xx m-->
      <div class="height-checkbox">
        <label for="" style="margin:0 5px;"> 模式:</label>
        <el-checkbox :model-value="heightFlag" @change="heightFlag = !heightFlag">高度累加</el-checkbox>
        <el-checkbox :model-value="!heightFlag" @change="heightFlag = !heightFlag">高度同步</el-checkbox>
      </div>

      <el-input v-model.number="heightValue" placeholder="请输入抬升高度" ref="numInputRef">
        <template #prepend>{{ '高度' }}</template>
        <template #append>
          <span>m</span>
        </template>
      </el-input>

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
import { ElButton, ElDialog, ElInput, ElIcon, ElCheckbox } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { HeightPropsValue } from '.';

const props = withDefaults(
  defineProps<{
    show: boolean
    objNumber?: number
    resolve: (value: HeightPropsValue | undefined) => void
  }>(),
  {
    show: true,
    objNumber: 1
  }
)

const heightValue = ref(0);

const heightFlag = ref(true);
/** 输入框引用 */
const numInputRef = ref<InstanceType<typeof ElInput>>();
/**
* 对话框打开后的回调，自动聚焦输入框
*/
const handleOpened = () => {
  numInputRef.value?.focus();
};


const cancel = () => {
  props.resolve(undefined)
}
const ok = () => {
  const options = {
    type: heightFlag.value ? 'add' : 'set',
    value: heightValue.value,
  } as HeightPropsValue
  props.resolve(options);
}
</script>

<style scoped lang="scss">
@use './style.scss';
</style>
