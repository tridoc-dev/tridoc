import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useEditorStore = defineStore("editor", () => {
  const settingEnableVimMode = ref(Boolean(false));
  function settingSwitchVimMode() {
    settingEnableVimMode.value = !settingEnableVimMode.value;
  }

  const settingEditorFontFamily = ref("");
  const settingEditorFontSize = ref("");

  return {
    settingEnableVimMode,
    settingSwitchVimMode,
    settingEditorFontFamily,
    settingEditorFontSize,
  };
});
