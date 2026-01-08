import { get, getNoToken, getWithCookie, post, put } from './service'

// 影像-在线列表请求
const imageListurl = 'https://account.bjxbsj.cn/api/onlineResouces/image?desc=false'
export const getImageListurl = async () => {
  const res = (await getNoToken(imageListurl)) as any
  const result = res.result
  return result
}
