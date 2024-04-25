<script setup lang="ts">
import EditorSidePanel from "./EditorSidePanel.vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEditorStore } from "../../stores/editor";
import { storeToRefs } from "pinia";

const store = useEditorStore();
const { settingEditorFontFamily, settingEditorFontSize } = storeToRefs(store);
</script>

<template>
  <EditorSidePanel>
    <template #title> Settings </template>
    <template #options> </template>
    <template #content>
      <div class="flex flex-col p-4 gap-4">
        <div class="flex-row w-full flex items-center space-x-2">
          <Label for="enableVimMode">Enable Vim Mode</Label>
          <div class="flex-grow"></div>
          <Switch
            id="enableVimMode"
            :checked="store.settingEnableVimMode"
            @update:checked="store.settingSwitchVimMode()"
          />
        </div>
        <div class="grid w-full max-w-sm items-center gap-2">
          <Label for="editorFontFamily">Editor Font Family</Label>
          <Input
            id="editorFontFamily"
            type="editorFontFamily"
            placeholder="Editor Font Family"
            v-model="settingEditorFontFamily"
          />
        </div>
        <div class="grid w-full max-w-sm items-center gap-2">
          <Label for="editorFontSize">Editor Font Size</Label>
          <Input
            id="editorFontSize"
            type="editorFontSize"
            placeholder="Editor Font Size"
            v-model="settingEditorFontSize"
          />
        </div>
      </div>
    </template>
  </EditorSidePanel>
</template>
