<template>
    <el-dialog :model-value="props.show" title="高度抬升" width="400px" :before-close="cancel"
        class="object-lift-height-dialog">
        <div class="dialog-content">
            <!-- tip -->
            <div class="tip-text">
                <el-icon class="icon">
                    <InfoFilled />
                </el-icon>
                <span>当前作用对象共： {{ objNumber }} 个</span>
            </div>

            <el-input v-model.number="heightValue" placeholder="请输入抬升高度">
                <template #prepend>{{ '高度' }}</template>
                <template #append>
                    <span>m</span>
                </template>
            </el-input>

        </div>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="ok()">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElButton, ElDialog, ElInput, ElIcon } from "element-plus";
import { InfoFilled } from "@element-plus/icons-vue";
import { ref } from "vue";

const props = withDefaults(defineProps<{
    show: boolean,
    objNumber?: number,
    resolve: (value: number | undefined) => void,
}>(), {
    show: true,
    objNumber: 1
});

const heightValue = ref(0);

const cancel = () => { props.resolve(undefined) };
const ok = () => { props.resolve(heightValue.value) };

</script>

<style scoped lang="scss">
@use './style.scss';
</style>
