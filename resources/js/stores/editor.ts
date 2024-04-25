import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from "@/api";

export const useEditorStore = defineStore("editor", () => {
  const settingEnableVimMode = ref(Boolean(false));
  function settingSwitchVimMode() {
    settingEnableVimMode.value = !settingEnableVimMode.value;
  }

  const settingEditorFontFamily = ref("");
  const settingEditorFontSize = ref("");

  const currentOpenFile = ref("");

  const previewPdfScale = ref(1);

  const processingSendDocumentContent = ref(false);
  function sendDocumentContent(content: string, projectId: string) {
    if (processingSendDocumentContent.value) {
      return;
    } else {
      processingSendDocumentContent.value = true;
      api
        .post("/editor/update/" + projectId, { content })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return {
    settingEnableVimMode,
    settingSwitchVimMode,
    settingEditorFontFamily,
    settingEditorFontSize,
    currentOpenFile,
    previewPdfScale,
    sendDocumentContent,
  };
});
