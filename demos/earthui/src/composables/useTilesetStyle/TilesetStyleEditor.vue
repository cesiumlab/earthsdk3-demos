<template>
  <el-dialog :model-value="props.show" title="样式编辑器" width="850px" :before-close="selectTypeCancel" :modal="false"
    :draggable="true" class="create-scene-object-dialog">
    <div class="dialog-content">
      <div class="set_style">
        <!-- 左侧列表 -->
        <div class="set_style_list">
          <div class="set_style_name">样式列表</div>
          <div class="style_list">
            <div class="style_list_div">
              <!-- 循环默认样式 -->
              <div v-for="(item, index) in styleList" :key="item.id" class="set_style_list_lilist" :title="item.name">
                <div class="set_imgposition" :class="{ set_checkedactive: checkedactive === index }"
                  @click="changeStyle(item, index, true)">
                  <img :src="item.thumbnail" alt="" />
                </div>
                <div class="setStyle_onlineimageName">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧编辑器 -->
        <div class="set_style_edit">
          <!-- 切换按钮 -->
          <div class="set_style_tab">
            <div>
              <div class="header_item3" @click="changeCurrentEdit">
                <span class="header_item_span3" :class="currentMenu === 'edit' ? 'header_active3' : ''">{{ '规则可视化编辑器'
                }}</span>
              </div>
              <div class="header_item3" @click="currentMenu = 'JsonEdit'">
                <span class="header_item_span3" :class="currentMenu === 'JsonEdit' ? 'header_active3' : ''">{{
                  '规则 JSON 编辑器'
                }}</span>
              </div>
            </div>
          </div>
          <!-- 可视化编辑器 -->
          <div class="style_rule_edit" v-if="currentMenu === 'edit'">
            <div class="set_style_rule1">
              <div class="set_style_rule_list" style="height: 30px; line-height: 30px">
                <div class="style_rule_list_index">序号</div>
                <div class="style_rule_list_two">规则</div>
                <div class="style_rule_list_color">颜色</div>
                <div class="style_rule_list_show">显隐</div>
                <div class="style_rule_list_change">
                  <span style="cursor: pointer" @click.stop="addOneRule" title="添加大规则" @mouseenter="hoverIndex = -1"
                    @mouseleave="hoverIndex = -2">
                    <ESIcon :name="'tianjia'" />
                  </span>
                </div>
              </div>
            </div>
            <div class="set_style_rule2">
              <div class="set_style_rule_list2" v-for="(item, index) in ruleRef" :key="index">
                <div class="style_rule_list_index">{{ index + 1 }}</div>
                <div class="style_rule_list_two">
                  <div class="rule_list_two_name">
                    <div class="rule_list_two_valuename">属性</div>
                    <div class="rule_list_two_Operator">条件</div>
                    <div class="rule_list_two_value">值</div>
                    <div class="rule_list_two_change">
                      <span style="cursor: pointer" @click.stop="listaAddOneRule(index)" title="添加条件"
                        @mouseenter="hoverliIndex = index" @mouseleave="hoverliIndex = -2">
                        <ESIcon :name="'tianjia'" />
                      </span>
                    </div>
                  </div>
                  <div class="rule_list_two_name2" v-for="(i, ind) in item.condition" :key="ind">
                    <div>
                      <div class="rule_list_two_valuename">
                        <el-select v-if="typeof i === 'boolean'" :model-value="i"
                          @change="(val) => changeruleOpByValue(val, index, ind)" size="small" class="rule-select">
                          <el-option v-for="field in fieldList" :key="String(field[1])" :label="field[0]"
                            :value="field[1]">
                          </el-option>
                        </el-select>
                        <el-select v-else v-model="i.field" @change="(val) => changeruleOpByValue(val, index, ind)"
                          size="small" class="rule-select">
                          <el-option v-for="field in fieldList" :key="String(field[1])" :label="field[0]"
                            :value="field[1]">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="rule_list_two_Operator"
                        :class="{ ' rule_list_two_Operator_ban': typeof i === 'boolean' }">
                        <el-select v-if="typeof i === 'boolean'" model-value="" disabled size="small"
                          class="rule-select">
                        </el-select>
                        <el-select v-else v-model="i.op" size="small" class="rule-select">
                          <el-option v-for="op in (obtainType(i) === 'string' ? stringOpList : numberOpList)"
                            :key="String(op[1])" :label="op[0]" :value="op[1]">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="rule_list_two_value"
                        :class="{ ' rule_list_two_Operator_ban': typeof i === 'boolean' }">
                        <input type="text" :value="typeof i === 'boolean' ? '' : i.value"
                          :disabled="typeof i === 'boolean'" :class="{ input_ban: typeof i === 'boolean' }"
                          @input="changeRuleValue($event, index, ind, i)" />
                      </div>
                      <div class="rule_list_two_change">
                        <span @click="listadeleteOneRule(index, ind)"
                          @mouseenter="hoverlideleteIndex = ind; hoverlideleteIndexHover = index"
                          @mouseleave="hoverlideleteIndex = -2; hoverlideleteIndexHover = -2" style="cursor: pointer"
                          title="删除条件">
                          <ESIcon :name="'shanchu_2'" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="style_rule_list_color">
                  <ESColor :showInput="false" :color="transformColor(item.color)" @ok="okHandler(index, $event)">
                  </ESColor>
                </div>
                <div class="style_rule_list_show">
                  <el-checkbox v-model="item.show" class="rule-checkbox" />
                </div>
                <div class="style_rule_list_change">
                  <span @click="deleteOneRule(index)" @mouseenter="hoverdeleteIndex = index"
                    @mouseleave="hoverdeleteIndex = -2" style="cursor: pointer" title="删除规则">
                    <ESIcon :name="'shanchu_2'" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- 规则JSON编辑器 -->
          <div class="style_rule_edit" v-else>
            <ESEditor :language="'json'" :readonly="false" @load="load" ref="editorContainer" @change="change">
            </ESEditor>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="selectTypeCancel">取消</el-button>
        <el-button type="primary" @click="selectTypeOk()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElButton, ElDialog, ElMessage, ElMessageBox, ElSelect, ElOption, ElCheckbox } from "element-plus";
import { ESEditor, ESColor, ESIcon } from "earthsdk-ui";
import type { StyleData, StyleRule, FeatureType, FieldListItem, RuleCondition } from './index';
import { ref, useTemplateRef, watch } from "vue";

/**
 * 组件属性定义
 */
const props = withDefaults(defineProps<{
  /** 是否显示对话框 */
  show: boolean,
  /** 样式列表数据 */
  styleList?: StyleData[],
  /** 字段列表 */
  fieldList?: FieldListItem[],
  /** 字段类型列表 */
  featureTypes?: FeatureType[],
  /** 初始规则数据 */
  initialRule?: StyleRule[],
  /** 解析回调函数 */
  resolve: (data: StyleRule[] | undefined) => void,
}>(), {
  show: true,
  styleList: () => [],
  fieldList: () => [['id', 'id']],
  featureTypes: () => [{ key: 'id', type: 'string' }],
  initialRule: () => []
});

/**
 * 取消操作
 */
const selectTypeCancel = () => {
  props.resolve(undefined)
};

/**
 * 确认操作
 */
const selectTypeOk = () => {
  try {
    // 返回编辑后的规则数据
    props.resolve(JSON.parse(JSON.stringify(ruleRef.value)))
    ElMessage.success('确认成功')
  } catch (error) {
    console.error('确认失败:', error)
    ElMessage.error(`确认失败！error: ${error}`)
  }
};


/** 控制划过变色的变量 */
const hoverIndex = ref<number>(-2)
const hoverliIndex = ref<number>(-2)
const hoverlideleteIndex = ref<number>(-2)
const hoverlideleteIndexHover = ref<number>(-2)
const hoverdeleteIndex = ref<number>(-2)

/** 字符串对应的符号列表 */
const stringOpList: FieldListItem[] = [
  ['==', '=='],
  ['!=', '!='],
  ['contain', 'contain'],
  ['empty', 'empty']
]

/** 数字对应的符号列表 */
const numberOpList: FieldListItem[] = [
  ['==', '=='],
  ['!=', '!='],
  ['>', '>'],
  ['>=', '>='],
  ['<', '<'],
  ['<=', '<=']
]

/** 字段列表 */
const fieldList = ref<FieldListItem[]>(props.fieldList || [['id', 'id']])

/** 当前的模块是可视化还是json */
const currentMenu = ref<'edit' | 'JsonEdit'>('edit')

/** 编辑器容器引用 */
const editorContainer = useTemplateRef<InstanceType<typeof ESEditor>>('editorContainer')

/** 样式列表 */
const styleList = ref<StyleData[]>(props.styleList || [])
/**
 * 点击切换到可视化编辑模块
 */
const changeCurrentEdit = async () => {
  if (currentMenu.value === 'edit') return
  try {
    const json = [...ruleRef.value]
    const newJson: StyleRule[] = []
    json.forEach((item) => {
      const normalizedItem: StyleRule = {
        condition: item.condition || [],
        show: item.show ?? false,
        color: item.color || [1, 0, 0, 1]
      }

      if (Array.isArray(normalizedItem.condition)) {
        newJson.push(normalizedItem)
      } else {
        const condition = normalizedItem.condition as unknown as RuleCondition | boolean
        normalizedItem.condition = condition ? [condition] : []
        newJson.push(normalizedItem)
      }
    })
    ruleRef.value = newJson
    currentMenu.value = 'edit'
  } catch (error) {
    console.log('JSON格式错误!!!', error)
    if (error === undefined) {
      ElMessage.error('样式未定义')
    } else {
      ElMessage.error(`JSON格式错误！ error: ${error}`)
      return
    }
  }
}

/** 规则数据 */
const ruleRef = ref<StyleRule[]>(props.initialRule || [])

/** 获取对象的属性的类型 */
const featureType = ref<FeatureType[]>(props.featureTypes || [
  {
    key: 'id',
    type: 'string'
  }
])
/**
 * 颜色转为0-255范围的函数
 * @param colorRef - 0-1范围的颜色数组
 * @returns 0-255范围的颜色对象
 */
const transformColor = (colorRef?: [number, number, number, number]) => {
  if (!colorRef) {
    return {
      r: 255,
      g: 255,
      b: 255,
      a: 1
    }
  }
  return {
    r: colorRef[0] * 255,
    g: colorRef[1] * 255,
    b: colorRef[2] * 255,
    a: colorRef[3]
  }
}

/**
 * 修改颜色
 * @param index - 规则索引
 * @param rgba - 颜色对象
 */
const okHandler = (index: number, rgba: { r: number; g: number; b: number; a: number }) => {
  const rgbaArr: [number, number, number, number] = [
    rgba.r / 255,
    rgba.g / 255,
    rgba.b / 255,
    rgba.a
  ]
  ruleRef.value[index].color = rgbaArr
}

/**
 * 获取字段显示值（用于布尔类型）- 已废弃，直接使用 typeof 判断
 * @deprecated
 * @param item - 条件项
 * @returns 显示值
 */
const getFieldDisplayValue = (item: RuleCondition | boolean): string | boolean => {
  if (typeof item === 'boolean') {
    return item
  }
  return item.field
}

/**
 * 通过值修改属性（适配 el-select 的 change 事件）
 * @param value - 选择的值
 * @param index - 规则索引
 * @param ind - 条件索引
 */
const changeruleOpByValue = (value: string | boolean, index: number, ind: number) => {
  if (typeof value === 'boolean') {
    ruleRef.value[index].condition[ind] = value
  } else {
    const newCondition: RuleCondition = {
      field: value,
      op: '==',
      value: 'xxx'
    }
    ruleRef.value[index].condition[ind] = newCondition

    setTimeout(() => {
      const condition = ruleRef.value[index].condition[ind]
      if (typeof condition === 'boolean') return

      const fieldType = obtainType(condition)
      if (fieldType === 'string') {
        condition.value = String(condition.value)
      } else if (fieldType === 'number') {
        const numValue = Number(condition.value)
        condition.value = isNaN(numValue) ? 0 : numValue
      }
    }, 100)
  }
}

/**
 * input框中输入的时候判断是什么类型进行转换
 * @param e - 输入事件
 * @param index - 规则索引
 * @param ind - 条件索引
 * @param item - 条件项
 */
const changeRuleValue = (e: Event, index: number, ind: number, item: RuleCondition | boolean) => {
  if (typeof item === 'boolean') return

  const targetValue = (e.target as HTMLInputElement).value
  const condition = ruleRef.value[index].condition[ind]

  if (typeof condition === 'boolean') return

  if (obtainType(item) === 'string') {
    condition.value = targetValue
  } else {
    condition.value = Number(targetValue)
  }
}

/**
 * 添加一条大规则（新增一个完整的样式规则）
 * 包含默认的条件、颜色和显示状态
 */
const addOneRule = () => {
  // 获取第一个可用字段，如果没有则使用 'id'
  const firstField = fieldList.value.find(f => typeof f[1] === 'string')
  const defaultField = firstField ? String(firstField[1]) : 'id'

  // 创建新规则
  const newRule: StyleRule = {
    condition: [
      {
        field: defaultField,
        op: '==',
        value: ''
      }
    ],
    color: [1, 0, 0, 1], // 默认红色
    show: true
  }

  // 添加到规则列表
  ruleRef.value = [...ruleRef.value, newRule]

  // 提示用户
  ElMessage.success(`已添加新规则 #${ruleRef.value.length}`)
}

/**
 * 删除某一项大规则
 * @param index - 规则索引
 */
const deleteOneRule = (index: number) => {
  // 检查是否是最后一条规则
  if (ruleRef.value.length === 1) {
    ElMessage.warning('至少需要保留一条规则')
    return
  }

  // 确认删除
  ElMessageBox.confirm(
    `确认删除规则 #${index + 1} 吗？此操作不可恢复。`,
    '删除确认',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // 执行删除
    ruleRef.value = ruleRef.value.filter((_, i) => i !== index)
    ElMessage.success(`已删除规则 #${index + 1}`)
  }).catch(() => {
    // 用户取消
  })
}

/**
 * 在规则中增加一项内部条件
 * @param index - 规则索引
 */
const listaAddOneRule = (index: number) => {
  // 获取第一个可用字段
  const firstField = fieldList.value.find(f => typeof f[1] === 'string')
  const defaultField = firstField ? String(firstField[1]) : 'id'

  // 创建新条件
  const newCondition: RuleCondition = {
    field: defaultField,
    op: '==',
    value: ''
  }

  // 添加到指定规则的条件列表
  ruleRef.value[index].condition.push(newCondition)

  // 提示用户
  ElMessage.success(`已在规则 #${index + 1} 中添加新条件`)
}

/**
 * 删除规则中的一项内部条件
 * @param index - 规则索引
 * @param ind - 条件索引
 */
const listadeleteOneRule = (index: number, ind: number) => {
  const rule = ruleRef.value[index]

  // 检查是否是最后一个条件
  if (rule.condition.length === 1) {
    ElMessage.warning('每条规则至少需要保留一个条件')
    return
  }

  // 确认删除
  ElMessageBox.confirm(
    `确认删除规则 #${index + 1} 中的条件 #${ind + 1} 吗？`,
    '删除确认',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // 执行删除
    ruleRef.value[index].condition = rule.condition.filter((_, i) => i !== ind)
    ElMessage.success(`已删除条件 #${ind + 1}`)
  }).catch(() => {
    // 用户取消
  })
}

/**
 * 切换样式
 * @param item - 样式项
 * @param index - 样式索引
 * @param flag - 是否激活
 */
const changeStyle = (item: StyleData, index: number, flag: boolean) => {
  if (flag) {
    checkedactive.value = index
  } else {
    checkedactive.value = -1
  }
  ruleRef.value = JSON.parse(JSON.stringify(item.code))
  if (currentMenu.value !== 'edit') {
    editorContainer.value?.setVal(JSON.stringify(ruleRef.value, undefined, '    '))
  }
}

/** 样式列表的当前选中 */
const checkedactive = ref<number>(0)

/**
 * 获取属性名对应的类型
 * @param item - 条件项
 * @returns 类型字符串或布尔值
 */
const obtainType = (item: RuleCondition | boolean): 'string' | 'number' | true | undefined => {
  if (typeof item === 'boolean') {
    return true
  }

  if (item.field) {
    const fieldType = featureType.value.find((element) => element.key === item.field)
    return fieldType?.type
  }

  return undefined
}

/**
 * 编辑器加载完成回调
 */
const load = () => {
  editorContainer.value?.setVal(JSON.stringify(ruleRef.value, undefined, '    '))
}

/**
 * 编辑器内容变化回调
 * @param value - 编辑器当前值
 */
const change = (value: string) => {
  try {
    ruleRef.value = JSON.parse(value)
  } catch (error) {
    console.error('JSON 解析失败:', error)
  }
}

/**
 * 监听 props 变化，初始化数据
 */
watch(
  () => [props.styleList, props.fieldList, props.featureTypes, props.initialRule],
  () => {
    // 更新样式列表
    if (props.styleList && props.styleList.length > 0) {
      styleList.value = JSON.parse(JSON.stringify(props.styleList))
      if (styleList.value.length > 0) {
        ruleRef.value = JSON.parse(JSON.stringify(styleList.value[styleList.value.length - 1].code))
        checkedactive.value = styleList.value.length - 1
      }
    }

    // 更新字段列表
    if (props.fieldList && props.fieldList.length > 0) {
      fieldList.value = [...props.fieldList]
      fieldList.value.push(['常量true', true])
      fieldList.value.push(['常量false', false])
    }

    // 更新字段类型
    if (props.featureTypes && props.featureTypes.length > 0) {
      featureType.value = [...props.featureTypes]
    }

    // 更新初始规则
    if (props.initialRule && props.initialRule.length > 0) {
      ruleRef.value = JSON.parse(JSON.stringify(props.initialRule))
    }
  },
  { immediate: true, deep: true }
)

</script>

<style scoped lang="scss">
@use './style.scss';
</style>
