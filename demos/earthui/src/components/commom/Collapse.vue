<template>
  <div :style="collapseStyle()" @click.stop="changeCollapse">
    {{ collapseProps }}
  </div>
</template>

<script lang="ts">
import { defineComponent, StyleValue } from 'vue'
export default defineComponent({
  name: 'CollapseD',
  emits: ['collapseFunc'],
  props: {
    collapseProps: String
  },
  setup(props, context) {
    const changeCollapse = () => {
      if (props.collapseProps === '') return
      context.emit('collapseFunc')
    }
    const collapseStyle = () =>
      ({
        marginTop: `${
          props.collapseProps == '＞' ? '-3' : props.collapseProps == '∨' ? '0' : '0'
        }px`,
        transform: `${
          props.collapseProps == '＞'
            ? 'scaleX(.6)'
            : props.collapseProps == '∨'
              ? 'scaleY(.6)'
              : 'scale(1)'
        }`,
        width: '18px',
        fontSize: '18px',
        textAlign: 'center',
        color: '#ccc',
        cursor: 'pointer'
      }) as StyleValue

    return {
      changeCollapse,
      collapseStyle
    }
  }
})
</script>
