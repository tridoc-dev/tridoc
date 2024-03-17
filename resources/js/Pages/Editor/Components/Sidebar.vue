<script setup lang="ts">
import { Archive, Settings, CircleHelp } from "lucide-vue-next";
import { Button } from '@/Components/ui/button'
import logo from "@/Components/logo/logo.vue";

const model = defineModel()

function handleFilePanelButton() {
    model.value = !model.value
}
</script>

<template>
    <div class="h-full w-20 flex flex-col justify-center items-center">
        <Button variant="ghost" class="w-14 h-14">
            <Archive @click="handleFilePanelButton"/>
        </Button>
        <div class="w-1 h-2"></div>
        <Button variant="ghost" class="w-14 h-14">
            <Settings />
        </Button>
        <div class="w-1 h-2"></div>
        <Button variant="ghost" class="w-14 h-14">
            <CircleHelp />
        </Button>
        <div class="flex flex-grow w-1"></div>
        <logo class="fill-primary w-7" />
        <div class="w-1 h-5"></div>
    </div>
</template>
