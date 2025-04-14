<template>
    <div class="editor">
        <div class="editor-header">
            <p class="title">源代码</p>
            <p class="run" @click="run">运行</p>
        </div>
        <div id="editor-content"></div>
    </div>
</template>

<script setup>
import * as monaco from 'monaco-editor';
import { onBeforeUnmount, onMounted, toRaw, defineEmits, watch } from "vue"
var editor = null
const emits = defineEmits(['update:code'])
const props = defineProps({
    path: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: false
    }
})
onMounted(() => {
    initMonaco()
})

watch(() => props.code, (val) => {
    try {
        initEditor(val)
    } catch (error) {
        initEditor()
    }
})

// 测试222

/**
 * 初始化monaco编辑器
 */
function initMonaco() {
    monaco.editor.defineTheme('BlackTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {}
    });
    monaco.editor.setTheme('BlackTheme');
}
/**
 * 初始化编辑器
 * @param {*} value 
 */
function initEditor(value) {
    // 初始化编辑器，确保dom已经渲染
    if (editor) {
        if (editor && toRaw(editor).dispose) {
            toRaw(editor).dispose()
            editor = undefined
        }
    }
    editor = monaco.editor.create(document.getElementById('editor-content'), {
        value: value ? value : '',
        language: "html",
        theme: "BlackTheme",
        acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
        acceptSuggestionOnEnter: 'on', // 接受输入建议 "on" | "off" | "smart" 
        accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
        accessibilitySupport: 'on', // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
        autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
        autoClosingOvertype: 'always', // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
        autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
        autoIndent: 'none', // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
        automaticLayout: true, // 自动布局
        codeLens: false, // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
        codeLensFontFamily: '', // codeLens的字体样式
        codeLensFontSize: 16, // codeLens的字体大小
        colorDecorators: false, // 呈现内联色彩装饰器和颜色选择器
        comments: {
            ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
            insertSpace: true // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
        }, // 注释配置
        contextmenu: true, // 启用上下文菜单

        columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
        autoSurround: 'never', // 是否应自动环绕选择
        copyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
        cursorBlinking: 'blink', // 光标动画样式
        cursorSmoothCaretAnimation: true, // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
        cursorStyle: 'line-thin', // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
        cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
        cursorSurroundingLinesStyle: 'all', // "default" | "all" 光标环绕样式
        cursorWidth: 5, // <=25 光标宽度
        minimap: {
            enabled: false // 是否启用预览图
        },
        folding: true, // 是否启用代码折叠
        links: true, // 是否点击链接
        overviewRulerBorder: false, // 是否应围绕概览标尺绘制边框
        renderLineHighlight: 'gutter', // 当前行突出显示方式
        roundedSelection: false, // 选区是否有圆角
        scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
        readOnly: false, // 是否为只读模式
    });


}

/**
 * 运行代码
 */
function run() {
    if (!editor) return
    emits("update:code", editor.getValue())
}

onBeforeUnmount(() => {
    console.log('onBeforeUnmount');

})

</script>

<style scoped>
p {
    padding: 0px;
    margin: 0px;
}

.editor {
    width: 100%;
    height: 100%;
}

.editor-header {
    box-sizing: border-box;
    padding: 0px 10px 0px 10px;
    box-sizing: border-box;
    background-color: #141414;
    display: grid;
    grid-template-columns: 1fr 60px 60px;
    align-items: center;
    color: #1690d9;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
}

.editor-header div {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.title {
    text-align: center;
    color: #fff;
    font-size: 15px;
}

#editor-content {
    width: 100% !important;
    height: calc(100% - 40px);
    overflow: hidden;
}

.monaco-editor .no-user-select {
    display: none;
}

.run {
    cursor: pointer;
}
</style>
