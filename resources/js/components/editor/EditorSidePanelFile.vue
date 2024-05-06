<script setup lang="ts">
import EditorSidePanel from "./EditorSidePanel.vue";
import FileTree from "./file-tree/FileTree.vue";
import { ToggleGroupItem, ToggleGroup } from "@/components/ui/toggle-group";
import { Icon } from "@iconify/vue";

import { useEditorStore } from "@/stores/editor";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const store = useEditorStore();
const { currentOpenFile } = storeToRefs(store);

const route = useRoute();
</script>

<template>
  <EditorSidePanel>
    <template #title> Files </template>
    <template #options>
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="left" @click="store.updateFilePanelFileList2()">
          <Icon icon="lucide:file-plus" class="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="left" @click="store.updateFilePanelFileList(route.params.id.toString())">
          <Icon icon="lucide:folder-plus" class="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <Icon icon="lucide:upload" class="w-4 h-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </template>
    <template #content>
      <FileTree v-model="currentOpenFile" />
    </template>
  </EditorSidePanel>
</template>
