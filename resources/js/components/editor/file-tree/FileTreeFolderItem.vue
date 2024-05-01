<script setup lang="ts">
import FolderItem from "./FileTreeFolderItem.vue";
import FileItem from "./FileTreeFileItem.vue";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import { FileTreeItem } from "./model";
import { useEditorStore } from "@/stores/editor";
import { storeToRefs } from "pinia";

const store = useEditorStore();

const props = defineProps<{
  params: FileTreeItem;
  indentSize: number;
}>();
const chosenFile = defineModel<string>();
store.initFilePanelOpenState(props.params.path);
const { filePanelOpenState } = storeToRefs(store);
</script>

<template>
  <Collapsible v-model:open="filePanelOpenState[props.params.path]">
    <ContextMenu>
      <ContextMenuTrigger>
        <CollapsibleTrigger
          class="flex flex-row w-full h-9 p-[8px] pl-4 text-sm items-center hover:bg-muted/50"
        >
          <div v-for="i in props.indentSize">
            <div class="w-5"></div>
          </div>
          <Icon
            v-if="filePanelOpenState[props.params.path]"
            icon="tdesign:folder-open-1"
            class="w-4 h-4 mr-2 flex-shrink-0"
          />
          <Icon
            v-else
            icon="tdesign:folder"
            class="w-4 h-4 mr-2 flex-shrink-0"
          />
          <div class="text-[13px] truncate">
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
    <CollapsibleContent class="flex flex-col relative">
      <div
        class="absolute flex flex-grow flex-row transition-all h-full data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
      >
        <div v-for="i in props.indentSize + 1">
          <div class="w-5"></div>
        </div>
        <div class="w-[1px] bg-black border h-full z-10"></div>
      </div>
      <div v-for="item in params.content">
        <div v-if="item.isFolder">
          <FolderItem
            :params="item"
            v-model="chosenFile"
            :indent-size="props.indentSize + 1"
          ></FolderItem>
        </div>
        <div v-else>
          <FileItem
            :params="item"
            v-model="chosenFile"
            :indent-size="props.indentSize + 1"
          ></FileItem>
        </div>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
