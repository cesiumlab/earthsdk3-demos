<script setup lang='ts'>
import { ReactVarProperty } from 'earthsdk3';
import { XbsjEarthUi } from '../../../../scripts/xbsjEarthUi';
const props = withDefaults(defineProps<{ properties: ReactVarProperty<any>[], type?: string; treeItem?: any, lonLatFormat: string }>(), {});
import { propComps } from 'earthsdk-ui'
import { inject } from 'vue';
// import { propComps } from '../../index'
const emtis = defineEmits<{
    (e: 'callback', params: any & { treeItem: any }): void;
}>();
const { treeItem } = props;
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const callback = (params: any): void => {
    emtis('callback', {
        treeItem,
        ...params,
    });
};
</script>

<template>
    <div class="item">
        <component :is="propComps[properties[0].type]" :xbsjEarthUi="xbsjEarthUi" :treeItem="xbsjEarthUi.propSceneTree"
            :property="properties[0]" :type="type" @callback=callback :lonLatFormat="lonLatFormat">
        </component>
        <component :is="propComps[properties[1].type]" :xbsjEarthUi="xbsjEarthUi" :treeItem="xbsjEarthUi.propSceneTree"
            :property="properties[1]" :type="type" @callback=callback :lonLatFormat="lonLatFormat">
        </component>
    </div>
    <div v-for="item in properties.slice(2)" :key="item.memId" class="item">
        <div class="item_type">
            <component :is="propComps[item.type]" :xbsjEarthUi="xbsjEarthUi" :treeItem="xbsjEarthUi.propSceneTree"
                :property="item" :type="type" @callback=callback :lonLatFormat="lonLatFormat"></component>
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



.item_name {
    width: 70px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}

.item_type {
    width: 100%;
}

.item_type_editing {
    width: 20%;
}
</style>
