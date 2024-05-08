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

  const displayOpenFile = ref("");
  const currentOpenFile = ref("");

  const previewPdfScale = ref(1);
  const previewPdfUrl = ref("/main.pdf");

  const sendingDocumentContent = ref(false);
  async function sendDocumentContent(projectId: string) {
    if (sendingDocumentContent.value) {
      return null;
    } else {
      sendingDocumentContent.value = true;
      return api
        .put(`/editor/${projectId}/${currentOpenFile.value}`, {
          content: code.value,
        })
        .then((response) => {
          console.log(response);
          sendingDocumentContent.value = false;
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

  const code = ref("");

  async function getFileContent(projectId: string, path: string) {
    var content = "";
    await api.get(`/editor/${projectId}/${path}`).then((response) => {
      content = response.data.toString();
      code.value = content;
      displayOpenFile.value = path;
    });
    return content;
  }

  async function updateFileContent(projectId: string, path: string) {
    await api.get(`/editor/${projectId}/${path}`).then((response) => {
      code.value = response.data.toString();
      displayOpenFile.value = path;
    });
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

  const compileLatexStatus = ref("finish");

  function compileLatex(projectId: string) {
    compileLatexStatus.value = "compiling";
    api
      .post(`action/${projectId}/latex`, {}, { responseType: "blob" })
      .then((response) => {
        previewPdfUrl.value = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        compileLatexStatus.value = "finish";
      });
  }

  return {
    settingEnableVimMode,
    settingSwitchVimMode,
    settingEditorFontFamily,
    settingEditorFontSize,
    displayOpenFile,
    currentOpenFile,
    previewPdfScale,
    previewPdfUrl,
    sendDocumentContent,
    filePanelFileList,
    filePanelOpenState,
    updateFilePanelFileList,
    initFilePanelOpenState,
    code,
    getFileContent,
    updateFileContent,
    filePanelHandleRenameFile,
    filePanelHandleDeleteFile,
    filePanelHandleNewFileFolder,
    filePanelHandleNewFolderFolder,
    filePanelHandleUploadFolder,
    filePanelHandleRenameFolder,
    filePanelHandleDeleteFolder,
    compileLatexStatus,
    compileLatex,
  };
});
