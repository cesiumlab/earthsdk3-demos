<script setup lang='ts'>
import { ref } from 'vue';
import { getobjm } from '../../scripts/getobjm';
import JsonStringProp from '../common/PropTree/commons/JsonStringProps.vue';
import SceneObjectsCreator from './SceneObjectsCreator.vue';
const objm = getobjm();

const creator = ref(false);
const getTypeName = (name: string) => {
    creator.value = false;
    const obj = objm.sceneTree.createSceneObjectTreeItem(name);
    obj && (obj.uiTreeObject.selected = true);
}

let viewerType: 1 | 2 | 3 = 1

const list = [
    {
        icon: require("../img/newfile.png"),
        title: '新建子节点',
        func: () => {
            creator.value = true;
        }
    },
    {
        icon: require("../img/import.png"),
        title: '使用Json创建对象',
        func: () => {
            JsonStr.value = '{}'
        }
    },
    {
        icon: require("../img/ue_czm.png"),
        title: '切换视口',
        func: () => {
            viewerType += 1;
            if (viewerType > 3) viewerType = 1;
            objm.viewerSwitchEvent.emit(viewerType as 1 | 2 | 3);
        }
    }
]


const JsonStr = ref('')

const getJsonStr = (str: string) => {
    if (str === '' || str === '{}') return;
    const obj = objm.sceneTree.createSceneObjectTreeItemFromJson(JSON.parse(str));
    obj && (obj.uiTreeObject.selected = true);
}

</script>

<template>
    <div class="create_panel">
        <div v-for="item in list" class="panel_box min_panel" :key="item.title" :title="item.title"
            @click.stop="item.func()">
            <div class="min_icon_box img_box">
                <img class="min_sign" :src="item.icon" />
            </div>
        </div>
    </div>
    <SceneObjectsCreator :show="creator" @get-type-name="getTypeName"></SceneObjectsCreator>

    <JsonStringProp :jsonStr="JsonStr" :isShow="JsonStr !== ''" @getJsonStr="getJsonStr" @changeShow="JsonStr = ''">
    </JsonStringProp>
</template>

<style scoped>
.create_panel {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-right: 2px solid #2c3e50;
    border-left: 2px solid #2c3e50;
    border-radius: 3px;
}

.create_model {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-right: 2px solid #2c3e50;
    border-radius: 3px;
}

.panel_box {
    cursor: pointer;
    border-radius: 3px;
    transition: background 0.3s;
}

.modedl_box {
    cursor: move;
    border-radius: 3px;
    transition: background 0.3s;
}

.min_panel:hover {
    background-color: #383838;
}




.min_icon_box {
    width: 30px;
    height: 30px;
}

.img_box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}

.icon_box {
    width: 60px;
    height: 40px;
    margin: 10px;
}


.sign {
    width: 30px;
    height: 30px;
}

.min_sign {
    width: 15px;
    height: 15px;
}

.sign_title {
    width: 60px;
    margin: 0 5px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
