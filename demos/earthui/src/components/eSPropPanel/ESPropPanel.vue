<script setup lang="ts">
import { createVueDisposer, messageLoading, toReadonlyVueRef } from 'earthsdk-ui'
import { ESJLonLatFormatType, ESVisualObject, ReactVarProperty, SceneTreeItem } from 'earthsdk3'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { ElTabs, ElTabPane, ElIcon } from 'element-plus'
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
import MoreProprties from './propertiesMenu/MoreProprties/index.vue'
import BasicProprties from './propertiesMenu/basicProprties/index.vue'
import CoordinateProprties from './propertiesMenu/coordinateProprties/index.vue'
import GeneralProprties from './propertiesMenu/generalProprties/index.vue'
import LocationProprties from './propertiesMenu/locationProprties/index.vue'
import {
  BasicIcon,
  GeneralIcon,
  CoordinateIcon,
  DataSourceIcon,
  LocationIcon,
  StyleIcon,
  AllIcon,
} from './propertiesMenu/icons'

const props = withDefaults(defineProps<{ treeItem: SceneTreeItem }>(), {});
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi;

let propertiesMenu: { name: string; component: string, value: ReactVarProperty<any>[] }[] = [];
const currentMenu = ref('general');
const { treeItem } = props;

if (!treeItem.sceneObject) {
  throw new Error('PropPanel treeItem.sceneObject is undefined')
}
const sceneObject = treeItem.sceneObject;
const typeName = sceneObject.typeName;
const properties = sceneObject.getESProperties();

const disposer = createVueDisposer(onBeforeUnmount);
const lonLatFormat = toReadonlyVueRef<ESJLonLatFormatType>(disposer, [xbsjEarthUi.activeViewer, 'lonLatFormat'])
const propTreeCallback = xbsjEarthUi.propTreeCallback.bind(xbsjEarthUi);

const { defaultMenu } = properties;
const basic = properties.basic as ReactVarProperty<any>[];
const general = properties.general as ReactVarProperty<any>[];
const coordinate = properties.coordinate as ReactVarProperty<any>[];
const dataSource = properties.dataSource as ReactVarProperty<any>[];
const location = properties.location as ReactVarProperty<any>[];
const style = properties.style as ReactVarProperty<any>[];
const more = properties.more as ReactVarProperty<any>[];

const components: { [key: string]: any } = {
  basic: {
    component: BasicProprties,
    icon: BasicIcon
  },
  general: {
    component: GeneralProprties,
    icon: GeneralIcon
  },
  coordinate: {
    component: CoordinateProprties,
    icon: CoordinateIcon
  },
  dataSource: {
    component: CoordinateProprties,
    icon: DataSourceIcon
  },
  location: {
    component: LocationProprties,
    icon: LocationIcon
  },
  style: {
    component: CoordinateProprties,
    icon: StyleIcon
  },
  all: {
    component: MoreProprties,
    icon: AllIcon
  },
  // MoreProprties
}


const all = [
  ...basic,
  ...general,
  ...coordinate,
  ...dataSource,
  ...location,
  ...style,
  ...more
];
const init = () => {
  currentMenu.value = defaultMenu ?? 'general'
  if (basic.length > 0) {
    propertiesMenu.push({
      name: '基本',
      component: 'basic',
      value: basic,
    })
  }
  if (general.length > 0) {
    propertiesMenu.push({
      name: '通用',
      component: 'general',
      value: general
    })
  }
  if (coordinate.length > 0) {
    propertiesMenu.push({
      name: '坐标',
      component: 'coordinate',
      value: coordinate
    })
  }
  if (dataSource.length > 0) {
    propertiesMenu.push({
      name: '数据源',
      component: 'dataSource',
      value: dataSource
    })
  }
  if (location.length > 0) {
    propertiesMenu.push({
      name: '位置',
      component: 'location',
      value: location
    })
  }
  if (style.length > 0) {
    propertiesMenu.push({
      name: '样式',
      component: 'style',
      value: style
    })
  }
  if (all.length > 0) {
    propertiesMenu.push({
      name: '全部',
      component: 'all',
      value: all
    })
  }

}
init();



onMounted(() => {

  //编辑时提示
  let disposeEditing: (() => void) | undefined;
  let close: (() => void) | undefined;
  if (Reflect.has(sceneObject, 'editing')) {
    disposeEditing = (sceneObject as ESVisualObject).editingChanged.don((res: boolean) => {
      if (res) {
        close = messageLoading('1.双击鼠标左键或点击ESC键退出编辑; 2.点击空格键进行编辑方式的切换');
      } else {
        close && close() && (close = undefined);
      }
    })
  }

  onBeforeUnmount(() => {
    disposeEditing && disposeEditing() && (disposeEditing = undefined);
    close && close() && (close = undefined);
  })
})
</script>

<template>
  <div class="Property_content">
    <!-- stretch -->
    <el-tabs v-model="currentMenu" stretch>
      <el-tab-pane v-for="item in propertiesMenu" :label="item.name" :name="item.component" :key="item.component">

        <template #label>
          <span class="custom-tabs-item">
            <span class="custom-tabs-icon">
              <component :is="components[item.component].icon" />
            </span>
            <span>{{ item.name }}</span>
          </span>
        </template>

        <div class="propertie_content">
          <component :is="components[item.component].component" :properties="item.value" :lonLatFormat="lonLatFormat"
            :type="typeName" :currentMenu="currentMenu" :treeItem="treeItem" @callback="propTreeCallback"
            :panel-style="item.component">
          </component>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.Property_content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0 10px 10px 10px;
  box-sizing: border-box;
}

/* 让 el-tabs 占满剩余空间 */
.Property_content :deep(.el-tabs) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 让 el-tab-pane 占满空间 */
.Property_content :deep(.el-tab-pane) {
  height: 100%;
}

.Property_content :deep(.el-tabs__item) {
  padding: 0 10px;
}

.custom-tabs-item {
  display: flex;
  align-items: center;
}

.custom-tabs-icon {
  margin-right: 4px;
  font-size: 16px;
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
}

.propertie_content::-webkit-scrollbar {
  width: 3px;
}


.propertie_content::-webkit-scrollbar {
  width: 3px;
  background-color: rgba(41, 42, 46, 1);
  border-radius: 2px;
}

.propertie_content::-webkit-scrollbar-thumb {
  background-color: rgba(183, 183, 183, 1);
  border-radius: 2px;
}

.propertie_content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
