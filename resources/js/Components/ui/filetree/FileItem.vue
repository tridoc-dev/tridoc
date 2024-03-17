<script setup lang="ts">
import { FileTreeItem } from "./model";
import { Icon } from "@iconify/vue";
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

const props = defineProps<{
    params: FileTreeItem
}>()

const fileTreeFileItemClasses =
    "flex flex-row border w-full p-2 text-sm items-center";
</script>

<template>
    <ContextMenu>
        <ContextMenuTrigger>
            <div :class="fileTreeFileItemClasses">
                <Icon
                    icon="lucide:file"
                    class="w-[15px] h-[15px] mr-2 flex-shrink-0"
                />
                <div class="truncate">
                    {{ props.params.name }}
                </div>
            </div></ContextMenuTrigger
        >
        <ContextMenuContent>
            <ContextMenuItem>Rename</ContextMenuItem>
            <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>

    <!-- <Collapsible v-model:open="isOpen">
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
                        Yes. Free to use for personal and commercial projects.
                        No attribution required.
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
            <ContextMenu>
                <ContextMenuTrigger>
                    <div :class="fileTreeFileItemClasses">
                        <Icon
                            icon="lucide:file"
                            class="w-[15px] h-[15px] mr-2 flex-shrink-0"
                        />
                        <div class="truncate">
                            Yes. Free to use for personal and commercial
                            projects. No attribution required.
                        </div>
                    </div></ContextMenuTrigger
                >
                <ContextMenuContent>
                    <ContextMenuItem>Rename</ContextMenuItem>
                    <ContextMenuItem>Delete</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <Collapsible v-model:open="isOpen2" class="w-full">
                <CollapsibleTrigger :class="fileTreeFolderClasses">
                    <Icon
                        v-if="isOpen2"
                        icon="lucide:folder-open"
                        class="w-[15px] h-[15px] mr-2 flex-shrink-0"
                    />
                    <Icon
                        v-else
                        icon="lucide:folder"
                        class="w-[15px] h-[15px] mr-2 flex-shrink-0"
                    />
                    <div class="truncate">
                        Yes. Free to use for personal and commercial projects.
                        No attribution required.
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent :class="fileTreeFolderContentClasses">
                    <ContextMenu>
                        <ContextMenuTrigger>
                            <div :class="fileTreeFileItemClasses">
                                <Icon
                                    icon="lucide:file"
                                    class="w-[15px] h-[15px] mr-2 flex-shrink-0"
                                />
                                <div class="truncate">
                                    Yes. Free to use for personal and commercial
                                    projects. No attribution required.
                                </div>
                            </div></ContextMenuTrigger
                        >
                        <ContextMenuContent>
                            <ContextMenuItem>Rename</ContextMenuItem>
                            <ContextMenuItem>Delete</ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                </CollapsibleContent>
            </Collapsible>
        </CollapsibleContent>
    </Collapsible> -->
</template>
