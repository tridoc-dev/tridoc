<script setup>
import { VuePDF, usePDF } from '@tato30/vue-pdf'

import { useEditorStore } from "./EditorStore";

const store = useEditorStore();

const { pdf, pages } = usePDF('test.pdf')
</script>

<template>
  <div class="flex flex-col items-center w-full">
  <div v-for="page in pages" :key="page">
    <VuePDF :pdf="pdf" :page="page" :scale="store.previewPdfScale" class="mb-10" />
  </div></div>
</template>