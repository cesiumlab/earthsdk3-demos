import { createVNode, render } from "vue";
import MaterialReplaceEditor from "./index.vue";

/** 材质项类型定义 */
export type MaterialItem = {
    key: string;
    value: string | undefined;
    select: boolean;
};


/**
 * 打开材质替换编辑器
 * @param materialList - 材质项列表
 * @param ueMaterialList - UE材质列表
 * @returns Promise，返回编辑后的材质映射结果，取消时返回 undefined
 */
export async function materialReplaceEditor(materialList: MaterialItem[], ueMaterialList: string[]): Promise<Record<string, string | undefined> | undefined> {
    return new Promise((resolve) => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        const vnode = createVNode(MaterialReplaceEditor, {
            show: true,
            materialList,
            ueMaterialList,
            resolve: (result?: Record<string, string | undefined>) => {
                // 清理 DOM
                render(null, container);
                container.remove();
                if (result) {
                    resolve(result);
                } else {
                    resolve(undefined);
                }
            },
        });

        render(vnode, container);
    });
}
