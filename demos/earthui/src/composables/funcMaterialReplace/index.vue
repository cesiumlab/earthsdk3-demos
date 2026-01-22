<template>
    <!-- 材质替换编辑器 -->
    <el-dialog v-model="dialogVisible" :title="`材质替换编辑器`" width="800px" :modal="false" draggable
        :before-close="handleCancel" destroy-on-close>
        <div class="material">
            <div class="footer">
                <div class="footer-left">
                    <el-checkbox v-model="isSelectAll" />
                    <span class="record-count">共计{{ internalMaterialList.length }}条记录</span>
                </div>
                <div class="footer-right">
                    <el-select v-model="batchSelectedMaterial" placeholder="批量替换材质" clearable filterable allow-create
                        size="small" :disabled="selectedCount === 0" @change="handleBatchReplace" style="width: 180px">
                        <template #prefix>
                            <span style="font-size: 12px; color: var(--el-text-color-secondary)">
                                {{ selectedCount > 0 ? `已选${selectedCount}项` : '批量替换' }}
                            </span>
                        </template>
                        <el-option v-for="material in props.ueMaterialList" :key="material" :label="material"
                            :value="material" />
                    </el-select>
                    <el-button size="small" @click="importJsonFile">导入</el-button>
                    <el-button size="small" @click="exportJsonFile">导出</el-button>
                    <el-button size="small" @click="clearAll">清空</el-button>
                </div>
            </div>

            <div class="middle">
                <div class="middle_title">
                    <span>选择</span>
                    <span>3DTiles</span>
                    <span>UE场景</span>
                </div>
                <div class="middle_content">
                    <div v-for="(item, index) in internalMaterialList" :key="index" class="material-item">
                        <el-checkbox v-model="item.select" />
                        <el-tooltip :content="item.key" placement="top">
                            <span class="material-name">{{ item.key }}</span>
                        </el-tooltip>
                        <el-select v-model="item.value" placeholder="请选择UE材质" clearable filterable allow-create
                            size="small" @change="handleMaterialChange">
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
import { ref, watch, computed, onMounted } from 'vue';
import { getOpenFileHandle, getSaveFileHandle, getTextFromFile, saveFile } from 'earthsdk-ui';
import { ElMessage, ElMessageBox, ElDialog, ElCheckbox, ElTooltip, ElSelect, ElOption, ElButton } from 'element-plus';

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
/** 批量选择的材质 */
const batchSelectedMaterial = ref<string | undefined>(undefined);

/**
 * 计算选中的材质数量
 */
const selectedCount = computed(() => {
    if (!internalMaterialList.value || !Array.isArray(internalMaterialList.value)) {
        return 0;
    }
    return internalMaterialList.value.filter((item: MaterialItem) => item.select).length;
});

/**
 * 监听全选状态变化
 */
watch(isSelectAll, (newValue) => {
    // 确保列表存在
    if (internalMaterialList.value && Array.isArray(internalMaterialList.value)) {
        internalMaterialList.value.forEach((item: MaterialItem) => {
            item.select = newValue;
        });
    }
});

/**
 * 监听 show 属性变化，初始化数据
 */
// watch(
//     () => props.show,
//     (newValue) => {
//         if (newValue) {
//             initData();
//         }
//     },
//     { immediate: true }
// );

onMounted(() => {
    initData();
})

/**
 * 初始化数据
 * 深拷贝 MaterialItem 对象数组
 */
const initData = () => {
    // 确保 materialList 存在且是数组
    if (!props.materialList || !Array.isArray(props.materialList)) {
        internalMaterialList.value = [];
        originalMaterialList.value = [];
        isSelectAll.value = false;
        batchSelectedMaterial.value = undefined;
        return;
    }

    // 深拷贝 MaterialItem[]
    internalMaterialList.value = JSON.parse(JSON.stringify(props.materialList));
    originalMaterialList.value = JSON.parse(JSON.stringify(props.materialList));
    isSelectAll.value = false;
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
 * 材质变化时触发（用于实时预览等）
 */
const handleMaterialChange = () => {
    // 可以在这里添加实时预览逻辑
    // 目前仅作为占位符
};

/**
 * 处理批量替换
 * @param value - 选择的材质值
 */
const handleBatchReplace = (value: string | undefined) => {
    if (!value) {
        return;
    }

    // 确保列表存在
    if (!internalMaterialList.value || !Array.isArray(internalMaterialList.value)) {
        return;
    }

    // 批量替换选中的材质
    let count = 0;
    internalMaterialList.value.forEach((item: MaterialItem) => {
        if (item.select) {
            item.value = value;
            count++;
        }
    });

    ElMessage.success(`批量替换成功，共替换 ${count} 项`);

    // 清空选择
    batchSelectedMaterial.value = undefined;
};

/**
 * 一键清空所有材质
 */
const clearAll = () => {
    ElMessageBox.confirm('确认一键清空？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(() => {
            // 确保列表存在
            if (internalMaterialList.value && Array.isArray(internalMaterialList.value)) {
                internalMaterialList.value.forEach((item: MaterialItem) => {
                    item.value = undefined;
                });
                ElMessage.success('清空成功');
            }
        })
        .catch(() => { });
};

/**
 * 导入JSON文件
 */
const importJsonFile = async () => {
    try {
        ElMessage.info('正在打开..');
        const handle = await getOpenFileHandle('json');
        if (!handle) return;

        const jsonStr = await getTextFromFile(handle);
        if (!jsonStr) return;

        const result = JSON.parse(jsonStr);

        // 确保列表存在
        if (internalMaterialList.value && Array.isArray(internalMaterialList.value)) {
            // 更新列表
            internalMaterialList.value.forEach((item) => {
                item.value = result[item.key];
            });
        }

        ElMessage.success('导入成功！');
    } catch (error) {
        ElMessage.error(`打开失败！ error: ${error}`);
    }
};

/**
 * 导出JSON文件
 */
const exportJsonFile = async () => {
    const jsonStr = JSON.stringify(convertListToObject(internalMaterialList.value), null, 2);
    const name = 'materialOverrideMap';

    try {
        ElMessage.info('正在另存为..');
        const handle = await getSaveFileHandle('json', name);
        if (!handle) return;

        await saveFile(handle, jsonStr);
        ElMessage.success('导出成功!');
    } catch (error) {
        ElMessage.error(`导出失败! error: ${error}`);
    }
};
</script>

<style scoped>
/* 材质替换编辑器样式 */
.material {
    width: 100%;
    min-height: 400px;
}

.middle {
    width: 100%;
    height: 100%;
}

.middle_title {
    display: grid;
    grid-template-columns: 50px 1fr 1fr;
    grid-column-gap: 10px;
    align-items: center;
    /* width: 100%; */
    height: 40px;
    line-height: 40px;
    background: var(--el-fill-color-light);
    border-radius: 4px;
    padding: 0 10px;
    margin-bottom: 10px;
    font-weight: 600;
}

.middle_title span {
    text-align: center;
    font-size: 14px;
}

.middle_content {
    width: 100%;
    height: 300px;
    overflow-y: auto;
    padding: 5px 0;
}

.material-item {
    display: grid;
    grid-template-columns: 50px 1fr 1fr;
    grid-column-gap: 10px;
    align-items: center;
    padding: 8px 10px;
    margin-bottom: 8px;
    background: var(--el-fill-color-lighter);
    border-radius: 4px;
    transition: all 0.3s;
}

.material-item:hover {
    background: var(--el-fill-color);
}

.material-name {
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    padding: 0 10px;
}

.footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-top: 15px;
    border-top: 1px solid var(--el-border-color-light);
}

.footer-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.record-count {
    font-size: 13px;
    color: var(--el-text-color-secondary);
}

.footer-right {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* 滚动条样式 */
.middle_content::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.middle_content::-webkit-scrollbar-thumb {
    background: var(--el-border-color);
    border-radius: 3px;
}

.middle_content::-webkit-scrollbar-thumb:hover {
    background: var(--el-border-color-dark);
}
</style>
