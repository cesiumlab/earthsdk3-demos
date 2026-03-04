import { InitSceneConfigType } from '@/global/types'
import { createEventsCallFunc, Destroyable, ESObjectsManager, react, SceneTreeItem } from 'earthsdk3'
import { ClassicNavigatorManager } from './ClassicNavigator'
import { MeasurementManager } from './MeasurementManager'
import { Reprocess } from './Reprocess'
import { messageLoading } from 'earthsdk-ui'

export class XbsjEarthUi extends ESObjectsManager {
  private _initConfig: InitSceneConfigType;
  get initConfig() { return this._initConfig };

  private _showSceneTreeView = this.dv(react<boolean>(true)) //图层管理
  get showSceneTreeView() {
    return this._showSceneTreeView.value
  }
  set showSceneTreeView(value: boolean) {
    this._showSceneTreeView.value = value
  }
  get showSceneTreeViewChanged() {
    return this._showSceneTreeView.changed
  }
  private _reprocess = this.dv(new Reprocess(this)) //后处理
  get reprocess() {
    return this._reprocess
  }

  private _navigatorManager = this.dv(new ClassicNavigatorManager(this)) //导航条
  get navigatorManager() {
    return this._navigatorManager
  }

  private _measurementManager = this.dv(new MeasurementManager(this)) //测量
  get measurementManager() {
    return this._measurementManager
  }

  private _propSceneTree = this.dv(react<SceneTreeItem | undefined>(undefined)) //属性对象
  get propSceneTree() {
    return this._propSceneTree.value
  }
  set propSceneTree(value: SceneTreeItem | undefined) {
    this._propSceneTree.value = value;
    value?.sceneObject?.d(() => {
      this._propSceneTree.value = undefined
    })
  }
  get propSceneTreeChanged() {
    return this._propSceneTree.changed
  }

  private _rightModuleShow = this.dv(react<boolean>(true)) //右面菜单显示
  get rightModuleShow() {
    return this._rightModuleShow.value
  }
  set rightModuleShow(value: boolean) {
    this._rightModuleShow.value = value
  }
  get rightModuleShowChanged() {
    return this._rightModuleShow.changed
  }

  private _activeViewerType = this.dv(react<string>('ESCesiumViewer')) //视口
  get activeViewerType() {
    return this._activeViewerType.value
  }
  set activeViewerType(value: string) {
    this._activeViewerType.value = value
  }
  get activeViewerTypeChanged() {
    return this._activeViewerType.changed
  }

  private _animationShow = this.dv(react<boolean>(false)) //动画时间线
  get animationShow() {
    return this._animationShow.value
  }
  set animationShow(value: boolean) {
    this._animationShow.value = value
  }
  get animationShowChanged() {
    return this._animationShow.changed
  }

  private _roamMode = this.dv(react<string>('Map')) //漫游模式'Walk'|'Map'|'Line'|'RotateGlobe'
  get roamMode() {
    return this._roamMode.value
  }
  set roamMode(value: string) {
    this._roamMode.value = value
  }
  get roamModeChanged() {
    return this._roamMode.changed
  }

  private _Interpolation = this.dv(react<number>(500)) //插值数据
  get Interpolation() {
    return this._Interpolation.value
  }
  set Interpolation(value: number) {
    this._Interpolation.value = value
  }
  get InterpolationChanged() {
    return this._Interpolation.changed
  }

  private _Interpolation2 = this.dv(react<number>(80)) //插值数据2
  get Interpolation2() {
    return this._Interpolation2.value
  }
  set Interpolation2(value: number) {
    this._Interpolation2.value = value
  }
  get Interpolation2Changed() {
    return this._Interpolation2.changed
  }

  private _cesiumLabToken = this.dv(react<string>('')) //cesiumlabToken
  get cesiumLabToken() {
    return this._cesiumLabToken.value
  }
  set cesiumLabToken(value: string) {
    this._cesiumLabToken.value = value
  }
  get cesiumLabTokenChanged() {
    return this._cesiumLabToken.changed
  }

  private _cesiumLabUrl = this.dv(react<string>('')) //cesium地址
  get cesiumLabUrl() {
    return this._cesiumLabUrl.value
  }
  set cesiumLabUrl(value: string) {
    this._cesiumLabUrl.value = value
  }
  get cesiumLabUrlChanged() {
    return this._cesiumLabUrl.changed
  }

  private _esssUrl = this.dv(react<string>('')) //esss地址
  get esssUrl() {
    return this._esssUrl.value
  }
  set esssUrl(value: string) {
    this._esssUrl.value = value
  }
  get esssUrlChanged() {
    return this._esssUrl.changed
  }

  constructor(initConfig: InitSceneConfigType, viewers: any[]) {
    super(...viewers)
    // 初始化配置
    this._initConfig = initConfig;
    {
      //初始化地址
      const { cesiumLab, esss } = initConfig;
      this.cesiumLabUrl = cesiumLab.cesiumLabUrl;
      this.cesiumLabToken = cesiumLab.cesiumLabToken ?? '';
      this.esssUrl = esss.esssUrl;

    }
    {
      //判断视口
      this.d(
        this.activeViewerChanged.don(() => {
          if (!this.activeViewer) return;
          this.activeViewerType = this.activeViewer.typeName;
        })
      )
    }

    {
      // 编辑时提醒
      let close: (() => void) | null = null;
      let editingEventDispose: (() => void) | null = null;

      const closeTip = () => {
        close?.();
        close = null;
      }

      const clearEditingEvent = () => {
        editingEventDispose?.();
        editingEventDispose = null;
      }

      this.d(() => {
        clearEditingEvent();
        closeTip();
      });

      this.d(
        this.activeViewerChanged.don((viewer) => {
          // 视口切换时，清理旧监听与提示
          clearEditingEvent();
          closeTip();

          if (!viewer) return;

          editingEventDispose = viewer.editingEvent.don((option) => {
            if (option.type === 'end') {
              closeTip();
              return;
            }

            if (option.type === 'start') {
              closeTip();
              close = messageLoading('1.双击/ESC退出  2.空格切换编辑方式  3.右键点位跟随');
            }
          });
        })
      );
    }
  }
}
