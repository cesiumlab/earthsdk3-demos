import { get, post, put } from '@/api/service'
import { $config } from '@/global'
import { MenuType } from '@/types'
import { createVueDisposer, toVR, useTheme } from 'earthsdk-ui'
import { ElMessage } from 'element-plus'
import { parse } from 'search-params'
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, useTemplateRef, watch } from 'vue'
import { saveAs } from '../../../components/sceneTree/tools'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'

// ==================== 类型定义 ====================

/** URL 查询参数接口 */
interface ParsedSearch {
    from?: string
    ESSSsceneid?: string
    token?: string
    appid?: string
    scene?: string
}

/** API 响应接口 */
interface ApiResponse {
    status?: string
    code?: number
    data?: any
}

/** Props 接口 */
interface MenuProps {
    navList: MenuType[]
    navType: string | undefined
}

// ==================== 常量定义 ====================
/** 菜单项宽度 */
const MENU_ITEM_WIDTH = 100
/** 默认侧边栏宽度 */
const DEFAULT_SIDEBAR_WIDTH = 400
/** 大模型聊天侧边栏宽度 */
const LLM_CHAT_SIDEBAR_WIDTH = 600
/** 导航器右侧偏移量 */
const NAVIGATOR_OFFSET = 10

/**
 * Menu 组件逻辑 Hook
 * @param props - 组件 Props
 */
export function useMenu(props: MenuProps) {
    // ==================== 依赖注入 ====================
    const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
    const disposer = createVueDisposer(onBeforeUnmount)

    // ==================== 响应式状态 ====================
    /** 当前导航类型 */
    const navType = ref(props.navType)
    /** CesiumLab 服务地址 */
    const cesiumLabUrl = ref<string>()
    /** ESSS 服务地址 */
    const esssUrl = ref<string>()
    /** 鼠标悬停的菜单项索引 */
    const iconheight = ref(-1)
    const iconheight1 = ref(-1)
    /** 右侧模块显示状态 */
    const rightModuleShow = toVR<boolean>(disposer, [xbsjEarthUi, 'rightModuleShow'])
    /** 是否存在 from 参数 */
    const fromIsExist = ref(true)
    /** 保存菜单展开状态 */
    const xiaosanjiao = ref(true)
    /** 更多菜单显示状态 */
    const moreMenuShow = ref(false)
    /** 默认显示的导航列表 */
    const defalutNavList = shallowRef<MenuType[]>([])
    /** 隐藏在更多菜单中的导航列表 */
    const noneNavList = shallowRef<MenuType[]>([])
    /** 当前激活的组件 */
    const com = shallowRef(props.navList[0]?.component)

    // ==================== 模板引用 ====================
    const menuRef = useTemplateRef('menuRef')
    const moreNavRef = useTemplateRef('moreNavRef')
    const moreMenuRef = useTemplateRef('moreMenuRef')

    // ==================== 计算属性 ====================
    /** Logo 样式 */
    const logoStyle = computed(() => ({
        backgroundImage: `url(${$config.logoImage})`
    }))

    /** 子菜单样式 */
    const subMenuStyle = computed(() => ({
        right: rightModuleShow.value ? '0px' : `-400px`
    }))

    /** 保存场景菜单列表 */
    const sceneList = computed(() => [
        {
            content: '保存到服务',
            fun: handleSaveToServer
        },
        {
            content: '保存到本地',
            fun: handleSaveToLocal
        }
    ])

    // ==================== 场景保存相关方法 ====================
    /**
     * 处理 API 响应
     * @param response - API 响应对象
     * @param successMsg - 成功消息
     * @param errorMsg - 错误消息
     */
    const handleApiResponse = (response: ApiResponse, successMsg: string, errorMsg: string) => {
        if (response.status === 'ok' || response.code === 1000) {
            ElMessage.success(successMsg)
            return true
        } else {
            ElMessage.error(errorMsg)
            return false
        }
    }

    /**
     * 保存场景到 ESSS 服务器
     * @param parseSearch - 解析后的 URL 参数
     * @param uri - 服务器地址
     */
    const esssScene = async (parseSearch: ParsedSearch, uri: string) => {
        const { ESSSsceneid: sceneid, token, appid } = parseSearch
        const allJson = xbsjEarthUi.json

        if (!appid) {
            ElMessage.error('无 appid，保存场景失败')
            return
        }

        try {
            await get(`${xbsjEarthUi.esssUrl}/setting/get`)

            if (!sceneid) {
                // 创建新场景
                const thumbnail = await xbsjEarthUi.activeViewer?.capture()
                const res = await post(
                    `${uri}/staticscene/create`,
                    {
                        name: '默认场景',
                        appid,
                        thumbnail,
                        content: JSON.stringify(allJson)
                    },
                    token
                )
                handleApiResponse(res, `保存场景成功：${appid}`, `保存场景失败：${appid}`)
            } else {
                // 更新现有场景
                const res = await post(
                    `${uri}/staticscene/update`,
                    { id: sceneid, content: JSON.stringify(allJson) },
                    token
                )
                handleApiResponse(res, `保存场景成功：${appid}`, `保存场景失败：${appid}`)
            }
        } catch (error) {
            console.error('ESSS 场景保存失败:', error)
            // 降级处理：使用 PUT 方法
            try {
                const res = await put(`${uri}/staticscene/${sceneid}`, { content: allJson }, token)
                handleApiResponse(res, `保存场景成功：${appid}`, `保存场景失败：${appid}`)
            } catch (putError) {
                console.error('PUT 请求失败:', putError)
                ElMessage.error(`保存场景失败：${appid}! ${putError}`)
            }
        }
    }

    /**
     * 保存场景到 CesiumLab 服务器
     * @param parseSearch - 解析后的 URL 参数
     * @param uri - 服务器地址
     */
    const cesiumLabScene = async (parseSearch: ParsedSearch, uri: string) => {
        const allJson = xbsjEarthUi.json
        const thumbnail = await xbsjEarthUi.activeViewer?.capture()
        const token = localStorage.getItem('token') as string | undefined
        const authToken = xbsjEarthUi.cesiumLabToken ? undefined : token

        try {
            if (parseSearch.scene) {
                // 更新现有场景
                const params = {
                    content: JSON.stringify(allJson),
                    newId: parseSearch.scene,
                    id: parseSearch.scene,
                    thumbnail
                }
                let url = `${uri}/tile/scene/update`
                if (xbsjEarthUi.cesiumLabToken) {
                    url += `?labtoken=${xbsjEarthUi.cesiumLabToken}`
                }

                const res = await post(url, params, authToken)
                handleApiResponse(res, `更新场景成功：${parseSearch.scene}`, '更新场景失败')
            } else {
                // 创建新场景
                const params = {
                    name: '新建场景',
                    description: '描述',
                    content: JSON.stringify(allJson),
                    thumbnail
                }
                let url = `${uri}/tile/scene/create`
                if (xbsjEarthUi.cesiumLabToken) {
                    url += `?labtoken=${xbsjEarthUi.cesiumLabToken}`
                }

                const res = await post(url, params, authToken)
                if (handleApiResponse(res, `创建场景成功：${res.data.id}`, '创建场景失败')) {
                    // 更新浏览器地址栏
                    const newUrl = `${window.location.origin}${window.location.pathname}?from=${$config.jumpOrigin}${xbsjEarthUi.cesiumLabToken ? '&cesiumLabToken=' + xbsjEarthUi.cesiumLabToken : ''
                        }&scene=${res.data.id}`
                    window.history.pushState({}, '', newUrl)
                }
            }
        } catch (error) {
            console.error('CesiumLab 场景保存失败:', error)
            ElMessage.error(`场景操作失败! ${error}`)
        }
    }

    /**
     * 保存场景（根据来源判断保存方式）
     */
    const saveScene = () => {
        const search = window.location.search.substring(1)
        const parseSearch = parse(search) as ParsedSearch

        if (parseSearch.from === $config.jumpOrigin) {
            cesiumLabScene(parseSearch, cesiumLabUrl.value!)
        } else if (parseSearch.from === 'esss') {
            esssScene(parseSearch, esssUrl.value!)
        } else {
            ElMessage.warning('请输入服务地址')
        }
    }

    /**
     * 保存到服务器
     */
    const handleSaveToServer = () => {
        console.log('保存场景到服务器:', xbsjEarthUi.json)
        saveScene()
    }

    /**
     * 保存到本地
     */
    const handleSaveToLocal = () => {
        console.log('保存场景到本地:', xbsjEarthUi.json)
        saveAs(xbsjEarthUi.json, '场景文件')
    }

    /**
     * 处理保存按钮点击
     */
    const handleSaveClick = () => {
        if (fromIsExist.value) {
            xiaosanjiao.value = !xiaosanjiao.value
        } else {
            handleSaveToLocal()
        }
    }

    // ==================== 导航菜单相关方法 ====================
    /**
     * 切换导航项
     * @param item - 导航项
     * @param closeMoreMenu - 是否关闭更多菜单
     */
    const change = (item: MenuType, closeMoreMenu?: boolean) => {
        // 切换显示状态或组件
        if (item.value === navType.value) {
            rightModuleShow.value = !rightModuleShow.value
        } else {
            rightModuleShow.value = true
            com.value = item.component
            navType.value = item.value
        }

        // 关闭更多菜单
        if (closeMoreMenu) {
            moreMenuShow.value = false
        }
    }

    /**
     * 更新更多菜单位置
     * @param toggleShow - 是否切换显示状态
     */
    const changeMore = (toggleShow?: boolean) => {
        // 如果是切换显示状态，先切换状态再设置位置
        if (toggleShow) {
            moreMenuShow.value = !moreMenuShow.value
        }

        // 使用 nextTick 确保 DOM 更新后再设置位置
        nextTick(() => {
            if (!moreNavRef.value || !moreMenuRef.value) return

            const navRect = moreNavRef.value.getBoundingClientRect()
            const { top, left, height } = navRect

            moreMenuRef.value.style.top = `${top + height}px`
            moreMenuRef.value.style.left = `${left}px`
        })
    }

    /**
     * 点击外部关闭更多菜单
     */
    const clickOutside = () => {
        if (moreMenuShow.value) {
            moreMenuShow.value = false
        }
    }

    /**
     * 计算菜单布局（响应式）
     */
    const calculateMenuLayout = () => {
        if (!menuRef.value) return

        const width = menuRef.value.getBoundingClientRect().width
        const count = Math.floor(width / MENU_ITEM_WIDTH)

        if (count <= 0) {
            defalutNavList.value = []
            noneNavList.value = [...props.navList]
        } else {
            defalutNavList.value = [...props.navList.slice(0, count - 1)]
            noneNavList.value = [...props.navList.slice(count - 1)]
        }

        // 如果更多菜单正在显示，更新其位置
        if (moreMenuShow.value) {
            changeMore()
        }
    }

    /**
     * 防抖函数
     * @param fn - 要防抖的函数
     * @param delay - 延迟时间（毫秒）
     */
    const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
        let timer: ReturnType<typeof setTimeout> | null = null
        return (...args: Parameters<T>) => {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => fn(...args), delay)
        }
    }

    // ==================== 主题切换 ====================
    const { toggleTheme } = useTheme()

    // ==================== 生命周期钩子 ====================
    /**
     * 初始化组件
     */
    const initComponent = () => {
        // 设置初始导航类型和组件
        navType.value = props.navType
        const activeNav = props.navList.find((item) => item.value === props.navType)
        if (activeNav) {
            com.value = activeNav.component
        }

        // 初始化服务地址
        esssUrl.value = xbsjEarthUi.esssUrl
        cesiumLabUrl.value = xbsjEarthUi.cesiumLabUrl

        // 监听服务地址变化
        xbsjEarthUi.d(
            xbsjEarthUi.cesiumLabUrlChanged.don(() => {
                cesiumLabUrl.value = xbsjEarthUi.cesiumLabUrl
            })
        )
        xbsjEarthUi.d(
            xbsjEarthUi.esssUrlChanged.don(() => {
                esssUrl.value = xbsjEarthUi.esssUrl
            })
        )

        // 检查是否存在 from 参数
        const search = window.location.search.substring(1)
        const parseSearch = parse(search) as ParsedSearch
        fromIsExist.value = !!parseSearch.from
    }

    /**
     * 初始化响应式菜单布局
     */
    const initResponsiveMenu = () => {
        const debouncedCalculate = debounce(calculateMenuLayout, 150)

        nextTick(() => {
            // 初始计算
            calculateMenuLayout()

            // 监听窗口大小变化
            window.addEventListener('resize', debouncedCalculate)
        })

        // 清理监听器（必须在同步代码中注册）
        onBeforeUnmount(() => {
            window.removeEventListener('resize', debouncedCalculate)
        })
    }

    onMounted(() => {
        initComponent()
        initResponsiveMenu()
    })

    // ==================== 监听器 ====================
    /**
     * 监听侧边栏状态变化，更新导航器位置
     */
    watch(
        rightModuleShow,
        () => {
            if (rightModuleShow.value) {
                xbsjEarthUi.navigatorManager.navigatorScaleRight = DEFAULT_SIDEBAR_WIDTH + NAVIGATOR_OFFSET
                xbsjEarthUi.navigatorManager.timeLineWidth = `calc(100% - ${DEFAULT_SIDEBAR_WIDTH}px)`
            } else {
                xbsjEarthUi.navigatorManager.navigatorScaleRight = NAVIGATOR_OFFSET
                xbsjEarthUi.navigatorManager.timeLineWidth = '100%'
            }
        },
        { immediate: true }
    )

    // ==================== 返回值 ====================
    return {
        // 状态
        navType,
        iconheight,
        iconheight1,
        rightModuleShow,
        fromIsExist,
        xiaosanjiao,
        moreMenuShow,
        defalutNavList,
        noneNavList,
        com,

        // 计算属性
        logoStyle,
        subMenuStyle,
        sceneList,

        // 方法
        change,
        changeMore,
        clickOutside,
        toggleTheme,
        handleSaveClick
    }
}

