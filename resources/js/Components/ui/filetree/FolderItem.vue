<script setup lang="ts">
import FolderItem from "./FolderItem.vue"
import FileItem from "./FileItem.vue";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/Components/ui/context-menu";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { FileTreeItem } from "./model";


const props = defineProps<{
    params: FileTreeItem;
}>();

const isOpen = ref(false);

const fileTreeFolderClasses =
    "flex flex-row border w-full p-2 text-sm items-center";

const fileTreeFolderContentClasses = "w-full pl-5";
</script>

<template>
    <Collapsible v-model:open="isOpen">
        <ContextMenu>
            <ContextMenuTrigger>
                <CollapsibleTrigger :class="fileTreeFolderClasses">
                    <Icon
                        v-if="isOpen"
                        icon="lucide:folder-open"
                        class="w-[15px] h-[15px] mr-2 flex-shrink-0"
                    />
                    <Icon
                        v-else
                        icon="lucide:folder"
                        class="w-[15px] h-[15px] mr-2 flex-shrink-0"
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
        <CollapsibleContent :class="fileTreeFolderContentClasses">
            <div v-for="item in params.content">
                <div v-if="item.isFolder">
                    <FolderItem :params="item"></FolderItem>
                </div>
                <div v-else>
                    <FileItem :params="item"></FileItem>
                </div>
            </div>
        </CollapsibleContent>
    </Collapsible>
</template>
