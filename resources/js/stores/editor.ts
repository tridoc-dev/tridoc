import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from "@/api";
import { FileTreeItem } from "@/components/editor/file-tree";

export const useEditorStore = defineStore("editor", () => {
  const settingEnableVimMode = ref(Boolean(false));
  function settingSwitchVimMode() {
    settingEnableVimMode.value = !settingEnableVimMode.value;
  }

  const settingEditorFontFamily = ref("");
  const settingEditorFontSize = ref("");

  const currentOpenFile = ref("");

  const previewPdfScale = ref(1);
  const previewPdfUrl = ref("/test.pdf");

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

  const filePanelFileList = ref<FileTreeItem[]>([]);
  const filePanelOpenState = ref<{ [key: string]: boolean }>({});

  function updateFilePanelFileList() {
    filePanelFileList.value = [
      {
        isFolder: false,
        name: "testfile",
        path: "/testfile",
      },
      {
        isFolder: true,
        name: "test1",
        path: "/test1",
        content: [
          {
            isFolder: true,
            name: "test3",
            path: "/test1/test3",
            content: [
              { isFolder: false, name: "test4", path: "/test1/test3/test4" },
            ],
          },
          {
            isFolder: true,
            name: "test2",
            path: "/test1/test2",
            content: [
              { isFolder: false, name: "test4", path: "/test1/test2/test4" },
            ],
          },
          { isFolder: false, name: "test2", path: "/test1/test2" },
        ],
      },
    ];
  }
  function updateFilePanelFileList2() {
    filePanelFileList.value = [
      {
        isFolder: false,
        name: "testfile",
        path: "/testfile",
      },
      {
        isFolder: true,
        name: "test1",
        path: "/test1",
        content: [
          {
            isFolder: true,
            name: "test2",
            path: "/test1/test2",
            content: [
              { isFolder: false, name: "test4", path: "/test1/test2/test4" },
            ],
          },
          { isFolder: false, name: "test2", path: "/test1/test2" },
        ],
      },
    ];
  }
  function initFilePanelOpenState(path: string) {
    if (filePanelOpenState.value[path] === undefined)
      filePanelOpenState.value[path] = false;
  }

  function getFileContent(path: string | null) {
    if (path == null) {
      return null;
    }
    if (path.endsWith("4")) {
      return "this ends with 4";
    }
    if (path.endsWith("2")) {
      return "this ends with 2";
    }
    return null;
  }

  return {
    settingEnableVimMode,
    settingSwitchVimMode,
    settingEditorFontFamily,
    settingEditorFontSize,
    currentOpenFile,
    previewPdfScale,
    previewPdfUrl,
    sendDocumentContent,
    filePanelFileList,
    filePanelOpenState,
    updateFilePanelFileList,
    initFilePanelOpenState,
    updateFilePanelFileList2,
    getFileContent,
  };
});
