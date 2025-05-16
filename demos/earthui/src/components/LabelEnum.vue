<script setup lang='ts'>
import { computed, watch, ref } from "vue";
import EnumProp from "../components/eSPropPanel/propertiesMenu/commons/EnumProp.vue"

interface Props {
    label?: string,
    modelValue?: string | number,
    materialIdList: any
}
const props = withDefaults(defineProps<Props>(), {
    label: "内容",
    modelValue: '',
})
const emit = defineEmits(["update:modelValue"]);
const ulIsShow = ref(false)




</script>
<template>
    <div class="label_enum">
        <label class="label" for="" :title="label">{{ label }}</label>
        <div class="enum">
            <EnumProp :withUndefined="false" :defaultValue="undefined" :enumStrsList="materialIdList"
                >
            </EnumProp>
        </div>
    </div>
</template>

<style scoped>
.label_enum {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(230, 230, 230, 1);
    font-size: 12px;
    position: relative;
    margin-top: 10px
}

.label_enum>.label {
    display: inline-block;
    width: 60px;
    height: 26px;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 26px;
    font-size: 12px;
}

.label_enum>.enum {
    flex: 1;
    height: 26px;
    box-sizing: border-box;
    background: rgba(28, 28, 29, 0.6);
}
</style>
