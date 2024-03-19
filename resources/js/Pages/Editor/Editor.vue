<script setup lang="ts">
// import { useColorMode } from "@vueuse/core";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/Components/ui/resizable";

import Menu from "./Components/Menu.vue";
import Sidebar from "@/Components/Sidebar.vue";
import EditorPanel from "./Components/EditorPanel.vue";
import PreviewPanel from "./Components/PreviewPanel.vue";
import FilePanel from "./Components/FilePanel.vue";
import { Button } from "@/Components/ui/button";
import { Archive, Settings, CircleHelp } from "lucide-vue-next";
import { ref } from "vue";

// const mode = useColorMode();
const openFilePanel = ref(false);
</script>

<template>
    <div
        class="w-dvh h-dvh grid grid-rows-[40px_1fr] grid-cols-[64px_1fr] bg-basebackground z-0"
    >
        <div></div>
        <Menu class="flex" />
        <Sidebar>
            <Button
                variant="ghost"
                class="w-[54px] h-[54px]"
                @click="openFilePanel = !openFilePanel"
            >
                <Archive />
            </Button>
            <Button variant="ghost" class="w-[54px] h-[54px]">
                <Settings />
            </Button>
            <Button variant="ghost" class="w-[54px] h-[54px]">
                <CircleHelp />
            </Button>
        </Sidebar>
        <div class="flex flex-grow">
            <ResizablePanelGroup direction="horizontal" style="overflow: visible">
                <ResizablePanel
                    class="pb-0 pr-1"
                    v-if="openFilePanel"
                    :default-size="30"
                    style="overflow: visible"
                    >
                    <FilePanel class="bg-background" />
                </ResizablePanel>
                <ResizablePanel class="pb-0 pr-1"  style="overflow: visible">
                    <EditorPanel />
                </ResizablePanel>
                <ResizableHandle class="invisible" />
                <ResizablePanel class="pb-0 pl-1 pr-2"  style="overflow: visible">
                    <PreviewPanel />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    </div>
</template>
