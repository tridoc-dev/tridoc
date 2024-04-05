<script setup lang="ts">
import Sidebar from "@/Components/Sidebar.vue";
</script>

<template>
    <div class="w-dvh h-dvh grid grid-rows-[40px_1fr] grid-cols-[64px_1fr] bg-basebackground">
        <div></div>

        <div class="flex items-center select-none">
            <p class="mr-2 font-serif text-lg pb-[3px]"><span class="font-bold mr-[1px]">Tri</span>doc</p>
            <slot name="menu" />
        </div>

        <Sidebar>
            <slot name="sidebar" />
        </Sidebar>

        <slot name="main" />
    </div>
</template>
