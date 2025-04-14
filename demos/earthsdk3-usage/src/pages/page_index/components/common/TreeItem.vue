<template>
    <div class="item" :class="{ selected: item.selected }"
        :style="{ fontSize: item.level == 0 ? '18px' : '15px', paddingLeft: 24 * item.level + 10 + 'px' }" @click="onclick">
        <p> {{ item.name }} <span class="label" v-if="item.level == 1">({{ item.children.length }})</span></p>
    </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref, defineProps, defineEmits } from "vue";

const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

const emits = defineEmits(["onclick"])
function onclick() {
    emits("onclick", props.item)
}

</script>
<style scoped>
.item {
    color: #000;
    padding: 3px 0px;
    display: flex;
}

.item:hover {
    color: #038bfe !important;
}

.selected {
    color: #038bfe !important;
}

.label {
    color: #038bfe;
    padding-left: 2px;
}
</style>