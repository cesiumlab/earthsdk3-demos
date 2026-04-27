import { XbsjEarthUi } from './xbsjEarthUi'
function searchAndCollectValues(obj: { [key: string]: any }, resultArray: any[], type: string) {
  if (obj['sceneObj']) {
    if (type === 'ESImageryLayer') {
      if (["ESImageryLayer", "ESGeHistoryImagery", "ESMVTLayer", "ESMediaLayer"].includes(obj['sceneObj'].type)) {
        if (obj['sceneObj'].zIndex !== undefined) {
          resultArray.push(obj['sceneObj'].zIndex)
        }
      }
    } else {
      if (obj['sceneObj'].type && obj['sceneObj'].type === type) {
        if (obj['sceneObj'].zIndex !== undefined) {
          resultArray.push(obj['sceneObj'].zIndex)
        }
      }
    }
  }
  if (obj['children']) {
    for (let i = 0; i < obj['children'].length; i++) {
      searchAndCollectValues(obj['children'][i], resultArray, type)
    }
  }
}
/**
 *
 * @param sceneTree 场景树
 * @param type 需要寻找的type名，一般是地形和影像或者其他有zindex属性的对象名
 * @returns 返回zindex最大值
 */
//获取zindex最大值
export function searchMaxZindex(sceneTree: { [key: string]: any }, type: string): number {
  let result: number[] = [0]
  if (sceneTree.json.root.children) {
    searchAndCollectValues(sceneTree.json.root, result, type)
  }
  if (result.length > 0) {
    return Math.max(...result)
  } else return 0
}
function searchAndCollectLineValues(obj: { [key: string]: any }, resultArray: any[]) {
  if (obj['sceneObj']) {
    if (
      obj['sceneObj'].type &&
      (obj['sceneObj'].type === 'ESGeoLineString' || obj['sceneObj'].type === 'ESPath')
    ) {
      //ESPath
      resultArray.push([obj['sceneObj'].name, obj['sceneObj'].id])
    }
    //         if (obj['sceneObj'].type && obj['sceneObj'].type === 'ESGeoLineString') {//ESPath
    //     resultArray.push({
    //         name: obj['sceneObj'].name,
    //         id: obj['sceneObj'].id
    //     });
    // }
    // if (obj['sceneObj'].type && obj['sceneObj'].type === 'ESPath') {//ESPath
    //     resultArray.push({
    //         name: obj['sceneObj'].name,
    //         id: obj['sceneObj'].id
    //     });

    // }
  }
  if (obj['children']) {
    for (let i = 0; i < obj['children'].length; i++) {
      searchAndCollectLineValues(obj['children'][i], resultArray)
    }
  }
}

//获取所有折线,ESPath
export function searchForLineValues(sceneTree: { [key: string]: any }): any[] {
  let result: any[] = []
  if (sceneTree.json.root.children) {
    searchAndCollectLineValues(sceneTree.json.root, result)
  }
  return result
}
//获取所有ES3DTileset
function searchAndCollectES3DTilesetValues(obj: { [key: string]: any }, resultArray: any[]) {
  if (obj['sceneObj']) {
    if (obj['sceneObj'].type && obj['sceneObj'].type === 'ES3DTileset') {
      //ES3DTileset
      resultArray.push([obj['sceneObj'].name, obj['sceneObj'].id])
    }
  }
  if (obj['children']) {
    for (let i = 0; i < obj['children'].length; i++) {
      searchAndCollectES3DTilesetValues(obj['children'][i], resultArray)
    }
  }
}

export function searchForES3DTilesetValues(xbsjEarthUi: XbsjEarthUi, flag?: boolean): any[] {
  let result: any[] = []
  if (!flag) {
    result.push(['地形图层', ''])
  }
  const sceneTree = xbsjEarthUi.getSceneTree()
  if (sceneTree && sceneTree.json.root.children) {
    searchAndCollectES3DTilesetValues(sceneTree.json.root, result)
  }
  return result
}
//根据类型获取此类型在场景树上的个数
function getsceneObjNumfromSceneTreeFun(obj: { [key: string]: any }, result: any[], type: string) {
  if (obj['sceneObj']) {
    if (obj['sceneObj'].type && obj['sceneObj'].type === type) {
      result.push(1)
    }
  }
  if (obj['children']) {
    for (let i = 0; i < obj['children'].length; i++) {
      getsceneObjNumfromSceneTreeFun(obj['children'][i], result, type)
    }
  }
}
//根据类型获取此类型在场景树上的个数
export function getsceneObjNumfromSceneTree(xbsjEarthUi: XbsjEarthUi, type: string): number {
  let result: any[] = []
  const sceneTree = xbsjEarthUi.getSceneTree()
  if (sceneTree && sceneTree.json.root.children) {
    getsceneObjNumfromSceneTreeFun(sceneTree.json.root, result, type)
  }
  return result.length
}
