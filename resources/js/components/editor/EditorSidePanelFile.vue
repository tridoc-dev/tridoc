<script setup lang="ts">
import EditorSidePanel from "./EditorSidePanel.vue";
import FileTree from "./file-tree/FileTree.vue";
import { ToggleGroupItem, ToggleGroup } from "@/components/ui/toggle-group";
import { Icon } from "@iconify/vue";

import { useEditorStore } from "../../stores/editor";
import { storeToRefs } from "pinia";
const store = useEditorStore();
const { currentOpenFile } = storeToRefs(store);

// const items: FileTreeItem[] = [
//   {
//     isFolder: false,
//     name: "testfile",
//     path: "/testfile",
//   },
//   {
//     isFolder: true,
//     name: "test1",
//     path: "/test1",
//     content: [
//       {
//         isFolder: true,
//         name: "test3",
//         path: "/test1/test3",
//         content: [
//           { isFolder: false, name: "test4", path: "/test1/test3/test4" },
//         ],
//       },
//       {
//         isFolder: true,
//         name: "test2",
//         path: "/test1/test2",
//         content: [
//           { isFolder: false, name: "test4", path: "/test1/test2/test4" },
//         ],
//       },
//       { isFolder: false, name: "test2", path: "/test1/test2" },
//     ],
//   },
// ];
</script>

<template>
  <EditorSidePanel>
    <template #title> Files </template>
    <template #options>
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="left" @click="store.updateFilePanelFileList()">
          <Icon icon="lucide:folder-plus" class="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="left" @click="store.updateFilePanelFileList2()">
          <Icon icon="lucide:file-plus" class="w-4 h-4" />
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
