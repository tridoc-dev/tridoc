export interface FileTreeItem {
  isFolder: boolean;
  name: string;
  path: string;
  content?: FileTreeItem[];
}
