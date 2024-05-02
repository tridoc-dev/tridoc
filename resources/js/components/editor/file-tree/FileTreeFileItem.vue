<script setup lang="ts">
import { FileTreeItem } from "./model";
import { Icon } from "@iconify/vue";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { computed, ref } from "vue";

const props = defineProps<{
  params: FileTreeItem;
  indentSize: number;
}>();
const chosenFile = defineModel<string>();

const isChoosen = computed(() => {
  return chosenFile.value == props.params.path;
});
const isHover = ref(false);

function handleClick() {
  chosenFile.value = props.params.path;
}

const baseBgStyle = "flex flex-row h-9 w-full pl-4 text-sm items-center pr-0.5";
const normalBgStyle = baseBgStyle + " hover:bg-muted/50";
const choosenBgStyle = baseBgStyle + " hover:bg-blue-600 bg-blue-500";

const baseTextStyle = "text-[13px] truncate";
const normalTextStyle = baseTextStyle;
const choosenTextStyle = baseTextStyle + " text-white";

const baseIconStyle = "w-4 h-4 mr-2 flex-shrink-0";
const normalIconStyle = baseIconStyle;
const choosenIconStyle = baseIconStyle + " text-white";
</script>

<template>
  <div
    :class="isChoosen ? choosenBgStyle : normalBgStyle"
    @click="handleClick"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <div v-for="i in props.indentSize">
      <div class="w-5"></div>
    </div>
    <Icon
      icon="tdesign:file"
      :class="isChoosen ? choosenIconStyle : normalIconStyle"
    />
    <div :class="isChoosen ? choosenTextStyle : normalTextStyle">
      {{ props.params.name }}
    </div>
    <div class="flex flex-grow"></div>
    <Dialog>
      <DialogTrigger @click.stop="">
        <div v-if="isHover">
          <Icon
            icon="lucide:text-cursor-input"
            :class="isChoosen ? choosenIconStyle : normalIconStyle"
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename {{ props.params.name }}</DialogTitle>
          <DialogDescription> </DialogDescription>
          <Input placeholder="New File Name" />
        </DialogHeader>
        <DialogFooter>
          <DialogClose as-child>
            <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
          <Button type="button" variant="default">Rename</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog>
      <DialogTrigger @click.stop="">
        <div v-if="isHover">
          <Icon
            icon="lucide:trash-2"
            :class="isChoosen ? choosenIconStyle : normalIconStyle"
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            >Are you absolutely sure to delete
            {{ props.params.name }}?</DialogTitle
          >
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete {{ props.params.name }}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose as-child>
            <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
          <Button type="button" variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
