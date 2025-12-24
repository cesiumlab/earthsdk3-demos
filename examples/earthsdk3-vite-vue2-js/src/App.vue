<template>
    <div class="box">
        <div class="btn-box">
            <button @click="switchViewer('cesium')">切换为Cesium</button>
            <button @click="switchViewer('ue')">切换为UE</button>
        </div>

        <!-- 视口容器 -->
        <div class="container" ref="container"></div>
    </div>
</template>

<script>
export default {
    name: 'ViewerSwitcher',
    inject: ['objm'],
    mounted() {
        this.$nextTick(() => {
            const container = this.$refs.container;
            // 创建视口
            const viewer = this.objm.createCesiumViewer(container);
            console.log(viewer);
        });
    },

    methods: {
        switchViewer(type) {
            const container = this.$refs.container;
            if (!container) return;

            let option = {
                type: 'ESCesiumViewer',
                container
            };

            if (type === 'ue') {
                // 需要配置ESSS信令服务器 https://bjxbsj.cn/esss.html
                option = {
                    type: 'ESUeViewer',
                    container,
                    options: {
                        uri: 'http://localhost:9007/',
                        app: 'earthsdk3'
                    }
                };
            }

            // 切换cesium/ue视口
            this.objm.switchViewer(option);
        }
    }
};
</script>

<style scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}

.btn-box {
    height: 50px;
    position: absolute;
    left: 0px;
    top: 0px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 1;
}

.container {
    width: 100%;
    height: 100%;
    position: relative;
}

button {
    padding: 0 10px;
    height: 30px;
    margin: 10px;
    background-color: #01fa7d8c;
    border: 1px solid #01fa7d8c;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
}
</style>
