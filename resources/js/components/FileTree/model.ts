export interface FileTreeItem {
    isFolder: boolean,
    name: string,
    content?: FileTreeItem[],
}