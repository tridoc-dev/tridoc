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
  const currentOpenFile = ref("main.tex");

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
          path: currentPath + key + "/",
          content: FileTreeItemParser(req[key], currentPath + key + "/"),
        });
      }
    }
    return result;
  }

  async function updateFilePanelFileList(projectId: string) {
    return api.get(`/editor/${projectId}`).then((response) => {
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

  async function filePanelHandleRenameFile(
    projectId: string,
    path: string,
    newName: string
  ) {
    // get path before /
    const pathArray = path.split("/");
    pathArray.pop();
    const mainPath = pathArray.join("/");
    return api
      .patch(`/editor/${projectId}/${path}`, {
        newFilename: mainPath + "/" + newName,
      })
      .then(async (response) => {
        const result = await updateFilePanelFileList(projectId);
      });
  }

  async function filePanelHandleDeleteFile(projectId: string, path: string) {
    return api.delete(`/editor/${projectId}/${path}`).then(async (response) => {
      const result = await updateFilePanelFileList(projectId);
    });
  }

  async function filePanelHandleNewFileFolder(
    projectId: string,
    path: string,
    newFileName: string
  ) {
    return api
      .put(`/editor/${projectId}/${path}/${newFileName}`, {
        content: "",
      })
      .then(async (response) => {
        const result = await updateFilePanelFileList(projectId);
      });
  }

  function filePanelHandleNewFolderFolder(
    projectId: string,
    path: string,
    newFolderName: string
  ) {
    return api
      .put(`/editor/${projectId}/${path}/${newFolderName}`, {
        directory: true,
      })
      .then(async (response) => {
        const result = await updateFilePanelFileList(projectId);
      });
  }

  function filePanelHandleUploadFolder(
    projectId: string,
    path: string,
    files: File[]
  ) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    return api
      .post(`/editor/${projectId}/${path}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (response) => {
        const result = await updateFilePanelFileList(projectId);
      });
  }

  async function filePanelHandleRenameFolder(
    projectId: string,
    path: string,
    newName: string
  ) {
    // get path before /
    const pathArray = path.split("/");
    pathArray.pop();
    pathArray.pop();
    const mainPath = pathArray.join("/");
    return api
      .patch(`/editor/${projectId}/${path}`, {
        newFilename: mainPath + "/" + newName,
      })
      .then(async (response) => {
        const result = await updateFilePanelFileList(projectId);
      });
  }

  async function filePanelHandleDeleteFolder(projectId: string, path: string) {
    return api.delete(`/editor/${projectId}/${path}`).then(async (response) => {
      const result = await updateFilePanelFileList(projectId);
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
