<script setup lang="ts">
import type { VariantProps } from "class-variance-authority";
import { type HTMLAttributes, computed, inject } from "vue";
import {
  ToggleGroupItem,
  type ToggleGroupItemProps,
  useForwardProps,
} from "radix-vue";
import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

type ToggleGroupVariants = VariantProps<typeof toggleVariants>;

const props = defineProps<
  ToggleGroupItemProps & {
    class?: HTMLAttributes["class"];
    variant?: ToggleGroupVariants["variant"];
    size?: ToggleGroupVariants["size"];
  }
>();

const context = inject<ToggleGroupVariants>("toggleGroup");

const delegatedProps = computed(() => {
  const { class: _, variant, size, ...delegated } = props;
  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ToggleGroupItem
    v-bind="forwardedProps"
    :class="
      cn(
        'hover:bg-secondary text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary flex h-[35px] w-[35px] items-center justify-center bg-card text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none border',
        props.class
      )
    "
  >
    <slot />
  </ToggleGroupItem>
</template>
