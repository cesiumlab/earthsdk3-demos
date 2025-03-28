<template>
    <div class="treeitem" :style="{ paddingLeft: 24 * item.level + 10 + 'px' }" @mouseenter="mouseEnter"
        @mouseleave="mouseLeave" @dblclick.stop="dbclickItem(item, $event)" :class="{ selected: isCurrentSelect }"
        @click.stop="selectItem(item)" @contextmenu="onItemContextMenu(item)">
        <div class="item-content">
            <div class="expand" @dblclick.stop @click.stop="itemExpand(item)">
                <img src="../../../../assets/common/tree/expand.png"
                    :class="[{ expandRotate: !item.expand }, { expandReset: item.expand }]" v-show="item.children"
                    title="展开/收缩" />
            </div>
            <img class="checked" :src="checkedIcon" @click.stop="itemChecked(item)" @dblclick.stop title="显/隐" />
            <img class="folder" :src="iconUrl" title="分组" v-show="item.type" />
            <span v-if="!item.editing">{{ item.name }}</span>
            <input v-if="item.editing" class="input" ref="input" type="text" @change="setName(item)"
                :value="item.name" :class="{ 'input-focus': item.editing }" @keyup.enter="item.editing = false"
                @blur="item.editing = false" />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showEditorIcon: false,
            checkedIcon: require("../../../../assets/common/tree/unselect.png"),
            mydisPosableOn: []
        };
    },
    props: {
        item: Object,
        selected: Object,
    },

    watch: {
        item: {
            handler(val) {
                this.checkedIcon = val.checked ? require("../../../../assets/common/tree/select.png") : require("../../../../assets/common/tree/unselect.png")
                if (val.editing) {
                    this.$nextTick(() => {
                        this.$refs.input.focus()
                    });
                }
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        isCurrentSelect() {
            if (!this.selected) {
                return false;
            } else {
                return this.selected.id == this.item.id;
            }
        },
        iconUrl() {
            let url = undefined
            switch (this.item.type) {
                case 'folder':
                    url = require('../../../../assets/common/tree/folder.png')
                    break;
                default:
                    break;
            }
            return url
        },
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.item.children && this.item.sceneObj && this.item.sceneObj.show) {
                this.mydisPosableOn.push(this.$bind(this, "item.checked", this.item.sceneObj, "show"))
            }

        })

    },
    methods: {
        // 展开/收缩
        itemExpand(item) {
            this.$emit("onItemExpand", item);
        },
        // 选中/取消
        itemChecked(item) {
            this.$emit("onItemChecked", item);
        },
        // 鼠标进入节点
        mouseEnter() {
            this.showEditorIcon = true;
        },
        // 鼠标离开节点
        mouseLeave() {
            this.showEditorIcon = false;
        },
        // 选中该节点
        selectItem(item) {
            // if (this.selected && item.id == this.selected.id) {
            //     this.$emit("onItemSelected", undefined);
            // } else {
            if (this.selected && item.id != this.selected.id) {
                this.$emit("onItemSelected", item);
            }

            // }
        },
        // 双击节点
        dbclickItem(item, $event) {
            $event.preventDefault && $event.preventDefault();
            this.$emit("onItemDbclick", item);
            this.$emit("onItemSelected", item);
        },
        // 重命名
        setName(item) {
            item.editing = false;
            this.$emit("onChangeName", item);
        },
        // 右键菜单
        onItemContextMenu(item) {
            this.$emit("onItemContextMenu", item);
        }

    },
    unmounted() {
        this.mydisPosableOn.forEach((fun) => {
            fun()
        })
    }
};
</script>
<style scoped>
.treeitem {
    box-sizing: border-box;
    position: relative;
    min-height: 28px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    cursor: pointer;


}

.expandRotate {
    transform: rotate(-90deg);
    transform-origin: center;
    transition: transform .5s;
}

.expandReset {
    transform: rotate(0deg);
    transform-origin: center;
    transition: transform .5s;
}


.treeitem:hover {
    background: rgba(11, 31, 59, 0.891);
    background-size: 100% 100%;
}

.treeitem-focus {
    background: rgba(69, 69, 69, 0.4);
}

.selected {
    background: rgba(0, 0, 0, .4) !important;
    background-size: 100% 100%;
}

.treeitem img {
    cursor: pointer;
    flex-grow: 0;
    padding-right: 5px;
}

.item-content {
    flex-grow: 1;
    display: flex;
    align-items: center;
}

.tag {
    cursor: default;
}

.expand {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 3px;
    cursor: default;
}

.expand>img {
    width: 11px;
    height: 9px;
    padding-right: 0px;
    display: inline-block;
}

.input {
    height: 25px;
    background: none;
    border: none;
    outline: none;
    color: #fff;
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-grow: 1;
}

.input-focus {
    color: #fff;
    pointer-events: all;
    cursor: text !important;
    border: 1px solid rgb(10, 115, 176) !important;
}

.item-operate {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 60px;
    flex-shrink: 0;
    flex-grow: 0;
    height: 100%;
}
</style>


