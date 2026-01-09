import { Destroyable, react } from 'earthsdk3'
import { ESCesiumViewer } from 'earthsdk3-cesium'

import { XbsjEarthUi } from '../xbsjEarthUi'
export class Reprocess extends Destroyable {
  //阴影
  private _shadowsShow = this.dv(react<boolean>(false))
  get shadowsShow() {
    return this._shadowsShow.value
  }
  get shadowsShowChanged() {
    return this._shadowsShow.changed
  }
  set shadowsShow(value: boolean) {
    this._shadowsShow.value = value
  }

  //环境遮蔽
  private _ambientOcclusionShow = this.dv(react<boolean>(false))
  get ambientOcclusionShow() {
    return this._ambientOcclusionShow.value
  }
  set ambientOcclusionShow(value: boolean) {
    this._ambientOcclusionShow.value = value
  }
  get ambientOcclusionShowChanged() {
    return this._ambientOcclusionShow.changed
  }

  //泛光
  private _floodlightShow = this.dv(react<boolean>(false))
  get floodlightShow() {
    return this._floodlightShow.value
  }
  set floodlightShow(value: boolean) {
    this._floodlightShow.value = value
  }
  get floodlightShowChanged() {
    return this._floodlightShow.changed
  }

  constructor(xbsjEarthUi: XbsjEarthUi) {
    super()
    //TODO ME 未完成
    {
      //阴影
      const update = () => {
        const viewer = xbsjEarthUi.activeViewer as unknown as ESCesiumViewer
        if (!viewer) {
          return
        }
        viewer.shadows = this.shadowsShow
      }
      update()
      this.d(this.shadowsShowChanged.don(update))
    }
    {
      //环境遮蔽
      const update = () => {
        const viewer = xbsjEarthUi.activeViewer as unknown as ESCesiumViewer
        if (!viewer) {
          return
        }
        viewer.scenePpsAmbientOcclusionEnabled = this.ambientOcclusionShow
      }
      update()
      this.d(this.ambientOcclusionShowChanged.don(update))
    }
    {
      //泛光
      const update = () => {
        const viewer = xbsjEarthUi.activeViewer as unknown as ESCesiumViewer
        if (!viewer) {
          return
        }
        viewer.scenePpsBloomEnabled = this.floodlightShow
      }
      update()
      this.d(this.floodlightShowChanged.don(update))
    }
  }
}
