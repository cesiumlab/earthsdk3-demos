<template>
  <div class="tree" ref="tree" @click="clickEmptyArea">
    <TreeItem
      v-for="(item, index) of items"
      v-show="item.show"
      :key="item.id"
      :item="item"
      :selected="selected"
      @onItemExpand="onItemExpand"
      @onItemSelected="onItemSelected"
      @onItemChecked="onItemChecked"
      @onItemDbclick="onItemDbclick"
      @onChangeName="onChangeName"
      draggable="true"
      @dragstart.stop="dragstart(item)"
      @dragover="dragover($event, item)"
      @drop.stop="drop"
      @onItemContextMenu="onItemContextMenu(item)"
    ></TreeItem>
  </div>
</template>
<script>
import TreeItem from './TreeItem.vue'
export default {
  name: '',
  components: { TreeItem },
  data() {
    return {
      items: [],
      startDragItem: undefined,
      endDragItem: undefined
    }
  },
  props: {
    tree: Array,
    selected: Object
  },
  watch: {
    tree: {
      handler(val) {
        this.items = []
        if (val && Array.isArray(val)) {
          this.flattenJsonObject(val, undefined, 0, this.items)
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {},
  methods: {
    // 根据sceneObj.id高亮
    setSelectedFromSceneId(id) {
      this.items.forEach((item) => {
        if (item.sceneObj) {
          if (item.sceneObj.id == id) {
            this.selected = item
          }
        }
      })
    },
    // 根据item.id高亮
    setSelectedFromItemId(id) {
      this.items.forEach((item) => {
        if (item.id) {
          if (item.id == id) {
            this.selected = item
          }
        }
      })
    },
    // 树状结构转扁平化内容转一维数组Array
    flattenJsonObject(jsonObjectArray, parent, level, items) {
      jsonObjectArray.forEach((jsonObject) => {
        jsonObject.level = level
        jsonObject.parent = parent
        jsonObject.show = jsonObject.parent ? jsonObject.parent.expand : true
        items.push(jsonObject)
        if (jsonObject.children) {
          this.flattenJsonObject(jsonObject.children, jsonObject, level + 1, items)
        }
      })
    },
    //  checked改变
    updateChecked(item) {
      this.updateChildChecked(item, !item.checked)
      if (item.parent && item.parent.type == 'folder') {
        this.updatePartentChecked(item)
      }
    },
    // 向下检测是否有子集，存在则修改对应得checked
    updateChildChecked(item, checked) {
      item.checked = checked
      if (item.sceneObj) {
        item.sceneObj.show = item.checked
      }
      if (item.children && Array.isArray(item.children)) {
        item.children.forEach((el) => {
          this.updateChildChecked(el, checked)
        })
      }
    },
    // 向上检测是否有父级，有得话判断是否子集是否统一checked状态，如果是修改对应父级状态checked
    updatePartentChecked(item) {
      if (item.parent) {
        const siblings = item.parent.children
        const allChecked = siblings.every((child) => child.checked)
        item.parent.checked = allChecked
        this.updatePartentChecked(item.parent)
      }
    },
    // expand展开发生变化触发内容
    onItemExpand(item) {
      this.changeExpand(item, !item.expand)
      this.$emit('onItemExpand', item)
    },
    changeExpand(item, expand) {
      item.expand = expand
      if (item.children) {
        item.children.forEach((cur) => {
          if (cur.children) {
            this.changeExpand(cur, expand)
          }
        })
      }
    },

    // checked发生变化触发内容
    onItemChecked(item) {
      this.updateChecked(item)
      this.$emit('onItemChecked', item)
    },
    // editing发生变化触发内容
    onItemEditor(item) {
      this.$emit('onItemEditor', item)
    },
    // 双击事件
    onItemDbclick(item) {
      this.$emit('onItemDbclick', item)
    },
    // 重命名事件
    onChangeName(item) {
      this.$emit('onChangeName', item)
    },
    // 选中该节点内容
    onItemSelected(item) {
      this.selected = item
      this.$emit('onItemSelected', item)
    },
    // 点击空白区域,将selected置undefined
    clickEmptyArea() {
      // this.selected = undefined;
      // this.$emit("onItemSelected", undefined);
    },
    // 右键节点菜单栏
    onItemContextMenu(item) {
      this.selected = item
      this.$emit('onItemSelected', item)
      this.$emit('onItemContextMenu', item)
    },

    // 滚动条定位到该节点
    scrollToItem(item) {
      if (Array.isArray(this.items) && this.items.length > 0) {
        var idx = this.items.indexOf(item)
        if (idx >= 0) {
          this.$refs.tree.scrollTop = (idx - 1) * 24
          this.selected = item
          this.$emit('onItemSelected', this.selected)
        }
      }
    },

    /**
     * 在拖动目标上触发事件 (源元素):
     * 	ondragstart - 用户开始拖动元素时触发
     * 	ondrag - 元素正在拖动时触发
     * 	ondragend - 用户完成元素拖动后触发
     *
     */
    // 拖动开始时触发
    dragstart(item) {
      this.startDragItem = item
    },
    /**
     * 释放目标时触发的事件:
     * 	ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
     * 	ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
     * 	ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
     * 	ondrop - 在一个拖动过程中，释放鼠标键时触发此事件
     */

    dragover($event, item) {
      if (item.children) {
        $event.preventDefault && $event.preventDefault()
        this.endDragItem = item
      } else {
        this.endDragItem = undefined
      }
    },
    drop() {
      if (this.startDragItem && this.endDragItem) {
        console.log(this.startDragItem, this.endDragItem)
        // 拖拽不允许情况直接取消
        if (this.findErrorDrag(this.startDragItem, this.endDragItem)) {
          return
        }
        if (this.startDragItem.parent) {
          this.startDragItem.parent.children.forEach((el, index) => {
            if (this.startDragItem.id == el.id) {
              this.startDragItem.parent.children.splice(index, 1)
            }
          })
        } else {
          this.tree.forEach((el, index) => {
            if (this.startDragItem.id == el.id) {
              this.tree.splice(index, 1)
            }
          })
        }
        this.startDragItem.parent = this.endDragItem
        this.endDragItem.children.push(this.startDragItem)
        this.$emit('onDrop', this.startDragItem)
        this.selected = this.startDragItem
        this.updatePartentChecked(this.startDragItem)
      }
    },
    /**
     * 不能拖动的两种情况
     * 		①自己不能挂到自己身上
     * 		②带有folder的父节点不能挂载到自己的带有folder的子节点上，
     *
     * 		return :true表示存在这种拖动情况，则不做处理，false不存在这样的拖动，可以执行拖动挂载
     * */
    findErrorDrag(startItem, endItem) {
      if (startItem.id === endItem.id) {
        return true
      }
      if (endItem.parent) {
        if (endItem.parent.id == startItem.id) {
          return true
        } else {
          return this.findErrorDrag(startItem, endItem.parent)
        }
      } else {
        return false
      }
    }
  }
}
</script>
<style scoped>
.tree {
  width: 100% !important;
  height: 100% !important;
  overflow: auto !important;
  box-sizing: border-box;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #93a3be;
}
</style>
