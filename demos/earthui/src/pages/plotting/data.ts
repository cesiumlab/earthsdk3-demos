
import { defineAsyncComponent, shallowRef } from 'vue';
import EsLevelRuntimeModel from './esObj/EsLevelRuntimeModel.vue';
import EsDatasmithRuntimeModel from "./esObj/EsDatasmithRuntimeModel.vue";
import EsGeoLineString from "./esObj/EsGeoLineString.vue";
import EsGeoPolygon from "./esObj/EsGeoPolygon.vue";
import EsLocalCircle from "./esObj/EsLocalCircle.vue";
import EsGeoRectangle from "./esObj/EsGeoRectangle.vue";
import EsTextLabel from "./esObj/EsTextLabel.vue";
import EsImageLabel from "./esObj/EsImageLabel.vue";
import EsWidget from "./esObj/EsWidget.vue";
import EsGeoDiv from "./esObj/EsGeoDiv.vue";
import EsPoi3D from "./esObj/EsPoi3D.vue";
import EsPoi2D from "./esObj/EsPoi2D.vue";
import EsEntityCluster from "./esObj/EsEntityCluster.vue";
import EsHuman from "./esObj/EsHuman.vue";
import EsCar from "./esObj/EsCar.vue";
import EsGltfModel from "./esObj/EsGltfModel.vue";
import EsHumanPoi from "./esObj/EsHumanPoi.vue";
import EsPath from "./esObj/EsPath.vue";
import EsApertureEffect from "./esObj/EsApertureEffect.vue";
import EsPolygonFence from "./esObj/EsPolygonFence.vue";
import EsAlarm from "./esObj/EsAlarm.vue";
import EsCameraVisibleRange from "./esObj/EsCameraVisibleRange.vue";
import EsVideoFusion from "./esObj/EsVideoFusion.vue";
import EsLocalSkyBox from "./esObj/EsLocalSkyBox.vue";
import EsPit from "./esObj/EsPit.vue";
import EsPipeline from "./esObj/EsPipeline.vue";
import EsDynamicWater from "./esObj/EsDynamicWater.vue";
import EsGeoWater from "./esObj/EsGeoWater.vue";
import EsHole from "./esObj/EsHole.vue";
import EsBlastParticleSystem from "./esObj/EsBlastParticleSystem.vue";
import EsFireParticleSystem from "./esObj/EsFireParticleSystem.vue";
import EsUnrealActor from "./esObj/EsUnrealActor.vue";
import EsUnrealActor2 from "./esObj/EsUnrealActor2.vue";
import EsPipeFence from "./esObj/EsPipeFence.vue";
import EsGaussianSplatting from './esObj/EsGaussianSplatting.vue';
import EsGeoExtrudedPolygon from './esObj/EsGeoExtrudedPolygon.vue';
import EsStaticMesh from './esObj/EsStaticMesh.vue';
export const textTypeList: { name: string, type: { textSize: number, textColor: [number, number, number, number] } }[] = [
    {
        name: '白小文本',
        type: {
            textSize: 14,
            textColor: [1, 1, 1, 1]
        }
    },
    {
        name: '白中文本',
        type: {
            textSize: 18,
            textColor: [1, 1, 1, 1]
        }
    },
    {
        name: '白大文本',
        type: {
            textSize: 22,
            textColor: [1, 1, 1, 1]
        }
    },
    {
        name: '红小文本',
        type: {
            textSize: 14,
            textColor: [1, 0, 0, 1]
        }
    },
    {
        name: '红中文本',
        type: {
            textSize: 18,
            textColor: [1, 0, 0, 1]
        }
    },
    {
        name: '红大文本',
        type: {
            textSize: 22,
            textColor: [1, 0, 0, 1]
        }
    },
    {
        name: '绿小文本',
        type: {
            textSize: 14,
            textColor: [0, 1, 0, 1]
        }
    },
    {
        name: '绿中文本',
        type: {
            textSize: 18,
            textColor: [0, 1, 0, 1]
        }
    },
    {
        name: '绿大文本',
        type: {
            textSize: 22,
            textColor: [0, 1, 0, 1]
        }
    },
    {
        name: '蓝小文本',
        type: {
            textSize: 14,
            textColor: [0, 0, 1, 1]
        }
    },
    {
        name: '蓝中文本',
        type: {
            textSize: 18,
            textColor: [0, 0, 1, 1]
        }
    },
    {
        name: '蓝大文本',
        type: {
            textSize: 22,
            textColor: [0, 0, 1, 1]
        }
    }
]
//图标点
export const imageTypeList: { name: string, img: any, type: string }[] = [
    {
        name: '蓝色相机',
        img: new URL('../../assets/plotting/points/CameraBlue.png', import.meta.url).href,
        type: ('inner://CameraBlue.png')
    }, {
        name: '绿色相机',
        img: new URL('../../assets/plotting/points/CameraGreen.png', import.meta.url).href,
        type: ('inner://CameraGreen.png')
    }, {
        name: '蓝色车辆',
        img: new URL('../../assets/plotting/points/CarBlue.png', import.meta.url).href,
        type: ('inner://CarBlue.png')
    }, {
        name: '红色车辆',
        img: new URL('../../assets/plotting/points/CarRed.png', import.meta.url).href,
        type: ('inner://CarRed.png')
    }, {
        name: '渡口',
        img: new URL('../../assets/plotting/points/Dukou.png', import.meta.url).href,
        type: ('inner://Dukou.png')
    }, {
        name: '界限',
        img: new URL('../../assets/plotting/points/Jiexian.png', import.meta.url).href,
        type: ('inner://Jiexian.png')
    }, {
        name: '警示',
        img: new URL('../../assets/plotting/points/Jingshi.png', import.meta.url).href,
        type: ('inner://Jingshi.png')
    }, {
        name: '蓝色料斗',
        img: new URL('../../assets/plotting/points/LiaodouBlue.png', import.meta.url).href,
        type: ('inner://LiaodouBlue.png')
    }, {
        name: '红色料斗',
        img: new URL('../../assets/plotting/points/LiaodouRed.png', import.meta.url).href,
        type: ('inner://LiaodouRed.png')
    }, {
        name: '蓝色龙门吊',
        img: new URL('../../assets/plotting/points/LongmendiaoBlue.png', import.meta.url).href,
        type: ('inner://LongmendiaoBlue.png')
    }, {
        name: '红色龙门吊',
        img: new URL('../../assets/plotting/points/LongmendiaoRed.png', import.meta.url).href,
        type: ('inner://LongmendiaoRed.png')
    }, {
        name: '锚',
        img: new URL('../../assets/plotting/points/Mao.png', import.meta.url).href,
        type: ('inner://Mao.png')
    }, {
        name: '蓝色门机',
        img: new URL('../../assets/plotting/points/MenjiBlue.png', import.meta.url).href,
        type: ('inner://MenjiBlue.png')
    }, {
        name: '红色门机',
        img: new URL('../../assets/plotting/points/MenjiRed.png', import.meta.url).href,
        type: ('inner://MenjiRed.png')
    }, {
        name: '鸣笛',
        img: new URL('../../assets/plotting/points/Mingdi.png', import.meta.url).href,
        type: ('inner://Mingdi.png')
    }, {
        name: '气象站',
        img: new URL('../../assets/plotting/points/Qixiang.png', import.meta.url).href,
        type: ('inner://Qixiang.png')
    }, {
        name: '蓝色人员',
        img: new URL('../../assets/plotting/points/RenyuanBlue.png', import.meta.url).href,
        type: ('inner://RenyuanBlue.png')
    }, {
        name: '红色人员',
        img: new URL('../../assets/plotting/points/RenyuanRed.png', import.meta.url).href,
        type: ('inner://RenyuanRed.png')
    }, {
        name: '圆形蓝色人员',
        img: new URL('../../assets/plotting/points/RenyuanCircleBlue.png', import.meta.url).href,
        type: ('inner://RenyuanCircleBlue.png')
    }, {
        name: '圆形红色人员',
        img: new URL('../../assets/plotting/points/RenyuanCircleRed.png', import.meta.url).href,
        type: ('inner://RenyuanCircleRed.png')
    }
]
//poi2d
export const poi2dList: { name: string, img: any, mode: string }[] = [//多选模式类型
    {
        mode: 'SquareH01',
        img: new URL('../../assets/plotting/poi2d/Square_H_01.png', import.meta.url).href,
        name: '模式1'
    },
    {
        mode: 'SquareH02',
        img: new URL('../../assets/plotting/poi2d/Square_H_02.png', import.meta.url).href,
        name: '模式2'
    }, {
        mode: 'SquareV01',
        img: new URL('../../assets/plotting/poi2d/Square_V_01.png', import.meta.url).href,
        name: '模式3'
    }, {
        mode: 'SquareV02',
        img: new URL('../../assets/plotting/poi2d/Square_V_02.png', import.meta.url).href,
        name: '模式4'
    }, {
        mode: 'SquareV03',
        img: new URL('../../assets/plotting/poi2d/Square_V_03.png', import.meta.url).href,
        name: '模式5'
    }, {
        mode: 'SquareV04',
        img: new URL('../../assets/plotting/poi2d/Square_V_04.png', import.meta.url).href,
        name: '模式6'
    }, {
        mode: 'Flag01',
        img: new URL('../../assets/plotting/poi2d/Flag_01.png', import.meta.url).href,
        name: '模式7'
    }, {
        mode: 'Flag02',
        img: new URL('../../assets/plotting/poi2d/Flag_02.png', import.meta.url).href,
        name: '模式8'
    }, {
        mode: 'Linear01',
        img: new URL('../../assets/plotting/poi2d/Linear_01.png', import.meta.url).href,
        name: '模式9'
    }, {
        mode: 'Linear02',
        img: new URL('../../assets/plotting/poi2d/Linear_02.png', import.meta.url).href,
        name: '模式10'
    }, {
        mode: 'Linear03',
        img: new URL('../../assets/plotting/poi2d/Linear_03.png', import.meta.url).href,
        name: '模式11'
    }, {
        mode: 'CircularH01',
        img: new URL('../../assets/plotting/poi2d/Circular_H_01.png', import.meta.url).href,
        name: '模式12'
    }, {
        mode: 'CircularH02',
        img: new URL('../../assets/plotting/poi2d/Circular_H_02.png', import.meta.url).href,
        name: '模式13'
    }, {
        mode: 'CircularV01',
        img: new URL('../../assets/plotting/poi2d/Circular_V_01.png', import.meta.url).href,
        name: '模式14'
    }, {
        mode: 'CircularV02',
        img: new URL('../../assets/plotting/poi2d/Circular_V_02.png', import.meta.url).href,
        name: '模式15'
    }, {
        mode: 'CircularV03',
        img: new URL('../../assets/plotting/poi2d/Circular_V_03.png', import.meta.url).href,
        name: '模式16'
    }, {
        mode: 'CircularV04',
        img: new URL('../../assets/plotting/poi2d/Circular_V_04.png', import.meta.url).href,
        name: '模式17'
    }, {
        mode: 'CircularV05',
        img: new URL('../../assets/plotting/poi2d/Circular_V_05.png', import.meta.url).href,
        name: '模式18'
    }, {
        mode: 'P3D01',
        img: new URL('../../assets/plotting/poi2d/P3D_01.png', import.meta.url).href,
        name: '模式19'
    }, {
        mode: 'P3D02',
        img: new URL('../../assets/plotting/poi2d/P3D_02.png', import.meta.url).href,
        name: '模式20'
    }, {
        mode: 'P3D03',
        img: new URL('../../assets/plotting/poi2d/P3D_03.png', import.meta.url).href,
        name: '模式21'
    }, {
        mode: 'P3D04',
        img: new URL('../../assets/plotting/poi2d/P3D_04.png', import.meta.url).href,
        name: '模式22'
    }, {
        mode: 'P3D05',
        img: new URL('../../assets/plotting/poi2d/P3D_05.png', import.meta.url).href,
        name: '模式23'
    }, {
        mode: 'P3D06',
        img: new URL('../../assets/plotting/poi2d/P3D_06.png', import.meta.url).href,
        name: '模式24'
    }, {
        mode: 'P3D07',
        img: new URL('../../assets/plotting/poi2d/P3D_07.png', import.meta.url).href,
        name: '模式25'
    }, {
        mode: 'Diamond01',
        img: new URL('../../assets/plotting/poi2d/Diamond_01.png', import.meta.url).href,
        name: '模式26'
    }, {
        mode: 'Diamond02',
        img: new URL('../../assets/plotting/poi2d/Diamond_02.png', import.meta.url).href,
        name: '模式27'
    }, {
        mode: 'Stranger',
        img: new URL('../../assets/plotting/poi2d/Stranger.png', import.meta.url).href,
        name: '模式28'
    }, {
        mode: 'ManNormal',
        img: new URL('../../assets/plotting/poi2d/Man_Normal.png', import.meta.url).href,
        name: '模式29'
    }, {
        mode: 'ManAbnormal',
        img: new URL('../../assets/plotting/poi2d/Man_Abnormal.png', import.meta.url).href,
        name: '模式30'
    }, {
        mode: 'WomanNormal',
        img: new URL('../../assets/plotting/poi2d/Woman_Normal.png', import.meta.url).href,
        name: '模式31'
    }, {
        mode: 'WomanAbnormal',
        img: new URL('../../assets/plotting/poi2d/Woman_Abnormal.png', import.meta.url).href,
        name: '模式32'
    },
    // {
    //     mode: 'Camera',
    //     img: new URL('../../assets/plotting/poi2d/Camera.png',import.meta.url).href,
    //     name: '模式32'
    // },
]


//矢量
export const vectorObjectList: { type: string, zh: string, icon: string, leftButton: boolean, com: any }[] = [
    {
        type: 'esGeoLineString',
        zh: '折线',
        icon: 'zhexian',
        leftButton: true,
        com: shallowRef(EsGeoLineString)
    },
    {
        type: 'esGeoPolygon',
        zh: '多边形',
        icon: 'duobianxing',
        leftButton: false,
        com: shallowRef(EsGeoPolygon)
    }, {
        type: 'esLocalCircle',
        zh: '圆',
        icon: 'yuan',
        leftButton: true,
        com: shallowRef(EsLocalCircle)
    },
    {
        type: 'esGeoRectangle',
        zh: '矩形',
        icon: 'juxing',
        leftButton: false,
        com: shallowRef(EsGeoRectangle)
    },
    {
        type: 'esGeoExtrudedPolygon',
        zh: '挤压多边形',
        icon: 'duobianxing',
        leftButton: false,
        com: shallowRef(EsGeoExtrudedPolygon)
    }

]
//注记
export const annotationObjectList: { type: string, zh: string, icon: string, leftButton: boolean, com: any }[] = [
    {
        type: 'esTextLabel',
        zh: '文字标注',
        icon: 'wenzibiaozhu',
        leftButton: true,
        com: shallowRef(EsTextLabel)

    },
    {
        type: 'esImageLabel',
        zh: '图标点',
        icon: 'tubiaodian',
        leftButton: false,
        com: shallowRef(EsImageLabel)
    },
    {
        type: 'esWidget',
        zh: '部件',
        icon: 'bujian',
        leftButton: true,
        com: shallowRef(EsWidget)
    },
    {
        type: 'esGeoDiv',
        zh: '自定义DIV',
        icon: 'zidingyi2',
        leftButton: false,
        com: shallowRef(EsGeoDiv)
    },
    {
        type: 'esPoi3D',
        zh: 'Poi3D',
        icon: 'poi3D',
        leftButton: true,
        com: shallowRef(EsPoi3D)
    },
    {
        type: 'esPoi2D',
        zh: 'Poi2D',
        icon: 'poi2D',
        leftButton: false,
        com: shallowRef(EsPoi2D)
    },
    {
        type: 'esEntityCluster',
        zh: 'Poi聚合',
        icon: 'juhe',
        leftButton: true,
        com: shallowRef(EsEntityCluster)
    }
]
//园区
export const parkObjectList: { type: string, zh: string, icon: string, leftButton: boolean, com: any }[] = [
    {
        type: 'esHuman',
        zh: '人员',
        icon: 'renyuan',
        leftButton: true,
        com: shallowRef(EsHuman)
    },
    {
        type: 'esCar',
        zh: '车辆',
        icon: 'cheliang',
        leftButton: false,
        com: shallowRef(EsCar)
    },
    {
        type: 'esGltfModel',
        zh: '建筑',
        icon: 'jianzhu',
        leftButton: true,
        com: shallowRef(EsGltfModel)
    },
    {
        type: 'esHumanPoi',
        zh: '人员Poi',
        icon: 'renyuanPoi',
        leftButton: false,
        com: shallowRef(EsHumanPoi)
    },
]
//特效
export const effectObjectList: { type: string, zh: string, icon: string, leftButton: boolean, com: any }[] = [
    {
        type: 'esPath',
        zh: '路径',
        icon: 'lujingdonghua',
        leftButton: true,
        com: shallowRef(EsPath)
    },
    {
        type: 'esApertureEffect',
        zh: '光圈特效',
        icon: 'guangquantexiao',
        leftButton: false,
        com: shallowRef(EsApertureEffect)
    },
    {
        type: 'esPolygonFence',
        zh: '电子围栏',
        icon: 'dianziweilan',
        leftButton: true,
        com: shallowRef(EsPolygonFence)
    },
    {
        type: 'esPipeFence',
        zh: '管道围栏',
        icon: 'weilan',
        leftButton: false,
        com: shallowRef(EsPipeFence)
    },
    {
        type: 'esAlarm',
        zh: '报警',
        icon: 'baojing',
        leftButton: true,
        com: shallowRef(EsAlarm)
    },
    {
        type: 'esCameraVisibleRange',
        zh: '摄像头',
        icon: 'shexiangtou',
        leftButton: false,
        com: shallowRef(EsCameraVisibleRange)
    },
    {
        type: 'esVideoFusion',
        zh: '视频融合',
        icon: 'shipinronghe',
        leftButton: true,
        com: shallowRef(EsVideoFusion)
    },
    {
        type: 'esLocalSkyBox',
        zh: '天空盒',
        icon: 'tiankonghe',
        leftButton: false,
        com: shallowRef(EsLocalSkyBox)
    },
    {
        type: 'esPit',
        zh: '坑',
        icon: 'keng1',
        leftButton: true,
        com: shallowRef(EsPit)
    },
    {
        type: 'esPipeline',
        zh: '管线',
        icon: 'guanxian',
        leftButton: false,
        com: shallowRef(EsPipeline)
    }, {
        type: 'esDynamicWater',
        zh: '局部水面',
        icon: 'jubushuimian',
        leftButton: true,
        com: shallowRef(EsDynamicWater)
    },
    {
        type: 'esGeoWater',
        zh: '地理水面',
        icon: 'dilishuimian',
        leftButton: false,
        com: shallowRef(EsGeoWater)
    },
    {
        type: 'esHole',
        zh: '组合挖坑',
        icon: 'zuhewakeng',
        leftButton: true,
        com: shallowRef(EsHole)
    },
    {
        type: 'esBlastParticleSystem',
        zh: '粒子爆炸',
        icon: 'lizibaozha',
        leftButton: false,
        com: shallowRef(EsBlastParticleSystem)
    },
    {
        type: 'esFireParticleSystem',
        zh: '粒子烟火',
        icon: 'liziyanhuo',
        leftButton: true,
        com: shallowRef(EsFireParticleSystem)
    },

]
//actor
export const ueObjectList: { type: string, zh: string, icon: string, leftButton: boolean, com: any ,fontSize?:number}[] = [
    {
        type: 'esUnrealActor',
        zh: '创建Actor',
        icon: 'actor',
        leftButton: true,
        com: shallowRef(EsUnrealActor)
    },
    {
        type: 'esUnrealActor2',
        zh: '绑定Actor',
        icon: 'actor',
        leftButton: false,
        com: shallowRef(EsUnrealActor2)
    },
    {
        type: 'esDatasmithRuntimeModel',
        zh: 'Datasmith',
        icon: 'DataMesh',
        leftButton: true,
        com: shallowRef(EsDatasmithRuntimeModel)
    }, {
        type: 'esLevelRuntimeModel',
        zh: '关卡包',
        icon: 'guanqiabao',
        leftButton: false,
        com: shallowRef(EsLevelRuntimeModel)
    }, {
        type: 'esGaussianSplatting',
        zh: '高斯溅射模型',
        icon: 'model-lib',
        leftButton: false,
        com: shallowRef(EsGaussianSplatting),
        fontSize:12
    }, {
        type: 'eSStaticMesh',
        zh: '静态网格体',
        icon: 'wangluo',
        leftButton: true,
        com: shallowRef(EsStaticMesh)
    }
]

