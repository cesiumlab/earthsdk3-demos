<script setup lang='ts'>
import NumberProp from "./NumberProp.vue"
import StringProp from "./StringProp.vue"
import BooleanProp from "./BooleanProp.vue"
import BooleansProp from "./BooleansProp.vue"
import StringsProp from "./StringsProp.vue"
import NumbersProp from "./NumbersProp.vue"

type ParamTypes = ('string' | 'number' | 'boolean' | 'strings' | 'numbers' | 'booleans' | ['string' | 'number' | 'boolean' | 'strings' | 'numbers' | 'booleans',string])[]

const props = defineProps<{
    modelValue: (string | number | boolean | string[] | number[] | boolean[])[],
    paramTypes: ParamTypes
}>()
const emits = defineEmits(['update:modelValue']);

</script>

<template>
    <div class="paramTypes" title="">
        <template v-for="(_, index) in modelValue" :key="index">
            <div v-if="paramTypes[index] === 'string' || paramTypes[index][0] === 'string'" class="paramTypes_item">
                <label for="" :title="Array.isArray(paramTypes[index]) ? paramTypes[index][1] : ''">{{ paramTypes[index] ===
                    'string' ? 'string' : paramTypes[index][1] }}</label>
                <StringProp :isTextarea="true" :withUndefined="false" v-model="(modelValue[index] as string | undefined)">
                </StringProp>
            </div>
            <div v-if="paramTypes[index] === 'number' || paramTypes[index][0] === 'number'" class="paramTypes_item">
                <label for="" :title="Array.isArray(paramTypes[index]) ? paramTypes[index][1] : ''">{{ paramTypes[index] ===
                    'number' ? 'number' : paramTypes[index][1] }}</label>
                <NumberProp :withUndefined="false" v-model="(modelValue[index] as number | undefined)"> </NumberProp>
            </div>
            <div v-if="paramTypes[index] === 'boolean' || paramTypes[index][0] === 'boolean'" class="paramTypes_item">
                <label for="" :title="Array.isArray(paramTypes[index]) ? paramTypes[index][1] : ''">{{ paramTypes[index] ===
                    'boolean' ? 'boolean' : paramTypes[index][1] }}</label>
                <BooleanProp :withUndefined="false" v-model="(modelValue[index] as boolean | undefined)"> </BooleanProp>
            </div>
            <div v-if="paramTypes[index] === 'booleans' || paramTypes[index][0] === 'booleans'" class="paramTypes_item">
                <label for="" :title="Array.isArray(paramTypes[index]) ? paramTypes[index][1] : ''">{{ paramTypes[index] ===
                    'booleans' ? 'booleans' : paramTypes[index][1] }}</label>
                <BooleansProp :withUndefined="false" v-model="(modelValue[index] as boolean[] | undefined)">
                </BooleansProp>
            </div>
            <div v-if="paramTypes[index] === 'strings' || paramTypes[index][0] === 'strings'" class="paramTypes_item">
                <label for="" :title="Array.isArray(paramTypes[index]) ? paramTypes[index][1] : ''">{{ paramTypes[index] ===
                    'strings' ? 'strings' : paramTypes[index][1] }}</label>
                <StringsProp :withUndefined="false" :defaultValue="[]" :readonly="false"
                    v-model="(modelValue[index] as string[] | undefined)">
                </StringsProp>
            </div>
            <div v-if="paramTypes[index] === 'numbers' || paramTypes[index][0] === 'numbers'" class="paramTypes_item">
                <label for="" :title="Array.isArray(paramTypes[index]) ? paramTypes[index][1] : ''">{{ paramTypes[index] ===
                    'numbers' ? 'numbers' : paramTypes[index][1] }}</label>
                <NumbersProp :withUndefined="false" v-model="(modelValue[index] as number[] | undefined)">
                </NumbersProp>
            </div>
        </template>

    </div>
</template>

<style scoped>
.paramTypes {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-y: auto;
}

.paramTypes_item {
    width: 90%;
    display: flex;
    margin: 5px 0px;
    justify-content: flex-start;
}

.paramTypes_item>label {
    width: 70px;
    height: 30px;
    line-height: 30px;
    margin-right: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}</style>
