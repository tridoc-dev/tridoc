<script setup lang="ts">
import { ToggleGroupItem, ToggleGroup } from "@/components/ui/toggle-group";
import { Icon } from "@iconify/vue";

import EditorPDFDisplay from "./EditorPDFDisplay.vue";

import { useEditorStore } from "../../stores/editor";

const store = useEditorStore();

function downloadPdfFile() {
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = store.previewPdfUrl;
  link.setAttribute("download", "main.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex flex-row">
      <div class="w-fit">
        <ToggleGroup>
          <ToggleGroupItem
            value="left"
            @click="store.previewPdfScale = store.previewPdfScale - 0.1"
          >
            <Icon icon="lucide:minus" class="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="left" :class="'w-[60px]'">
            <div class="text-sm">
              {{ (store.previewPdfScale * 100).toFixed(0) }}%
            </div>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="center"
            @click="store.previewPdfScale = store.previewPdfScale + 0.1"
          >
            <Icon icon="lucide:plus" class="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div class="flex flex-grow"></div>
      <div class="w-fit">
        <ToggleGroup>
          <ToggleGroupItem value="left" @click="downloadPdfFile">
            <Icon icon="lucide:download" class="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
    <div
      class="flex flex-grow w-full mt-2 drop-shadow-[0_0px_5px_rgba(0,0,0,0.1)] h-0"
    >
      <div
        class="w-full h-full border rounded-t-md flex overflow-scroll bg-[#e4e5ea]"
      >
        <EditorPDFDisplay :key="store.previewPdfUrl"></EditorPDFDisplay>
      </div>
    </div>
  </div>
</template>
