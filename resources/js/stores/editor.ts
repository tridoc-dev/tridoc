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
        .put(`/editor/${projectId}/main.tex`, { content })
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

  function updateFilePanelFileList(projectId: string) {
    api.get(`/editor/${projectId}`).then((response) => {
        console.log(response);
    })

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
    if (path.endsWith("testfile")) {
      return "this ends with testfile";
    }
    return null;
  }

  function filePanelHandleRenameFile(
    path: string,
    newName: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (currentOpenFile.value == path) {
          currentOpenFile.value = "";
        }
        console.log(`rename file: ${path} to ${newName}`);
        resolve();
      }, 1000);
    });
  }

  function filePanelHandleDeleteFile(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (currentOpenFile.value == path) {
          currentOpenFile.value = "";
        }
        console.log(`delete file: ${path}`);
        resolve();
      }, 1000);
    });
  }

  function filePanelHandleNewFileFolder(
    path: string,
    newFileName: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        console.log(`new file in ${path}: ${newFileName}`);
        resolve();
      }, 1000);
    });
  }

  function filePanelHandleNewFolderFolder(
    path: string,
    newFolderName: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        console.log(`new folder in ${path}: ${newFolderName}`);
        resolve();
      }, 1000);
    });
  }

  function filePanelHandleUploadFolder(
    path: string,
    files: File[]
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        console.log(`upload files in ${path}: ${files}`);
        resolve();
      }, 1000);
    });
  }

  function filePanelHandleRenameFolder(
    path: string,
    newName: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        console.log(`rename folder: ${path} to ${newName}`);
        resolve();
      }, 1000);
    });
  }

  function filePanelHandleDeleteFolder(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        console.log(`delete folder: ${path}`);
        resolve();
      }, 1000);
    });
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
    filePanelHandleRenameFile,
    filePanelHandleDeleteFile,
    filePanelHandleNewFileFolder,
    filePanelHandleNewFolderFolder,
    filePanelHandleUploadFolder,
    filePanelHandleRenameFolder,
    filePanelHandleDeleteFolder,
  };
});
