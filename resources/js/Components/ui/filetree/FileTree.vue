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
        <div v-if="item.isFolder">
            <FolderItem :params="item ?? []"></FolderItem>
        </div>
        <div v-else>
            <FileItem :params="item"></FileItem>
        </div>
    </div>
</template>
