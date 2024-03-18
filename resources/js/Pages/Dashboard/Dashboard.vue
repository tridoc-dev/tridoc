<script setup lang="ts">
// import { useColorMode } from "@vueuse/core";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/Components/ui/resizable";

import Menu from "./Components/Menu.vue";
import Sidebar from "./Components/Sidebar.vue";
import MainPanel from "./Components/MainPanel.vue";
import { ref } from "vue";

// const mode = useColorMode();
const openFilePanel = ref(false);
</script>

<template>
    <div class="flex flex-col w-dvh h-dvh bg-basebackground">
        <Menu class="flex"/>
        <div class="flex flex-grow flex-row">
            <div class="h-full w-20">
                <Sidebar v-model="openFilePanel"></Sidebar>
            </div>
            <div class="h-full flex-grow flex flex-col">
                <MainPanel class="m-2 mr-0 mb-0 bg-background"/>
            </div>
        </div>
    </div>
</template>./Components/MainPanel.vue
