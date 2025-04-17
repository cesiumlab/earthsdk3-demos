

const createUeEngine = {
    template: `
        <div id="mark" v-show=show>
            <div id="confirm">
                <div class="title">
                    <p>ESSS信令服务器地址：<a href="https://www.cesiumlab.com/esss.html"target="_blank">https://www.cesiumlab.com/esss.html</a>
                      <a href="https://www.bilibili.com/video/BV17m411Z72S/?share_source=copy_web&vd_source=6b2f4b5f58a5e9c4201a7336f29ff597" class="to-link" target="_blank">视频教学</a>
                    </p>
                </div>
                <div class="top">
                <label for="">服务地址</label> <input id="uri" type="text" v-model="uri"  @blur="init()" @keydown.enter="init()">
                <label for="">应用id</label> <input id="appid" type="text" v-model="app">
            </div>
                <div class="middle">
                    <div  v-for="item in list" :ket="item.id" @click="selectAPP(item)" :class="{selected:app==item.id}" >
                        <img :src="item.thumbnail?item.thumbnail:'./thumbnail/fail.png'"  width="80" height="80"/>
                        <p>{{item.name}}</p>
                    </div>
                    <p class="tip" v-if="status &&list.length<=0">暂无实例，请移步到ESSS配置!</p>
                    <p class="tip" v-if="!status">请检查ESSS信令服务器是否启动!</p>
                </div>
                <div class="footer">
                    <button @click="confirm">确定</button>
                </div>
            </div>
        </div>`,
    data() {
        return {
            show: true,
            uri: "http://localhost:9007/",
            app: "",
            domid: document.getElementById("app"),
            list: [],
            status: false
        }
    },
    props: ['objm'],
    mounted() {
        this.init()
    },
    methods: {
        init() {
            try {
                fetch(`${this.uri}ue/app`).then(response => response.text()).then((value) => {
                    this.status = true
                    this.list = JSON.parse(value).data
                }).catch(res => {
                    this.list = []
                    this.app = ""
                    this.status = false
                })
            } catch (error) {

            }
        },
        switchUE() {
            this.init()
            this.show = true
        },
        video() {
            window.open("https://www.bilibili.com/video/BV17m411Z72S/?share_source=copy_web&vd_source=6b2f4b5f58a5e9c4201a7336f29ff597")
        },
        confirm() {
            if (!objm) {//该objm可以传入，目前直接用的页面中定义得变量
                alert("ESObjectManager管理器为空，请检查")
                return
            }

            if (!this.domid) {
                alert("未获取到对应的dom元素")
                return
            }
            if (!this.uri) {
                alert("请填写ESSS信令服务器接口服务地址参数uri")
                return
            }
            if (!this.app) {
                alert("请填写实例id参数app")
                return
            }
            // 切换到UE视口API
            const options = {
                type: "ESUeViewer",
                container: this.domid,
                options: {
                    uri: this.uri,
                    app: this.app
                },
            }
            objm.createUeViewer(options)
            this.show = false
        },

        selectAPP(item) {
            this.app = item.id
        }
    }
}
const vm = Vue.createApp({
    components: {
        createUeEngine
    }
})
vm.mount("#root");
