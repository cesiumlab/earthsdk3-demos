import { MenuType } from '@/types'
import { defineAsyncComponent } from 'vue'

/**
 * 获取导航菜单列表
 * @param specialModuleEnable - 是否启用特殊模块（引擎模块）
 * @returns 导航菜单配置数组
 */
export const getNavList = (specialModuleEnable: boolean): MenuType[] => {
  return [
    {
      id: 1,
      title: '搜索',
      value: 'search',
      icon: 'sousuo',
      component: defineAsyncComponent(() => import('./search/index.vue')),
      isShow: true
    },
    {
      id: 2,
      title: '漫游',
      value: 'roam',
      icon: 'manyou',
      component: defineAsyncComponent(() => import('./roam/index.vue')),
      isShow: true
    },
    {
      id: 3,
      title: '视图',
      value: 'view',
      icon: 'shitu',
      component: defineAsyncComponent(() => import('./view/index.vue')),
      isShow: true
    },
    {
      id: 4,
      title: '影像',
      value: 'images',
      icon: 'yingxiang',
      component: defineAsyncComponent(() => import('./images/index.vue')),
      isShow: true
    },
    {
      id: 5,
      title: '瓦片',
      value: 'model',
      icon: 'wapian',
      component: defineAsyncComponent(() => import('./model/index.vue')),
      isShow: true
    },
    {
      id: 6,
      title: '地形',
      value: 'terrain',
      icon: 'dixing',
      component: defineAsyncComponent(() => import('./terrain/index.vue')),
      isShow: true
    },
    {
      id: 7,
      title: '矢量',
      value: 'vector',
      icon: 'shiliang',
      component: defineAsyncComponent(() => import('./vector/index.vue')),
      isShow: true
    },
    {
      id: 8,
      title: '分析',
      value: 'analysis',
      icon: 'fenxi',
      component: defineAsyncComponent(() => import('./analysis/index.vue')),
      isShow: true
    },
    {
      id: 9,
      title: '标绘',
      value: 'plotting',
      icon: 'biaohui',
      component: defineAsyncComponent(() => import('./plotting/index.vue')),
      isShow: true
    },
    {
      id: 11,
      title: '环境',
      value: 'environment',
      icon: 'huanjing',
      component: defineAsyncComponent(() => import('./environment/index.vue')),
      isShow: true
    },
    {
      id: 12,
      title: '引擎',
      value: 'engine',
      icon: 'yinqing',
      component: defineAsyncComponent(() => import('./engine/index.vue')),
      isShow: specialModuleEnable
    },
    {
      id: 13,
      title: '服务',
      value: 'service',
      icon: 'fuwu',
      component: defineAsyncComponent(() => import('./service/index.vue')),
      isShow: true
    },
    {
      id: 14,
      title: 'Agent',
      value: 'llmchat',
      icon: 'a-xinjianwenbenwendang',
      iconSize: 18,
      component: defineAsyncComponent(() => import('./LLMChat/index.vue')),
      isShow: true
    }
  ]
}
