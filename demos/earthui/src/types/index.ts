import { Component } from "vue"

/**
 * 导航类型
 */
export type MenuType = {
  id: number
  title: string
  value: string
  icon: string
  component: Component
  isShow?: boolean
  new?: boolean
  iconSize?: number
}

export type LangConfigType = {
  earthui: {
    header: {
      name: string;
    };
    menu: {
      search: string;
      roam: string;
      view: string;
      images: string;
      model: string;
      terrain: string;
      vector: string;
      analysis: string;
      plotting: string;
      weather: string;
      engine: string;
      service: string;
      llmchat: string;
    };
  };
}

// const lang = {
//   "earthui": {
//     "header": {
//       "name": "EarthSDK 三维地球开发包"
//     },
//     "menu": {
//       "search": "搜索",
//       "roam": "漫游",
//       "view": "视图",
//       "images": "影像",
//       "model": "瓦片",
//       "terrain": "地形",
//       "vector": "矢量",
//       "analysis": "分析",
//       "plotting": "标绘",
//       "environment": "环境",
//       "engine": "引擎",
//       "service": "服务",
//       "llmchat": "Agent"
//     }
//   }
// }
