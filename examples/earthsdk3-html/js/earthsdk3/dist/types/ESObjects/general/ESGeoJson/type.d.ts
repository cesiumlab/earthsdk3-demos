import { ESJResource } from "../../../ESJTypes";
export type ESJImageStyle = {
    url: string | ESJResource;
    size: [number, number];
    anchor: [number, number];
    offset: [number, number];
};
export type ESJTextStyle = {
    textProperty: string;
    defaultText: string;
    color: [number, number, number, number];
    backgroundColor: [number, number, number, number] | undefined;
    fontFamily: string;
    fontSize: number;
    fontStyle: string;
    fontWeight: string;
    anchor: [number, number];
    offset: [number, number];
};
export declare const data: {
    type: string;
    features: {
        type: string;
        geometry: {
            type: string;
            coordinates: number[];
        };
        properties: {
            title: string;
            "marker-symbol": string;
            "marker-color": string;
        };
    }[];
};
export declare const dataMd = "properties\u662F\u4E00\u4E2A\u5305\u542B\u4E09\u4E2A\u5C5E\u6027\u7684\u5BF9\u8C61\uFF0Ctitle\u8868\u793A\u6807\u9898\uFF0Cmarker-symbol\u8868\u793A\u70B9\u4F4D\u7684\u6587\u5B57\u5185\u5BB9\uFF0Cmarker-color\u8868\u793A\u70B9\u4F4D\u989C\u8272\uFF0Cproperties\u53EF\u4EE5\u5220\u9664\uFF0C\u7136\u540E\u4F7F\u7528\u573A\u666F\u5BF9\u8C61\u5C5E\u6027\u8BBE\u7F6E\u3002\n```\n{\n    \"type\": \"FeatureCollection\",\n    \"features\": [\n        {\n            \"type\": \"Feature\",\n            \"geometry\": {\n                \"type\": \"Point\",\n                \"coordinates\": [\n                    116.2,\n                    39.56\n                ]\n            },\n            \"properties\": {\n                \"title\": \"swimming\",\n                \"marker-symbol\": \"swimming\",\n                \"marker-color\": \"#8F1312\"\n            }\n        },\n        {\n            \"type\": \"Feature\",\n            \"geometry\": {\n                \"type\": \"Point\",\n                \"coordinates\": [\n                    115.2,\n                    38.56\n                ],\n                \"properties\": {\n                    \"title\": \"8\",\n                    \"marker-symbol\": \"8\",\n                    \"marker-color\": \"#46117E\"\n                }\n            }\n        },\n        {\n            \"type\": \"Feature\",\n            \"geometry\": {\n                \"type\": \"Point\",\n                \"coordinates\": [\n                    114.2,\n                    37.56\n                ],\n                \"properties\": {\n                    \"title\": \"6\",\n                    \"marker-symbol\": \"6\",\n                    \"marker-color\": \"#713291\"\n                }\n            }\n        }\n    ]\n}\n```\n";
export declare const defaultLoadFuncStr = "// dataSource\n(dataSource) => {\n    if (dataSource) {\n        dataSource.show = true;\n\n        const entities = dataSource.entities.values;\n        const colorHash = {};\n        for (let i = 0; i < entities.length; i++) {\n            const entity = entities[i];\n            const name = entity.name;\n            let color = colorHash[name];\n            if (!color) {\n                color = Cesium.Color.fromRandom({\n                    alpha: 1.0,\n                });\n                colorHash[name] = color;\n            }\n            if (entity.polygon) {\n\n                entity.polygon.material = color;\n                entity.polygon.outline = false;\n                entity.polygon.extrudedHeight = entity.properties.Population / 50.0;\n            }\n        }\n    }\n}\n";
export declare const defaultLoadFuncDocStr: string;
export declare function isJSONString(str: string): boolean;
