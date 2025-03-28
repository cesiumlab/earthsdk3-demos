<template>
    <DraggablePopup2 @close="emits('close')" :showButton="true" :title="'动画添加'" :width="520" :height="'320px'"
        :left="540" :top="200" @ok="ok">
        <div class="animation_list">
            <div class="animation_list_left" style="border-right: 1px solid rgba(183, 183, 183, 0.5);">
                <div class="animation_list_title">
                    <span>{{ '路径' }}</span>
                </div>
                <div class="animation_list_list">
                    <div class="animation_list_item" v-for="item in esPathList"
                        ><span class="animation_list_item_span"
                            @click="itemPathCheck(item)"> <es-icon :name="item.flag ? 'checked' : 'unchecked'"
                                :color="'#fff' " :size="16" /></span>{{ item.name }}
                    </div>
                </div>
            </div>
            <div class="animation_list_left">
                <div class="animation_list_title">
                    <span class="develop_icon" :class="{ 'disabled-element': esPathFlagLength === 0 }"
                        @click.stop="allLocationCheck" :title="esLocationCheckBox ? '取消全选' : '全选'">
                        <es-icon :name="esLocationCheckBox ? 'checked' : 'unchecked'"
                            :color="esPathFlagLength === 0 ? '#706b6b' : esLocationCheckBox ? '#fff' : 'rgba(230, 230, 230, 1)'"
                            :size="16" />
                    </span>
                    <span :class="{ 'disabled-element': esPathFlagLength === 0 }">{{ '路径驱动对象' }}</span>
                </div>
                <div class="animation_list_list">
                    <div class="animation_list_item" :class="{ 'disabled-element': esPathFlagLength === 0 }"
                        v-for="item in esLocationList"><span class="animation_list_item_span"
                            :class="{ 'disabled-element': esPathFlagLength === 0 }" @click="itemLocationCheck(item)">
                            <es-icon :name="item.flag ? 'checked' : 'unchecked'"
                                :color="esPathFlagLength === 0 ? '#706b6b' : item.flag ? '#fff' : 'rgba(230, 230, 230, 1)'"
                                :size="16" /></span>{{ item.name }}
                    </div>
                </div>

            </div>
        </div>
    </DraggablePopup2>
</template>
<script setup lang="ts">
import { Message } from "earthsdk-ui";
import { ESObjectWithLocation } from "earthsdk3";
import { inject, onMounted, ref, computed } from "vue";
import DraggablePopup2 from "../../../../components/DraggablePopup2.vue";
import { XbsjEarthUi } from "../../../../scripts/xbsjEarthUi";
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const props = withDefaults(defineProps<{
    path: string,
    location: string[],
}>(), {});
const { path, location } = props
const emits = defineEmits(["close", "ok"]);
// const esLocationCheckBox = ref(false)
const esPathList = ref<{ id: string, name: string, flag: boolean }[]>([])
const esLocationList = ref<{ id: string, name: string, flag: boolean }[]>([])
const esPathFlagLength = computed(() => {
    let flagLength = 0
    esPathList.value.forEach((i => {
        if (i.flag) flagLength++
    }))
    return flagLength
})
//点击点位总的选择按钮
const allLocationCheck = () => {
    if (esPathFlagLength.value === 0) return
    let a = esLocationCheckBox.value
    esLocationList.value.forEach((item => {
        item.flag = !a
    }))
}
//路径点击单个按钮
const itemPathCheck = (item: { id: string, name: string, flag: boolean }) => {
    const flag = item.flag
    esPathList.value.forEach((i => {
        i.flag = false
    }))
    item.flag = !flag
}
//点击单个按钮
const itemLocationCheck = (item: { id: string, name: string, flag: boolean }) => {
    if (esPathFlagLength.value === 0) return
    item.flag = !item.flag
}
//点位总选择按钮的显隐
const esLocationCheckBox = computed(() => {
    let flagLength = 0
    esLocationList.value.forEach((i => {
        if (i.flag) flagLength++
    }))
    if (flagLength === esLocationList.value.length) {
        return true
    } else {
        return false
    }
})
const ok = () => {
    const channel: { pathId: string, sceneObjectIds: string[] } = {
        pathId: '',
        sceneObjectIds: [],
    }
    let esPath = false
    let location = 0
    esPathList.value.forEach((item => {
        if (item.flag) {
            esPath = true
            channel.pathId = item.id
        }
    }))
    esLocationList.value.forEach((item) => {
        if (item.flag) {
            location++
            channel.sceneObjectIds.push(item.id)
        }
    })

    if (!esPath) {
        Message.warning('未选择任何路径对象')
        return
    } else if (location < 1) {
        Message.warning('未选择任何点位对象')
        return
    } else {
        if (path) {
            emits('ok', channel, false)
        } else {
            emits('ok', channel, true)
        }
        emits('close')
    }
}
//获取所有 路径对象 
const searchAndCollectLineValues = (obj: { [key: string]: any }, resultArray: any[]) => {
    if (obj['sceneObj']) {
        if (obj['sceneObj'].type && obj['sceneObj'].type === 'ESPath') {//ESPath
            resultArray.push({
                name: obj['sceneObj'].name,
                id: obj['sceneObj'].id,
                flag: false
            });
        }
    }
    if (obj['children']) {
        for (let i = 0; i < obj['children'].length; i++) {
            searchAndCollectLineValues(obj['children'][i], resultArray);
        }
    }
}
const searchForLineValues = (sceneTree: { [key: string]: any }): any[] => {
    let result: { id: string, name: string, flag: boolean }[] = [];
    if (sceneTree.json.root.children) {
        searchAndCollectLineValues(sceneTree.json.root, result);
    }
    return result
}

//获取所有 点位对象 
const searchAndCollectLocationValues = (xbsjEarthUi: any, obj: { [key: string]: any }, resultArray: any[]) => {
    if (obj['sceneObj']) {
        const sceneObject = xbsjEarthUi.getSceneObjectById(obj['sceneObj'].id)
        if (sceneObject instanceof ESObjectWithLocation) {
            resultArray.push({
                name: obj['sceneObj'].name,
                id: obj['sceneObj'].id,
                flag: false
            });
        }
    }
    if (obj['children']) {
        for (let i = 0; i < obj['children'].length; i++) {
            searchAndCollectLocationValues(xbsjEarthUi, obj['children'][i], resultArray);
        }
    }
}
const searchForLocationValues = (xbsjEarthUi: any): any[] => {
    let result: any[] = [];
    const sceneTree = xbsjEarthUi.getSceneTree()
    if (sceneTree.json.root.children) {
        searchAndCollectLocationValues(xbsjEarthUi, sceneTree.json.root, result);
    }
    return result
}

onMounted(() => {
    esPathList.value = searchForLineValues(xbsjEarthUi.sceneTree)
    esLocationList.value = searchForLocationValues(xbsjEarthUi)
    if (path&&esPathList.value.length>0) {
        esPathList.value.forEach(item => {
            if (item.id === path) {
                item.flag = true
            }
        })
    }
    if (location.length > 0) {
        esLocationList.value.forEach(item => {
            location.forEach(i => {
                if (i === item.id) {
                    item.flag = true
                }
            })
        })
    }
})
</script>
<style scoped>
.animation_list {
    width: 100%;
    height: 100%;
    padding: 5px 0;
    box-sizing: border-box;
    display: flex;
}

.animation_list_left {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
}



.animation_list_title {
    width: 100%;
    height: 30px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 12px;
    color: rgba(230, 230, 230, 1);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid rgba(183, 183, 183, 0.5);
    padding-left: 20px;
    box-sizing: border-box;

}

.animation_list_list {
    width: 100%;
    flex: 1;
    overflow: auto;
    padding-left: 20px;
    box-sizing: border-box;
}

.animation_list_list::-webkit-scrollbar {
    width: 3px;
    background-color: rgba(41, 42, 46, 1);
    border-radius: 2px;
}

.animation_list_list::-webkit-scrollbar-thumb {
    background-color: rgba(183, 183, 183, 1);
    border-radius: 2px;
}

.animation_list_item {
    width: 100%;
    height: 30px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 12px;
    color: rgba(230, 230, 230, 1);
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.develop_icon {
    width: 16px;
    display: flex;
    margin-right: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.animation_list_item_span {
    margin-right: 10px;
    margin-top: 4px;
    cursor: pointer;
}

.disabled-element {
    color: #706b6b;
    cursor: not-allowed !important;
}

/* .disabled-element1 {
    color: #706b6b !important;
} */
</style>