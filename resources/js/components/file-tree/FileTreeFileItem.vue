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
} from "@/components/ui/context-menu";

const props = defineProps<{
  params: FileTreeItem;
  indentSize: number;
}>();
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger
      class="flex flex-row w-full p-2 pl-4 text-sm items-center hover:bg-muted/50"
    >
      <div v-for="i in props.indentSize">
        <div class="w-5"></div>
      </div>
      <Icon icon="lucide:file" class="w-4 h-4 mr-2 flex-shrink-0" />
      <div class="truncate">
        {{ props.params.name }}
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Rename</ContextMenuItem>
      <ContextMenuItem>Delete</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
