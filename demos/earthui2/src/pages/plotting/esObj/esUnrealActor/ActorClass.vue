<template>
    <div>
        <LabelInput v-model="actorclass" :label="'引用路径'" :placeholder="'请输入引用路径'"></LabelInput>
        <LabelInput v-model="name" :label="'名称'" :placeholder="'可不填'"></LabelInput>
        <div class="poplist_footer">
            <button @click="ok">{{ '确认' }}</button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { Message } from "earthsdk-ui";
import { ESUnrealActor } from "earthsdk3";
import { inject, ref } from 'vue';
import LabelInput from "../../../../components/LabelInput.vue";
import { XbsjEarthUi } from "../../../../scripts/xbsjEarthUi";
import { createSceneObjTreeItemFromJson } from '../fun';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const emits = defineEmits(['close'])
const ok = () => {
    if (!actorclass.value) {
        Message.warning('请填写引用路径');
        return
    }
    const obj = xbsjEarthUi.createSceneObject(ESUnrealActor)
    if (obj) {
        let n
        if (name.value) {
            n = name.value
        } else {
            // 获取最后一个逗号的位置
            var lastIndex = actorclass.value.lastIndexOf('.');
            // 如果找不到逗号，直接返回原字符串
            if (lastIndex === -1) {
                n = actorclass.value
            } else {
                n = actorclass.value.substring(lastIndex + 1);
                n=n.slice(0, -1);
            }
        }
        obj.name = n
        obj.actorClass = actorclass.value
        //编辑状态结束后根据json创建在场景树上
        obj.editing = true
        obj.d(obj.editingChanged.disposableWeakOn(() => {
            if (obj && obj.editing === false) {
                const json = obj.json
                const position = obj.position
                const a = position[0] === 0 && position[1] === 0
                xbsjEarthUi.destroySceneObject(obj)
                setTimeout(() => {
                    if (!a) {
                        createSceneObjTreeItemFromJson(xbsjEarthUi, json)
                    }
                }, 100)
            }
        }))
    }
    emits('close')
    return
}
const actorclass = ref()
const name = ref()
</script>