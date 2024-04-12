<script setup lang="ts">
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import Menu from "@/components/Menu.vue";
import EditorPanel from "@/components/editor/EditorPanelEdit.vue";
import PreviewPanel from "@/components/editor/EditorPanelPreview.vue";
import FilePanel from "@/components/editor/EditorPanelFile.vue";
import { Button } from "@/components/ui/button";
import { Archive, Settings, CircleHelp } from "lucide-vue-next";
import { ref } from "vue";
import SettingsPanel from "@/components/editor/EditorPanelSetting.vue";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";
import {
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger
} from "@/components/ui/menubar";

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
            <Menu class="flex">
                <template #menubar>
                    <MenubarMenu>
                        <MenubarTrigger>File</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>New Window</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Share</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Print</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Edit</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>New Window</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Share</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Print</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>View</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>New Window</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Share</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Print</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Help</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>New Window</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Share</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Print</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </template>

                <template #location>
                    Editor
                </template>
            </Menu>
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
