<script setup lang="ts">
const chosenFile = defineModel<string>();

import { useEditorStore } from "@/stores/editor";
import FileItem from "./FileTreeFileItem.vue";
import FolderItem from "./FileTreeFolderItem.vue";
import { FileTreeItem } from "./model";
import { storeToRefs } from "pinia";

const store = useEditorStore();
const { filePanelFileList } = storeToRefs(store);
</script>

<template>
  <div v-for="item in filePanelFileList">
    <FolderItem
      :params="item"
      :indent-size="0"
      v-model="chosenFile"
      v-if="item.isFolder"
    ></FolderItem>
    <FileItem
      :params="item"
      :indent-size="0"
      v-model="chosenFile"
      v-else
    ></FileItem>
  </div>
</template>
