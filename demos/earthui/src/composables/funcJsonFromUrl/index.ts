import { createVNode } from 'vue'
import { render } from 'vue'
import JsonFromUrl from './index.vue'
//通过url解析成ES对象json
export function createObjectFromUrl(): Promise<{ type: string, url: string } | undefined> {
  return new Promise((resolve) => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const vnode = createVNode(JsonFromUrl, {
      show: true,
      resolve: (option?: { type: string, url: string, name?: string }) => {
        render(null, container)
        container.remove()
        resolve(option)
      }
    })
    render(vnode, container)
  })
}
