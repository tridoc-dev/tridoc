<script setup lang="ts">
import { ToggleGroupItem, ToggleGroup } from "@/components/ui/toggle-group";
import { Loader2 } from "lucide-vue-next";
import { Icon } from "@iconify/vue";
import CodeMirrorEditor from "./EditorCMEditor.vue";
import { useEditorStore } from "@/stores/editor";
import { ref, watchEffect } from "vue";

const store = useEditorStore();
const state: string = "good";

const codeContent = ref();
const realCodeContent = ref("");
watchEffect(() => {
  codeContent.value = store.getFileContent(
    store.getFileContent(store.currentOpenFile)
  );
  realCodeContent.value = codeContent == null ? "" : codeContent.value;
});
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex flex-row">
      <div class="w-fit">
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="left">
            <Icon icon="lucide:undo" class="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <Icon icon="lucide:redo" class="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div class="w-fit ml-4">
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="bold">
            <Icon icon="radix-icons:font-bold" class="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Icon icon="radix-icons:font-italic" class="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="strikethrough">
            <Icon icon="radix-icons:strikethrough" class="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="strikethrough">
            <Icon icon="radix-icons:list-bullet" class="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="strikethrough">
            <Icon icon="radix-icons:image" class="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div class="flex flex-grow"></div>
      <div class="w-fit">
        <ToggleGroup>
          <ToggleGroupItem value="left">
            <div v-if="state == 'error'">
              <Icon icon="lucide:x" class="w-4 h-4" />
            </div>
            <div v-if="state == 'good'">
              <Icon icon="lucide:check" class="w-4 h-4" />
            </div>
            <div v-if="state == 'warning'">
              <Icon icon="lucide:triangle-alert" class="w-4 h-4" />
            </div>
            <div v-if="state == 'loading'">
              <Loader2 class="w-4 h-4 animate-spin" />
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
    <div
      class="flex flex-grow w-full mt-2 drop-shadow-[0_0px_5px_rgba(0,0,0,0.1)] h-0"
    >
      <div
        class="w-full h-full border bg-background rounded-t-md flex items-center justify-center overflow-hidden"
      >
        <div class="w-full h-full root-wrapper">
          <CodeMirrorEditor v-model="realCodeContent" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.root-wrapper {
  display: flex;
  flex-direction: row;

  .cm-editor {
    width: 0;
    flex-grow: 1;
  }
}
</style>
