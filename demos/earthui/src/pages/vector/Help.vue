<script setup lang='ts'>
import { inject, ref } from 'vue';
import { setEnvironmentVariable } from 'earthsdk-ui';
import { ESSceneObject, ESViewer } from "earthsdk3";
import JsonStringProps from './JsonStringProps.vue';
import PullMenu from './PullMenu.vue';
import Window from '../../components/commom/Window.vue';
import MarkdownReader from './MarkdownReader.vue';
import ConvertEnvironment from './ConvertEnvironment.vue'
import RightList from '../../components/RightList.vue';
import Button from '../../components/Button.vue';
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

const pullMenuIsShow = ref<boolean | undefined>(false)
const baseItemsHelp = [
    {
        text: "当前项目配置信息",
        keys: "",
        func: () => {
            let content = xbsjEarthUi.json;
            console.log(content);
            openJsonEdit(JSON.stringify(content, undefined, '    '))
        },
    },
    {
        text: '当前项目环境变量列表',
        keys: "",
        func: () => {
            const { context } = ESSceneObject;
            //@ts-ignore
            const env = context._environmentVariables as { [k: string]: string };
            const envKeys = Object.keys(env);
            envKeys.sort();
            const str = envKeys.map(e => `${e} | ${env[e]}`).join('\n');
            console.log(str);
            setMarkdownOrJson(true, '环境变量列表', str)
        }
    },
    {
        text: '所有场景对象类型列表',
        keys: "",
        func: () => {
            const { context } = ESSceneObject;
            console.log(context);
            //@ts-ignore
            const typeNames = [...context._esObjConstructors.keys()];
            typeNames.sort();
            const json = typeNames.map(e => ({
                type: e,
                info: context.getProps(e),
            }));
            const jsonStr = JSON.stringify(json, undefined, '    ');

            setMarkdownOrJson(true, '对象列表', jsonStr)
        }
    },
    {
        type: "divider",
    },
    {
        text: 'EarthSDK2  API文档',
        keys: "",
        func: () => {
            window.open('https://www.wolai.com/earthsdk/nrp963KZyrXAtmGgUeuLRo', '_blank');
        }
    },
    {
        text: 'EarthSDK3  API文档',
        keys: "",
        func: () => {
            window.open('https://c0yh9tnn0na.feishu.cn/wiki/NcIww74yTiNq0EkVxszc5XtOnqf', '_blank');
        }
    },

];
const jsonStr = ref<string>('')
const jsonStrShow = ref(false)

const openJsonEdit = (jsonStrs: string) => {
    jsonStr.value = jsonStrs
    jsonStrShow.value = true
}
const changeShow = (flag: boolean) => {
    jsonStrShow.value = flag
}
const setJson = (str: string) => {
    if (str === '') return
    xbsjEarthUi.json = JSON.parse(str)
}
const showEnvironment = ref(false)
const localEnvironment = ref('[]')
const getEnvironment = () => {
    showEnvironment.value = true
    const storage = localStorage.getItem("XE2LocalEnvironmentVariable");
    if (!storage) return
    const itemList = JSON.parse(storage) as { name: string, dir: string | undefined }[]
    localEnvironment.value = JSON.stringify(itemList, undefined, '    ');
}
const envSampleValue = `
#### 此为示例数据，如果想要新增环境变量，请往数组内部添加
${'```'}js
[
  {
    "name": "vue-xe2-plugin-assets-dir",
    "enabled":true,
    "dir":"http://localhost:8080/js/vue-xe2-plugin/dist-web/vue-xe2-plugin-assets"
  }
]
${'```'}
`
const setEnvironment = (str: string) => {
    localStorage.setItem("XE2LocalEnvironmentVariable", str)
    const itemList = JSON.parse(str) as { name: string, enabled: boolean, dir: string | undefined }[]
    if (itemList.length === 0) return

    const list = itemList.filter(el => {
        if (el.enabled) return el
    })
    if (list.length === 0) return
    list.forEach(el => {
        setEnvironmentVariable(el.name, el.dir)
    })

    showEnvironment.value = false
    localEnvironment.value = '[]'
}
const changeEnvironment = (flag: boolean) => {
    showEnvironment.value = flag
    localEnvironment.value = '[]'
}
const isJson = ref(false);
const markdownTitle = ref('信息');
const aboutInfo = ref('');

const setMarkdownOrJson = (isJsonFlag: boolean, title: string, markdownOrJsonstr: string) => {
    isJson.value = isJsonFlag
    markdownTitle.value = title
    if (aboutInfo.value !== "") {
        aboutInfo.value = ''
    }
    aboutInfo.value = markdownOrJsonstr
}
const offMarkdown = () => {
    aboutInfo.value = ''
    markdownTitle.value = '信息'
    isJson.value = false
}
const convertEnvironment = ref(false)

</script>
<template>
    <RightList :title="'帮助'">
        <Button :name="'bangzhuliebiao'" :content="'帮助列表'" :actived="pullMenuIsShow"
            :click="() => { pullMenuIsShow = !pullMenuIsShow }" :left-button="true"></Button>
        <PullMenu v-show="pullMenuIsShow" :menuList="baseItemsHelp" @funClick="pullMenuIsShow = undefined">
        </PullMenu>
    </RightList>

    <JsonStringProps :jsonStr="jsonStr" :isShow="jsonStrShow" @changeShow="changeShow" @getJsonStr="setJson">
    </JsonStringProps><!--当前项目配置信息-->
    <JsonStringProps :jsonStr="localEnvironment" :isShow="showEnvironment" :sampleValue="envSampleValue"
        @getJsonStr="setEnvironment" @changeShow="changeEnvironment">
    </JsonStringProps><!--本地环境变量管理-->
    <Window :title="markdownTitle" :show="!!aboutInfo" :only-button="true" @ok="offMarkdown" :ok-text="'关闭'"
        :width="800" :height="500">
        <div style="margin: 20px;height: calc(100% - 40px);overflow: auto;">
            <MarkdownReader :is-Json="isJson" :markdown-str="aboutInfo"></MarkdownReader>
        </div>
    </Window>
    <ConvertEnvironment v-if="convertEnvironment" @close="convertEnvironment = false"></ConvertEnvironment>
</template>
<style></style>
