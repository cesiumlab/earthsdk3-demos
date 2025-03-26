import { ESViewer } from "../../../ESViewer";
import { ESCustomDiv } from "./index";
import { Destroyable } from "xbsj-base";
export type DivInstanceClass<DivClass extends {
    destroy(): undefined;
} = {
    destroy(): undefined;
}> = (new (subContainer: HTMLDivElement, customDiv: ESCustomDiv<DivClass>, viewer?: ESViewer | undefined) => DivClass);
export declare class ViewerCustomDivInstance<DivClass extends {
    destroy(): undefined;
} = {
    destroy(): undefined;
}> extends Destroyable {
    constructor(subContainer: HTMLDivElement, customDiv: ESCustomDiv<DivClass>, viewer: ESViewer);
}
export declare const defaulInstanceClassStr = "class MyDiv extends XE2['xe2-base-utils'].Destroyable {\n    // subContainer\u662F\u5916\u90E8\u89C6\u53E3\u7684div\u5BB9\u5668\uFF0C\u53EF\u4EE5\u5728\u8FD9\u91CC\u521B\u5EFA\u81EA\u5DF1\u9700\u8981\u7684DOM\u5143\u7D20\n    // customDiv\u6307\u5411\u5F53\u524D\u7684CustomDiv\u573A\u666F\u5BF9\u8C61\n    // viewer\u6307\u5B9A\u5F53\u524D\u7684\u89C6\u53E3\n    constructor(subContainer, customDiv, viewer) {   \n        super();  \n\n        this._subContainer = subContainer;\n        const div = document.createElement('div');\n        this._div = div;\n\n        this._subContainer.appendChild(div);\n        this.d(() => this._subContainer.removeChild(this._div));\n\n        div.style.width = '300px';\n        div.style.height = '50px';\n        div.style.position = 'absolute';\n        div.style.left = '10px';\n        div.style.top = '10px';\n        div.style.background = 'rgba(120, 120, 0, 0.7)';\n        div.style.color = 'white';\n        div.style.fontSize = '30px';\n        div.style.lineHeight = '50px';\n        div.style.border = '1px solid white';\n        div.style.zIndex = '100'; // \u7279\u522B\u91CD\u8981\uFF0C\u4E0D\u80FD\u4E22\uFF01\u5F88\u53EF\u80FD\u5BFC\u81F4\u4FDD\u5B58\u540E\u6253\u5F00\u770B\u4E0D\u5230\uFF01\n        div.innerText = 'Hello world!';\n\n        // {\n        //     // \u63A7\u5236\u663E\u793A\u9690\u85CF\n        //     const update = () => {\n        //         div.style.display = (customDiv.show ?? true) ? 'flex' : 'none';\n        //     };\n        //     update();\n        //     this.d(customDiv.showChanged.don(update));\n        // }\n    }\n\n    // \u968F\u673A\u80CC\u666F\u989C\u8272\uFF0C\u4EC5\u7528\u4E8E\u6D4B\u8BD5\u5916\u90E8\u5F3A\u5236\u66F4\u65B0\uFF0C\u6B64\u51FD\u6570\u975E\u5FC5\u9700\n    update() {\n        const r = (255 * Math.random()) | 0;\n        const g = (255 * Math.random()) | 0;\n        const b = (255 * Math.random()) | 0;\n        this._div.style.background = `rgba(${r}, ${g}, ${b}, 0.8)`;\n    }\n}";
export declare const defaulInstanceClassDocStr: string;
