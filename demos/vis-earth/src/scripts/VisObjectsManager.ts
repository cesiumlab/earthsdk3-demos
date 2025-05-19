import { ESObjectsManager } from "earthsdk3";
import { MeasureManager } from "./MeasureManager";
import { LayerManager } from "./LayerManager";

export class VisObjectsManager extends ESObjectsManager {

    private _measure = this.dv(new MeasureManager(this));
    get measure() { return this._measure }

    private _Layer = this.dv(new LayerManager(this));
    get Layer() { return this._Layer }




    constructor(...arg: any[]) {
        super(arg);

        // const json = {
        //     "asset": {
        //         "type": "ESObjectsManager",
        //         "version": "0.1.0",
        //         "createdTime": "2022-06-17T05:54:41.744Z",
        //         "modifiedTime": "2025-02-06T10:00:47.289Z",
        //         "name": "图层管理"
        //     },
        //     "sceneTree": {
        //         "root": {
        //             "children": [
        //                 // {
        //                 //     "name": "地形",
        //                 //     "collapsed": true,
        //                 //     "children": [
        //                 //         {
        //                 //             "name": "全球地形",
        //                 //             "collapsed": true,
        //                 //             "sceneObj": {
        //                 //                 "id": "dea74253-f3a4-43b3-a6ad-5947bbd2e4ed",
        //                 //                 "type": "ESTerrainLayer",
        //                 //                 "name": "全球地形",
        //                 //                 "url": "ion://1",
        //                 //                 "zIndex": 2
        //                 //             },
        //                 //             "children": []
        //                 //         }
        //                 //     ]
        //                 // },
        //                 {
        //                     "name": "影像",
        //                     "collapsed": true,
        //                     "children": [
        //                         {
        //                             "name": "argice影像",
        //                             "collapsed": true,
        //                             "sceneObj": {
        //                                 "id": "1451b0d3-5ed7-4dee-9fa4-637e3f6bbec7",
        //                                 "type": "ESImageryLayer",
        //                                 "name": "argice影像",
        //                                 "url": "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        //                                 "rectangle": [
        //                                     -180,
        //                                     -90,
        //                                     180,
        //                                     90
        //                                 ],
        //                                 "zIndex": 1
        //                             },
        //                             "children": []
        //                         },
        //                         {
        //                             "name": "天地图影像",
        //                             "show": false,
        //                             "collapsed": true,
        //                             "sceneObj": {
        //                                 "id": "e33e1f06-2029-41ec-ad72-0c6ebdce7cae",
        //                                 "type": "ESImageryLayer",
        //                                 "name": "天地图影像",
        //                                 "show": false,
        //                                 "url": "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=528ea89a518c339fc4b2d0909a833f0c",
        //                                 "options": {
        //                                     "type": "xyz"
        //                                 },
        //                                 "zIndex": 2
        //                             },
        //                             "children": []
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "name": "矢量",
        //                     "show": false,
        //                     "collapsed": true,
        //                     "children": [
        //                         {
        //                             "name": "矢量底图",
        //                             "show": false,
        //                             "sceneObj": {
        //                                 "id": "2a2ba678-69e3-4d8e-9ecc-c046b0052015",
        //                                 "type": "ESImageryLayer",
        //                                 "name": "矢量底图",
        //                                 "show": false,
        //                                 "url": "http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=528ea89a518c339fc4b2d0909a833f0c",
        //                                 "options": {
        //                                     "type": "xyz"
        //                                 },
        //                                 "zIndex": 3
        //                             },
        //                             "children": []
        //                         }
        //                     ]
        //                 },
        //                 // {
        //                 //     "name": "模型",
        //                 //     "collapsed": true,
        //                 //     "children": [
        //                 //         {
        //                 //             "name": "全球模型",
        //                 //             "collapsed": true,
        //                 //             "sceneObj": {
        //                 //                 "id": "ed378d7e-6fb2-4d42-89b7-d24ff2af28db",
        //                 //                 "type": "ES3DTileset",
        //                 //                 "name": "全球模型",
        //                 //                 "url": "ion://96188",
        //                 //                 "materialParams": {
        //                 //                     "baseColor": [
        //                 //                         0,
        //                 //                         0.5,
        //                 //                         1
        //                 //                     ]
        //                 //                 }
        //                 //             },
        //                 //             "children": []
        //                 //         }
        //                 //     ]
        //                 // }
        //             ]
        //         }
        //     },
        //     "viewCollection": [],
        //     "lastView": {
        //         "position": [
        //             116.38123533106558,
        //             39.87738648266883,
        //             16953.823073408144
        //         ],
        //         "rotation": [
        //             359.999999999997,
        //             -88.91086984291692,
        //             0
        //         ]
        //     }
        // }
        // //@ts-ignore
        // this.json = json;
    }

}
