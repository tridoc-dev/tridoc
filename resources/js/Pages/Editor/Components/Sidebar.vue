<script setup lang="ts">
import { Archive, Settings, CircleHelp } from "lucide-vue-next";
import { Button } from '@/Components/ui/button'
import logo from "@/Components/logo/logo.vue";

const model = defineModel()
</script>

<template>
    <div class="h-full flex flex-col justify-center items-center">
        <div class="space-y-4 flex flex-col items-center">
            <Button variant="ghost" class="w-14 h-14" @click="model = !model">
                <Archive />
            </Button>
            <Button variant="ghost" class="w-14 h-14">
                <Settings />
            </Button>
            <Button variant="ghost" class="w-14 h-14">
                <CircleHelp />
            </Button>
        </div>
        <div class="flex-grow"></div>
        <logo class="fill-primary w-7 mb-5" />
    </div>
</template>
