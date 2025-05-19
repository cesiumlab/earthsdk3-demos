<template>
    <div class="layer">
        <div class="layer_item" v-for="item in layerList">
            <div class="layer_item_group" @click="item.collapsed = !item.collapsed">
                <!-- <span style="width: 20px;display: flex;align-items: center;justify-content: center;">{{
            collapsedSymbol(item) }}</span> -->
                <vis-icon class="layer-icon" :iconName="item.collapsed ? 'vis-zhankai' : 'vis-gengduo'"
                    color="#333333"></vis-icon>
                <vis-icon class="layer-icon" :iconName="item.icon" color="#333333"></vis-icon>
                <span class="layer-name">{{ item.name }}</span>
            </div>
            <div v-if="item.collapsed">
                <div class="layer_item_object" v-for="it in item.children">
                    <span class="layer-name-it">{{ it.name }}</span>
                    <span class="layer_item_object_eyes"
                        :class="it.show ? 'layer_item_object_eyeshow' : 'layer_item_object_eyehidden'" title="是否可见"
                        @click.stop="changeItShow(it)">
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getobjm } from '../../scripts/getobjm';
const objm = getobjm()
const wholeShow = ref({
    esTerrainLayerShow: false,
    es3DTilesetShow: false,
    tiandituImageryLayerShow: false,
    vectorImageryLayerShow: false,
    vectorZhujiImageryLayerShow: false
})
const layerList = ref([
    {
        name: "高程",
        icon: "vis-terrain",
        collapsed: true,
        children: [{
            name: '全球高程',
            show: false,
            fun: (val: boolean) => {
                wholeShow.value.esTerrainLayerShow = val
                if (objm.Layer.esTerrainLayer) {
                    objm.Layer.esTerrainLayer.show = val
                }
            }
        }]
    },
    {
        name: "影像图层",
        icon: "vis-img",
        collapsed: true,
        children: [
            {
                name: 'argice影像',
                show: true,
                fun: (val: boolean) => {
                    if (objm.Layer.argiceImageryLayer) {
                        objm.Layer.argiceImageryLayer.show = val
                    }
                }
            }, {
                name: '天地图影像',
                show: false,
                fun: (val: boolean) => {
                    wholeShow.value.tiandituImageryLayerShow = val
                    if (objm.Layer.tiandituImageryLayer) {
                        objm.Layer.tiandituImageryLayer.show = val
                    }
                }
            },
        ]
    },
    {
        name: "矢量图层",
        collapsed: true,
        icon: "vis-vec",
        children: [{
            name: '矢量底图',
            show: false,
            fun: (val: boolean) => {
                wholeShow.value.vectorImageryLayerShow = val
                if (objm.Layer.vectorImageryLayer) {
                    objm.Layer.vectorImageryLayer.show = val
                }
            }
        },
        {
            name: '矢量注记',
            show: false,
            fun: (val: boolean) => {
                wholeShow.value.vectorZhujiImageryLayerShow = val
                if (objm.Layer.vectorZhujiImageryLayer) {
                    objm.Layer.vectorZhujiImageryLayer.show = val
                }
            }
        }
        ]
    },
    {
        name: "模型建筑",
        icon: 'vis-tile',
        collapsed: true,
        children: [{
            name: '全球白膜',
            show: false,
            fun: (val: boolean) => {
                wholeShow.value.es3DTilesetShow = val
                if (objm.Layer.es3DTileset) {
                    objm.Layer.es3DTileset.show = val
                }
            }
        }]
    }
])
// const collapsedSymbol = (item: any) => {
//     if (item.collapsed) {
//         return "＞";
//     } else {
//         return "∨";
//     }
// };
const changeItShow = (it: any) => {
    it.show = !it.show
    it.fun(it.show)
}

onMounted(() => {
    objm.dispose(objm.Layer.cesiumTokenChanged.disposableOn((val) => {
        if (objm.activeViewer) {
            objm.activeViewer.ionAccessToken = val
        }
        setTimeout(() => {
            objm.Layer.createCesiumObjects(wholeShow.value.esTerrainLayerShow, wholeShow.value.es3DTilesetShow)
        })
    }))
    objm.dispose(objm.Layer.tiandituTokenChanged.disposableOn(() => {
        setTimeout(() => {
            objm.Layer.createTiandituLayer(wholeShow.value.tiandituImageryLayerShow, wholeShow.value.vectorImageryLayerShow, wholeShow.value.vectorZhujiImageryLayerShow)
        })
    }))
})
</script>
<style scoped>
.layer {
    width: 100%;
    height: 100%;
}

.layer_item {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    user-select: none;
}

.layer_item_group {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    cursor: pointer;

}

.layer_item_group:hover {
    background-color: var(--vis-bgc-hover);
}

.layer_item_object {
    width: 100%;
    height: 30px;
    padding-left: 36px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    cursor: pointer;

}

.layer_item_object:hover {
    background-color: var(--vis-bgc-hover);
}

.layer_item_object_eyes {
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    cursor: pointer;
}

.layer_item_object_eyeshow {
    background-image: url(/src/assets/eye_show.png);
}

.layer_item_object_eyehidden {
    background-image: url(/src/assets/eye_hidden.png);
}

.layer-name {
    font-size: 14px;
    padding-left: 5px;
}

.layer-name-it {
    font-size: 12px;
}
</style>
