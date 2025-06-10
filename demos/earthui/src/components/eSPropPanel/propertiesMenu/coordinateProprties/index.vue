<script setup lang='ts'>
import { ReactVarProperty } from 'earthsdk3';
import { Message, propComps } from 'earthsdk-ui'
import { XbsjEarthUi } from '../../../../scripts/xbsjEarthUi';
import { inject, onBeforeUnmount, onMounted } from 'vue';
// import { propComps } from '../../index'
const props = withDefaults(defineProps<{ properties: ReactVarProperty<any>[], type?: string, currentMenu?: string, treeItem?: any, lonLatFormat?: string, panelStyle?: string }>(), { type: '', currentMenu: '' });
const emtis = defineEmits<{
    (e: 'callback', params: any & { treeItem: any }): void;
}>();
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const { treeItem } = props;
const callback = (params: any): void => {
    emtis('callback', {
        treeItem,
        ...params,
    });
};
let dispose: any
onMounted(() => {
    console.log('properties', props.properties)
    const sceneObject = xbsjEarthUi.propSceneTree.sceneObject
    dispose = sceneObject.editingChanged.disposableOn((res: boolean) => {
        if (res) {
            Message.loading({ id: 'xxx', content: '1. 双击鼠标左键或点击ESC键退出编辑2. 点击空格键进行编辑方式的切换' })
        } else {
            Message.remove('xxx')
        }
    })
})
onBeforeUnmount(() => {
    if (dispose) {
        Message.remove('xxx')
        dispose()
        dispose = undefined
    }
})


</script>
<template>
    <div v-for="item in properties" :key="item.memId" class="item" v-if="properties.length > 0">
        <div class="item_type" :style="{ paddingLeft: panelStyle === 'style' ? '10px' : '0px' }"
            v-if="item.type !== 'GroupProperty'">
            <component :is="propComps[item.type]" :property="item" :type="type" @callback="callback"
                :lonLatFormat="lonLatFormat" :xbsjEarthUi="xbsjEarthUi" :treeItem="xbsjEarthUi.propSceneTree">
            </component>
        </div>
        <div class="item_nameProperty_name" v-else>
            <div class="item_type_nameProperty_name">{{ item.name }}</div>
            <div class="item_type_nameProperty_split"></div>
        </div>

    </div>

</template>

<style scoped>
.item {
    width: 100%;
    display: flex;
    font-size: 14px;
    line-height: 20px;
    padding: 2px 10px;
    box-sizing: border-box;
    margin: 0 0 3px 0;
}

.espath_button {
    width: 100%;
    display: flex;
    padding: 2px 10px;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between
}

.espath_button>button {
    height: 26px;
    background: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
    border: 1px solid #3b3c40;
    color: rgba(230, 230, 230, 1);
    cursor: pointer;
}

.espath_button>button:hover {
    border: 1px solid #2c68f7;
}

.active {
    border: 1px solid #2c68f7 !important;
}

.item_type {
    width: 100%;
    box-sizing: border-box;
}

.item_nameProperty_name {
    width: 100%;
    display: flex;
}

.no-click {
    pointer-events: none;
    opacity: 0.5;
    /* 降低不透明度以实现视觉上的禁用效果 */
    cursor: default;
    /* 改变鼠标指针为默认样式，传达不可点击的信息 */
}

.item_type_nameProperty_name {
    box-sizing: border-box;
    max-width: 100px;
    padding-left: 5px;
    padding-right: 5px;
    border-left: 4px solid #2c68f7;
}

.item_type_nameProperty_split {
    flex: 1;
    height: 50%;
    border-bottom: 1px solid #3b3c40;
}
</style>
