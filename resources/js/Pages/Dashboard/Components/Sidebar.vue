<script setup lang="ts">
import { Archive, Settings, CircleHelp } from "lucide-vue-next";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import logo from "@/Components/logo/logo.vue";
</script>

<template>
    <div class="h-full flex flex-col justify-center items-center">
        <div class="space-y-4 flex flex-col items-center pt-2">
            <Avatar class="w-12 h-12 mt-2 mb-2">
                <AvatarImage
                    src="https://github.com/radix-vue.png"
                    alt="@radix-vue"
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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
