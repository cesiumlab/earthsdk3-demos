/**
 * 导航类型
 */
export type MenuType = {
  id: number
  title: string
  value: string
  icon: string
  component: any
  isShow?: boolean
  new?: boolean
  iconSize?: number
}
