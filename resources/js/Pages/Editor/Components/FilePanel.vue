<script setup lang="ts">
import Separator from "@/Components/ui/separator/Separator.vue";
import FileTree from "@/Components/ui/filetree/FileTree.vue";
import { ToggleGroupItem, ToggleGroupRoot } from "radix-vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

import { FileTreeItem } from "@/Components/ui/filetree";

const items: FileTreeItem[] = [
    {
        isFolder: false,
        name: "testfile",
    },
    {
        isFolder: true,
        name: "test1",
        content: [
            { isFolder: false, name: "test2" },
            {
                isFolder: true,
                name: "test3",
                content: [{ isFolder: false, name: "test4" }],
            },
        ],
    },
];

const toggleGroupItemClasses =
    "hover:bg-secondary text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary flex h-[35px] w-[35px] items-center justify-center bg-card text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none border";
</script>

<template>
    <div class="flex h-full flex-grow flex-col rounded-md border mr-2">
        <div class="flex flex-row items-center m-2">
            <div class="text-md font-bold pl-3">Files</div>
            <div class="flex flex-grow"></div>
            <ToggleGroupRoot type="multiple" class="flex">
                <ToggleGroupItem value="left" :class="toggleGroupItemClasses">
                    <Icon icon="lucide:folder-plus" class="w-4 h-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="left" :class="toggleGroupItemClasses">
                    <Icon icon="lucide:file-plus" class="w-4 h-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" :class="toggleGroupItemClasses">
                    <Icon icon="lucide:upload" class="w-4 h-4" />
                </ToggleGroupItem>
            </ToggleGroupRoot>
        </div>
        <Separator />
        <FileTree :params="items" />
    </div>
</template>
