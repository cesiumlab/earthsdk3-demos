<template>
  <div class="mask">
    <div ref="xbsjmodelbox" class="xbsj-model-box" :class="{ 'xbsj-model-box-close': collapsed }" :style="windowstyle"
      tabindex="0" @keydown.esc="escCancel" id="xbsj-window">
      <i @mousedown.stop="startResize($event)" ref="barbr" class="bar" :class="{ hidden: collapsed }"></i>
      <!-- 标题 -->
      <div class="xbsj-model-header" ref="xbsjmodelheader" @mousedown.stop="startMove($event)">
        {{ title }}
      </div>
      <!-- 内容 -->
      <div class="xbsj-model-content" :class="{
        'xbsj-model-closetatus-body': collapsed,
        'xbsj-model-nofooter': footervisible,
      }" ref="xbsjmodelbody" @contextmenu.prevent="contextMenu">
        <div class="xbsj-model-content-box">
          <slot></slot>
        </div>
      </div>
      <!-- 底部按钮 -->

      <div class="xbsj-model-footer" v-if="footervisible && !collapsed">
        <!-- <hr /> -->
        <button class="cancel_button" v-if="showCancelButton" @click.stop="cancel">
          {{ compCancelText }}
        </button>
        <button class="confirm_button" @click.stop="ok" :class="readonly ? 'readonly_true' : ''" :disabled="readonly">{{
          compOkText
        }}</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    confirmtext: {
      type: String,
      default: "",
    },
    canceltext: {
      type: String,
      default: "",
    },
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Number,
      default: 200,
    },
    top: {
      type: Number,
      default: 200,
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
    minWidth: {
      type: Number,
      default: 100,
    },
    minHeight: {
      type: Number,
      default: 100,
    },
    footervisible: {
      type: Boolean,
      default: false,
    },
    floatright: {
      type: Boolean,
      default: false,
    },
    windowID: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      langs: {
        zh: {
          ok: "确定",
          cancel: "取消",
        },
        en: {
          ok: "OK",
          cancel: "Cancel",
        },
      },
      collapsed: false,

      windowstyle: {},
    };
  },
  mounted() {
    document.getElementById('xbsj-window').focus()
  },
  created() {
    this._width = 0;
    this._height = 0;
    this._left = 0;
    this._top = 0;
    var dom = document.getElementById("app");
    let earthUIWidth = dom.clientWidth;
    let earthUIHeight = dom.clientHeight;
    this._width = this.width;
    this._height = this.height;
    if (this.floatright) {
      this._left = earthUIWidth - this.width;
    } else {
      this._left = this.left;
    }

    this._top = earthUIHeight / 2 - this.height / 2;
    this._left = earthUIWidth / 2 - this.width / 2;

    this.updateStyle();
  },
  computed: {
    compCancelText: function () {
      if (this.canceltext == "") {
        return "取消"; //取消
      }
      return this.canceltext;
    },
    compOkText: function () {
      if (this.confirmtext == "") {
        return "确认"; //确认
      }
      return this.confirmtext;
    },
  },
  watch: {
    height(val) {
      this._height = val;
      this.updateStyle();
    },
    width(val) {
      this._width = val;
      this.updateStyle();
    },
  },
  methods: {
    escCancel() {
      if (this.showCancelButton) {
        this.cancel()
      } else {
        this.ok()
      }
    },
    contextMenu() {
      this.$emit("context-menu");
    },
    updateStyle() {
      this.windowstyle = {
        width: this._width + "px",
        height: this._height + "px",
        top: this._top + "px",
        left: this._left + "px",
      };
    },
    collapse() {
      this.collapsed = !this.collapsed;
      this.$parent.refShow = !this.$parent.refShow;
    },
    cancel() {
      this.$emit("cancel");
    },
    ok() {
      this.$emit("ok");
    },
    startMove(e) {
      e = e || event;
      if (e.target != this.$refs.xbsjmodelheader) return;
      //记录鼠标所在位置
      var navheight = 0;

      var dom = document.getElementById("app");

      var maxWidth = dom.clientWidth;
      var maxHeight = dom.clientHeight;

      var box = this.$refs.xbsjmodelbox;

      var disx = e.pageX - box.offsetLeft;
      var disy = e.pageY - box.offsetTop;

      var self = this;

      var headerHeight = this.$refs.xbsjmodelheader.clientHeight;

      function move(e) {
        e = e || event;
        e.stopPropagation();
        //计算当前鼠标位置
        let left = e.pageX - disx;
        let top = e.pageY - disy;
        if (left > 0 && left <= maxWidth - self._width) {
          self._left = left;
        } else if (left <= 0 && self._left < left) {
          self._left = left;
        } else if (left > maxWidth - self._width && self._left > left) {
          self._left = left;
        }

        if (
          top > navheight &&
          top <= maxHeight - (self.collapsed ? headerHeight : self._height)
        ) {
          self._top = top;
        } else if (top <= navheight && self._top < top) {
          self._top = top;
        } else if (
          top > maxHeight - (self.collapsed ? headerHeight : self._height) &&
          self._top > top
        ) {
          self._top = top;
        }

        self.updateStyle();
      }

      var conbox = dom;

      function up() {
        conbox.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      }

      conbox.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
    startResize() {
      //记录鼠标所在位置
      var dom = document.getElementById("app");
      var maxWidth = dom.clientWidth - this._left;
      var maxHeight = dom.clientHeight - this._top;

      var self = this;

      function move(e) {
        e = e || event;
        e.stopPropagation();
        //计算当前鼠标位置和全局点击位置的偏插值，尝试修改宽度和高度
        let w = e.movementX + self._width;
        let h = e.movementY + self._height;

        if (w >= self.minWidth && w <= maxWidth) {
          self._width = w;
        }

        if (h >= self.minHeight && h <= maxHeight) {
          self._height = h;
        }
        self.updateStyle();
      }

      var conbox = dom;

      function up() {
        self.$emit("resized");
        conbox.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      }

      conbox.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
  }
};
</script>

<style scoped>
.xbsj-model-box {
  position: fixed;
  color: #fff;
  background: #00212b;
  border-radius: 10px;
  border: 1px solid #ffffff96;
  z-index: 99999;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.xbsj-model-content {
  position: relative;
  color: #fff;
  background: #00212b;
  padding: 0px 5px;
  text-align: left;
  transition: all 0.5s linear;
  height: calc(100%);
}

.xbsj-model-content-box {
  width: 100%;
  height: calc(100%);
  overflow: auto;
}

.xbsj-model-nofooter {
  height: calc(100% - 80px);
}

.xbsj-model-header {
  cursor: all-scroll;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  top: 0;
  left: 0;
  height: 32px;
  font-weight: 700;
  border-radius: 4px 4px 0px 0px;
  font-size: 16px;
  text-align: center;
  user-select: none;
  background-color: #00212b;
  color: #fff;
  font-family: MicrosoftYaHei;
  line-height: 32px;
}

.xbsj-model-footer {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.xbsj-model-footer>button {
  user-select: none;
  width: 110px;
  height: 30px;
  margin: 5px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid #384b50;
  color: #fff;
  background-color: #0d2b34;
}

.xbsj-model-footer>button:hover {
  background-color: #00212b;
}

.xbsj-model-box .bar {
  position: absolute;
  z-index: 2;
}

.xbsj-model-box i.bart,
.xbsj-model-box i.barb {
  height: 4px;
  left: -1px;
  right: -1px;
  cursor: n-resize;
}

.xbsj-model-box i.bart {
  top: -1px;
}

.xbsj-model-box i.barb {
  bottom: -1px;
}

.xbsj-model-box i.barr,
.xbsj-model-box i.barl {
  width: 4px;
  top: -1px;
  bottom: -1px;
  cursor: e-resize;
}

.xbsj-model-box i.barl {
  left: -1px;
}

.xbsj-model-box i.barr {
  right: -1px;
}

.xbsj-model-box i.bar {
  width: 14px;
  height: 14px;
  cursor: nw-resize;
  bottom: -1px;
  right: -1px;
}

.xbsj-model-box .closestatus {
  transform: rotate(-180deg);
  -ms-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -webkit-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
}

.xbsj-model-box .xbsj-model-closetatus-body {
  height: 0;
}

.xbsj-model-box-close {
  height: 40px !important;
}

.hidden {
  display: none;
}

.readonly_true {
  cursor: no-drop !important;
  background-color: #4c4c4c !important;
}
</style>
