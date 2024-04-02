<script setup lang="ts">
import Sidebar from "@/Components/Sidebar.vue";
</script>

<template>
    <div class="w-dvh h-dvh grid grid-rows-[40px_1fr] grid-cols-[64px_1fr] bg-basebackground">
        <div></div>

        <slot name="menu" />

        <Sidebar>
            <slot name="sidebar" />
        </Sidebar>

        <slot name="main" />
    </div>
</template>
