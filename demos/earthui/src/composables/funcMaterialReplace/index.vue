<template>
    <!-- 材质替换编辑器 -->
    <el-dialog v-model="dialogVisible" :title="`材质替换编辑器`" width="800px" :modal="false" draggable
        :before-close="handleCancel" destroy-on-close>
        <div class="material">
            <div class="footer">
                <div class="footer-left">
                    <el-select v-model="batchSelectedMaterial" placeholder="批量替换材质" clearable filterable allow-create
                        @change="handleBatchReplace" style="width: 300px" :size="'default'">
                        <template #prefix>
                            <el-checkbox style="margin-left: 5px;" v-model="isSelectAll"
                                :indeterminate="isIndeterminate" @click.stop />
                            <span class="record-count">已选{{ selectedCount }}条 / 共{{ internalMaterialList.length
                            }}条</span>
                        </template>
                        <el-option v-for="material in props.ueMaterialList" :key="material" :label="material"
                            :value="material" />
                    </el-select>
                </div>
                <div class="footer-right">
                    <el-button @click="importJsonFile">导入</el-button>
                    <el-button @click="exportJsonFile">导出</el-button>
                    <el-button @click="clearAll">清空</el-button>
                </div>
            </div>

            <div class="middle">
                <div class="middle_title">
                    <span>选择</span>
                    <span>材质名称</span>
                    <span>材质列表</span>
                </div>
                <div class="middle_content">
                    <div v-for="(item, index) in internalMaterialList" :key="index" class="material-item">
                        <el-checkbox v-model="item.select" />
                        <span class="material-name">{{ item.key }}</span>
                        <el-select v-model="item.value" placeholder="搜索或选择材质" clearable filterable allow-create>
                            <el-option v-for="material in props.ueMaterialList" :key="material" :label="material"
                                :value="material" />
                        </el-select>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleOk">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { downloadJson, selectLocalFiles } from '@/utils';
import { ElButton, ElCheckbox, ElDialog, ElMessage, ElOption, ElSelect } from 'element-plus';
import { computed, onMounted, ref, watch } from 'vue';

/** 材质项类型定义 */
type MaterialItem = {
    key: string;
    value: string | undefined;
    select: boolean;
};

/** 组件属性定义 */
const props = withDefaults(
    defineProps<{
        /** 是否显示对话框 */
        show: boolean;
        /** 材质列表 */
        materialList: MaterialItem[];
        /** UE材质列表 */
        ueMaterialList: string[];
        /** 确认回调函数 */
        resolve: (result?: Record<string, string | undefined>) => void;
    }>(),
    {
        materialList: () => [],
        ueMaterialList: () => []
    }
);

/** 对话框显示状态（用于 v-model） */
const dialogVisible = computed({
    get: () => props.show,
    set: (val) => {
        if (!val) {
            handleCancel();
        }
    }
});

/** 内部材质列表（深拷贝，避免直接修改 props） */
const internalMaterialList = ref<MaterialItem[]>([]);

/** 原始材质列表（用于取消时恢复） */
const originalMaterialList = ref<MaterialItem[]>([]);

/** 是否全选 */
const isSelectAll = ref(false);
/** 是否部分选中（半选状态） */
const isIndeterminate = ref(false);
/** 批量选择的材质 */
const batchSelectedMaterial = ref<string | undefined>(undefined);

/**
 * 计算选中的材质数量
 */
const selectedCount = computed(() => {
    return internalMaterialList.value.filter((item: MaterialItem) => item.select).length;
});

/**
 * 监听选中数量变化，更新全选和半选状态
 */
watch(selectedCount, (count) => {
    const total = internalMaterialList.value.length;
    if (count === 0) {
        isSelectAll.value = false;
        isIndeterminate.value = false;
    } else if (count === total) {
        isSelectAll.value = true;
        isIndeterminate.value = false;
    } else {
        isSelectAll.value = false;
        isIndeterminate.value = true;
    }
});

/**
 * 监听全选状态变化
 */
watch(isSelectAll, (newValue) => {
    internalMaterialList.value.forEach((item: MaterialItem) => { item.select = newValue; });
});

onMounted(() => { initData(); })

/**
 * 初始化数据
 * 深拷贝 MaterialItem 对象数组
 */
const initData = () => {
    // 深拷贝 MaterialItem[]
    internalMaterialList.value = JSON.parse(JSON.stringify(props.materialList));
    originalMaterialList.value = JSON.parse(JSON.stringify(props.materialList));
    isSelectAll.value = false;
    isIndeterminate.value = false;
    batchSelectedMaterial.value = undefined;
};

/**
 * 将材质列表转换为对象格式
 * @param list - 材质列表
 * @returns 材质映射对象
 */
const convertListToObject = (list: MaterialItem[]) => {
    return list.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {} as Record<string, string | undefined>);
};

/**
 * 处理取消操作
 */
const handleCancel = () => {
    // 返回 undefined 表示取消
    props.resolve(undefined);
};

/**
 * 处理确认操作
 * 将 MaterialItem[] 转换为 Record<string, string | undefined> 后返回
 */
const handleOk = () => {
    // 将材质列表转换为对象格式后返回
    const result = convertListToObject(internalMaterialList.value);
    props.resolve(result);
};

/**
 * 处理批量替换
 * @param value - 选择的材质值
 */
const handleBatchReplace = (value: string | undefined) => {
    if (!value) return;
    // 批量替换选中的材质
    let count = 0;
    internalMaterialList.value.forEach((item: MaterialItem) => {
        if (item.select) {
            item.value = value;
            count++;
        }
    });
    // 清空选择
    batchSelectedMaterial.value = undefined;
};

/**
 * 一键清空所有材质
 */
const clearAll = () => {
    internalMaterialList.value.forEach((item: MaterialItem) => { item.value = undefined; });
};

/**
 * 导入JSON文件
 */
const importJsonFile = async () => {
    try {
        const files = await selectLocalFiles({ accept: '.json', multiple: false });
        const result = await Promise.all(
            files.map(async file => ({
                file,
                content: await file.text() // 读取文本内容
            }))
        );
        const json = JSON.parse(result[0].content);

        // 更新列表
        internalMaterialList.value.forEach((item) => { item.value = json[item.key]; });

        ElMessage.success('导入成功！');
    } catch (error) {
        console.error(error);
        ElMessage.error(`导入失败`);
    }
};

/**
 * 导出JSON文件
 */
const exportJsonFile = async () => {
    const jsonStr = JSON.stringify(convertListToObject(internalMaterialList.value), null, 2);
    downloadJson(jsonStr, 'materialOverrideMap.json', true);
};
</script>

<style scoped lang="scss">
@use './style.scss';
</style>
