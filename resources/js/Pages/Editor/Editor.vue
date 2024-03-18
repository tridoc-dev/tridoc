<script setup lang="ts">
// import { useColorMode } from "@vueuse/core";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/Components/ui/resizable";

import Menu from "./Components/Menu.vue";
import Sidebar from "./Components/Sidebar.vue";
import EditorPanel from "./Components/EditorPanel.vue";
import PreviewPanel from "./Components/PreviewPanel.vue";
import FilePanel from "./Components/FilePanel.vue";
import { ref } from "vue";

// const mode = useColorMode();
const openFilePanel = ref(false);
</script>

<template>
    <div class="flex flex-col w-dvh h-dvh bg-basebackground">
        <Menu/>
        <div class="flex flex-grow flex-row mr-2">
            <div class="h-full w-20">
                <Sidebar v-model="openFilePanel"></Sidebar>
            </div>
            <div class="h-full flex-grow">
                <ResizablePanelGroup class="" direction="horizontal">
                    <ResizablePanel class="p-2 pb-0 pr-0" v-if="openFilePanel" :default-size="30">
                        <FilePanel class="bg-background"/>
                    </ResizablePanel>
                    <ResizablePanel class="p-2 pb-0 pr-1">
                        <EditorPanel/>
                    </ResizablePanel>
                    <ResizableHandle class="invisible" />
                    <ResizablePanel class="p-2 pb-0 pl-1">
                        <PreviewPanel/>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    </div>
</template>
