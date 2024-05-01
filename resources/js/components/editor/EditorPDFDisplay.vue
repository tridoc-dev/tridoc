<script setup>
import { VuePDF, usePDF } from "@tato30/vue-pdf";

import { useEditorStore } from "@/stores/editor";

const store = useEditorStore();
const pdfUrl = defineModel();

const { pdf, pages } = usePDF(pdfUrl);
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <div v-for="page in pages" :key="page">
      <VuePDF
        :pdf="pdf"
        :page="page"
        :scale="store.previewPdfScale"
        class="mb-10 shadow-xl"
      />
    </div>
  </div>
</template>
