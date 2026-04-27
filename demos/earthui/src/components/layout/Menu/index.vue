<template>
    <div class="earthui-menu-bar">
        <!-- Logo 区域 -->
        <div class="earthui-logo-container" v-if="!earthVisLab">
            <div class="logo_img" :style="logoStyle"></div>
            <span class="earthui-logo-interval"></span>
            <a :href="config.homeLink" target="_blank">{{ $t('earthui.header.name') }}</a>
        </div>

        <!-- 导航栏 -->
        <div ref="menuRef" class="earthui-menu-nav" :style="{ width: `calc(100% - ${earthVisLab ? '150' : '400'}px)` }">
            <!-- 默认显示的导航项 -->
            <div v-for="(item, index) in defalutNavList" v-show="item.isShow" :key="item.id"
                :class="['earthui-neck-title', { 'earthui-activated': navType === item.value }]" :title="item.title"
                @click="change(item)" @mouseover="iconheight = index" @mouseout="iconheight = -1">
                <span class="earthui-ctm-svg">
                    <es-icon :name="item.icon" />
                </span>
                <!-- <span class="earthui-ctm-title">{{ item.title }}</span> -->
                <span class="earthui-ctm-title">{{ $t(`earthui.menu.${item.value}`) }}</span>
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
                <span class="earthui-ctm-title">{{ $t(`earthui.menu.${item.value}`) }}</span>
            </div>
        </div>



        <div class="earthui-menu-right">
            <!-- 主题切换按钮 -->
            <!-- TODO:暂时关闭，因为主题配置没改完 -->
            <div v-if="!earthVisLab" class="earthui-neck-icon" @click="toggleTheme" title="切换主题">
                <svg t="1767868138156" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    fill="currentColor">
                    <path
                        d="M512 796.444444A284.444444 284.444444 0 1 0 512 227.555556a284.444444 284.444444 0 0 0 0 568.888888z m-315.335111-153.827555a341.333333 341.333333 0 1 1 630.670222-261.233778 341.333333 341.333333 0 0 1-630.670222 261.233778zM341.333333 625.265778a306.005333 306.005333 0 0 0 194.787556-89.144889A306.005333 306.005333 0 0 0 625.265778 341.333333 204.8 204.8 0 1 1 341.333333 625.265778z" />
                    <path
                        d="M516.892444 0h-0.113777c22.584889 0 33.848889 11.605333 33.848889 34.816v46.307556c0 23.210667-11.264 34.816-33.848889 34.816h0.113777c-22.584889 0-33.848889-11.605333-33.848888-34.816V34.816c0-23.210667 11.264-34.816 33.848888-34.816zM516.892444 908.060444h-0.113777c22.584889 0 33.848889 11.605333 33.848889 34.816v46.307556c0 23.210667-11.264 34.816-33.848889 34.816h0.113777c-22.584889 0-33.848889-11.605333-33.848888-34.816v-46.307556c0-23.210667 11.264-34.816 33.848888-34.816zM1024 516.892444v-0.113777c0 22.584889-11.605333 33.848889-34.816 33.848889h-46.307556c-23.210667 0-34.816-11.264-34.816-33.848889v0.113777c0-22.584889 11.605333-33.848889 34.816-33.848888h46.307556c23.210667 0 34.816 11.264 34.816 33.848888zM115.939556 516.892444v-0.113777c0 22.584889-11.605333 33.848889-34.816 33.848889H34.816C11.605333 550.684444 0 539.363556 0 516.778667v0.113777c0-22.584889 11.605333-33.848889 34.816-33.848888h46.307556c23.210667 0 34.816 11.264 34.816 33.848888zM866.872889 157.184v-0.056889c16.327111 16.384 16.327111 32.711111 0 49.095111l-32.711111 32.654222c-16.384 16.384-32.768 16.384-49.095111 0V238.933333c-16.327111-16.327111-16.327111-32.711111 0-49.095111l32.711111-32.654222c16.384-16.384 32.711111-16.384 49.095111 0zM238.933333 785.066667c16.327111 16.327111 16.327111 32.711111 0 49.095111l-32.711111 32.654222c-16.384 16.384-32.711111 16.384-49.095111 0v0.056889c-16.327111-16.384-16.327111-32.711111 0-49.095111l32.711111-32.654222c16.384-16.384 32.768-16.384 49.095111 0zM866.816 866.872889h0.056889c-16.384 16.327111-32.711111 16.327111-49.095111 0l-32.654222-32.711111c-16.384-16.384-16.384-32.768 0-49.095111H785.066667c16.327111-16.327111 32.711111-16.327111 49.095111 0l32.654222 32.711111c16.384 16.384 16.384 32.711111 0 49.095111zM238.933333 238.933333c-16.327111 16.327111-32.711111 16.327111-49.095111 0l-32.654222-32.711111c-16.384-16.384-16.384-32.711111 0-49.095111h-0.056889c16.384-16.327111 32.711111-16.327111 49.095111 0l32.654222 32.711111c16.384 16.384 16.384 32.768 0 49.095111z" />
                </svg>
            </div>

            <!-- 语言切换 -->
            <!-- TODO:暂时关闭，因为语言配置没改完 -->
            <div v-if="!earthVisLab" class="earthui-neck-icon" @click="toggleLang" title="切换语言">
                <svg t="1773728591085" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="19397" width="16" height="16" fill="currentColor">
                    <path
                        d="M161.28 399.36h128v110.08c0 12.8 10.24 25.6 25.6 25.6s25.6-10.24 25.6-25.6v-110.08h128c17.92 0 33.28-15.36 33.28-33.28V207.36c0-17.92-15.36-33.28-33.28-33.28h-128V102.4c0-12.8-10.24-25.6-25.6-25.6s-25.6 10.24-25.6 25.6v71.68h-128c-17.92 0-33.28 15.36-33.28 33.28v156.16c0 20.48 15.36 35.84 33.28 35.84z m179.2-179.2h99.84c7.68 0 15.36 7.68 15.36 15.36v102.4c0 7.68-7.68 15.36-15.36 15.36h-99.84V220.16z m-163.84 15.36c0-7.68 7.68-15.36 15.36-15.36h99.84v130.56H192c-7.68 0-15.36-7.68-15.36-15.36V235.52zM665.6 875.52h-153.6c-7.68 0-15.36-7.68-15.36-15.36v-97.28c0-7.68 7.68-15.36 15.36-15.36h135.68c12.8 0 23.04-10.24 23.04-23.04s-10.24-23.04-23.04-23.04H512c-7.68 0-15.36-7.68-15.36-15.36v-87.04c0-7.68 7.68-15.36 15.36-15.36h145.92c12.8 0 23.04-10.24 23.04-23.04s-10.24-23.04-23.04-23.04h-179.2c-17.92 0-33.28 15.36-33.28 33.28v312.32c0 17.92 15.36 33.28 33.28 33.28H665.6c12.8 0 23.04-10.24 23.04-23.04 0-7.68-10.24-17.92-23.04-17.92zM857.6 652.8c-15.36 0-28.16 2.56-38.4 7.68-10.24 5.12-23.04 12.8-30.72 25.6v-2.56c0-15.36-12.8-25.6-25.6-25.6-15.36 0-25.6 12.8-25.6 25.6V896c0 15.36 12.8 25.6 25.6 25.6s25.6-12.8 25.6-25.6v-143.36c2.56-20.48 7.68-33.28 20.48-43.52 10.24-10.24 20.48-12.8 33.28-12.8 35.84 0 53.76 20.48 53.76 58.88V896c0 15.36 12.8 25.6 25.6 25.6s25.6-12.8 25.6-25.6v-145.92c0-66.56-30.72-97.28-89.6-97.28zM512 0h-15.36c-12.8 0-25.6 12.8-25.6 25.6 0 15.36 12.8 25.6 25.6 25.6h15.36c253.44 0 460.8 207.36 460.8 460.8 0 40.96-5.12 81.92-15.36 120.32-5.12 15.36 7.68 33.28 25.6 33.28 12.8 0 23.04-7.68 25.6-17.92 10.24-43.52 17.92-87.04 17.92-133.12C1024 230.4 793.6 0 512 0z"
                        p-id="19398"></path>
                    <path
                        d="M527.36 972.8H512c-253.44 0-460.8-207.36-460.8-460.8 0-40.96 5.12-81.92 15.36-120.32 5.12-15.36-7.68-33.28-25.6-33.28-12.8 0-23.04 7.68-25.6 17.92C5.12 422.4 0 465.92 0 512c0 281.6 230.4 512 512 512h15.36c12.8 0 25.6-12.8 25.6-25.6 0-15.36-12.8-25.6-25.6-25.6z"
                        p-id="19399"></path>
                </svg>
            </div>


            <!-- 保存按钮 -->
            <el-dropdown v-if="fromIsExist" trigger="click" @command="handleCommand">
                <div class="earthui-neck-icon" title="保存场景">
                    <es-icon name="baocun" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-for="item in sceneList" :key="item.content" :command="item.command">
                            {{ item.content }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div v-else class="earthui-neck-icon" title="保存场景" @click="handleSaveClick">
                <es-icon name="baocun" />
            </div>

        </div>





        <!-- <div class="earthui-neck-save">
           
        </div> -->
    </div>

    <!-- 侧边栏组件 -->
    <div class="earthui-sub-menu" :style="subMenuStyle">
        <div :class="['earthui-sub-menu-button', { 'earthui-sub-menu-button-checked': !rightModuleShow }]"
            @click="rightModuleShow = !rightModuleShow">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15px"
                height="14px" viewBox="0 0 15 14" version="1.1">
                <g stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
                    <g transform="translate(-1617.000000, -67.000000)">
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
import { $g_config, $g_objm } from '@/global';
import { getNavList } from '@/pages';
import { toggleLang, vClickOutside } from 'earthsdk-ui';
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus';
import { useMenu } from './useMenu';
const objm = $g_objm();
const earthVisLab = objm.initConfig.earthVisLab;
const config = $g_config();
const originalNavList = getNavList(config.specialModuleEnable);
// ==================== 使用 Menu Hook ====================
const {
    // 状态
    navType,
    iconheight,
    iconheight1,
    rightModuleShow,
    fromIsExist,
    moreMenuShow,
    defalutNavList,
    noneNavList,
    com,

    // 计算属性
    logoStyle,
    subMenuStyle,
    sceneList,

    // 方法
    handleCommand,
    change,
    changeMore,
    clickOutside,
    toggleTheme,
    handleSaveClick
} = useMenu({ navList: originalNavList, navType: 'roam' })
</script>

<style src="./style.scss" lang="scss"></style>
