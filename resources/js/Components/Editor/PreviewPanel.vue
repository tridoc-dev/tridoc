<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRoot } from "radix-vue";
import pdfjs from "@/Components/Editor/PdfJs.vue";
import { Icon } from "@iconify/vue";

const toggleGroupItemClasses =
    "hover:bg-secondary text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary flex h-[35px] w-[35px] items-center justify-center bg-card text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none border";

const toggleGroupRootClasses = "flex";

const zoomRatioClasses =
    "hover:bg-secondary text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary flex h-[35px] w-[60px] items-center justify-center bg-card text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none border";
</script>

<template>
    <div class="w-full h-full flex flex-col">
        <div class="flex flex-row">
            <div class="w-fit">
                <ToggleGroupRoot :class="toggleGroupRootClasses">
                    <ToggleGroupItem
                        value="left"
                        :class="toggleGroupItemClasses"
                    >
                        <Icon icon="lucide:minus" class="w-4 h-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="left"
                        :class="zoomRatioClasses"
                    >
                        <div class="text-sm">100%</div>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="center"
                        :class="toggleGroupItemClasses"
                    >
                        <Icon icon="lucide:plus" class="w-4 h-4" />
                    </ToggleGroupItem>
                </ToggleGroupRoot>
            </div>
            <div class="flex flex-grow"></div>
            <div class="w-fit">
                <ToggleGroupRoot :class="toggleGroupRootClasses">
                    <ToggleGroupItem
                        value="left"
                        :class="toggleGroupItemClasses"
                    >
                        <Icon icon="lucide:download" class="w-4 h-4" />
                    </ToggleGroupItem>
                </ToggleGroupRoot>
            </div>
        </div>
        <div class="flex flex-grow w-full mt-2 drop-shadow-[0_0px_5px_rgba(0,0,0,0.1)]">
            <div class="w-full h-full border bg-background rounded-t-md flex items-center justify-center overflow-hidden">
                <pdfjs></pdfjs>
            </div>
        </div>
    </div>
</template>
