<script setup lang="ts">
import FolderItem from "./FileTreeFolderItem.vue";
import FileItem from "./FileTreeFileItem.vue";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import { FileTreeItem } from "./model";
import { useEditorStore } from "@/stores/editor";
import { storeToRefs } from "pinia";

const store = useEditorStore();
const isHover = ref(false);

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
    <CollapsibleTrigger
      class="flex flex-row w-full h-9 p-[8px] pl-4 text-sm items-center hover:bg-muted/50"
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
    >
      <div v-for="i in props.indentSize">
        <div class="w-5"></div>
      </div>
      <Icon
        v-if="filePanelOpenState[props.params.path]"
        icon="tdesign:folder-open-1"
        class="w-4 h-4 mr-2 flex-shrink-0"
      />
      <Icon v-else icon="tdesign:folder" class="w-4 h-4 mr-2 flex-shrink-0" />
      <div class="text-[13px] truncate">
        {{ params.name }}
      </div>
      <div class="flex flex-grow"></div>
      <Dialog>
        <DialogTrigger @click.stop="">
          <div v-if="isHover">
            <Icon icon="lucide:file-plus" class="w-4 h-4 mr-2 flex-shrink-0" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription> </DialogDescription>
            <Input placeholder="New File Name" />
          </DialogHeader>
          <DialogFooter>
            <DialogClose as-child>
              <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
            <Button type="button" variant="default">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger @click.stop="">
          <div v-if="isHover">
            <Icon
              icon="lucide:folder-plus"
              class="w-4 h-4 mr-2 flex-shrink-0"
            />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription> </DialogDescription>
            <Input placeholder="New Folder Name" />
          </DialogHeader>
          <DialogFooter>
            <DialogClose as-child>
              <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
            <Button type="button" variant="default">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger @click.stop="">
          <div v-if="isHover">
            <Icon icon="lucide:upload" class="w-4 h-4 mr-2 flex-shrink-0" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload files to {{ props.params.name }}</DialogTitle>
            <DialogDescription> </DialogDescription>
            <Input type="file" multiple="multiplt" />
          </DialogHeader>
          <DialogFooter>
            <DialogClose as-child>
              <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
            <Button type="button" variant="default">Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger @click.stop="">
          <div v-if="isHover">
            <Icon
              icon="lucide:text-cursor-input"
              class="w-4 h-4 mr-2 flex-shrink-0"
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
            <Icon icon="lucide:trash-2" class="w-4 h-4 mr-2 flex-shrink-0" />
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
    </CollapsibleTrigger>
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
