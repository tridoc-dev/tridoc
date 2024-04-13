<script setup lang="ts">
import EditorSidePanel from "./EditorSidePanel.vue";
import FileTree from "../file-tree/FileTree.vue";
import { ToggleGroupItem, ToggleGroup } from "@/components/ui/toggle-group";
import { Icon } from "@iconify/vue";

import { FileTreeItem } from "@/components/file-tree";

const items: FileTreeItem[] = [
  {
    isFolder: false,
    name: "testfile",
  },
  {
    isFolder: true,
    name: "test1",
    content: [
      {
        isFolder: true,
        name: "test3",
        content: [{ isFolder: false, name: "test4" }],
      },
      {
        isFolder: true,
        name: "test3",
        content: [{ isFolder: false, name: "test4" }],
      },
      { isFolder: false, name: "test2" },
    ],
  },
];
</script>

<template>
  <EditorSidePanel>
    <template #title> Files </template>
    <template #options>
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="left">
          <Icon icon="lucide:folder-plus" class="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="left">
          <Icon icon="lucide:file-plus" class="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <Icon icon="lucide:upload" class="w-4 h-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </template>
    <template #content>
      <FileTree :params="items" />
    </template>
  </EditorSidePanel>
</template>
