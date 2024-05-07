import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from "@/api";
import { FileTreeItem } from "@/components/editor/file-tree";
import { AxiosResponse } from "axios";

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

  function FileTreeItemParser(req: any, currentPath: string) {
    const result: FileTreeItem[] = [];
    for (const key in req) {
      if (key === ".") {
        req["."].forEach((element: string) => {
          result.push({
            isFolder: false,
            name: element,
            path: currentPath + element,
          });
        });
      } else {
        result.push({
          isFolder: true,
          name: key,
          path: key,
          content: FileTreeItemParser(req[key], currentPath + key + "/"),
        });
      }
    }
    return result;
  }

  function updateFilePanelFileList(projectId: string) {
    api.get(`/editor/${projectId}`).then((response) => {
      console.log(response);
      filePanelFileList.value = FileTreeItemParser(response.data.data, "");
    });
  }

  function initFilePanelOpenState(path: string) {
    if (filePanelOpenState.value[path] === undefined)
      filePanelOpenState.value[path] = false;
  }

  async function getFileContent(projectId: string, path: string | null) {
    var content = "";
    await api.get(`/editor/${projectId}/${path}`).then((response) => {
      content = response.data.toString();
      console.log(`CONTENT: ${response}`);
    });
    return content;
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
