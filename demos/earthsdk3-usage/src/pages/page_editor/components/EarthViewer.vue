<template>
    <div class="panel">
        <div class="header">
            <div class="left">
                <div class="box" @click="changeEditorShow">
                    <img src="../assets/code.png" alt="" width="25" height="25">
                    <p> {{ editorShow ? '收起源代码' : '查看源代码' }}</p>
                </div>
            </div>
            <div class="middle">
                示例教程—{{ title }}
            </div>
            <div class="right">
                <div class="box">
                    <img src="../assets/code.png" alt="" width="25" height="25">
                    <p @click="turnUrl('https://wzonfjgpzd.feishu.cn/docx/NUssdX48WobIqlxU9dFcaRDhnwc')">教程</p>
                </div>
                <div class="box">
                    <img src="../assets/jiaocheng.png" alt="" width="18" height="18">
                    <p @click="turnUrl('https://www.wolai.com/earthsdk/nrp963KZyrXAtmGgUeuLRo')">文档</p>
                </div>

                <div class="box">
                    <img src="../assets/load.png" alt="" width="18" height="18">
                    <p @click="turnUrl('https://gitee.com/cesiumlab/earthsdk2-examples')">下载源码</p>
                </div>

                <div class="box">
                    <img src="../assets/-zixun.png" alt="" width="18" height="18">
                    <button @click="viewVersion" class="box-info">版本信息</button>
                    <div class="box-version" v-show="versionShow">
                        <div>"esobjs-xe2-plugin": "{{ esobjsXe2plugin }}"</div>
                        <div>"vue-xe2-plugin": "{{ vueXe2Plugin }}"</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="iframe">
            <iframe src="about:blank#" unselectable="on" frameborder="0" scrolling="no"
                style="width: 100%; height: 100%" ref="myIframe" id="codeIframe" allowfullscreen></iframe>
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, defineProps, defineEmits, watch } from "vue";
import axios from "axios";
const emits = defineEmits(['update:editorShow'])
import { getUrlParam } from "@/scripts/utils.js"
import { esobjsXe2plugin, vueXe2Plugin } from "@/scripts/version.js"
const props = defineProps({
    code: {
        type: String,
        required: false
    },
    editorShow: {
        type: Boolean,
        default: false,
        required: false
    }
})
const versionShow = ref(false);
const viewVersion = () => {
    versionShow.value = !versionShow.value;
}
const editorShow = ref(props.editorShow)
const title = ref('')

/**
 * 显示和隐藏源码编辑器
 */
function changeEditorShow() {
    editorShow.value = !editorShow.value
    emits('update:editorShow', editorShow.value)
}

/**
 * 获取名称
 * @param {*} id 
 * @param {*} data 
 */
function getTitle(id, data) {
    if (Array.isArray(data)) {
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            if (item.path == id) {
                title.value = item.name
            }
            if (item.children && item.children.length > 0) {
                getTitle(id, item.children)
            }
        }
    }
}

/**
 * 跳转URL
 * @param {*} url 
 */
function turnUrl(url) {
    window.open(url)
}
watch(() => props.code, () => {
    runCode(props.code)
})


//运行代码
const runCode = (value) => {
    const obj = getUrlParam()
    axios.get("./data/example.json").then(res => {
        getTitle(obj.id, res.data)
    })

    //销毁 iframe
    const node = document.getElementById("codeIframe");
    if (!node) return
    node.src = "about:blank";
    document.getElementById("iframe").removeChild(node);

    // 创建iframe
    var iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.margin = "0";
    iframe.style.padding = "0";
    iframe.style.overflow = "hidden";
    iframe.style.border = "none";
    iframe.id = "codeIframe";
    // iframe.src = "about:blank#";
    document.getElementById("iframe").appendChild(iframe);
    try {
        // 写入内容
        const iframeDom = document.querySelector("#codeIframe");
        iframeDom.contentWindow.document.open();
        iframeDom.contentWindow.document.write(value);
        iframeDom.contentWindow.document.close();
    } catch (error) {

    }
};


onMounted(() => {
    const obj = getUrlParam()
    axios.get("./data/example.json").then(res => {
        getTitle(obj.id, res.data)
    })


})
onBeforeUnmount(() => {
    console.log('onBeforeUnmount');
})

</script>

<style scoped>
@media screen and (max-width: 550px) {

    .left,
    .right {
        display: none !important;
    }

    .header {
        justify-content: center !important;
    }

}

.box-info {
    position: relative;
    background: #141414;
    border: none;
    color: #1690d9;
    font-weight: 700;

}

.box-version {
    position: absolute;
    top: 5%;
    right: 1%;
    width: 15%;
    background-color: #525455;
    color: #fff;
    padding: 10px;
    border-radius: 4px;

}

.panel {
    width: 100%;
    height: 100%;
}

p {
    padding: 0px;
    margin: 0px;
}

#iframe {
    display: block;
    width: 100%;
    height: calc(100% - 40px);

}

iframe {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    border: none;
    box-sizing: border-box;
}

.header {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    background: #141414;
    display: flex;
    justify-content: space-between;
}

.left {
    height: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #1690d9;
    font-size: 14px;
    font-weight: bold;
}

.middle {
    display: flex;
    align-items: center;
    color: #fff;
}

.right {
    display: flex;
    padding-right: 10px;
    box-sizing: border-box;
    height: 100%;
    cursor: pointer;
    line-height: 40px;
    color: #1690d9;
    font-size: 14px;
    font-weight: bold;
}

.box {
    display: flex;
    align-items: center;
    padding: 10px
}

.box>p:hover {
    color: #2fb3ff;
}
</style>
