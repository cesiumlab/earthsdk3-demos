<template>
    <div class="earthui-menu-bar">
        <!-- Logo 区域 -->
        <div class="earthui-logo-container">
            <div class="logo_img" :style="logoStyle"></div>
            <a :href="$config.logoLink" target="_blank">{{ $config.logoTitle }}</a>
        </div>

        <!-- 导航栏 -->
        <div ref="menuRef" class="earthui-menu-nav">
            <!-- 默认显示的导航项 -->
            <div v-for="(item, index) in defalutNavList" v-show="item.isShow" :key="item.id"
                :class="['earthui-neck-title', { 'earthui-activated': navType === item.value }]" :title="item.title"
                @click="change(item)" @mouseover="iconheight = index" @mouseout="iconheight = -1">
                <span class="earthui-ctm-svg">
                    <es-icon :name="item.icon" />
                </span>
                <span class="earthui-ctm-title">{{ item.title }}</span>
                <span v-if="item.new" class="earthui-ctm-new">NEW</span>
            </div>

            <!-- 更多菜单按钮 -->
            <div v-if="noneNavList.length !== 0" ref="moreNavRef"
                :class="['earthui-neck-title', { 'earthui-activated': moreMenuShow }]" @click.stop="changeMore(true)">
                <span class="earthui-ctm-svg">
                    <svg t="1760181802183" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                        width="18" height="18" fill="currentColor">
                        <path
                            d="M511.998977 113.725134c219.514529 0 398.103974 178.588421 398.103974 398.103974S731.513506 909.933081 511.998977 909.933081 113.895003 731.34466 113.895003 511.829108 292.485471 113.725134 511.998977 113.725134M511.998977 63.961754c-246.947322 0-447.867354 200.919009-447.867354 447.867354s200.920032 447.867354 447.867354 447.867354c246.944252 0 447.867354-200.919009 447.867354-447.867354S758.943228 63.961754 511.998977 63.961754L511.998977 63.961754z" />
                        <path
                            d="M327.384305 511.829108m-45.216831 0a44.187 44.187 0 1 0 90.433662 0 44.187 44.187 0 1 0-90.433662 0Z" />
                        <path
                            d="M511.997953 511.829108m-45.216831 0a44.187 44.187 0 1 0 90.433662 0 44.187 44.187 0 1 0-90.433662 0Z" />
                        <path
                            d="M696.612625 511.829108m-45.216831 0a44.187 44.187 0 1 0 90.433662 0 44.187 44.187 0 1 0-90.433662 0Z" />
                    </svg>
                </span>
                <span>更多</span>
            </div>
        </div>

        <!-- 更多菜单弹出框 -->
        <div v-show="moreMenuShow" ref="moreMenuRef" v-click-outside="clickOutside" class="earthui-none-menu-box"
            :data-show="moreMenuShow">
            <div v-for="(item, index) in noneNavList" v-show="item.isShow" :key="item.id"
                :class="['earthui-neck-title', { 'earthui-activated': navType === item.value }]" :title="item.title"
                @click="change(item, true)" @mouseover="iconheight1 = index" @mouseout="iconheight1 = -1">
                <span class="earthui-ctm-svg">
                    <es-icon :name="item.icon" />
                </span>
                <span class="earthui-ctm-title">{{ item.title }}</span>
            </div>
        </div>

        <!-- 主题切换按钮 -->
        <div class="earthui-neck-theme-icon" @click="toggleTheme" title="切换主题">
            <svg t="1767868138156" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16"
                height="16" fill="currentColor">
                <path
                    d="M512 796.444444A284.444444 284.444444 0 1 0 512 227.555556a284.444444 284.444444 0 0 0 0 568.888888z m-315.335111-153.827555a341.333333 341.333333 0 1 1 630.670222-261.233778 341.333333 341.333333 0 0 1-630.670222 261.233778zM341.333333 625.265778a306.005333 306.005333 0 0 0 194.787556-89.144889A306.005333 306.005333 0 0 0 625.265778 341.333333 204.8 204.8 0 1 1 341.333333 625.265778z" />
                <path
                    d="M516.892444 0h-0.113777c22.584889 0 33.848889 11.605333 33.848889 34.816v46.307556c0 23.210667-11.264 34.816-33.848889 34.816h0.113777c-22.584889 0-33.848889-11.605333-33.848888-34.816V34.816c0-23.210667 11.264-34.816 33.848888-34.816zM516.892444 908.060444h-0.113777c22.584889 0 33.848889 11.605333 33.848889 34.816v46.307556c0 23.210667-11.264 34.816-33.848889 34.816h0.113777c-22.584889 0-33.848889-11.605333-33.848888-34.816v-46.307556c0-23.210667 11.264-34.816 33.848888-34.816zM1024 516.892444v-0.113777c0 22.584889-11.605333 33.848889-34.816 33.848889h-46.307556c-23.210667 0-34.816-11.264-34.816-33.848889v0.113777c0-22.584889 11.605333-33.848889 34.816-33.848888h46.307556c23.210667 0 34.816 11.264 34.816 33.848888zM115.939556 516.892444v-0.113777c0 22.584889-11.605333 33.848889-34.816 33.848889H34.816C11.605333 550.684444 0 539.363556 0 516.778667v0.113777c0-22.584889 11.605333-33.848889 34.816-33.848888h46.307556c23.210667 0 34.816 11.264 34.816 33.848888zM866.872889 157.184v-0.056889c16.327111 16.384 16.327111 32.711111 0 49.095111l-32.711111 32.654222c-16.384 16.384-32.768 16.384-49.095111 0V238.933333c-16.327111-16.327111-16.327111-32.711111 0-49.095111l32.711111-32.654222c16.384-16.384 32.711111-16.384 49.095111 0zM238.933333 785.066667c16.327111 16.327111 16.327111 32.711111 0 49.095111l-32.711111 32.654222c-16.384 16.384-32.711111 16.384-49.095111 0v0.056889c-16.327111-16.384-16.327111-32.711111 0-49.095111l32.711111-32.654222c16.384-16.384 32.768-16.384 49.095111 0zM866.816 866.872889h0.056889c-16.384 16.327111-32.711111 16.327111-49.095111 0l-32.654222-32.711111c-16.384-16.384-16.384-32.768 0-49.095111H785.066667c16.327111-16.327111 32.711111-16.327111 49.095111 0l32.654222 32.711111c16.384 16.384 16.384 32.711111 0 49.095111zM238.933333 238.933333c-16.327111 16.327111-32.711111 16.327111-49.095111 0l-32.654222-32.711111c-16.384-16.384-16.384-32.711111 0-49.095111h-0.056889c16.384-16.327111 32.711111-16.327111 49.095111 0l32.654222 32.711111c16.384 16.384 16.384 32.768 0 49.095111z" />
            </svg>
        </div>

        <!-- 保存按钮 -->
        <div class="earthui-neck-save" title="保存场景">
            <div class="earthui-neck-scene" @click.stop.prevent="handleSaveClick">
                <es-icon name="baocun" />
                <span v-if="fromIsExist" class="earthui-xiaosanjiao"></span>
            </div>
            <ul v-if="fromIsExist && !xiaosanjiao" class="earthui-neck-ft-ul">
                <li v-for="item in sceneList" :key="item.content" @click="item.fun">
                    {{ item.content }}
                </li>
            </ul>
        </div>
    </div>

    <!-- 侧边栏组件 -->
    <div class="earthui-sub-menu" :style="subMenuStyle">
        <div :class="['earthui-sub-menu-button', { 'earthui-sub-menu-button-checked': !rightModuleShow }]"
            @click="rightModuleShow = !rightModuleShow">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15px"
                height="14px" viewBox="0 0 15 14" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-1617.000000, -67.000000)" fill="#9E9D9D">
                        <g transform="translate(1609.000000, 60.000000)">
                            <path
                                d="M10,7 L16,14.0836305 L10,21 L8,21 L14,14.0443019 L8,7 L10,7 Z M17,7 L23,14.0836305 L17,21 L15,21 L21,14.0443019 L15,7 L17,7 Z" />
                        </g>
                    </g>
                </g>
            </svg>
        </div>
        <div id="submenu_component" class="earthui-submenu-component">
            <component :is="com"></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/css/General.css';
import { $config } from '@/global';
import { NavType } from '@/types';
import { vClickOutside } from 'earthsdk-ui';
import { useMenu } from './useMenu';

// ==================== Props 定义 ====================
const props = withDefaults(
    defineProps<{
        navList: NavType[]
        navType?: string
    }>(),
    {
        navType: 'roam'
    }
)

// ==================== 使用 Menu Hook ====================
const {
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
} = useMenu(props)
</script>

<style src="./style.scss" lang="scss"></style>
