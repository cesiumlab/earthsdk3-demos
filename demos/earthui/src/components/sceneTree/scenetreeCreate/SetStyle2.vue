<template>
    <DraggablePopup2 v-if="props.isShow" :minWidthHeight="[510, 100]"
        :title="`${(scenetree && scenetree.name) ? scenetree.name : ''}-编辑器`" :width="1000" :height="'600px'"
        :left="300" :top="100" @close="changeCancel" :showButton="true" @ok="changeOk">
        <div class="set_style">
            <!-- 左侧列表 -->
            <div class="set_style_list">
                <div class="set_style_name">样式列表</div>
                <div class="style_list">
                    <div class="style_list_div">
                        <!-- 循环默认样式 -->
                        <div v-for="(item, index) in styleList" class="set_style_list_lilist" :title="item.name">
                            <div class="set_imgposition" :class="{ 'set_checkedactive': checkedactive === index }"
                                @click="changeStyle(item, index, true)"
                                @contextmenu.prevent.stop="Message.warning('默认样式禁止修改')">
                                <img :src="item.thumbnail" alt="">
                            </div>
                            <div class="setStyle_onlineimageName">
                                {{ item.name }}
                            </div>
                        </div>
                        <!-- 循环本地存储样式 -->
                        <div v-for="(item, index) in localStorageStyle.defaultStyle" class="set_style_list_lilist"
                            :title="item.name">
                            <div class="set_imgposition" :class="{ 'set_checkedactive': checkedactive === index + 5 }"
                                @click="changeStyle(item, index + 5, true)"
                                @contextmenu.prevent.stop="contexMenuEvent(item, index)">
                                <img :src="item.thumbnail" alt="">
                            </div>
                            <div class="setStyle_onlineimageName" v-if="inputIndex !== index">
                                {{ item.name }}
                            </div>
                            <input class="model_content_right_input" :id="`${inputIndex}myInput`" type="text"
                                v-model="inputValue" v-else @blur="changeName(index)" @keydown.enter="changeName(index)"
                                :key="index" ref="myInput">
                        </div>
                    </div>
                </div>
                <div class="set_style_name"
                    v-if="localStorageStyle.historyStyle && localStorageStyle.historyStyle.length > 0">历史样式列表</div>
                <div class="style_list_story"
                    v-if="localStorageStyle.historyStyle && localStorageStyle.historyStyle.length > 0">
                    <div class="style_list_div_stoy">
                        <div v-for="(item, index) in localStorageStyle.historyStyle" class="set_style_list_lilist"
                            :title="item.name">
                            <div class="set_imgposition"
                                :class="{ 'set_checkedactive': historyCheckedactive === index }"
                                @click="changeStyle(item, index, false)">
                                <img :src="item.thumbnail" alt="">
                            </div>
                            <div class="setStyle_onlineimageName">
                                {{ item.name }}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <!-- 右侧编辑器 -->
            <div class="set_style_edit">
                <div class="set_style_name">规则编辑器</div>
                <!-- 切换按钮 -->
                <div class="set_style_tab">
                    <div>
                        <div class="header_item3" @click="changeCurrentEdit">
                            <span class="header_item_span3" :class="currentMenu === 'edit' ? 'header_active3' : ''">{{
                                '规则可视化编辑器'
                                }}</span>
                        </div>
                        <div class="header_item3" @click="currentMenu = 'JsonEdit'">
                            <span class="header_item_span3"
                                :class="currentMenu === 'JsonEdit' ? 'header_active3' : ''">{{
                                    '规则JSON编辑器'
                                }}</span>
                        </div>
                    </div>
                    <div>
                        <div class="style_button">
                            <button @click="saveStyle">另存为新样式</button>
                            <button @click="application">应用</button>
                        </div>
                    </div>
                </div>
                <!-- 可视化编辑器 -->
                <div class="style_rule_edit" v-if="currentMenu === 'edit'">
                    <div class="set_style_rule1">
                        <div class="set_style_rule_list" style="height: 30px;line-height: 30px;">
                            <div class="style_rule_list_index">序号</div>
                            <div class="style_rule_list_two">规则</div>
                            <div class="style_rule_list_color">颜色</div>
                            <div class="style_rule_list_show">显隐</div>
                            <div class="style_rule_list_change"><span style="cursor:pointer;" @click.stop="addOneRule"
                                    title="添加" @mouseenter="hoverIndex = -1" @mouseleave="hoverIndex = -2"><es-icon
                                        :name="'tianjia'" :color="hoverIndex === -1 ? '#fff' : '#575B66'"
                                        :size="13" /></span>
                            </div>

                        </div>
                    </div>
                    <div class="set_style_rule2">
                        <div class="set_style_rule_list2" v-for="(item, index) in ruleRef">
                            <div class="style_rule_list_index">{{ index + 1 }}</div>
                            <div class="style_rule_list_two">
                                <div class="rule_list_two_name">
                                    <div class="rule_list_two_valuename">属性名称</div>
                                    <div class="rule_list_two_Operator">操作符</div>
                                    <div class="rule_list_two_value">值</div>
                                    <div class="rule_list_two_change"><span style="cursor:pointer;"
                                            @click.stop="listaAddOneRule(index)" title="添加"
                                            @mouseenter="hoverliIndex = index" @mouseleave="hoverliIndex = -2"><es-icon
                                                :name="'tianjia'" :color="hoverliIndex === index ? '#fff' : '#575B66'"
                                                :size="13" /></span></div>
                                </div>
                                <div class="rule_list_two_name2" v-for="(i, ind) in item.condition">
                                    <div>
                                        <div class="rule_list_two_valuename">
                                            <EnumProp v-if="obtainType(i) === true" :isStyleEdit="true"
                                                :withUndefined="false" :defaultValue="undefined"
                                                :enumStrsList="fieldList" :readonly="true" :model-value="i"
                                                @clickli="(newItem) => changeruleOp(newItem, index, ind)">
                                            </EnumProp>
                                            <EnumProp v-else :withUndefined="false" :isStyleEdit="true"
                                                :defaultValue="undefined" :enumStrsList="fieldList" :readonly="true"
                                                v-model="i.field"
                                                @clickli="(newItem) => changeruleOp(newItem, index, ind)">
                                            </EnumProp>
                                        </div>
                                        <div class="rule_list_two_Operator"
                                            :class="{ ' rule_list_two_Operator_ban': obtainType(i) === true }">
                                            <EnumProp v-if="obtainType(i) === true" :withUndefined="false"
                                                :defaultValue="undefined" :isBan="true" :enumStrsList="[]"
                                                :readonly="true" :model-value="''">
                                            </EnumProp>
                                            <EnumProp v-else :withUndefined="false" :defaultValue="undefined"
                                                :enumStrsList="obtainType(i) === 'string' ? stringOpList : numberOpList"
                                                :readonly="true" v-model="i.op">
                                            </EnumProp>
                                        </div>
                                        <div class="rule_list_two_value"
                                            :class="{ ' rule_list_two_Operator_ban': obtainType(i) === true }">
                                            <input type="text" :value="i.value"
                                                :class="{ 'input_ban': obtainType(i) === true }"
                                                @input="changeRuleValue($event, index, ind, i)">
                                        </div>
                                        <div class="rule_list_two_change"><span @click="listadeleteOneRule(index, ind)"
                                                @mouseenter="hoverlideleteIndex = ind; hoverlideleteIndexHover = index"
                                                @mouseleave="hoverlideleteIndex = -2, hoverlideleteIndexHover = -2"
                                                style="cursor:pointer;">
                                                <es-icon :name="'shanchu_2'"
                                                    :color="(hoverlideleteIndex === ind && hoverlideleteIndexHover === index) ? '#fff' : '#575B66'"
                                                    :size="13" />
                                            </span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="style_rule_list_color">
                                <ESColor :color="transformColor(item.color)" @ok="okHandler(index, $event)"></ESColor>
                            </div>
                            <div class="style_rule_list_show" style="padding-left: 15px;">
                                <div>
                                    <BooleanProp :withUndefined="false" :defaultValue="undefined" :readonly="false"
                                        v-model="item.show" :showButton="false">
                                    </BooleanProp>
                                </div>
                            </div>
                            <div class="style_rule_list_change"><span @click="deleteOneRule(index)"
                                    @mouseenter="hoverdeleteIndex = index" @mouseleave="hoverdeleteIndex = -2"
                                    style="cursor:pointer;">
                                    <es-icon :name="'shanchu_2'"
                                        :color="hoverdeleteIndex === index ? '#fff' : '#575B66'" :size="13" />
                                </span></div>
                        </div>
                    </div>

                </div>
                <!-- 规则JSON编辑器 -->
                <div class="style_rule_edit" v-else>
                    <iframe :src="iframeSrc" frameborder="0" @load="loadIframe" ref="mainIframe"
                        style="width:100%;  height:calc(100% - 10px);cursor: not-allowed"></iframe>
                </div>
            </div>
        </div>
    </DraggablePopup2>
    <ContextMenuCom :baseItems="menuContent"></ContextMenuCom>

</template>

<script setup lang="ts">
import { Message, messageBox } from "earthsdk-ui";
import { inject, ref, onMounted, watch, onBeforeUnmount } from "vue";
import { SceneObject } from "earthsdk3";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import ContextMenuCom from '../../../components/commom/ContextMenuCom.vue';
import { SceneTreeItem, ES3DTileset } from "earthsdk3";
import EnumProp from "../../eSPropPanel/propertiesMenu/commons/EnumProp.vue"
import { ESColor } from "earthsdk-ui"
import BooleanProp from "../../eSPropPanel/propertiesMenu/commons/BooleanProp.vue";
import DraggablePopup2 from "../../DraggablePopup2.vue";
import { ESSceneObject } from "earthsdk3";
const props = withDefaults(defineProps<{
    isShow: boolean,
    setStyleTreeItem: SceneTreeItem | undefined,
}>(), {});
const emits = defineEmits(["changeShow"]);
type menuContentType = {
    text: string;
    keys: string;
    func: () => void;
} | {
    type: "divider",
}
//控制划过变色的变量
const hoverIndex = ref(-2)
const hoverIndex2 = ref(-2)
const hoverliIndex = ref(-2)
const hoverlideleteIndex = ref(-2)
const hoverlideleteIndexHover = ref(-2)
const hoverdeleteIndex = ref(-2)
const stringOpList: [aliasName: any, value: any][] = [['==', '=='], ['!=', '!='], ['contain', 'contain'], ['empty', 'empty']]//字符串对应的符号列表
const numberOpList: [aliasName: any, value: any][] = [['==', '=='], ['!=', '!='], ['>', '>'], ['>=', '>='], ['<', '<'], ['<=', '<=']]//数字对应的符号列表
const fieldList = ref<[aliasName: any, value: any][]>([['id', 'id']])
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const currentMenu = ref('edit')//当前的模块是可视化还是json
const flagApplection = ref(false)
//默认的样式
const styleList = ref([
    {
        name: "默认样式",
        code: [
            {
                condition: [{
                    field: "id",
                    op: "==",
                    value: "xxx"
                }
                ],
                color: [1, 0, 0, 1],
                show: true
            }
        ],
        thumbnail: "data:image/jpeg;base64,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",
    }
])
const iframeSrc = ESSceneObject.getStrFromEnv('${earthsdk3-assets-script-dir}/markdown/monaco-editor/json-editor.html');
//点击切换模块的时候
const changeCurrentEdit = async () => {
    if (currentMenu.value === 'edit') return
    try {
        const str = await getJson()
        const json = JSON.parse(str);
        let newJson: any[] = []
        json.forEach((item: any) => {
            if (Array.isArray(item.condition)) {
                newJson.push(item)
            } else {
                const i = item
                const condition = item.condition
                i.condition = [condition]
                newJson.push(i)
            }
        })
        ruleRef.value = newJson
        currentMenu.value = 'edit'

    } catch (error) {
        console.log('JSON格式错误!!!', error);
        if (error === undefined) {
            Message.error('样式未定义');
        } else {
            Message.error(`JSON格式错误！ error: ${error}`);

            return
        }
    }
}
//规则的变量
const ruleRef = ref<any>([
    {
        condition: [{
            field: "id",
            op: "==",
            value: "xxx"
        }],
        color: [1, 0, 0, 1],
        show: true
    }
])
//获取对象的属性的类型
const featureType = ref<{ key: string, type: string | number }[]>([
    {
        "key": "id",
        "type": "string" //  string/number
    }
])
//颜色转为0-1范围的函数
const transformColor = (colorRef: number[]) => {
    if (colorRef === undefined) {
        return {
            r: 255, g: 255, b: 255, a: 1
        }
    } else {
        return {
            r: colorRef[0] * 255,
            g: colorRef[1] * 255,
            b: colorRef[2] * 255,
            a: colorRef[3]
        }
    }
}
// 修改颜色
const okHandler = (index: number, rgba: { r: number, g: number, b: number, a: number }) => {
    const rgbaArr: [number, number, number, number] = [rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a]
    const rule = [...ruleRef.value]
    rule[index].color = rgbaArr
}
//修改属性名称的时候让操作符变为==
const changeruleOp = (newItem: any, index: number, ind: number) => {
    if (newItem[0] === '常量true' || newItem[0] === '常量false') {
        ruleRef.value[index].condition[ind] = newItem[1]
    } else {
        ruleRef.value[index].condition[ind] = {
            field: newItem[1],
            op: "==",
            value: "xxx"
        }
        setTimeout(() => {
            if (obtainType(ruleRef.value[index].condition[ind]) === 'string') {
                ruleRef.value[index].condition[ind].value = `${ruleRef.value[index].condition[ind].value}`
            } else {
                const a = Number(ruleRef.value[index].condition[ind].value)
                if (!a) {
                    ruleRef.value[index].condition[ind].value = 0
                } else {
                    ruleRef.value[index].condition[ind].value = a
                }
            }
        }, 100)
    }
}
//input框中输入的时候判断是什么类型进行转换
const changeRuleValue = (e: Event, index: number, ind: number, item: any) => {
    let targetValue = (e.target as HTMLInputElement).value as any;
    if (obtainType(item) === 'string') {
        ruleRef.value[index].condition[ind].value = targetValue
    } else {
        ruleRef.value[index].condition[ind].value = Number(targetValue)
    }
}
//小模块点击添加
const addOneRule = () => {
    const rule = [...ruleRef.value]
    rule.push({
        condition: [{
            field: "id",
            op: "==",
            value: "xxx"
        }],
        color: [1, 0, 0, 1],
        show: true
    })
    ruleRef.value = rule

}
//小模块删除某一项
const deleteOneRule = (index: number) => {
    messageBox({ text: '确认删除这一项规则吗？' })
        .then(() => {
            const rule = [...ruleRef.value]
            rule.splice(index, 1)
            ruleRef.value = rule
        })
        .catch((err) => {
        })

}
//大模块增加一项规则
const listaAddOneRule = (index: number) => {
    const rule = [...ruleRef.value]
    rule[index].condition.push({
        field: "id",
        op: "==",
        value: "xxx"
    })
    ruleRef.value = rule
}
//大模块删除一项规则
const listadeleteOneRule = (index: number, ind: number) => {
    const rule = [...ruleRef.value]
    rule[index].condition.splice(ind, 1)
    ruleRef.value = rule
}
//右键菜单的数组变量
const menuContent = ref<Array<menuContentType>>([])
const inputIndex = ref()//右键点击重命名需要获取的当前的index
const changeStyle = async (item: any, index: any, flag: boolean) => {
    if (flag) {
        checkedactive.value = index
        historyCheckedactive.value = -1
    }
    else {
        historyCheckedactive.value = index
        checkedactive.value = -1
    }
    if (currentMenu.value === 'edit') {
        ruleRef.value = item.code
    } else {
        await setJson(JSON.stringify(item.code, undefined, '    '))
    }

}
const inputValue = ref()
//失去焦点,按键enter
const changeName = (index: number) => {
    const modelStyles = window.localStorage.getItem('modelStyles')
    if (modelStyles) {
        const a = JSON.parse(modelStyles)
        a.defaultStyle[index].name = inputValue.value
        window.localStorage.setItem('modelStyles', JSON.stringify(a))
        localStorageStyle.value = a
    }
    inputIndex.value = null
}
const contexMenuEvent = (item: any, index: number) => {//元素右键
    if (!item) return
    const baseItems: Array<menuContentType> = [
        {
            text: "重命名",
            keys: "",
            func: () => {
                inputIndex.value = index
                inputValue.value = item.name
                setTimeout(() => {
                    const a = document.getElementById(`${index}myInput`)
                    if (a) {
                        a.focus()
                    }
                }, 50)
            },
        },
        {
            text: "更新缩略图",
            keys: "",
            func: () => {
                messageBox({ text: '确认更新缩略图吗？' })
                    .then(() => {
                        updateConfirm(index)
                    })
                    .catch((err) => {
                    })
            },
        },
        {
            text: "删除",
            keys: "",
            func: () => {
                messageBox({ text: '确认删除？' })
                    .then(() => {
                        deleteConfirm(index)
                    })
                    .catch((err) => {
                    })
            },
        }
    ];
    menuContent.value = baseItems
}
const checkedactive = ref()//样式列表的当前选中
const historyCheckedactive = ref()
const localStorageStyle = ref<{ defaultStyle: any[], historyStyle: any[] }>({ defaultStyle: [], historyStyle: [] })//本地样式列表
const changeCancel = () => {//点击取消
    checkedactive.value = 0
    hoverIndex.value = -2
    hoverIndex2.value = -2
    hoverliIndex.value = -2
    hoverlideleteIndex.value = -2
    hoverlideleteIndexHover.value = -2
    hoverdeleteIndex.value = -2
    currentMenu.value = 'edit'
    if (scenetree.value) {
        const sceneObject = scenetree.value.sceneObject as ES3DTileset
        if (sceneObject) {
            if (flagApplection.value) {
                sceneObject.resetFeatureStyle()
            }
        }
    }
    emits("changeShow", false);
}
const scenetree = ref()//当前选中的对象

watch(() => props.setStyleTreeItem, async () => {//当前对象变化的时候
    scenetree.value = props.setStyleTreeItem
    if (scenetree.value) {
        const sceneObject = scenetree.value.sceneObject as ES3DTileset
        if (sceneObject) {
            const featureTypes = await sceneObject.getFeatureTable()//通过函数获取featureType
            const a: [aliasName: any, value: any][] = []
            if (featureTypes && featureTypes.length > 0) {
                featureTypes.forEach((item) => {
                    a.push([item.key, item.key])
                })
                fieldList.value = a
                fieldList.value.push(['常量true', true])
                fieldList.value.push(['常量false', false])

                featureType.value = featureTypes
            } else {
                Message.warning('未查询到对象的属性字段')
            }
        }
    }
    ruleRef.value = styleList.value[0].code
    checkedactive.value = 0
    hoverIndex.value = -2
    hoverIndex2.value = -2
    hoverliIndex.value = -2
    hoverlideleteIndex.value = -2
    hoverlideleteIndexHover.value = -2
    hoverdeleteIndex.value = -2

}, { immediate: true })
const obtainType = (item: any) => {//输出这个属性名对应的类型
    if (typeof (item) !== 'boolean') {
        if (item.field) {
            const a = featureType.value.find((element) => element.key === item.field)
            return a?.type
        }

    } else {
        return true
    }

}

function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const changeOk = async () => {//点击确定
    if (currentMenu.value === 'edit') {
        const viewer = xbsjEarthUi.activeViewer
        if (!viewer) return
        viewer.capture().then(res => {
            if (res) {
                const parms = {
                    id: getUuid(),
                    name: getCurrentDateTime(),
                    code: ruleRef.value,
                    thumbnail: res
                }
                const modelStyles = window.localStorage.getItem('modelStyles')
                if (modelStyles) {
                    const a = JSON.parse(modelStyles)
                    a.historyStyle.unshift(parms)
                    if (a.historyStyle.length > 8) {
                        a.historyStyle = a.historyStyle.slice(0, 8)
                    }
                    window.localStorage.setItem('modelStyles', JSON.stringify(a))
                } else {
                    window.localStorage.setItem('modelStyles', JSON.stringify({ defaultStyle: [], historyStyle: [parms] }))
                }
                Message.success('设置样式成功')
                updateList()
            }
        }).catch(error => {
            console.log(error);
            Message.error(`设置样式失败！error:${error}`)
        })
        if (scenetree.value && scenetree.value.sceneObject) {
            const sceneObject = scenetree.value.sceneObject as ES3DTileset
            sceneObject.setFeatureStyle(ruleRef.value)
            emits("changeShow", false);
        }
    } else {
        try {
            const str = await getJson()
            const json = JSON.parse(str);
            let newJson: any[] = []
            json.forEach((item: any) => {
                if (Array.isArray(item.condition)) {
                    newJson.push(item)
                } else {
                    const i = item
                    const condition = item.condition
                    i.condition = [condition]
                    newJson.push(i)
                }
            })
            const viewer = xbsjEarthUi.activeViewer
            if (!viewer) return
            viewer.capture().then(res => {
                if (res) {
                    const parms = {
                        id: getUuid(),
                        name: getCurrentDateTime(),
                        code: newJson,
                        thumbnail: res
                    }
                    const modelStyles = window.localStorage.getItem('modelStyles')
                    if (modelStyles) {
                        const a = JSON.parse(modelStyles)
                        a.historyStyle.push(parms)
                        if (a.historyStyle.length > 8) {
                            a.historyStyle = a.historyStyle.slice(0, 8)
                        }
                        window.localStorage.setItem('modelStyles', JSON.stringify(a))
                    } else {
                        window.localStorage.setItem('modelStyles', JSON.stringify({ defaultStyle: [], historyStyle: [parms] }))
                    }
                    Message.success('设置样式成功')
                    updateList()
                }
            }).catch(error => {
                console.log(error);
                Message.error(`设置样式失败!error:${error}`)
            })
            if (scenetree.value && scenetree.value.sceneObject) {
                const sceneObject = scenetree.value.sceneObject as ES3DTileset
                sceneObject.setFeatureStyle(json)
                emits("changeShow", false);
            }

        } catch (error) {
            console.log('JSON格式错误!!!', error);
            if (error === undefined) {
                Message.error('样式未定义');
            } else {
                Message.error(`JSON格式错误！ error: ${error}`);
            }
            return
        }
    }
    currentMenu.value = 'edit'
    checkedactive.value = 0
    hoverIndex.value = -2
    hoverIndex2.value = -2
    hoverliIndex.value = -2
    hoverlideleteIndex.value = -2
    hoverlideleteIndexHover.value = -2
    hoverdeleteIndex.value = -2
}
const saveStyle = async () => {//点击另存为新样式
    if (currentMenu.value === 'edit') {//可视化编辑器
        const viewer = xbsjEarthUi.activeViewer
        if (!viewer) return
        viewer.capture().then(res => {
            if (res) {
                if (Object.keys(ruleRef.value).length === 0) {
                    Message.error('请输入内容之后再保存');
                    return
                }
                const parms = {
                    id: getUuid(),
                    name: '新建样式',
                    code: ruleRef.value,
                    thumbnail: res
                }
                const modelStyles = window.localStorage.getItem('modelStyles')
                if (modelStyles) {
                    const a = JSON.parse(modelStyles)
                    a.defaultStyle.push(parms)
                    window.localStorage.setItem('modelStyles', JSON.stringify(a))
                } else {
                    window.localStorage.setItem('modelStyles', JSON.stringify({ defaultStyle: [parms], historyStyle: [] }))
                }
                Message.success('另存样式成功')
                updateList()
            }
        }).catch(error => {
            console.log(error);
            Message.error(`另存样式成功!error:${error}`)
        })
    } else {
        try {
            const str = await getJson()
            const json = JSON.parse(str);
            let newJson: any[] = []
            json.forEach((item: any) => {
                if (Array.isArray(item.condition)) {
                    newJson.push(item)
                } else {
                    const i = item
                    const condition = item.condition
                    i.condition = [condition]
                    newJson.push(i)
                }
            })
            const viewer = xbsjEarthUi.activeViewer
            if (!viewer) return
            viewer.capture().then(res => {
                if (res) {
                    const parms = {
                        id: getUuid(),
                        name: '新建样式',
                        code: newJson,
                        thumbnail: res
                    }
                    const modelStyles = window.localStorage.getItem('modelStyles')
                    if (modelStyles) {
                        const a = JSON.parse(modelStyles)
                        a.defaultStyle.push(parms)
                        window.localStorage.setItem('modelStyles', JSON.stringify(a))
                    } else {
                        window.localStorage.setItem('modelStyles', JSON.stringify({ defaultStyle: [parms], historyStyle: [] }))
                    }
                    Message.success('另存样式成功')
                    updateList()
                }
            }).catch(error => {
                console.log(error);
                Message.error(`另存样式成功!error:${error}`)
            })

        } catch (error) {
            console.log('JSON格式错误!!!', error);
            if (error === undefined) {
                Message.error('请输入内容之后再保存');
            } else {
                Message.error(`JSON格式错误！ error: ${error}`);
            }
            return
        }
    }
}
const application = async () => {//点击应用
    flagApplection.value = true
    if (currentMenu.value === 'edit') {
        if (Object.keys(ruleRef.value).length === 0) {
            Message.error('样式未定义');
            return
        }
        if (scenetree.value && scenetree.value.sceneObject) {
            const sceneObject = scenetree.value.sceneObject as ES3DTileset
            sceneObject.setFeatureStyle(ruleRef.value)
        }
    } else {
        try {
            const str = await getJson()
            const json = JSON.parse(str);
            if (scenetree.value && scenetree.value.sceneObject) {
                const sceneObject = scenetree.value.sceneObject as ES3DTileset
                sceneObject.setFeatureStyle(json)
            }
        } catch (error) {
            console.log('JSON格式错误!!!', error);
            if (error === undefined) {
                Message.error('样式未定义');
            } else {
                Message.error(`JSON格式错误！ error: ${error}`);
            }
            return
        }
    }
}
const updateList = () => {//更新本地存储的样式列表
    const modelStyles = window.localStorage.getItem('modelStyles')
    if (modelStyles) {
        const a = JSON.parse(modelStyles)
        localStorageStyle.value = a
    }
}
onMounted(() => {
    updateList()
})
//更新缩略图
const updateConfirm = (index: number) => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.capture().then(res => {
        if (res) {
            const modelStyles = window.localStorage.getItem('modelStyles')
            if (modelStyles) {
                const a = JSON.parse(modelStyles)
                a.defaultStyle[index].thumbnail = res
                window.localStorage.setItem('modelStyles', JSON.stringify(a))
                localStorageStyle.value = a
            }
            inputIndex.value = null
        }
    }).catch(error => {
        console.log(error);
    })
}
//删除
const deleteConfirm = (index: number) => {
    const modelStyles = window.localStorage.getItem('modelStyles')
    if (modelStyles) {
        let a = JSON.parse(modelStyles)
        a.defaultStyle.splice(index, 1)
        window.localStorage.setItem('modelStyles', JSON.stringify(a))
        localStorageStyle.value = a
    }
    inputIndex.value = null
}
//json编辑器初始化
const loadIframe = async () => {
    await setJson(JSON.stringify(ruleRef.value, undefined, '    '))
}
const mainIframe = ref<HTMLIFrameElement>();//json对应的元素
function setJson(value: string) {//设置json
    return new Promise<void>((resolve, reject) => {
        if (!mainIframe.value || !mainIframe.value.contentWindow) {
            return;
        }
        const setKey = getUuid()
        mainIframe.value.contentWindow.postMessage({ type: 'setJson', id: setKey, value })
        const time = setTimeout(() => {
            removeEventListener('message', messageSetEventWatch, false);
            reject();
        }, 10000);

        const messageSetEventWatch = (messageEvent: MessageEvent<{ type: string, id: string, status: string } | undefined>) => {
            var data = messageEvent.data;
            if (!data || (data.type && data.type !== 'setJsonReturn') || (data.id && data.id !== setKey)) {
                return;
            }
            removeEventListener('message', messageSetEventWatch, false);
            clearTimeout(time)
            if (data.status === 'ok') {
                resolve();
            } else {
                reject();
            }
        }
        addEventListener('message', messageSetEventWatch, false);
    })
}
function getJson() {//获取json上面的内容
    return new Promise<string>((resolve, reject) => {
        if (!mainIframe.value || !mainIframe.value.contentWindow) {
            return;
        }
        const getKey = getUuid()
        mainIframe.value.contentWindow.postMessage({ type: 'getJson', id: getKey })
        const time = setTimeout(() => {
            removeEventListener('message', messageGetEventWatch, false);
            reject();
        }, 10000);

        const messageGetEventWatch = (messageEvent: MessageEvent<{ type: string, id: string, status: string, value: string | undefined } | undefined>) => {
            var data = messageEvent.data;
            if (!data || (data.type && data.type !== 'getJsonReturn') || (data.id && data.id !== getKey)) {
                return;
            }
            removeEventListener('message', messageGetEventWatch, false);
            clearTimeout(time)
            if (data.status === 'ok' && data.value) {
                resolve(data.value);
            } else {
                reject();
            }
        }
        addEventListener('message', messageGetEventWatch, false);
    })

}
function getUuid() {//设置随机id
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
</script>
<style scoped>
.set_style {
    width: 100%;
    height: 100%;
    display: flex;
}

.set_style_list {
    width: 250px;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-right: 1px solid #4a4545;
}

.set_style_list>.style_list {
    width: 100%;
    flex: 1;
    overflow: auto;
}

.style_list_story {
    width: 100%;
    height: 160px;
    overflow: auto;
}

.style_list_div,
.style_list_div_stoy {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    max-height: 100%;
    overflow-x: hidden;
}

.style_button {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.style_button>button {
    height: 32px;
    background: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
    border: 1px solid #3b3c40;
    cursor: pointer;
    color: rgba(230, 230, 230, 1);
    padding: 0 10px;
    text-decoration: none;
    font-size: 12px;
    line-height: 32px;
    margin-right: 20px;
}


.style_button>button:hover {
    border: 1px solid rgba(44, 104, 247, 1);
}

.set_style_list_lilist {
    width: 50px;
    height: 80px;
    margin-right: 6px;
    border-radius: 5px;
    position: relative;
}

.set_imgposition {
    border-radius: 5px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: 2px solid rgba(37, 38, 42, 0.9);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.set_imgposition>img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
}

.set_style_edit {
    flex: 1;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.set_style_rule1 {
    width: 100%;
    height: 30px;
    border-bottom: transparent;
    box-sizing: border-box;
    margin-top: 10px;
    font-size: 14px;
}

.set_style_rule2 {
    width: 100%;
    flex: 1;
    box-sizing: border-box;
    overflow-y: auto;
    font-size: 14px;
}

.set_style_rule_list {
    display: flex;
    text-align: center;
    background-color: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
}

.set_style_rule_list2 {
    display: flex;
    text-align: center;
    border-bottom: 1px solid #111111;
    padding: 10px;
}

.style_rule_list_index {
    width: 8%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.style_rule_list_two {
    width: 52%;
    box-sizing: border-box;
}

.rule_list_two_name {
    width: 100%;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
    margin-bottom: 10px;
}

.rule_list_two_name2 {
    width: 100%;
    height: 30px;

}

.rule_list_two_name2>div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

}

.rule_list_two_valuename,
.rule_list_two_Operator,
.rule_list_two_value {
    width: 30%;
}

.rule_list_two_Operator_ban {
    pointer-events: none !important;
}

.rule_list_two_value>input {
    width: 100%;
    height: 26px;
    background: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
    border: 1px solid #3b3c40;
    margin-right: 0;
    color: rgba(230, 230, 230, 1);
    padding: 0 13px 0 11px;
    box-sizing: border-box;
    outline: none;
}

.rule_list_two_value>.input_ban {
    background: rgba(48, 48, 48, 0.6) !important;
    cursor: not-allowed;
}

.rule_list_two_value>input:hover {
    border: 1px solid #2c68f7;
}

.rule_list_two_value>input:focus {
    border: 1px solid #2c68f7;
}

.rule_list_two_change {
    width: 10%;
}

.style_rule_list_color {
    width: 20%;
    /* border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc; */
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
}

.style_rule_list_show {
    width: 10%;
    /* border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc; */
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

}

.style_rule_list_show>div {
    width: 26px;
}

.style_rule_list_change {
    width: 10%;
    /* border-bottom: 1px solid #ccc; */
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

}

.setStyle_onlineimageName {
    display: inline-block;
    width: 46px;
    text-align: center;
    margin-left: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    cursor: pointer;
    font-size: 11px;
}

.set_imgposition>span {
    position: absolute;
    bottom: 23px;
    white-space: nowrap;
    padding: 2px;
    z-index: 10000;
    border-radius: 2px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 12px;
    /* width: 46px; */
}

.set_imgposition:hover {
    border: 2px solid rgba(44, 104, 247, 1);
}

.set_checkedactive {
    border: 2px solid rgba(44, 104, 247, 1);
}

.model_content_right_input {
    width: 50px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    outline: none;
}

.set_style_name {
    width: 100%;
    height: 30px;
    text-align: center;
}

.set_style_tab {
    width: 100%;
    height: 30px;
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
}

.set_style_tab>div {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

}

.style_rule_edit {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}


.header_item3 {
    width: 130px;
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.header_item3>span {
    display: inline-block;
    height: 100%;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    color: rgba(183, 183, 183, 1);
    min-width: 130px;
}

.header_active3 {
    color: #fff !important;
    background: linear-gradient(180deg, rgba(87, 136, 255, 0) 0%, rgba(87, 136, 255, 0.26) 100%, #5788FF 100%) !important;

}

.header_item3:hover .header_item_span3 {
    color: #fff;
    background: linear-gradient(180deg, rgba(87, 136, 255, 0) 0%, rgba(87, 136, 255, 0.26) 100%, #5788FF 100%) !important;
}
</style>
