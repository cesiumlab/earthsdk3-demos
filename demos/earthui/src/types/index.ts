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
