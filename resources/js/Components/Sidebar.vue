<script setup lang="ts">
import logo from "@/Components/TridocLogo.vue";
</script>

<template>
    <div class="h-full flex flex-col justify-center items-center">
        <div class="space-y-4 flex flex-col items-center">
            <slot></slot>
        </div>
        <div class="flex-grow"></div>
        <logo class="fill-primary w-7 mb-5" />
    </div>
</template>
