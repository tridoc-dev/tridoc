<script setup lang="ts">
import {Splitpanes, Pane} from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import Menu from "@/Components/Editor/Menu.vue";
import Sidebar from "@/Components/Sidebar.vue";
import EditorPanel from "@/Components/Editor/EditorPanel.vue";
import PreviewPanel from "@/Components/Editor/PreviewPanel.vue";
import {Button} from "@/Components/ui/button";
import {Archive, Settings, CircleHelp} from "lucide-vue-next";
import {ref} from "vue";

// const mode = useColorMode();
const openFilePanel = ref(false);
const openSettingsPanel = ref(false);
</script>

<template>
    <div class="w-dvh h-dvh max-w-screen flex bg-basebackground pr-2">
        <Sidebar>
            <Button
                variant="ghost"
                class="w-[54px] h-[54px]"
                @click="
                    openSettingsPanel = false;
                    openFilePanel = !openFilePanel;
                "
            >
                <Archive/>
            </Button>
            <Button
                variant="ghost"
                class="w-[54px] h-[54px]"
                @click="
                    openFilePanel = false;
                    openSettingsPanel = !openSettingsPanel;
                "
            >
                <Settings/>
            </Button>
            <Button variant="ghost" class="w-[54px] h-[54px]">
                <CircleHelp/>
            </Button>
        </Sidebar>

        <div class="flex flex-col flex-grow">
            <Menu />

            <div class="flex gap-x-2 overflow-hidden">
                <EditorPanel class="basis-1/2" />
                <PreviewPanel class="basis-1/2" />
            </div>
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
