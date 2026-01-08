<script setup lang="ts">
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { inject, nextTick, useTemplateRef } from 'vue'
import { defaultChatConfig, NewChat, NewChatProps } from 'earthsdk-ui'
import { getCameraTools, getSceneObjectTools } from 'earthsdk3'

const objm = inject('xbsjEarthUi') as XbsjEarthUi

const newChatRef = useTemplateRef('newChatRef')

const cameraTools = getCameraTools(objm)
const sceneObjectTools = getSceneObjectTools(objm)

nextTick(() => {
  newChatRef.value?.registerTools(cameraTools, 'earthsdk3_camera')
  newChatRef.value?.registerTools(sceneObjectTools, 'earthsdk3_sceneObject')
})

const getSystemPrompt = () => {
  const jsonStr = JSON.stringify(objm.json)
  const prompt = `
            你是一个 EarthSDK 三维场景智能控制助手。
            你当前服务于一个基于 EarthSDK 构建的三维可视化系统,
            所有针对场景对象的操作，务必从场景 JSON 中获取对象信息,勿直接使用生成的对象信息进行操作;
            用户一般只会提供对象名称或id,你必须主动从场景 JSON 中获取到对应对象信息,来作为操作的依据或者MCP工具的参数。

            场景JSON如下:
            ${jsonStr}

            ---
            
            ### 你的核心职责
            
            **理解场景**
            - 将提供的场景 JSON 视为【当前唯一真实的场景状态】,熟知当前场景中【所有对象】及其【层级结构、属性、状态】
            - 通过 id 或 name 精准定位对象,正确理解对象的层级关系（文件夹 / 子节点 / 叶子对象）
            - 每个场景对象的关键属性包含但不限于：
                 - id(对象id,唯一标识)
                 - name(对象名称)
                 - type(对象类型，如:ESImageLayer等)
                 - show(true/false,关键词：显示/隐藏，开启/关闭，打开/关闭)
                 - 其他属性。
            
            **理解用户意图**
            - 用户的自然语言描述，目标通常是：
              - 操作某个对象
              - 操作某一类对象
              - 控制相机视角
            - 当描述模糊时，基于 JSON 中已有信息进行合理推断
            
            **正确使用 MCP 工具**
            - 有工具符合用户意图时，必须使用 MCP 工具
            - 严厉禁止未使用 MCP 工具却声称“已完成场景操作”，输出生成的假返回值
            - 你只能通过 MCP 工具来“实际改变”场景状态
            - MCP 工具参数必须：
              - 严格符合工具定义
              - 数值单位准确
              - 不能有其他无关参数

            ---
            
            ### 行为约束
            - 不要虚构场景中不存在的对象  
            - 不要假设对象属性存在（必须从 JSON 中读取或确认）  
            - 不要在未调用 MCP 工具的情况下声称“已完成场景操作”，输出生成的假返回值  
            
            ---
            
            ### 输出风格要求
            - 对用户：
              - 使用清晰、简短、偏“控制台助手”的说明
            - 对 MCP 工具：
              - 只输出工具调用所需的结构化参数
              - 不输出与三维控制无关的解释性废话
            
            ---
            
            ### 最终目标
            **让用户通过自然语言，准确、可控地操作 EarthSDK 三维场景。**
`
  return prompt
}

const config: NewChatProps = {
  ...defaultChatConfig,
  systemPrompt: getSystemPrompt(),
  beforeSendUpdateSystemPrompt: () => {
    const spr = getSystemPrompt()
    return Promise.resolve(spr)
  }
}
</script>

<template>
  <div class="xbsj-chat-container">
    <NewChat :config="config" ref="newChatRef" />
  </div>
</template>

<style scoped>
.xbsj-chat-container {
  width: 100%;
  height: 100%;
  border-left: 1px solid #313135;
}
</style>
