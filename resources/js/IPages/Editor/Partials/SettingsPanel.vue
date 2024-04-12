<script setup lang="ts">
import Separator from "../../../Components/ui/separator/Separator.vue";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from '@/Components/ui/switch'

const enableVimMode = defineModel<boolean>('enableVimMode')
const fontFamily = defineModel<string>('fontFamily')
const fontSize = defineModel<string>('fontSize')
</script>

<template>
    <div
        class="shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)] flex h-full flex-grow flex-col rounded-md border mr-[1px]"
    >
        <div class="flex flex-row items-center m-2 h-[35px] p-2">
            <div class="text-md font-bold">Settings</div>
        </div>
        <Separator />
        <div class="flex flex-col p-4 gap-4">
            <div class="flex-row w-full flex items-center space-x-2">
                <Label for="enableVimMode">Enable Vim Mode</Label>
                <div class="flex-grow"></div>
                <Switch id="enableVimMode" :checked="enableVimMode" @update:checked="enableVimMode=!enableVimMode"/>
            </div>
            <div class="grid w-full max-w-sm items-center gap-2">
                <Label for="editorFontFamily">Editor Font Family</Label>
                <Input id="editorFontFamily" type="editorFontFamily" placeholder="Editor Font Family" v-model="fontFamily"/>
            </div>
            <div class="grid w-full max-w-sm items-center gap-2">
                <Label for="editorFontSize">Editor Font Size</Label>
                <Input id="editorFontSize" type="editorFontSize" placeholder="Editor Font Size" v-model="fontSize"/>
            </div>
        </div>
    </div>
</template>
