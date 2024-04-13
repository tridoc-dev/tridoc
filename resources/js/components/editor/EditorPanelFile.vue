<script setup lang="ts">
import Separator from "../ui/separator/Separator.vue";
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
  <div
    class="shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)] flex h-full flex-grow flex-col rounded-md border mr-[1px]"
  >
    <div class="flex flex-row items-center m-2">
      <div class="text-md font-bold pl-3">Files</div>
      <div class="flex flex-grow"></div>
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
    </div>
    <Separator />
    <FileTree :params="items" />
  </div>
</template>
