<template>
  <div class="ysp_ColorSelect" :key="key">
    <!-- <div class="inputPorp" :style="getColor()" @click="selectShow = !selectShow"></div> -->
    <div class="inputPorp" :style="getColor()" @click.stop="colorIsshow"></div>
    <div v-show="selectShow" class="color-select" ref="colorSelectDiv">
      <div class="saturation-value" ref="saturation_value" @mousedown.stop="mousedownSV">
        <div :style="`background-color: hsl(${hue}, 100%, 50%);`">
          <div class="point" :style="pointStyle"></div>
        </div>
        <div class="saturation-value-2"></div>
        <div class="saturation-value-3"></div>
      </div>
      <div class="color-select-middle">
        <div class="straw" @click.stop="drawColor">
          <div class="straw-icon" id="start-button">
          </div>
        </div>
        <div style="flex: auto">
          <div class="hue-slider" ref="hue_slider" @mousedown.stop="mousedownHue">
            <div class="slider" :style="hueSliderStyle"></div>
          </div>
          <div class="alpha-slider" ref="alpha_slider" @mousedown.stop="mousedownAlpha" v-show="showAlpha">
            <div class="slider" :style="alphaSliderStyle"></div>
            <div
              :style="`background: linear-gradient(to right, rgba(0,0,0,0), ${colorObj.rgb});width: 100%;height: 100%`">
            </div>
          </div>
        </div>
        <div class="color-diamond">
          <div
            :style="`background-color: ${colorObj.rgba};width: 100%;height: 100%;box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);`">
          </div>
        </div>
      </div>
      <div class="color-value">
        <div class="hex">
          <label>
            <input :value="colorObj.hex8" @input.stop="hexChange" spellcheck="false" />
          </label>
          <p>Hex</p>
        </div>
        <div class="rgba-r">
          <label>
            <input :value="red" @input.stop="redChange" />
          </label>
          <p>R</p>
        </div>
        <div class="rgba-g">
          <label>
            <input :value="green" @input.stop="greenChange" />
          </label>
          <p>G</p>
        </div>
        <div class="rgba-b">
          <label>
            <input :value="blue" @input.stop="blueChange" />
          </label>
          <p>B</p>
        </div>
        <div class="rgba-a" v-show="showAlpha">
          <label>
            <input :value="alpha" @input.stop="alphaChange" />
          </label>
          <p>A</p>
        </div>
        <div class="rgba-btn">
          <button class="rgba-no" @click.stop="cancel">取消</button>
          <button class="rgba-ok" @click.stop="ok">确认</button>
        </div>
      </div>
      <ul class="preset">
        <li v-for="item in preset" :key="item" :style="`background-color: ${item}`" @click.stop="presetChange(item)"></li>
      </ul>
    </div>
  </div>
  <!-- <div v-show="selectShow" class="mask"></div> -->
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";

export default {
  name: "ColorSelect",
  props: {
    color: {
      type: Object || String,
      default() {
        return {
          r: 217,
          g: 128,
          b: 95,
          a: 1,
        };
      },
    },
    preset: {
      type: Array,
      default() {
        return [
          //预设不需要
          // "#D0021B",
          // "#F5A623",
          // "#F8E71C",
          // "#8B572A",
          // "#7ED321",
          // "#417505",
          // "#BD10E0",
          // "#9013FE",
          // "#4A90E2",
          // "#50E3C2",
          // "#B8E986",
          // "#000000",
          // "#4A4A4A",
          // "#9B9B9B",
          // "#FFFFFF",
        ];
      },
    },
    showAlpha: {
      type: Boolean,
      default() {
        return true
      }
    },
    key: {
      type: Number,
      default() {
        return 0
      }
    },
  },
  emits: ["ok"],
  // update:color
  setup(props, context) {
    const refs = {
      saturation_value: ref(null),
      hue_slider: ref(null),
      alpha_slider: ref(null),
      colorSelectDiv: ref(null)
    };
    let pointStyle = ref("top: 25%;left: 80%;");
    let hueSliderStyle = ref("left: 0;");
    let alphaSliderStyle = ref("left: calc(100% - 6px);");

    let hue = ref(0);
    let saturation = ref(1);
    let value = ref(1);

    let red = ref(255);
    let green = ref(0);
    let blue = ref(0);

    let alpha = ref(1);
    let selectShow = ref(false);




    const ok = () => {
      context.emit("ok", {
        r: red.value,
        g: green.value,
        b: blue.value,
        a: alpha.value,
      });
      selectShow.value = false;
    };
    const cancel = () => {
      let { r, g, b, a } = parseColor(props.color);
      red.value = r;
      green.value = g;
      blue.value = b;
      alpha.value = a;

      selectShow.value = false;
    };
    const colorIsshow = (e) => {
      selectShow.value = !selectShow.value
      if (selectShow.value) drag()

    }
    let eyeDropper
    const drawColor = () => {
      if (!window.EyeDropper) {
        console.error("Your browser does not support the EyeDropper API");
        return;
      }
      eyeDropper.open().then((result) => {
        let { r, g, b, a } = hex2rgba(result.sRGBHex);
        red.value = r;
        green.value = g;
        blue.value = b;
        alpha.value = a;
      }).catch((err) => {
        console.error(err);
      });
    }
    onMounted(() => {
      let { r, g, b, a } = parseColor(props.color);
      red.value = r;
      green.value = g;
      blue.value = b;
      alpha.value = a;

      if ('EyeDropper' in window) {
        eyeDropper = new EyeDropper();
      } else {
        console.error("Your browser does not support the EyeDropper API");
      }
    });

    let getColor = () => {
      let rgba =
        "rgba(" +
        red.value +
        "," +
        green.value +
        "," +
        blue.value +
        "," +
        alpha.value +
        ")";
      return {
        backgroundColor: rgba,
      };
    };

    watch([red, green, blue], (newValue) => {
      getColor();
      // context.emit("update:color", {
      //   r: red.value,
      //   g: green.value,
      //   b: blue.value,
      //   a: alpha.value,
      // });
      let { h, s, v } = rgb2hsv(red.value, green.value, blue.value);

      hue.value = h;
      saturation.value = s;
      value.value = v;

      // 移动背景板圆圈
      pointStyle.value = `top: ${100 - v * 100}%;left: ${s * 100}%;`;
      // 移动色调滑块
      hueSliderStyle.value = `left: ${(hue.value / 360) * 100}%;`;
    });

    watch(alpha, () => {
      getColor();
      // context.emit("update:color", {
      //   r: red.value,
      //   g: green.value,
      //   b: blue.value,
      //   a: alpha.value,
      // });
      // 移动透明度滑块
      alphaSliderStyle.value = `left: ${alpha.value >= 1 ? "calc(100% - 6px)" : alpha.value * 100 + "%"
        };`;
    });

    let colorObj = computed(() => {
      let r = red.value;
      let g = green.value;
      let b = blue.value;
      let a = alpha.value;
      let h = hue.value;
      let s = saturation.value;
      let v = value.value;
      return {
        rgb: `rgba(${r},${g},${b})`,
        rgba: `rgba(${r},${g},${b},${a})`,
        hex6: rgba2hex(r, g, b),
        hex8: rgba2hex(r, g, b, a),
        hsv: `hsv(${h},${s},${v})`,
        hsl: ``,
      };
    });
    //拖动
    function drag() {
      //2、拖拽，先点击。点击时获取(鼠标距离当前窗口X轴坐标-oDiv元素对应最近元素的距离，这里是body)
      //等于获取了鼠标在拖拽元素的坐标

      refs.colorSelectDiv.value.onmousedown = (event) => {
        var e = event || window.event;
        var disX = e.clientX - refs.colorSelectDiv.value.offsetLeft;
        var disY = e.clientY - refs.colorSelectDiv.value.offsetTop;
        document.body.onmousemove = (event) => {
          var e = event || window.event
          //3、移动时，鼠标距离当前窗口x轴坐标 - 鼠标在拖拽元素的坐标 = 剩下距离body的x轴坐标
          //将这个数值设置为拖拽元素的left、top
          var boxLeft = e.clientX - disX;
          var boxTop = e.clientY - disY;
          //获取body的页面可视宽高
          var clientHeight = document.documentElement.clientHeight || document.body.clientHeight
          var clientWidth = document.documentElement.clientWidth || document.body.clientWidth
          //4、限制拖拽宽高
          if (boxLeft < 0) {
            boxLeft = 0;
            //如果拖拽元素定位的数值高于, 页面可视宽 - 拖拽元素自身宽 (可视页面最大宽)
          } else if (boxLeft > clientWidth - refs.colorSelectDiv.value.offsetWidth) {
            //满足这个条件，就限制宽为，clientWidth-refs.colorSelectDiv.value.offsetWidth(可视页面最大宽)
            boxLeft = clientWidth - refs.colorSelectDiv.value.offsetWidth;
          }

          if (boxTop < 0) {
            boxTop = 0;
            //如果拖拽元素定位的数值高于, 页面可视高 - 拖拽元素自身高 (可视页面最大高)
          } else if (boxTop > clientHeight - refs.colorSelectDiv.value.offsetHeight) {
            //满足这个条件，就限制高为，clientHeight-refs.colorSelectDiv.value.offsetHeight(可视页面最大高)
            boxTop = clientHeight - refs.colorSelectDiv.value.offsetHeight;
          }

          //↑将数值设置成拖拽元素的定位left、top
          refs.colorSelectDiv.value.style.left = boxLeft + "px";
          refs.colorSelectDiv.value.style.top = boxTop + "px";
        }
      }
      //5、鼠标抬起触发事件
      refs.colorSelectDiv.value.onmouseup = () => {
        //将body的移动事件取消
        document.body.onmousemove = null;
      }
    }


    // 输入框值变化,限制输入的值
    function hexChange(e) {
      let v = e.target.value;
      if (/^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v)) {
        let { r, g, b, a } = hex2rgba(v);
        red.value = r;
        green.value = g;
        blue.value = b;
        alpha.value = a;
      }
    }

    function redChange(e) {
      let v = e.target.value;
      if (v !== "") {
        v > 255 && (red.value = 255);
        v < 0 && (red.value = 0);
        v >= 0 && v <= 255 && (red.value = parseInt(v));
      }
    }

    function greenChange(e) {
      let v = e.target.value;
      if (v !== "") {
        v > 255 && (green.value = 255);
        v < 0 && (green.value = 0);
        v >= 0 && v <= 255 && (green.value = parseInt(v));
      }
    }

    function blueChange(e) {
      let v = e.target.value;
      if (v !== "") {
        v > 255 && (blue.value = 255);
        v < 0 && (blue.value = 0);
        v >= 0 && v <= 255 && (blue.value = parseInt(v));
      }
    }

    function alphaChange(e) {
      let v = e.target.value;
      if (v !== "") {
        v = parseFloat(v);
        alpha.value = v;
        v > 1 && (alpha.value = 1);
        v < 0 && (alpha.value = 0);
        v >= 0 && v <= 1 && (alpha.value = v);
      }
    }

    // 点击预设方块事件
    function presetChange(item) {
      if (/^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(item)) {
        let { r, g, b, a } = hex2rgba(item);
        red.value = r;
        green.value = g;
        blue.value = b;
        alpha.value = a;
      }
    }

    // 饱和度和亮度
    function handleChangeSV(e) {

      let w = refs.saturation_value.value.clientWidth;
      let h = refs.saturation_value.value.clientHeight;
      let x =
        e.pageX - refs.saturation_value.value.getBoundingClientRect().left;
      let y = e.pageY - refs.saturation_value.value.getBoundingClientRect().top;
      x = x < w && x > 0 ? x : x > w ? w : 0;
      y = y < h && y > 0 ? y : y > h ? h : 0;
      // 计算饱和度和亮度
      saturation.value = Math.floor((x / w) * 100 + 0.5) / 100;
      value.value = Math.floor((1 - y / h) * 100 + 0.5) / 100;
      // hsv转化为rgb
      let { r, g, b } = hsv2rgb(hue.value, saturation.value, value.value);
      red.value = r;
      green.value = g;
      blue.value = b;
      // 移动背景板圆圈
      pointStyle.value = `top: ${y}px;left: ${x}px;`;
    }

    function mousedownSV(e) {
      // 鼠标按下计算饱和度和亮度并添加事件
      handleChangeSV(e);
      // 添加整个页面的鼠标事件
      window.addEventListener("mousemove", handleChangeSV);
      window.addEventListener("mouseup", mouseupSV);
    }

    function mouseupSV(e) {
      // 鼠标松开后移除事件
      window.removeEventListener("mousemove", handleChangeSV);
      window.removeEventListener("mouseup", mouseupSV);
    }

    // 色调
    function handleChangeHue(e) {
      let w = refs.hue_slider.value.clientWidth;
      let x =
        e.pageX - refs.saturation_value.value.getBoundingClientRect().left - 31;
      x = x < w && x > 0 ? x : x > w ? w : 0;
      // 计算色调
      hue.value = Math.floor((x / w) * 360 + 0.5);
      // hsv转化为rgb
      let { r, g, b } = hsv2rgb(hue.value, saturation.value, value.value);
      red.value = r;
      green.value = g;
      blue.value = b;
      // 移动滑块
      hueSliderStyle.value = `left: ${x >= w - 6 ? w - 6 : x}px;`;
    }

    function mousedownHue(e) {
      handleChangeHue(e);
      window.addEventListener("mousemove", handleChangeHue);
      window.addEventListener("mouseup", mouseupHue);
    }

    function mouseupHue(e) {
      window.removeEventListener("mousemove", handleChangeHue);
      window.removeEventListener("mouseup", mouseupHue);
    }

    // 透明度
    function handleChangeAlpha(e) {
      let w = refs.alpha_slider.value.clientWidth;
      let x =
        e.pageX - refs.saturation_value.value.getBoundingClientRect().left - 31;
      x = x < w && x > 0 ? x : x > w ? w : 0;
      // 计算透明度
      alpha.value = Math.floor((x / w) * 100 + 0.5) / 100;
      // 移动滑块
      alphaSliderStyle.value = `left: ${x >= w - 6 ? w - 6 : x}px;`;
    }

    function mousedownAlpha(e) {
      handleChangeAlpha(e);
      window.addEventListener("mousemove", handleChangeAlpha);
      window.addEventListener("mouseup", mouseupAlpha);
    }

    function mouseupAlpha(e) {
      window.removeEventListener("mousemove", handleChangeAlpha);
      window.removeEventListener("mouseup", mouseupAlpha);
    }

    /**
     * 解析输入的数据,只能解析hex颜色和rgb对象形式的数据
     * @param color
     */
    function parseColor(color) {
      if (color) {
        let r, g, b, a;
        if (typeof color === "string") {
          if (
            /^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{8}|[0-9a-fA-F]{3}|[0-9a-fA-F]{4})$/.test(
              color
            )
          ) {
            return hex2rgba(color);
          }
        } else {
          r = color.r > 255 ? 255 : color.r < 0 ? 0 : color.r;
          g = color.g > 255 ? 255 : color.g < 0 ? 0 : color.g;
          b = color.b > 255 ? 255 : color.b < 0 ? 0 : color.b;
          a = color.a > 1 ? 1 : color.a < 0 ? 0 : color.a;
          return { r, g, b, a };
        }
      } else {
        return null;
      }
    }

    function hsv2rgb(h, s, v) {
      h === 360 && (h = 0);
      let i = Math.floor(h / 60) % 6;
      let f = h / 60 - i;
      let p = v * (1 - s);
      let q = v * (1 - s * f);
      let t = v * (1 - s * (1 - f));
      let r, g, b;
      if (i === 0) {
        r = v;
        g = t;
        b = p;
      } else if (i === 1) {
        r = q;
        g = v;
        b = p;
      } else if (i === 2) {
        r = p;
        g = v;
        b = t;
      } else if (i === 3) {
        r = p;
        g = q;
        b = v;
      } else if (i === 4) {
        r = t;
        g = p;
        b = v;
      } else if (i === 5) {
        r = v;
        g = p;
        b = q;
      }
      r = Math.floor(r * 255 + 0.5);
      g = Math.floor(g * 255 + 0.5);
      b = Math.floor(b * 255 + 0.5);
      return { r, g, b };
    }

    function rgb2hsv(r, g, b) {
      let r1 = r / 255;
      let g1 = g / 255;
      let b1 = b / 255;
      let cmax = Math.max(r1, g1, b1);
      let cmin = Math.min(r1, g1, b1);
      let d = cmax - cmin;
      let h, s, v;
      if (d === 0) {
        h = 0;
      } else if (cmax === r1) {
        h = ((60 * (g1 - b1)) / d + 360) % 360;
      } else if (cmax === g1) {
        h = 60 * ((b1 - r1) / d + 2);
      } else if (cmax === b1) {
        h = 60 * ((r1 - g1) / d + 4);
      }
      if (cmax === 0) {
        s = 0;
      } else {
        s = d / cmax;
      }
      v = cmax;
      h = Math.floor(h + 0.5);
      s = Math.floor(s * 100 + 0.5) / 100;
      v = Math.floor(v * 100 + 0.5) / 100;
      return { h, s, v };
    }

    function rgba2hex(r, g, b, a = 1) {
      r = parseInt(r);
      let r1 =
        r.toString(16).length !== 2 ? "0" + r.toString(16) : r.toString(16);
      g = parseInt(g);
      let g1 =
        g.toString(16).length !== 2 ? "0" + g.toString(16) : g.toString(16);
      b = parseInt(b);
      let b1 =
        b.toString(16).length !== 2 ? "0" + b.toString(16) : b.toString(16);
      a = parseFloat(a);
      let a1 = "";
      if (a !== 1) {
        let temp = Math.floor(256 * a);
        a1 =
          temp.toString(16).length !== 2
            ? "0" + temp.toString(16)
            : temp.toString(16);
      }
      return `#${r1}${g1}${b1}${a1}`.toUpperCase();
    }

    function hex2rgba(s) {
      if (/^#?[0-9a-fA-F]{3}$/.test(s)) {
        let b = s.substring(s.length - 1, s.length);
        let g = s.substring(s.length - 2, s.length - 1);
        let r = s.substring(s.length - 3, s.length - 2);
        return hex2rgba(`${r + r}${g + g}${b + b}`);
      }
      if (/^#?[0-9a-fA-F]{4}$/.test(s)) {
        let a = s.substring(s.length - 1, s.length);
        let b = s.substring(s.length - 2, s.length - 1);
        let g = s.substring(s.length - 3, s.length - 2);
        let r = s.substring(s.length - 4, s.length - 3);
        return hex2rgba(`${r + r}${g + g}${b + b}${a + a}`);
      }
      if (/^#?[0-9a-fA-F]{6}$/.test(s)) {
        let b = parseInt("0x" + s.substring(s.length - 2, s.length));
        let g = parseInt("0x" + s.substring(s.length - 4, s.length - 2));
        let r = parseInt("0x" + s.substring(s.length - 6, s.length - 4));
        return { r, g, b, a: 1 };
      }
      if (/^#?[0-9a-fA-F]{8}$/.test(s)) {
        let a = parseInt("0x" + s.substring(s.length - 2, s.length));
        a = a / 255;
        let b = parseInt("0x" + s.substring(s.length - 4, s.length - 2));
        let g = parseInt("0x" + s.substring(s.length - 6, s.length - 4));
        let r = parseInt("0x" + s.substring(s.length - 8, s.length - 6));
        return { r, g, b, a };
      }
    }

    return {
      selectShow,
      cancel,
      ok,
      getColor,
      ...refs,
      pointStyle,
      hueSliderStyle,
      alphaSliderStyle,
      hue,
      saturation,
      value,
      red,
      green,
      blue,
      alpha,
      colorObj,
      hexChange,
      redChange,
      greenChange,
      blueChange,
      alphaChange,
      presetChange,
      mousedownSV,
      mousedownHue,
      mousedownAlpha,
      colorIsshow,
      drawColor
    };
  },
};
</script>

<style scoped>
.ysp_ColorSelect {
  position: relative;
}

.inputPorp {
  width: 28px;
  background: #000;
  color: #fff;
  border: 7px solid #000;
  height: 5px;
}

.rgba-btn>button {
  width: 50px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #efefef;
  color: #000;
  border: none;
}

.rgba-ok {
  background-color: rgb(9, 132, 255) !important;
  color: #fff !important;
}

.color-select {
  position: fixed;
  user-select: none;
  width: 350px;
  top: calc(50% - 150px);
  left: calc(50% - 150px);
  background: #fff;
  padding: 10px;
  z-index: 3;
}




/* .mask {
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #000;
  opacity: .2;
} */

/* 饱和度和亮度 */
.saturation-value {
  cursor: pointer;
  width: 100%;
  height: 200px;
  position: relative;
  margin-bottom: 10px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}

.saturation-value>div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 圆圈 */
.point {
  box-sizing: border-box;
  width: 6px;
  height: 6px;
  background-color: transparent;
  border: 2px solid #ccc;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 9;
}

.saturation-value-2 {
  background: linear-gradient(to right, white, #ffffff00);
}

.saturation-value-3 {
  background: linear-gradient(to top, black, #ffffff00);
}

/* 色调 透明度 */
.color-select-middle {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
}


.straw {
  position: relative;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);
  margin-right: 5px;
  width: 26px;
  height: 26px;
  border-radius: 3px;
  background-color: #fffefe;
}

.straw-icon {
  width: 100%;
  height: 100%;
  background-image: url(../img/straw.png);
  background-size: 100% 100%;
}


/* 色调滑块条 */
.hue-slider {
  position: relative;
  margin-bottom: 6px;
  height: 10px;
  background: linear-gradient(90deg,
      red 0,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 67%,
      #f0f 83%,
      red);
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}

/* 透明度滑块条 */
.alpha-slider {
  position: relative;
  height: 10px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVRIiWM8fubkfwYygKWJOSM5+mCAhRLNoxaPWjxq8ajFoxbTyeL/DAfJ0Xjs3Cl7Siwmu4Yht1aDgZEYx6MWj1o8avGoxaMWD3qLya5X//4nqx6HAQC7RBGFzolqTAAAAABJRU5ErkJggg==");
  background-size: 10px 10px;
}

/* 滑块 */
.slider {
  position: absolute;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  width: 6px;
  height: 100%;
  background-color: #fff;
}

/* 颜色方块 */
.color-diamond {
  position: relative;
  margin-left: 5px;
  width: 26px;
  height: 26px;
  border-radius: 3px;
  overflow: hidden;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVRIiWM8fubkfwYygKWJOSM5+mCAhRLNoxaPWjxq8ajFoxbTyeL/DAfJ0Xjs3Cl7Siwmu4Yht1aDgZEYx6MWj1o8avGoxaMWD3qLya5X//4nqx6HAQC7RBGFzolqTAAAAABJRU5ErkJggg==");
  background-size: 10px 10px;
}

/* 颜色的值 hex rgba */
.color-value {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.color-value div {
  padding: 0 3px;
  text-align: center;
}

.color-value input {
  font-size: 12px;
  box-sizing: border-box;
  width: 34px;
  height: 24px;
  padding: 0;
  margin: 0;
  outline: none;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
}

.color-value p {
  font-size: 12px;
  margin: 3px 0 0;
}

.color-value .rgba-a {
  padding-right: 0;
}

.color-value .hex {
  flex: 1;
  padding-left: 0;
}

.color-value .hex input {
  width: 100%;
  height: 24px;
}

/* 预设颜色  */
.preset {
  width: 100%;
  padding: 0;
  margin: 10px 0 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.preset li {
  width: 20px;
  height: 20px;
  margin-right: 6px;
  margin-bottom: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
