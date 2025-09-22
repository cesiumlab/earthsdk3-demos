import { ES3DTileset, ESImageryLayer, ESTerrainLayer } from "earthsdk3";
import { Destroyable, react } from "earthsdk3";
import type { VisObjectsManager } from "./VisObjectsManager";

export class LayerManager extends Destroyable {

    private _esTerrainLayer: ESTerrainLayer | undefined;//全球地形，需要cesium的token
    get esTerrainLayer() { return this._esTerrainLayer; }

    private _argiceImageryLayer: ESImageryLayer | undefined;//argice影像
    get argiceImageryLayer() { return this._argiceImageryLayer; }

    private _tiandituImageryLayer: ESImageryLayer | undefined;//天地图影像，需要天地图token
    get tiandituImageryLayer() { return this._tiandituImageryLayer; }

    private _vectorImageryLayer: ESImageryLayer | undefined;//天地图矢量影像，需要天地图token
    get vectorImageryLayer() { return this._vectorImageryLayer; }

    private _vectorZhujiImageryLayer: ESImageryLayer | undefined;//天地图矢量注记，需要天地图token
    get vectorZhujiImageryLayer() { return this._vectorZhujiImageryLayer; }

    private _es3DTileset: ES3DTileset | undefined;//全球模型，需要cesium的token
    get es3DTileset() { return this._es3DTileset; }

    private _cesiumToken = this.dv(react<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YTgwOWNiNS1hOWJmLTQyM2YtOGEzNC0xZGFkYTAxNDM1MDMiLCJpZCI6MjA0NzA1LCJpYXQiOjE3MjA3Nzc5ODN9.v6ovIolLo6WQgDGikXvW9W5_C_ZkpE6B9xG-RdkC2u0'));//cesium的全局token //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YTgwOWNiNS1hOWJmLTQyM2YtOGEzNC0xZGFkYTAxNDM1MDMiLCJpZCI6MjA0NzA1LCJpYXQiOjE3MjA3Nzc5ODN9.v6ovIolLo6WQgDGikXvW9W5_C_ZkpE6B9xG-RdkC2u0
    get cesiumToken() { return this._cesiumToken.value; }
    set cesiumToken(value: string) { this._cesiumToken.value = value; }
    get cesiumTokenChanged() { return this._cesiumToken.changed; }


    private _tiandituToken = this.dv(react<string>('528ea89a518c339fc4b2d0909a833f0c'));//天地图的全局token //528ea89a518c339fc4b2d0909a833f0c
    get tiandituToken() { return this._tiandituToken.value; }
    set tiandituToken(value: string) { this._tiandituToken.value = value; }
    get tiandituTokenChanged() { return this._tiandituToken.changed; }

    private _gaodeToken = this.dv(react<string>('2d3c6326ef327eecba326ac5780fcab1'));//高德的全局token
    get gaodeToken() { return this._gaodeToken.value; }
    set gaodeToken(value: string) { this._gaodeToken.value = value; }
    get gaodeTokenChanged() { return this._gaodeToken.changed; }

    constructor(private objm: VisObjectsManager) {
        super()

        const argiceImageryLayer = this.objm.createSceneObjectFromJson({
            "type": "ESImageryLayer",
            "name": "argice影像",
            "url": "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            "rectangle": [
                -180,
                -90,
                180,
                90
            ],
            "zIndex": 1
        }) as ESImageryLayer
        this._argiceImageryLayer = argiceImageryLayer;
        this.objm.viewerCreatedEvent.don(() => {
            if (this.objm.activeViewer) {
                this.objm.activeViewer.ionAccessToken = this.cesiumToken
            }
            setTimeout(() => {
                this.createCesiumObjects(false, false)
                this.createTiandituLayer(false, false, false)
            })
        })
    }
    createCesiumObjects(terrainShow: boolean, tilesetShow: boolean) {
        if (this._esTerrainLayer) {
            this.objm.destroySceneObject(this._esTerrainLayer)
            this._esTerrainLayer = undefined
        }
        if (this._es3DTileset) {
            this.objm.destroySceneObject(this._es3DTileset)
            this._es3DTileset = undefined
        }
        const esTerrainLayer = this.objm.createSceneObjectFromJson({
            "type": "ESTerrainLayer",
            "name": "全球地形",
            "url": "ion://1",
            "show": terrainShow,
            "zIndex": 2
        }) as ESTerrainLayer
        this._esTerrainLayer = esTerrainLayer;
        const es3DTileset = this.objm.createSceneObjectFromJson({
            "type": "ES3DTileset",
            "name": "全球模型",
            "url": "ion://96188",
            "show": tilesetShow,
            "materialParams": {
                "baseColor": [
                    0,
                    0.5,
                    1
                ]
            }
        }) as ES3DTileset
        this._es3DTileset = es3DTileset;
    }
    createTiandituLayer(tiandituShow: boolean, victorShow: boolean, victorZhujiShow: boolean) {
        if (this._tiandituImageryLayer) {
            this.objm.destroySceneObject(this._tiandituImageryLayer)
            this._tiandituImageryLayer = undefined
        }
        if (this._vectorImageryLayer) {
            this.objm.destroySceneObject(this._vectorImageryLayer)
            this._vectorImageryLayer = undefined
        }
        if (this._vectorZhujiImageryLayer) {
            this.objm.destroySceneObject(this._vectorZhujiImageryLayer)
            this._vectorZhujiImageryLayer = undefined
        }

        const tiandituImageryLayer = this.objm.createSceneObjectFromJson({
            "type": "ESImageryLayer",
            "name": "天地图影像",
            "show": tiandituShow,
            "url": `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this.tiandituToken}`,
            "options": {
                "type": "xyz"
            },
            "zIndex": 2
        }) as ESImageryLayer
        this._tiandituImageryLayer = tiandituImageryLayer;
        const vectorImageryLayer = this.objm.createSceneObjectFromJson({
            "type": "ESImageryLayer",
            "name": "矢量底图",
            "show": victorShow,
            "url": `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this.tiandituToken}`,
            "options": {
                "type": "xyz"
            },
            "zIndex": 3
        }) as ESImageryLayer
        this._vectorImageryLayer = vectorImageryLayer;
        const vectorZhujiImageryLayer = this.objm.createSceneObjectFromJson({
            "type": "ESImageryLayer",
            "name": "矢量注记",
            "show": victorZhujiShow,
            "url": `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this.tiandituToken}`,
            "options": {
                "type": "xyz"
            },
            "zIndex": 4
        }) as ESImageryLayer
        this._vectorZhujiImageryLayer = vectorZhujiImageryLayer;
    }




}
