import { createVNode, render } from "vue";
import CesiumCodeLoader from "./index.vue"

export function cesiumCodeLoader(code: string) {
    return new Promise((resolve) => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const vnode = createVNode(CesiumCodeLoader, {
            show: true,
            code,
            resolve: () => {
                render(null, container);
                container.remove();
                resolve(null);
            },
        });
        render(vnode, container);
    });
}
