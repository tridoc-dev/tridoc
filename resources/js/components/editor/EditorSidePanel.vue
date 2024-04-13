<script setup lang="ts">
import Separator from "../ui/separator/Separator.vue";
</script>

<template>
  <div
    class="shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)] flex h-full flex-grow flex-col rounded-md border mr-[1px]"
  >
    <div class="flex flex-row items-center m-2 h-[35px]">
      <div class="text-md font-bold ml-2">
        <slot name="title"></slot>
      </div>
      <div class="flex flex-grow"></div>
      <div class="flex">
        <slot name="options"></slot>
      </div>
    </div>
    <Separator />
    <slot name="content"></slot>
  </div>
</template>
