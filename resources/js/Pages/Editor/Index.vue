<script setup lang="ts">
// import { useColorMode } from "@vueuse/core";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import Menu from "@/Pages/Editor/Partials/Menu.vue";
import Sidebar from "@/Components/Sidebar.vue";
import EditorPanel from "@/Pages/Editor/Partials/EditorPanel.vue";
import PreviewPanel from "@/Pages/Editor/Partials/PreviewPanel.vue";
import FilePanel from "@/Pages/Editor/Partials/FilePanel.vue";
import { Button } from "@/Components/ui/button";
import { Archive, Settings, CircleHelp } from "lucide-vue-next";
import { ref } from "vue";
import SettingsPanel from "@/Pages/Editor/Partials/SettingsPanel.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

// const mode = useColorMode();
const openFilePanel = ref(false);
const openSettingsPanel = ref(false);

const enableVimMode = ref(false)
const editorFontFamily = ref('')
const editorFontSize = ref('13')
</script>

<template>
    <AuthenticatedLayout>
        <template #menu>
            <Menu class="flex" />
        </template>

        <template #sidebar>
            <Button variant="ghost" class="w-[54px] h-[54px]" @click="
                openSettingsPanel = false;
            openFilePanel = !openFilePanel;
            ">
                <Archive />
            </Button>
            <Button variant="ghost" class="w-[54px] h-[54px]" @click="
                openFilePanel = false;
            openSettingsPanel = !openSettingsPanel;
            ">
                <Settings />
            </Button>
            <Button variant="ghost" class="w-[54px] h-[54px]">
                <CircleHelp />
            </Button>
        </template>

        <template #main>
            <div class="flex flex-grow">
                <splitpanes class="default-theme">
                    <pane v-if="openFilePanel">
                        <FilePanel class="bg-background" />
                    </pane>
                    <pane v-if="openSettingsPanel">
                        <SettingsPanel class="bg-background" v-model:enable-vim-mode="enableVimMode" v-model:font-family="editorFontFamily"
                            v-model:font-size="editorFontSize" />
                    </pane>
                    <pane class="mr-[1px]">
                        <EditorPanel v-model:enable-vim-mode="enableVimMode" v-model:font-family="editorFontFamily"
                            v-model:font-size="editorFontSize" />
                    </pane>
                    <pane class="mr-2">
                        <PreviewPanel />
                    </pane>
                </splitpanes>
            </div>
        </template>

    </AuthenticatedLayout>
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
