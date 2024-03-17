<script setup lang="ts">

const props = defineProps<{
    params: FileTreeItem[]
}>()

import FileItem from "./FileItem.vue";
import FolderItem from "./FolderItem.vue";
import { FileTreeItem } from "./model";
</script>

<template>
    <div v-for="item in props.params">
        <FolderItem :params="item" v-if="item.isFolder"></FolderItem>
        <FileItem :params="item" v-else></FileItem>
    </div>
</template>
