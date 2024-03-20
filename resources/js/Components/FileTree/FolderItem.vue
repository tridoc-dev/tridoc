<script setup lang="ts">
import FolderItem from "./FolderItem.vue";
import FileItem from "./FileItem.vue";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/Components/ui/context-menu";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { FileTreeItem } from "./model";

const props = defineProps<{
    params: FileTreeItem;
    indentSize: number;
}>();

const isOpen = ref(false);
</script>

<template>
    <Collapsible v-model:open="isOpen">
        <ContextMenu>
            <ContextMenuTrigger>
                <CollapsibleTrigger
                    class="flex flex-row w-full p-2 pl-4 text-sm items-center hover:bg-muted/50"
                >
                    <div v-for="i in props.indentSize">
                        <div class="w-5"></div>
                    </div>
                    <Icon
                        v-if="isOpen"
                        icon="lucide:folder-open"
                        class="w-4 h-4 mr-2 flex-shrink-0"
                    />
                    <Icon
                        v-else
                        icon="lucide:folder"
                        class="w-4 h-4 mr-2 flex-shrink-0"
                    />
                    <div class="truncate">
                        {{ params.name }}
                    </div>
                </CollapsibleTrigger>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>New folder</ContextMenuItem>
                <ContextMenuItem>New file</ContextMenuItem>
                <ContextMenuItem>Rename</ContextMenuItem>
                <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
        <CollapsibleContent
            class="flex flex-col relative"
        >
            <div class="absolute flex flex-grow flex-row transition-all h-full data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <div v-for="i in props.indentSize+1">
                    <div class="w-5"></div>
                </div>
                <div
                    class="w-[1px] bg-black border h-full z-10"
                ></div>
            </div>
            <div v-for="item in params.content">
                <div v-if="item.isFolder">
                    <FolderItem
                        :params="item"
                        :indent-size="props.indentSize + 1"
                    ></FolderItem>
                </div>
                <div v-else>
                    <FileItem
                        :params="item"
                        :indent-size="props.indentSize + 1"
                    ></FileItem>
                </div>
            </div>
        </CollapsibleContent>
    </Collapsible>
</template>
