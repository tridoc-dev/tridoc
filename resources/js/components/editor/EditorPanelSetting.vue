<script setup lang="ts">
import Separator from "../ui/separator/Separator.vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEditorStore } from "./EditorStore";
import { storeToRefs } from "pinia";

const enableVimMode = defineModel<boolean>("enableVimMode");
const fontSize = defineModel<string>("fontSize");

const store = useEditorStore();
const { settingEditorFontFamily, settingEditorFontSize } = storeToRefs(store);
</script>

<template>
  <div
    class="shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)] flex h-full flex-grow flex-col rounded-md border mr-[1px]"
  >
    <div class="flex flex-row items-center m-2 h-[35px] p-2">
      <div class="text-md font-bold">Settings</div>
    </div>
    <Separator />
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
  </div>
</template>
