import { $config } from '@/global'
import { MenuType } from '@/types'
import analysis from './analysis/index.vue'
import engine from './engine/index.vue'
import environment from './environment/index.vue'
import images from './images/index.vue'
import LLMChat from './LLMChat/index.vue'
import model from './model/index.vue'
import plotting from './plotting/index.vue'
import roam from './roam/index.vue'
import search from './search/index.vue'
import service from './service/index.vue'
import terrain from './terrain/index.vue'
import vector from './vector/index.vue'
import view from './view/index.vue'

export const originalNavList: MenuType[] = [
  {
    id: 1,
    title: '搜索',
    value: 'search',
    icon: 'sousuo',
    component: search,
    isShow: true
  },
  {
    id: 2,
    title: '漫游',
    value: 'roam',
    icon: 'manyou',
    component: roam,
    isShow: true
  },
  {
    id: 3,
    title: '视图',
    value: 'view',
    icon: 'shitu',
    component: view,
    isShow: true
  },

  {
    id: 4,
    title: '影像',
    value: 'images',
    icon: 'yingxiang',
    component: images,
    isShow: true
  },
  {
    id: 5,
    title: '瓦片',
    value: 'model',
    icon: 'wapian',
    component: model,
    isShow: true
  },
  {
    id: 6,
    title: '地形',
    value: 'terrain',
    icon: 'dixing',
    component: terrain,
    isShow: true
  },
  {
    id: 7,
    title: '矢量',
    value: 'vector',
    icon: 'shiliang',
    component: vector,
    isShow: true
  },
  {
    id: 8,
    title: '分析',
    value: 'analysis',
    icon: 'fenxi',
    component: analysis,
    isShow: true
  },
  {
    id: 9,
    title: '标绘',
    value: 'plotting',
    icon: 'biaohui',
    component: plotting,
    isShow: true
  },
  {
    id: 11,
    title: '环境',
    value: 'environment',
    icon: 'huanjing',
    component: environment,
    isShow: true
  },
  {
    id: 12,
    title: '引擎',
    value: 'engine',
    icon: 'yinqing',
    component: engine,
    isShow: $config.modelShow
  },
  {
    id: 13,
    title: '服务',
    value: 'service',
    icon: 'fuwu',
    component: service,
    isShow: true
  },
  {
    id: 14,
    title: 'Agent',
    value: 'llmchat',
    icon: 'a-xinjianwenbenwendang',
    iconSize: 18,
    component: LLMChat,
    isShow: true,
    new: true
  }
]
