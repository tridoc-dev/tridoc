<script setup lang="ts">
import FolderItem from "./FileTreeFolderItem.vue";
import FileItem from "./FileTreeFileItem.vue";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import { FileTreeItem } from "./model";
import { useEditorStore } from "@/stores/editor";
import { storeToRefs } from "pinia";
import { Loader2 } from "lucide-vue-next";

const store = useEditorStore();
const isHover = ref(false);

const props = defineProps<{
  params: FileTreeItem;
  indentSize: number;
}>();
const { currentOpenFile } = storeToRefs(store);
store.initFilePanelOpenState(props.params.path);
const { filePanelOpenState } = storeToRefs(store);

const newFileDialogOpen = ref(false);
const newFolderDialogOpen = ref(false);
const uploadDialogOpen = ref(false);
const renameDialogOpen = ref(false);
const deleteDialogOpen = ref(false);
const dialogLoading = ref(false);

const selectedFile = ref<File>();

const newFileDialogInput = ref("");
const newFolderDialogInput = ref("");
const renameDialogInput = ref(props.params.name);

import { useRoute } from "vue-router";

const route = useRoute();
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
      <AlertDialog v-model:open="newFileDialogOpen">
        <AlertDialogTrigger @click.stop="">
          <div v-if="isHover">
            <Icon icon="lucide:file-plus" class="w-4 h-4 mr-2 flex-shrink-0" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              >Create new file in {{ props.params.name }}</AlertDialogTitle
            >
            <AlertDialogDescription> </AlertDialogDescription>
            <Input v-model="newFileDialogInput" placeholder="New File Name" />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel as-child>
              <Button
                :disabled="dialogLoading"
                type="button"
                variant="secondary"
                >Close</Button
              >
            </AlertDialogCancel>
            <div v-if="dialogLoading == false">
              <Button
                @click="
                  () => {
                    dialogLoading = true;
                    store
                      .filePanelHandleNewFileFolder(
                        route.params.id.toString(),
                        props.params.path,
                        newFileDialogInput
                      )
                      .then(() => {
                        newFileDialogOpen = false;
                        dialogLoading = false;
                      });
                  }
                "
                type="button"
                variant="default"
              >
                Create
              </Button>
            </div>
            <div v-else>
              <Button disabled variant="default">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog v-model:open="newFolderDialogOpen">
        <AlertDialogTrigger @click.stop="">
          <div v-if="isHover">
            <Icon
              icon="lucide:folder-plus"
              class="w-4 h-4 mr-2 flex-shrink-0"
            />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              >Create new folder in {{ props.params.name }}</AlertDialogTitle
            >
            <AlertDialogDescription> </AlertDialogDescription>
            <Input
              v-model="newFolderDialogInput"
              placeholder="New Folder Name"
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel as-child>
              <Button
                :disabled="dialogLoading"
                type="button"
                variant="secondary"
                >Close</Button
              >
            </AlertDialogCancel>
            <div v-if="dialogLoading == false">
              <Button
                @click="
                  () => {
                    dialogLoading = true;
                    store
                      .filePanelHandleNewFolderFolder(
                        route.params.id.toString(),
                        props.params.path,
                        newFolderDialogInput
                      )
                      .then(() => {
                        newFolderDialogOpen = false;
                        dialogLoading = false;
                      });
                  }
                "
                type="button"
                variant="default"
              >
                Create
              </Button>
            </div>
            <div v-else>
              <Button disabled variant="default">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog v-model:open="uploadDialogOpen">
        <AlertDialogTrigger @click.stop="">
          <div v-if="isHover">
            <Icon icon="lucide:upload" class="w-4 h-4 mr-2 flex-shrink-0" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              >Upload files to {{ props.params.name }}</AlertDialogTitle
            >
            <AlertDialogDescription> </AlertDialogDescription>
            <Input id="file" type="file" v-on:change="e => { if (e) selectedFile = e.target.files[0] }" />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel as-child>
              <Button
                :disabled="dialogLoading"
                type="button"
                variant="secondary"
                >Close</Button
              >
            </AlertDialogCancel>
            <div v-if="dialogLoading == false">
              <Button
                @click="
                  () => {
                    if (!selectedFile) return;
                    dialogLoading = true;
                    store
                      .filePanelHandleUploadFolder(
                        route.params.id.toString(),
                        props.params.path,
                        selectedFile
                      )
                      .then(() => {
                        uploadDialogOpen = false;
                        dialogLoading = false;
                      });
                  }"
                type="submit"
                variant="default"
              >
                Upload
              </Button>
            </div>
            <div v-else>
              <Button disabled variant="default">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog v-model:open="renameDialogOpen">
        <AlertDialogTrigger @click.stop="">
          <div v-if="isHover">
            <Icon
              icon="lucide:text-cursor-input"
              class="w-4 h-4 mr-2 flex-shrink-0"
            />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rename {{ props.params.name }}</AlertDialogTitle>
            <AlertDialogDescription> </AlertDialogDescription>
            <Input v-model="renameDialogInput" placeholder="New File Name" />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel as-child>
              <Button
                :disabled="dialogLoading"
                type="button"
                variant="secondary"
                >Close</Button
              >
            </AlertDialogCancel>
            <div v-if="dialogLoading == false">
              <Button
                @click="
                  () => {
                    dialogLoading = true;
                    store
                      .filePanelHandleRenameFolder(
                        route.params.id.toString(),
                        props.params.path,
                        renameDialogInput
                      )
                      .then(() => {
                        renameDialogOpen = false;
                        dialogLoading = false;
                      });
                  }
                "
                type="button"
                variant="default"
              >
                Rename
              </Button>
            </div>
            <div v-else>
              <Button disabled variant="default">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog v-model:open="deleteDialogOpen">
        <AlertDialogTrigger @click.stop="">
          <div v-if="isHover">
            <Icon icon="lucide:trash-2" class="w-4 h-4 mr-2 flex-shrink-0" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              >Are you absolutely sure to delete
              {{ props.params.name }}?</AlertDialogTitle
            >
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to permanently
              delete {{ props.params.name }}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel as-child>
              <Button
                :disabled="dialogLoading"
                type="button"
                variant="secondary"
                >Close</Button
              >
            </AlertDialogCancel>
            <div v-if="dialogLoading == false">
              <Button
                @click="
                  () => {
                    dialogLoading = true;
                    store
                      .filePanelHandleDeleteFolder(
                        route.params.id.toString(),
                        props.params.path
                      )
                      .then(() => {
                        deleteDialogOpen = false;
                        dialogLoading = false;
                      });
                  }
                "
                type="button"
                variant="destructive"
              >
                Delete
              </Button>
            </div>
            <div v-else>
              <Button disabled variant="destructive">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
