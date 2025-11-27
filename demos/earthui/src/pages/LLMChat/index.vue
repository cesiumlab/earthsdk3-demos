<script setup lang="ts">
import { XbsjEarthUi } from "@/scripts/xbsjEarthUi";
import { inject, useTemplateRef } from "vue";
import { NewChat } from "earthsdk-ui";

const objm = inject("xbsjEarthUi") as XbsjEarthUi;

const newChatRef = useTemplateRef("newChatRef");

newChatRef.value.registerTools([]);
</script>

<template>
    <div class="xbsj-chat-container">
        <NewChat :objm="objm" ref="newChatRef" />
    </div>
</template>

<style scoped>
.xbsj-chat-container {
    width: 100%;
    height: 100%;
    border-left: 1px solid #313135;
}
</style>
