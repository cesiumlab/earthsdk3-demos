import {
  createProcessingFromAsyncFunc,
  Destroyable,
  ESAreaMeasurement,
  ESDirectionMeasurement,
  ESDistanceMeasurement,
  ESHeightMeasurement,
  ESLocationMeasurement,
  ESSurfaceAreaMeasurement,
  react
} from 'earthsdk3'
import { XbsjEarthUi } from '../xbsjEarthUi'
export type MeasureType =
  | ESAreaMeasurement
  | ESDirectionMeasurement
  | ESDistanceMeasurement
  | ESHeightMeasurement
  | ESLocationMeasurement
  | ESSurfaceAreaMeasurement
export type MeasureTypeParam =
  | 'ESAreaMeasurement'
  | 'ESDirectionMeasurement'
  | 'ESDistanceMeasurement'
  | 'ESHeightMeasurement'
  | 'ESLocationMeasurement'
  | 'ESSurfaceAreaMeasurement'

export class MeasurementManager extends Destroyable {
  private _currentEditingType = this.dv(react<MeasureTypeParam | ''>(''))
  get currentEditingType() {
    return this._currentEditingType.value
  }
  set currentEditingType(value: MeasureTypeParam | '') {
    this._currentEditingType.value = value
  }
  get currentEditingTypeChanged() {
    return this._currentEditingType.changed
  }

  private _objectlist: MeasureType[] = []
  get objectlist() {
    return this._objectlist
  }

  private _processing = this.disposeVar(
    createProcessingFromAsyncFunc<void, [measurementType: MeasureTypeParam]>(
      async (cancelsManager, measurementType) => {
        const esMeasurement = this.xbsjEarthUi.createSceneObject<MeasureType>(measurementType);
        if (!esMeasurement) {
          console.warn(`测量时，不能创建${measurementType}类型的场景对象！`)
          return
        }
        this._objectlist.push(esMeasurement);
        esMeasurement.editing = true;
        this._currentEditingType.value = measurementType;

        // 取消时需要销毁的东西
        cancelsManager.disposer.dispose(() => {
          if (!esMeasurement) return
          esMeasurement.editing = false
          this._currentEditingType.value = ''
        })

        await cancelsManager.promise(
          new Promise<void>((resolve) => {
            if (!esMeasurement) return
            cancelsManager.disposer.d(
              esMeasurement.editingChanged.donce(() => {
                if (!esMeasurement) return
                if (!esMeasurement.editing) {
                  resolve();
                }
              })
            )
          })
        )
        // 如果发现当前创建的场景对象已经取消编辑状态，那么此时需要将_currentEditingType也置为空字符串
        this._currentEditingType.value = ''
      }
    )
  )

  constructor(private xbsjEarthUi: XbsjEarthUi) {
    super()
  }

  create(type: MeasureTypeParam) {
    this._processing.restart(undefined, type)
  }

  stopEditing() {
    if (this._processing.isRunning) {
      this._processing.cancel()
    }

    if (this._objectlist.length === 0) return
    this._objectlist.forEach((item) => {
      item.editing = false
    })
  }

  clearAll() {
    if (this._processing.isRunning) {
      this._processing.cancel()
    }

    if (this._objectlist.length === 0) return
    this._objectlist.forEach((item) => {
      this.xbsjEarthUi.destroySceneObject(item)
    })
    this._objectlist.length = 0
  }
}
