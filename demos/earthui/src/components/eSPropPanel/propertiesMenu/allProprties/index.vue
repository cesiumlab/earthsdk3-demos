<script setup lang="ts">
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi';
import { propComps } from 'earthsdk-ui';
import { ReactVarProperty } from 'earthsdk3';
import { inject } from 'vue';
const props = withDefaults(
    defineProps<{
        properties: ReactVarProperty<any>[]
        type?: string
        treeItem?: any
        lonLatFormat: string
    }>(),
    {}
)
const emtis = defineEmits<{
    (e: 'callback', params: any & { treeItem: any }): void
}>()
const { treeItem } = props
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const callback = (params: any): void => { emtis('callback', { treeItem, ...params }) }
</script>

<template>
    <div v-for="item in properties" :key="item.memId" class="item">
        <div class="item_type">
            <component :is="propComps[item.type]" :xbsjEarthUi="xbsjEarthUi" :treeItem="xbsjEarthUi.propSceneTree"
                :property="item" :type="type" @callback="callback" :lonLatFormat="lonLatFormat"></component>
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
