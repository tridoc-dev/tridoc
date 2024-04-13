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
import { Input } from "@/components/ui/input";
import { computed, watchEffect, ref } from "vue";

const props = defineProps<{
  params: FileTreeItem;
  indentSize: number;
}>();
const chosenFile = defineModel<string>();

const isChoosen = computed(() => {
  return chosenFile.value == props.params.path;
});
const isRenaming = ref(false);

function handleClick() {
  chosenFile.value = props.params.path;
}

function handleRenameConfirm() {
  isRenaming.value = false;
}

const baseBgStyle = "flex flex-row h-9 w-full pl-4 text-sm items-center pr-0.5";
const normalBgStyle = baseBgStyle + " hover:bg-muted/50";
const choosenBgStyle = baseBgStyle + " hover:bg-blue-600 bg-blue-500";

const baseTextStyle = "truncate";
const normalTextStyle = baseTextStyle;
const choosenTextStyle = baseTextStyle + " text-white";
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger
      :class="isChoosen ? choosenBgStyle : normalBgStyle"
      @click="handleClick"
    >
      <div v-for="i in props.indentSize">
        <div class="w-5"></div>
      </div>
      <Icon
        icon="vscode-icons:file-type-light-tex"
        class="w-5 h-5 mr-2 flex-shrink-0"
      />
      <Input
        v-if="isRenaming"
        ref="renamingInput"
        class="h-8 p-1 rounded-none"
        @keypress.enter="handleRenameConfirm"
        @blur="isRenaming = false"
      />
      <div v-else :class="isChoosen ? choosenTextStyle : normalTextStyle">
        {{ props.params.name }}
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem @click="isRenaming = true">Rename</ContextMenuItem>
      <ContextMenuItem>Delete</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
