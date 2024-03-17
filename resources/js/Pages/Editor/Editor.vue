<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
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

const mode = useColorMode();
const openFilePanel = ref(false);
</script>

<template>
    <div class="flex flex-col w-dvh h-dvh">
        <Menu></Menu>
        <div class="flex flex-grow flex-row">
            <div class="h-full w-20">
                <Sidebar v-model="openFilePanel"></Sidebar>
            </div>
            <div class="h-full flex-grow">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel v-if="openFilePanel" :default-size="30">
                        <FilePanel/>
                    </ResizablePanel>
                    <ResizablePanel>
                        <EditorPanel/>
                    </ResizablePanel>
                    <ResizableHandle class="invisible" />
                    <ResizablePanel>
                        <PreviewPanel/>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
            <div class="w-2"></div>
        </div>
    </div>
</template>
