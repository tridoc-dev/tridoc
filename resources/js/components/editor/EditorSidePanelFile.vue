<script setup lang="ts">
import EditorSidePanel from "./EditorSidePanel.vue";
import FileTree from "./file-tree/FileTree.vue";
import { ToggleGroupItem, ToggleGroup } from "@/components/ui/toggle-group";
import { Icon } from "@iconify/vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

import { useEditorStore } from "@/stores/editor";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { ref } from "vue";
const store = useEditorStore();
const { currentOpenFile } = storeToRefs(store);

const route = useRoute();

store.updateFilePanelFileList(route.params.id.toString());

const isHover = ref(false);
const dialogLoading = ref(false);

const newFileDialogOpen = ref(false);
const newFolderDialogOpen = ref(false);

const newFileDialogInput = ref("");
const newFolderDialogInput = ref("");
</script>

<template>
  <EditorSidePanel>
    <template #title> Files </template>
    <template #options>
      <ToggleGroup type="multiple">
        <AlertDialog v-model:open="newFileDialogOpen">
          <AlertDialogTrigger @click.stop="">
            <ToggleGroupItem value="left">
              <Icon icon="lucide:file-plus" class="w-4 h-4" />
            </ToggleGroupItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create new file</AlertDialogTitle>
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
                          '',
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
            <ToggleGroupItem value="left">
              <Icon icon="lucide:folder-plus" class="w-4 h-4" />
            </ToggleGroupItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create new folder</AlertDialogTitle>
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
                          '',
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

        <ToggleGroupItem value="center">
          <Icon icon="lucide:upload" class="w-4 h-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </template>
    <template #content>
      <FileTree v-model="currentOpenFile" />
    </template>
  </EditorSidePanel>
</template>
