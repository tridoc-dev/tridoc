<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRoot } from "radix-vue";
import { Loader2 } from 'lucide-vue-next'
import { Icon } from "@iconify/vue";
import CodeMirrorEditor from "./CodeMirrorEditor.vue";

const toggleGroupItemClasses =
    "hover:bg-secondary text-primary flex h-[35px] w-[35px] items-center justify-center bg-card text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none border";

const toggleGroupErrorItemClasses =
    "hover:bg-red-500 hover:text-secondary text-red-700 flex h-[35px] w-[35px] items-center justify-center bg-red-100 text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none border border-red-700";

const toggleGroupGoodItemClasses =
    "hover:bg-green-500 hover:text-secondary text-green-700 flex h-[35px] w-[35px] items-center justify-center bg-green-100 text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none border border-green-700";

const toggleGroupWarningItemClasses =
    "hover:bg-yellow-500 hover:text-secondary hover:text-secondary text-yellow-700 flex h-[35px] w-[35px] items-center justify-center bg-yellow-100 text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none border border-yellow-700";

const toggleGroupRootClasses = "flex";

const state: string = 'good'

// v-model pass to codemirror
const enableVimMode = defineModel('enableVimMode')
const fontFamily = defineModel('fontFamily')
const fontSize = defineModel('fontSize')
</script>

<template>
    <div class="w-full h-full flex flex-col">
        <div class="flex flex-row">
            <div class="w-fit">
                <ToggleGroupRoot type="multiple" :class="toggleGroupRootClasses">
                    <ToggleGroupItem value="left" :class="toggleGroupItemClasses" @click="console.log(enableVimMode)">
                        <Icon icon="lucide:undo" class="w-4 h-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="center" :class="toggleGroupItemClasses">
                        <Icon icon="lucide:redo" class="w-4 h-4" />
                    </ToggleGroupItem>
                </ToggleGroupRoot>
            </div>
            <div class="w-fit ml-4">
                <ToggleGroupRoot type="multiple" :class="toggleGroupRootClasses">
                    <ToggleGroupItem value="bold" :class="toggleGroupItemClasses">
                        <Icon icon="radix-icons:font-bold" class="w-4 h-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" :class="toggleGroupItemClasses">
                        <Icon icon="radix-icons:font-italic" class="w-4 h-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="strikethrough" :class="toggleGroupItemClasses">
                        <Icon icon="radix-icons:strikethrough" class="w-4 h-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="strikethrough" :class="toggleGroupItemClasses">
                        <Icon icon="radix-icons:list-bullet" class="w-4 h-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="strikethrough" :class="toggleGroupItemClasses">
                        <Icon icon="radix-icons:image" class="w-4 h-4" />
                    </ToggleGroupItem>
                </ToggleGroupRoot>
            </div>
            <div class="flex flex-grow"></div>
            <div class="w-fit">
                <ToggleGroupRoot :class="toggleGroupRootClasses">
                    <ToggleGroupItem v-if="state == 'error'" value="left" :class="toggleGroupErrorItemClasses">
                        <Icon icon="lucide:x" class="w-4 h-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem v-if="state == 'good'" value="left" :class="toggleGroupGoodItemClasses">
                        <Icon icon="lucide:check" class="w-4 h-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem v-if="state == 'warning'" value="left" :class="toggleGroupWarningItemClasses">
                        <Icon icon="lucide:triangle-alert" class="w-4 h-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem v-if="state == 'loading'" value="left" :class="toggleGroupItemClasses">
                        <Loader2 class="w-4 h-4 animate-spin" />
                    </ToggleGroupItem>
                </ToggleGroupRoot>
            </div>
        </div>
        <div class="flex flex-grow w-full mt-2 drop-shadow-[0_0px_5px_rgba(0,0,0,0.1)] h-0">
            <div
                class="w-full h-full border bg-background rounded-t-md flex items-center justify-center overflow-hidden">
                <div class="w-full h-full root-wrapper">
                    <CodeMirrorEditor :enableVimMode="enableVimMode" :fontSize="fontSize"
                        :fontFamily="fontFamily" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.root-wrapper {
    display: flex;
    flex-direction: row;

    .cm-editor {
        width: 0;
        flex-grow: 1;
    }
}
</style>
