<script setup lang="ts">
// import { useColorMode } from "@vueuse/core";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import Menu from "@/Components/Editor/Menu.vue";
import Sidebar from "@/Components/Sidebar.vue";
import EditorPanel from "@/Components/Editor/EditorPanel.vue";
import PreviewPanel from "@/Components/Editor/PreviewPanel.vue";
import FilePanel from "@/Components/Editor/FilePanel.vue";
import { Button } from "@/Components/ui/button";
import { Archive, Settings, CircleHelp } from "lucide-vue-next";
import { ref } from "vue";
import SettingsPanel from "@/Components/Editor/SettingsPanel.vue";

// const mode = useColorMode();
const openFilePanel = ref(false);
const openSettingsPanel = ref(false);
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
                @click="
                    openSettingsPanel = false;
                    openFilePanel = !openFilePanel;
                "
            >
                <Archive />
            </Button>
            <Button
                variant="ghost"
                class="w-[54px] h-[54px]"
                @click="
                    openFilePanel = false;
                    openSettingsPanel = !openSettingsPanel;
                "
            >
                <Settings />
            </Button>
            <Button variant="ghost" class="w-[54px] h-[54px]">
                <CircleHelp />
            </Button>
        </Sidebar>
        <div class="flex flex-grow">
            <splitpanes class="default-theme">
                <pane v-if="openFilePanel">
                    <FilePanel class="bg-background" />
                </pane>
                <pane v-if="openSettingsPanel">
                    <SettingsPanel class="bg-background" />
                </pane>
                <pane class="mr-[1px]">
                    <EditorPanel />
                </pane>
                <pane class="mr-2">
                    <PreviewPanel />
                </pane>
            </splitpanes>
        </div>
    </div>
</template>

<style>
.splitpanes .splitpanes__pane {
    transition: none !important;
    overflow: visible;
}
.splitpanes.default-theme .splitpanes__splitter {
    background-color: transparent;
}
.splitpanes.default-theme .splitpanes__splitter:after,
.splitpanes.default-theme .splitpanes__splitter:before {
    display: none;
}
</style>
