<template>
  <Window :title="'选择创建节点类型'" :show="props.show" :isFocus="false" @keydown.up="selectTypeUp"
    @keydown.down="selectTypeDown" @keydown.enter="selectTypeOk(undefined)" @cancel="selectTypeCancel"
    @ok="selectTypeOk(undefined)" :width="850" :height="550">
    <div class="type_lists_search" style="display: flex;">
      <input type="text" placeholder="关键字查询" v-model="searchKey" v-select>
    </div>
    <div class="history_search">
      <div class="history_box">
        <div v-for="item in storageLists.list" :key="item.typeName" @click="selectTypeOk(item.typeName)"
          class="history_item" :title="`${item.chsName}(${item.typeName})`">
          <span class="history_chsName"> {{ item.chsName }}</span>
          <span class="history_typeName">({{ item.typeName }})</span>
        </div>
      </div>
      <div class="type_screen">
        <button class="screen_right" @click="searchScreen = false"
          :class="!searchScreen ? 'height_light' : ''">全部对象</button>
        <button class="screen_left" @click="searchScreen = true"
          :class="searchScreen ? 'height_light' : ''">常规对象</button>
      </div>
    </div>
    <div class="type_lists" ref="typeListsRef">
      <div v-for="(item, index) in typeLists" :key="index" class="type_lists_sceneObject">
        <div class="lists_sceneObject" :title="item.description" :class="(selectIndex === index) ? 'actived' : ''"
          tabindex="1" @click.stop="selectIndex = index" @dblclick.stop="addOk(index)">
          <div class="type_lists_type"> {{ item.chsName }}</div>
          <div class="type_lists_tags">({{ item.typeName }})</div>
          <div class="type_lists_tags">{{ item.tags && item.tags.join(' ') }}</div>
          <div class="type_lists_description">描述：{{ item.description ?? '暂无' }}</div>
        </div>
      </div>
      <div v-if="typeLists.length === 0" style="width: 100%;text-align: center;color: #8e8989;">
        未找到对象
      </div>
    </div>
  </Window>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref, watch } from "vue";
import { ESSceneObject } from "earthsdk3";
import Window from "./Window.vue";

const props = withDefaults(defineProps<{
  show: boolean,
}>(), {
  show: true,
});

const emits = defineEmits(['getTypeName']);

const vSelect = {
  beforeMount: (el: HTMLInputElement) => {
    nextTick(() => el.select());
  }
}

type ItemType = {
  typeName: string;
  chsName: string | undefined;
  description: string | undefined;
  tags: string[] | undefined;
};
type StorageType = {
  typeName: string;
  chsName: string;
}

const selectIndex = ref<null | number>(null)
const typeListsRef = ref<HTMLElement>()
const searchKey = ref("")
let allItemList: ItemType[] = []
const typeLists = ref<ItemType[]>([])
const storageLists = reactive<{ list: StorageType[] }>({ list: [] })
const searchScreen = ref(true)

const searchForKey = (key: string) => {
  if (key.trim() === '') {
    typeLists.value = allItemList;
    return;
  }

  const regExp = new RegExp(key.trim().replace(/([,.+?:()*\[\]^$|{}\\-])/g, '\\$1'), 'i')
  const typeNameList = allItemList.filter(item => item.typeName.search(regExp) !== -1)
  const chsNameList = allItemList.filter(item => item.chsName && item.chsName.search(regExp) !== -1)
  const tagsList = allItemList.filter(item => item.tags && item.tags.some(e => e.search(regExp) !== -1))
  const descList = allItemList.filter(item => item.description && item.description.search(regExp) !== -1)

  const list: ItemType[] = [];
  typeNameList.forEach(e => !list.includes(e) && list.push(e));
  chsNameList.forEach(e => !list.includes(e) && list.push(e));
  tagsList.forEach(e => !list.includes(e) && list.push(e));
  descList.forEach(e => !list.includes(e) && list.push(e));

  typeLists.value = list
}

const scrollTopCenter = (val: number) => {
  if (!typeListsRef.value || val === null) {
    return
  }
  if (val >= 4) {
    typeListsRef.value.scrollTop = (val - 4) * 36
  } else {
    typeListsRef.value.scrollTop = 0
  }
}

const addOk = (index: number) => {
  selectIndex.value = index
  selectTypeOk()
}

const getTypeName = () => {
  if (selectIndex.value === null) return undefined
  const typeName = typeLists.value[selectIndex.value].typeName
  return typeName
}

const reset = () => {
  typeLists.value = []
  allItemList = []
  searchKey.value = ""
  selectIndex.value = null
}

const selectTypeOk = (typeName?: string) => {
  const type = typeName ?? getTypeName()
  if (!type) return
  setCommonSceneObjects(type)//缓存
  emits('getTypeName', type)
  reset();
}

const selectTypeCancel = () => {
  reset();
  emits('getTypeName', '')
}

const selectTypeUp = () => {
  if (selectIndex.value === null || selectIndex.value > typeLists.value.length - 1) {
    selectIndex.value = 0
  } else if (selectIndex.value === 0) {
    selectIndex.value = typeLists.value.length - 1
  } else {
    selectIndex.value--
  }
  scrollTopCenter(selectIndex.value)
}
const selectTypeDown = () => {
  if (selectIndex.value === null || selectIndex.value >= typeLists.value.length - 1) {
    selectIndex.value = 0
  } else {
    selectIndex.value++
  }
  scrollTopCenter(selectIndex.value)
}

const updateAllItemList = () => {
  allItemList = []
  const itemList: ItemType[] = []
  const list = [...ESSceneObject.context.typeNames]
  list.forEach(el => {
    const item: ItemType = {
      typeName: el,
      chsName: ESSceneObject.context.getProp(el, 'chsName'),
      description: ESSceneObject.context.getProp(el, 'description'),
      tags: ESSceneObject.context.getProp(el, 'tags'),
    }
    itemList.push(item)
  });
  let itemArr: ItemType[] = [];
  if (searchScreen.value) {
    const regExp = new RegExp('ESObjects'.trim().replace(/([,.+?:()*\[\]^$|{}\\-])/g, '\\$1'), 'i')
    const tagsList = itemList.filter(item => item.tags && item.tags.some(e => e.search(regExp) !== -1))
    const lists: ItemType[] = [];
    tagsList.forEach(e => !lists.includes(e) && lists.push(e));
    itemArr = [...lists]
  } else {
    itemArr = [...itemList]
  }
  allItemList = itemArr
  typeLists.value = itemArr
  searchForKey(searchKey.value)
}

const getCommonSceneObjects = () => {
  const storage = localStorage.getItem("XE2StorageSceneObjects");
  if (!storage) return
  const itemList = JSON.parse(storage) as string[]
  const list = itemList.map(el => {
    return {
      typeName: el,
      chsName: ESSceneObject.context.getProp(el, 'chsName') as string
    }
  })
  storageLists.list = [...list]
}
const setCommonSceneObjects = (type: string) => {
  const chsName = ESSceneObject.context.getProp(type, 'chsName')
  const storage = { chsName, typeName: type } as StorageType
  const inde = storageLists.list.findIndex(it => {
    return it.typeName == type;
  });
  if (inde === -1) {
    storageLists.list.unshift(storage);
  } else {
    const item = storageLists.list.splice(inde, 1)
    storageLists.list.unshift(item[0]);
  }
  if (storageLists.list.length > 5) {
    storageLists.list.length = 5
  }

  const list = storageLists.list.map(el => { return el.typeName })

  localStorage.setItem("XE2StorageSceneObjects", JSON.stringify(list));
}

watch(searchScreen, updateAllItemList);
watch(() => props.show, (val) => {
  updateAllItemList();
  if (!val) return
  getCommonSceneObjects();
});
watch(searchKey, searchForKey);

</script>

<style scoped>
.type_screen {
  height: 30px;
  width: auto;
}

.type_screen button {
  width: 70px;
  height: 26px;
  float: right;
  cursor: pointer;
  outline: none;
  border: 1px solid #2b4147;
  background-color: #0d2b34;
  color: #fff;
}

.height_light {
  background-color: #003847 !important;
  font-weight: 700;
}

.screen_left {
  border-radius: 5px 0 0 5px;
}

.screen_right {
  border-radius: 0 5px 5px 0;
}

.type_lists {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-height: calc(100% - 80px);
  height: auto;
  user-select: none;
  overflow: auto;
}


.type_lists_search>input {
  width: 100%;
  margin: 5px;
  height: 24px;
  background: #003847;
  color: #fff;
  border: 1px solid #384b50;
  outline: 1px solid #384b50;
  font-size: 12px;
  border-radius: 5px;
  padding-left: 20px;
}


.type_lists_sceneObject {
  width: calc(100% - 10px);
  height: 30px;
  margin: 3px 5px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
}

.lists_sceneObject {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  background-color: #383838;
  border-radius: 5px;
  cursor: pointer;
  padding: 0 10px;
  margin: 1px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #384b50;
  outline: 1px solid #384b50;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.history_box {
  width: auto;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.history_search {
  height: 30px;
  width: auto;
  margin: 5px;
  display: flex;
  overflow: hidden;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}


.history_item {
  cursor: pointer;
  height: 24px;
  width: 80px;
  background-color: #383838;
  margin-right: 5px;
  border: 1px solid #384b50;
  outline: 1px solid #384b50;
  text-align: center;
  border-radius: 3px;
  overflow: hidden;
  padding: 0 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
}

.history_item:hover {
  background-color: #2f5807;
}

.history_chsName:hover {
  font-weight: 700;
}

.history_typeName {
  color: rgb(101 135 97);
  text-align: center;
  font-size: 12px;
  line-height: 24px;
  font-weight: normal;
  cursor: pointer;
}

.history_chsName {
  height: 100%;
  line-height: 24px;
  font-size: 12px;
}


.type_lists_tags {
  color: rgb(101 135 97);
  border-radius: 5px;
  text-align: center;
  margin: 0 10px;
  font-size: 12px;
}


.type_lists_type {
  color: #fff;
  border: none;
  font-size: 14px;
}

.type_lists_description {
  margin-left: 10px;
  color: rgb(142, 137, 137);
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.actived {
  background-color: #2f5807 !important;
}
</style>
