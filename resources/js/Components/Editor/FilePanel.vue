<script setup lang="ts">
import Separator from "../ui/separator/Separator.vue";
import FileTree from "@/Components/FileTree/FileTree.vue";
import { ToggleGroupItem, ToggleGroupRoot } from "radix-vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

import { FileTreeItem } from "../FileTree";

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

const toggleGroupItemClasses =
    "hover:bg-secondary text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary flex h-[35px] w-[35px] items-center justify-center bg-card text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none border";

const toggleGroupRootClasses = "flex";
</script>

<template>
    <div class="shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)] flex h-full flex-grow flex-col rounded-md border mr-[1px]">
        <div class="flex flex-row items-center m-2">
            <div class="text-md font-bold pl-3">Files</div>
            <div class="flex flex-grow"></div>
            <ToggleGroupRoot type="multiple" :class="toggleGroupRootClasses">
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
