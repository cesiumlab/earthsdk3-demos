<template>
    <div class="neck_ft">
        <!-- 图标 -->
        <div class="neck_loge">
            <div class="logo_img" :style="`background-image: url(${$config.logoImage})`"></div>
            <a :href="$config.logoLink" target="_blank">{{ $config.logoTitle }}</a>
        </div>
        <!-- 导航栏 -->
        <div class="neck_nav">
            <div v-for="(item, index) in navList" v-show="item.isShow" :key="item.id" @click="change(item)"
                class="neck_title" @mouseover="iconheight = index" @mouseout="iconheight = -1"
                :class="navType === item.value ? 'activated' : ''">
                <span style="margin-top: 3px;"><es-icon :name="item.icon"
                        :color="navType === item.value ? 'rgba(87, 136, 255, 1)' : iconheight === index ? 'rgba(87, 136, 255, 1)' : '#fff'"
                        :size="14" /></span>
                <span style="margin-left: 6px;">{{ item.title }}</span>
            </div>
        </div>
        <!-- 保存按钮 -->
        <div class="neck_save" v-if="fromIsExist">
            <div class="neck_scene" @click="scene">
                <es-icon :name="'baocun'" :color="'#fff'" :size="14" />
                <div class="right_button_content">{{ '保存场景' }}</div>
                <div class="right_button_span" @click.stop.prevent="xiaosanjiao = !xiaosanjiao">
                    <span class="xiaosanjiao" :class="xiaosanjiao ? 'xiaosanjiao_transform' : ''"></span>
                </div>
            </div>
            <ul class="neck_ft_ul" v-if="!xiaosanjiao">
                <li v-for="item in sceneList" @click="item.fun()">
                    {{ item.content }}
                </li>
            </ul>
        </div>
        <div class="neck_save" v-else>
            <div class="neck_scene" @click="saveAs(xbsjEarthUi.json, '场景文件')">
                <es-icon :name="'baocun'" :color="'#fff'" :size="14" />
                <div class="right_button_content">{{ '保存到本地' }}</div>
            </div>
        </div>
    </div>
    <!-- 组件栏 -->
    <div class="sub_menu" :style="getsubMenuStyle()">
        <div class="sub_menu_button" @click="rightModuleShow = !rightModuleShow"
            :class="rightModuleShow ? '' : 'sub_menu_button_checked'"></div>
        <div class="submenu_component" id="submenu_component">
            <component :is="com"></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Message, toVR, createVueDisposer } from "earthsdk-ui";
import { parse } from 'search-params';
import { inject, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import { getSaveFileHandle, saveFile } from "earthsdk-ui";
import { JsonValue } from "xbsj-base";
import { post, put, get } from '../api/service';
import { XbsjEarthUi } from '../scripts/xbsjEarthUi';
import { $config } from "../scripts/getConfig"
const props = withDefaults(defineProps<{
    navList: any[],
    navType: string | undefined,
}>(), {
    navType: 'roam'
})
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const navType = ref('roam')
//////////////////////////////////导航栏逻辑
const cesiumLabUrl = ref()
const esssUrl = ref()
const iconheight = ref(-1)
const { navList } = props
const disposer = createVueDisposer(onBeforeUnmount);
const rightModuleShow = toVR<boolean>(disposer, [xbsjEarthUi, 'rightModuleShow'])
const fromIsExist = ref(true)
//ESSS信令服务器保存
const esssScene = (parseSearch: any, uri: string) => {
    // const origin = 'http://localhost:9006';
    const sceneid = parseSearch.ESSSsceneid as string
    const token = parseSearch.token as string
    const appid = parseSearch.appid as string
    const allJson = xbsjEarthUi.json
    if (!appid) {
        Message.error(`无appid,保存场景失败`)
        return
    }
    get(`${xbsjEarthUi.esssUrl}/setting/get`).then(async (res) => {
        if (!sceneid) {
            const thumbnail = await xbsjEarthUi.activeViewer?.capture()
            post(`${uri}/staticscene/create`, { name: '默认场景', appid, thumbnail, content: JSON.stringify(allJson) }, token).then((res: any) => {
                if (res.status === 'ok') {
                    Message.success(`保存场景成功：${appid}`)
                } else {
                    Message.error(`保存场景失败：${appid}`)
                }
            }).catch(error => {
                console.log(error);
                Message.error(`保存场景失败：${appid}!${error}`)
            })
        } else {
            post(`${uri}/staticscene/update`, { id: sceneid, content: JSON.stringify(allJson) }, token).then((res: any) => {
                if (res.status === 'ok') {
                    Message.success(`保存场景成功：${appid}`)
                } else {
                    Message.error(`保存场景失败：${appid}`)
                }
            }).catch(error => {
                console.log(error);
                Message.error(`保存场景失败：${appid}!${error}`)
            })
        }

    }).catch(err => {
        console.log(err);
        put(`${uri}/staticscene/${sceneid}`, { content: allJson }, token).then((res: any) => {
            if (res.status === 'ok') {
                Message.success(`保存场景成功：${appid}`)
            } else {
                Message.error(`保存场景失败：${appid}`)
            }
        }).catch(error => {
            console.log(error);
            Message.error(`保存场景失败：${appid}!${error}`)
        })
    })
}
//CesiumLab端保存
const cesiumLabScene = async (parseSearch: any, uri: string) => {
    const allJson = xbsjEarthUi.json
    const thumbnail = await (xbsjEarthUi.activeViewer?.capture())
    if (parseSearch.scene) {
        const params = {
            content: JSON.stringify(allJson),
            newId: parseSearch.scene,
            id: parseSearch.scene,
            thumbnail: thumbnail
        }
        let url = `${uri}/tile/scene/update`
        if (xbsjEarthUi.cesiumLabToken) {
            url += `?labtoken=${xbsjEarthUi.cesiumLabToken}`
        }
        const token = localStorage.getItem('token') as string | undefined
        post(url, params, xbsjEarthUi.cesiumLabToken ? undefined : token).then((res: any) => {
            if (res.code === 1000) {
                Message.success(`更新场景成功：${parseSearch.scene}`)
            } else {
                Message.error('更新场景失败')
            }
        }).catch(error => {
            console.log(error);
            Message.error(`更新场景失败!${error}`)
        })
    } else {
        const params = {
            name: '新建场景',
            description: '描述',
            content: JSON.stringify(allJson),
            thumbnail: thumbnail
        }
        let url = `${uri}/tile/scene/create`
        if (xbsjEarthUi.cesiumLabToken) {
            url += `?labtoken=${xbsjEarthUi.cesiumLabToken}`
        }
        const token = localStorage.getItem('token') as string | undefined
        post(url, params, xbsjEarthUi.cesiumLabToken ? undefined : token).then((res: any) => {
            if (res.code === 1000) {
                Message.success(`创建场景成功：${res.data.id}`)
                //替换地址栏
                window.history.pushState({}, '', window.location.origin + window.location.pathname + `?from=${$config.jumpOrigin}${xbsjEarthUi.cesiumLabToken ? '&cesiumLabToken=' + xbsjEarthUi.cesiumLabToken : ''}&scene=${res.data.id}`);
            } else {
                Message.error('创建场景失败')
            }
        }).catch(error => {
            console.log(error);
            Message.error(`创建场景失败!${error}`)
        })
    }
}
//点击保存场景，判断是cesium还是esss
const scene = () => {
    const search = window.location.search.substring(1)
    const parseSearch = parse(search)
    if (parseSearch.from === $config.jumpOrigin) {
        cesiumLabScene(parseSearch, cesiumLabUrl.value)
    } else if (parseSearch.from === 'esss') {
        esssScene(parseSearch, esssUrl.value)
    } else {
        Message.warning('请输入服务地址')
    }
}
const xiaosanjiao = ref(true)
const sceneList = [
    {
        content: '保存到本地',
        fun: () => {
            console.log(xbsjEarthUi.json);
            saveAs(xbsjEarthUi.json, '场景文件')
        }
    }
]
//保存到本地
const saveAs = async (json: JsonValue, name: string) => {
    try {
        const handle = await getSaveFileHandle('json', name);
        if (!handle) return;
        const jsonStr = JSON.stringify(json, undefined, '    ');
        await saveFile(handle, jsonStr);
        Message.success('另存成功!');
    } catch (error) {
        Message.error(`另存失败! error: ${error}`);
    }
}
onMounted(() => {
    navType.value = props.navType
    navList.forEach((item) => {
        if (item.value === props.navType) {
            com.value = item.component
            return
        }
    })
    esssUrl.value = xbsjEarthUi.esssUrl
    cesiumLabUrl.value = xbsjEarthUi.cesiumLabUrl
    xbsjEarthUi.dispose(xbsjEarthUi.cesiumLabUrlChanged.disposableOn(() => {
        cesiumLabUrl.value = xbsjEarthUi.cesiumLabUrl
    }))
    xbsjEarthUi.dispose(xbsjEarthUi.esssUrlChanged.disposableOn(() => {
        esssUrl.value = xbsjEarthUi.esssUrl
    }))
    const search = window.location.search.substring(1)
    const parseSearch = parse(search)
    if (!parseSearch.from) {
        fromIsExist.value = false
    }
})

//////////////////////////////////组件栏逻辑
const com = shallowRef(navList[0].component)
const change = (item: any) => {
    if (item.value === navType.value) {
        rightModuleShow.value = !rightModuleShow.value
    } else {
        rightModuleShow.value = true
        com.value = item.component
        navType.value = item.value
    }
}
const getsubMenuStyle = () => ({
    right: rightModuleShow.value ? '0px' : '-280px'
})
// //////////////////////////////////属性逻辑
watch(rightModuleShow, () => {
    if (rightModuleShow.value) {
        xbsjEarthUi.navigatorManager.navigatorScaleRight = 290
        xbsjEarthUi.navigatorManager.timeLineWidth = 'calc(100% - 280px)'
    } else {
        xbsjEarthUi.navigatorManager.navigatorScaleRight = 10
        xbsjEarthUi.navigatorManager.timeLineWidth = '100%'
    }
}, { immediate: true })
</script>
<style src="../css/General.css"></style>
<style scoped>
.xbsj_header {
    width: 100%;
    height: 40px;
    background-color: #2F3034;
    border-bottom: 1px solid #111111;
    box-sizing: border-box;
}

.sub_menu {
    width: 280px;
    height: calc(100% - 70px);
    position: fixed;
    transition: right 0.4s linear;
    right: 0;
    top: 40px;
    background-color: rgba(37, 38, 42, 0.90);
    z-index: 1;
}

.sub_menu_button {
    position: absolute;
    left: -30px;
    top: 0;
    width: 30px;
    height: 30px;
    background: rgba(37, 38, 42, 1);
    background-image: url(../assets/top/shouqi.svg);
    transition: background-image 0.4s linear;
    background-size: 15px 14px;
    background-repeat: no-repeat;
    background-position: center;
    border-bottom: 1px solid rgba(17, 17, 17, 1);
    border-left: 1px solid rgba(17, 17, 17, 1);
    box-sizing: border-box;
    cursor: pointer;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
}

.sub_menu_button_checked {
    background-image: url(../assets/top/zhankai.svg);
}

.neck_ft {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
}

.neck_ft>.neck_loge {
    width: 270px;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 8px;
}

.neck_ft>.neck_loge>img {
    width: 43px;
    height: 43px;

}

.neck_ft>.neck_loge>.logo_img {
    width: 43px;
    height: 43px;
    background-size: 100% 100%;
}

.neck_ft>.neck_loge>a {
    flex: 1;
    height: 28px;
    border-left: 1px solid rgba(87, 91, 102, 0.3);
    margin-left: 10px;
    padding-left: 20px;
    font-size: 16px;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 500;
    color: #fff;
    line-height: 28px;
    text-decoration: none;
}

.neck_ft>.neck_nav {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.neck_ft>.neck_nav>.neck_title {
    width: 105px;
    height: 100%;
    font-size: 14px;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    transition: color 0.3s linear;
    overflow: hidden;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.neck_ft>.neck_nav>.neck_title:hover {
    background: linear-gradient(180deg, rgba(87, 136, 255, 0) 0%, rgba(87, 136, 255, 0.26) 100%, #5788FF 100%);
    color: #5788FF;
}

.activated {
    background: linear-gradient(180deg, rgba(87, 136, 255, 0) 0%, rgba(87, 136, 255, 0.26) 100%, #5788FF 100%) !important;
    color: #5788FF !important;
}

.neck_ft>.neck_save {
    width: 270px;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 8px;
    position: relative;
}

.neck_scene {
    width: 100px;
    height: 28px;
    position: absolute;
    right: 15px;
    top: 6px;
    background: rgba(28, 28, 30, 0.9);
    border-radius: 8px;
    display: flex;
    padding: 0 0 0 6px;
    box-sizing: border-box;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    user-select: none;
    border: 1px solid rgba(28, 28, 30, 0.9);
    color: #fff;
    font-size: 14px;
}

.neck_scene:hover {
    border: 1px solid #2C68F7;
}

.right_button_span {
    width: 18px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.xiaosanjiao {
    width: 6px;
    height: 6px;
    transition: .5s;
    background-image: url(../assets/right/xiaosanjiaoshouqi.svg);
    background-size: 100% 100%;
}

.xiaosanjiao_transform {
    transform: rotate(-90deg);
}

.right_button_content {
    margin-left: 3px;
}

.scene_active {
    color: rgba(255, 255, 255, 1);
    border: 1px solid #2C68F7;
}

.neck_ft_ul {
    position: absolute;
    z-index: 20;
    max-height: 100px;
    right: 15px;
    top: 36px;
    overflow-y: auto;
    background: #292a2e;
    box-shadow: 0px 2px 6px 0px rgba(26, 26, 28, 0.68);
    border-radius: 4px;
    overflow-x: hidden;
    margin: 0;
    padding: 0;

}

.neck_ft_ul>li {
    list-style: none;
    width: 120px;
    height: 26px;
    font-size: 12px;
    line-height: 26px;
    cursor: pointer;
    text-align: left;
    padding-left: 10px;
    margin: 0;
    white-space: nowrap;
    color: rgba(230, 230, 230, 1);
}

.neck_ft_ul>li:hover {
    background: #37393e;
}

.es_PropPanel {
    position: absolute;
    left: -30px;
    top: 0;
    width: 30px;
    height: 30px;
    background: rgba(37, 38, 42, 1);
    border-bottom: 1px solid rgba(17, 17, 17, 1);
    border-left: 1px solid rgba(17, 17, 17, 1);
    box-sizing: border-box;
    cursor: pointer;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
