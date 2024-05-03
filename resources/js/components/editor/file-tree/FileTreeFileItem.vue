<script setup lang="ts">
import { FileTreeItem } from "./model";
import { Icon } from "@iconify/vue";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { computed, ref } from "vue";
import { Loader2 } from "lucide-vue-next";
import { useEditorStore } from "@/stores/editor";

const store = useEditorStore();

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

const renameDialogOpen = ref(false);
const deleteDialogOpen = ref(false);
const dialogLoading = ref(false);

const renameDialogInput = ref(props.params.name);
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
    <AlertDialog v-model:open="renameDialogOpen">
      <AlertDialogTrigger @click.stop="">
        <div v-if="isHover">
          <Icon
            icon="lucide:text-cursor-input"
            :class="isChoosen ? choosenIconStyle : normalIconStyle"
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
            <Button :disabled="dialogLoading" type="button" variant="secondary"
              >Close</Button
            >
          </AlertDialogCancel>
          <div v-if="dialogLoading == false">
            <Button
              @click="
                () => {
                  dialogLoading = true;
                  store
                    .filePanelHandleRenameFile(
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
          <Icon
            icon="lucide:trash-2"
            :class="isChoosen ? choosenIconStyle : normalIconStyle"
          />
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
            <Button :disabled="dialogLoading" type="button" variant="secondary"
              >Close</Button
            >
          </AlertDialogCancel>
          <div v-if="dialogLoading == false">
            <Button
              @click="
                () => {
                  dialogLoading = true;
                  store
                    .filePanelHandleDeleteFile(props.params.path)
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
  </div>
</template>
