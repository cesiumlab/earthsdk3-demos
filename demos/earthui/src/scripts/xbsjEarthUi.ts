import { ESObjectsManager, ESSceneObject } from 'earthsdk3';
// import { PositionsEditing, CzmGlobeMaterial, ESCesiumViewer } from 'earthsdk3-cesium';
import { parse } from 'search-params';
import { react } from "xbsj-base";
import { ClassicNavigatorManager } from "./ClassicNavigator";
import { MeasurementManager } from "./MeasurementManager";
import { Reprocess } from "./Reprocess";
import { $config } from './getConfig';
import { SceneObjectsCreatorUI } from '../scripts/sceneObjects/SceneObjectsCreatorUI';
import { ESUeViewer } from 'earthsdk3-ue';

export class XbsjEarthUi extends ESObjectsManager {
    private _showSceneTreeView = this.dv(react<boolean>(true));//图层管理
    get showSceneTreeView() { return this._showSceneTreeView.value; }
    set showSceneTreeView(value: boolean) { this._showSceneTreeView.value = value; }
    get showSceneTreeViewChanged() { return this._showSceneTreeView.changed; }
    private _reprocess = this.dv(new Reprocess(this));//后处理
    get reprocess() { return this._reprocess; }

    private _navigatorManager = this.dv(new ClassicNavigatorManager(this));//导航条
    get navigatorManager() { return this._navigatorManager; }

    // private _globeMaterial!: CzmGlobeMaterial;
    // get globeMaterial() { return this._globeMaterial; }

    private _measurementManager = this.dv(new MeasurementManager(this));//测量
    get measurementManager() { return this._measurementManager; }

    private _propSceneTree = this.dv(react<any>(undefined));//属性对象
    get propSceneTree() { return this._propSceneTree.value; }
    set propSceneTree(value: any) { this._propSceneTree.value = value; }
    get propSceneTreeChanged() { return this._propSceneTree.changed; }

    private _rightModuleShow = this.dv(react<boolean>(true));//右面菜单显示
    get rightModuleShow() { return this._rightModuleShow.value; }
    set rightModuleShow(value: boolean) { this._rightModuleShow.value = value; }
    get rightModuleShowChanged() { return this._rightModuleShow.changed; }

    private _cesiumLabUrl = this.dv(react<string>(''));//cesium地址
    get cesiumLabUrl() { return this._cesiumLabUrl.value; }
    set cesiumLabUrl(value: string) { this._cesiumLabUrl.value = value; }
    get cesiumLabUrlChanged() { return this._cesiumLabUrl.changed; }

    private _esssUrl = this.dv(react<string>(''));//esss地址
    get esssUrl() { return this._esssUrl.value; }
    set esssUrl(value: string) { this._esssUrl.value = value; }
    get esssUrlChanged() { return this._esssUrl.changed; }

    get czmlabPath() { return ESSceneObject.context.getStrFromEnv('${czmlab-path}'); }//环境变量
    set czmlabPath(target: string) { ESSceneObject.context.setEnv('czmlab-path', target); }

    private _ueIsShow = this.dv(react<boolean>(false));//视口
    get ueIsShow() { return this._ueIsShow.value; }
    set ueIsShow(value: boolean) { this._ueIsShow.value = value; }
    get ueIsShowChanged() { return this._ueIsShow.changed; }

    private _animationShow = this.dv(react<boolean>(false));//动画时间线
    get animationShow() { return this._animationShow.value; }
    set animationShow(value: boolean) { this._animationShow.value = value; }
    get animationShowChanged() { return this._animationShow.changed; }

    private _sceneTreeCheckedIcon = this.dv(react<boolean>(false));//场景树的全选按钮的控制
    get sceneTreeCheckedIcon() { return this._sceneTreeCheckedIcon.value; }
    set sceneTreeCheckedIcon(value: boolean) { this._sceneTreeCheckedIcon.value = value; }
    get sceneTreeCheckedIconChanged() { return this._sceneTreeCheckedIcon.changed; }

    private _sceneTreeEditingIcon = this.dv(react<boolean>(false));//场景树的全选按钮的控制
    get sceneTreeEditingIcon() { return this._sceneTreeEditingIcon.value; }
    set sceneTreeEditingIcon(value: boolean) { this._sceneTreeEditingIcon.value = value; }
    get sceneTreeEditingIconChanged() { return this._sceneTreeEditingIcon.changed; }

    private _roamMode = this.dv(react<string>('Map'));//漫游模式'Walk'|'Map'|'Line'|'RotateGlobe'
    get roamMode() { return this._roamMode.value; }
    set roamMode(value: string) { this._roamMode.value = value; }
    get roamModeChanged() { return this._roamMode.changed; }

    private _pickResult = this.dv(react<any>({name:'3DTileset对象属性',value:{}}));//拾取到的信息
    get pickResult() { return this._pickResult.value; }
    set pickResult(value: any) { this._pickResult.value = value; }
    get pickResultChanged() { return this._pickResult.changed; }

    private _Interpolation = this.dv(react<number>(500));//插值数据
    get Interpolation() { return this._Interpolation.value; }
    set Interpolation(value: number) { this._Interpolation.value = value; }
    get InterpolationChanged() { return this._Interpolation.changed; }

    private _Interpolation2 = this.dv(react<number>(80));//插值数据2
    get Interpolation2() { return this._Interpolation2.value; }
    set Interpolation2(value: number) { this._Interpolation2.value = value; }
    get Interpolation2Changed() { return this._Interpolation2.changed; }

    private _cesiumLabToken = this.dv(react<string>(''));//cesiumlabToken
    get cesiumLabToken() { return this._cesiumLabToken.value; }
    set cesiumLabToken(value: string) { this._cesiumLabToken.value = value; }
    get cesiumLabTokenChanged() { return this._cesiumLabToken.changed; }

    private _sceneObjectCreatorUI = (() => {
        const o = this.createSceneObject(SceneObjectsCreatorUI);
        if (!o) throw new Error(`SceneObjectsCreatorUI error!`);
        this.dispose(() => this.destroySceneObject(o));
        return o;
    })();
    get sceneObjectCreatorUI() { return this._sceneObjectCreatorUI; }
    getSceneObjectType() { return this._sceneObjectCreatorUI.getTypeName(); }

    constructor(...args: any[]) {
        super(...args);
        // this.ad(this.viewerCreatedEvent.don(() => {
        //     this._globeMaterial = this.ad(new CzmGlobeMaterial(this.activeViewer as ESCesiumViewer));//全球材质，地形着色
        // }))
        {//初始化地址
            const search = window.location.search.substring(1)
            const parseSearch = parse(search)
            if (parseSearch.from === $config.jumpOrigin) {
                this.cesiumLabUrl = window.location.origin
            } else if (parseSearch.from === 'esss') {
                this.esssUrl = window.location.origin
                localStorage.setItem('esssUrl', this.esssUrl)
            } else {
                const a = window.localStorage.getItem('labServeUrl')
                if (a) {
                    this.cesiumLabUrl = a
                } else {
                    this.cesiumLabUrl = ''
                }
                this.esssUrl = ''
            }

        }
        {//禁止拾取
            //@ts-ignore
            //TODO:editingOnPicking
            // this._projectManager.editingOnPicking = false
        }
        {//设置此项目的编辑配置
            // PositionsEditing.defaultConfig = { // 多点编辑
            //     "editor": { // 编辑状态的配置
            //         "showCoordinates": true, // 是否显示坐标架
            //         "showCircle": true, // 是否显示辅助圈
            //         "disableX": false, // 是否取消X轴向的平移
            //         "disableY": false, // 是否取消Y轴向的平移
            //         "disableXY": false, // 是否取消XY平面上的平移操作
            //         "disableZ": false, // 是否取消Z轴上的平移操作
            //         "disableZAxis": false // 是否取消Z轴上的旋转操作，注意是旋转操作
            //     },
            //     "picker": { // 拾取状态的配置
            //         "clickEnabled": true, // 单击拾取点
            //         "dbClickEnabled": true // 双击拾取点
            //     },
            //     "noModifingAfterAdding": false, // 新增结束以后不进入修改状态
            //     "hideCursorInfo": true, // 关闭鼠标提示
            // }
        }
        {//判断视口
            this.d(this.activeViewerChanged.don(() => {
                if (!this.activeViewer) return
                if (this.activeViewer instanceof ESUeViewer) {
                    this.ueIsShow = true
                } else {
                    this.ueIsShow = false
                }
                console.log(this.activeViewer);

            }))
        }
    }
}
