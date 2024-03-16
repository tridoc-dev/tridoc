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

const mode = useColorMode();
</script>

<template>
    <div class="flex flex-col w-dvh h-dvh">
        <Menu></Menu>
        <div class="flex flex-grow">
            <div class="h-full w-20">
                <Sidebar></Sidebar>
            </div>
            <div class="h-full flex-col flex-grow">
                <ResizablePanelGroup direction="horizontal">
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
