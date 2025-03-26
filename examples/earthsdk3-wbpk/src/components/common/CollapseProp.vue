<template>
  <div :style="collapseStyle()" @click.stop="changeCollapse">
    {{ collapsed() }}
  </div>
</template>

<script lang="ts">
import { defineComponent, StyleValue } from "vue";
export default defineComponent({
  name: "CollapseD",
  emits: ["collapseFunc"],
  props: {
    collapseProps: String,
  },
  setup(props, context) {
    const collapsed = () => {
      return props.collapseProps;
    };

    const changeCollapse = () => {
      context.emit("collapseFunc");
    };

    const collapseStyle = () => {
      return {
        marginTop: `${collapsed() == "＞" ? "-3" : collapsed() == "∨" ? "0" : "0"
          }px`,
        transform: `${collapsed() == "＞"
          ? "scaleX(.6)"
          : collapsed() == "∨"
            ? "scaleY(.6)"
            : "scale(1)"
          }`,
        width: "18px",
        fontSize: "18px",
        textAlign: "center",
        color: "#ccc",
        cursor: "pointer",
      } as StyleValue;
    };

    return {
      collapsed,
      changeCollapse,
      collapseStyle,
    };
  },
});
</script>

<style scoped></style>
