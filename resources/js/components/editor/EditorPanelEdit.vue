<script setup lang="ts">
import { ToggleGroupItem, ToggleGroup } from "@/components/ui/toggle-group";
import { Loader2 } from "lucide-vue-next";
import { Icon } from "@iconify/vue";
import CodeMirrorEditor from "./EditorCMEditor.vue";
import { inject } from "vue";
import { EditorView } from "codemirror";

import { ref, onMounted } from "vue";
import getView from "./EditorCMEditor.vue";
import { Codemirror } from "vue-codemirror";
const state: string = "good";

import { useEditorStore } from "@/stores/editor";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";

const store = useEditorStore();
const route = useRoute();

const codeContent = ref("");
watchEffect(() => {
  console.log(store.currentOpenFile);

  store
    .getFileContent(route.params.id.toString(), store.currentOpenFile)
    .then((res) => {
      console.log(codeContent.value);
      codeContent.value = res;
    });
});

const codeMirrorEditorRef = ref();

function wrapSelectedTextWithItemize() {
  const view = codeMirrorEditorRef.value.getView();
  if (!view) {
    console.warn("null view");
  }
  const selection = view.state.selection.main;
  const { from, to } = selection;
  const selectedText = view.state.doc.sliceString(from, to);
  const isAlreadyItemize =
    selectedText.startsWith("\\begin{itemize}") &&
    selectedText.endsWith("\\end{itemize}");
  let newText: string;
  if (isAlreadyItemize) {
    const items = selectedText
      .slice(15, -13)
      .split("\n")
      .map((item: string) => item.replace(/^\\item\[\*\]\s*/, ""));
    newText = items.join("");
  } else {
    const words = selectedText.split(" ");
    const items = words.map((word: string) => `\\item[*] ${word}`);
    newText = `\\begin{itemize}\n${items.join("\n")}\n\\end{itemize}`;
  }
  const tr = view.state.update({
    changes: {
      from: from,
      to: to,
      insert: newText,
    },
  });
  view.dispatch(tr);
}

function wrapSelectedTextWithBold() {
  const view = codeMirrorEditorRef.value.getView();
  if (!view) {
    console.warn("null view");
  }
  const selection = view.state.selection.main;
  const { from, to } = selection;
  const selectedText = view.state.doc.sliceString(from, to);

  const isAlreadyBold =
    selectedText.startsWith("\\textbf{") && selectedText.endsWith("}");

  let newText: string;
  if (isAlreadyBold) {
    newText = selectedText.slice(8, -1);
  } else {
    newText = "\\textbf{" + selectedText + "}";
  }

  const tr = view.state.update({
    changes: {
      from: from,
      to: to,
      insert: newText,
    },
  });

  view.dispatch(tr);
}

function wrapSelectedTextWithItalic() {
  const view = codeMirrorEditorRef.value.getView();
  if (!view) {
    console.warn("CodeMirror view is not available.");
    return;
  }

  const { from, to } = view.state.selection.main;
  if (from === to) {
    console.log("No text selected.");
    return;
  }

  const selectedText = view.state.doc.sliceString(from, to);
  const isAlreadyItalic =
    selectedText.startsWith("\\textit{") && selectedText.endsWith("}");

  let newText: string;
  if (isAlreadyItalic) {
    const contentInside = selectedText.slice(7, -1);
    if (contentInside.startsWith("{")) {
      newText = contentInside.substring(1);
    } else {
      newText = contentInside;
    }
  } else {
    newText = `\\textit{${selectedText}}`;
  }

  const tr = view.state.update({
    changes: { from, to, insert: newText },
  });

  view.dispatch(tr);
}

function insertImageCommand() {
  const view = codeMirrorEditorRef.value.getView();
  const selection = view.state.selection.main;
  const { from, to } = selection;
  const imagePath = "example-image.png";
  const imgPattern = /\\begin{figure}.*?\\includegraphics.*?\\end{figure}/gs;
  const selectedText = view.state.doc.sliceString(from, to);
  const isExistingImageCmd = imgPattern.test(selectedText.trim());

  let newText = `\\begin{figure}[h!]\n\\centering\n\\includegraphics[width=0.8\\textwidth]{${imagePath}}\n\\caption{Caption Here}\n\\label{fig:myFigure}\n\\end{figure}`;

  if (isExistingImageCmd) {
    newText = "";
  }

  const tr = view.state.update({
    changes: {
      from,
      to,
      insert: newText,
    },
  });
  view.dispatch(tr);
}

function wrapSelectedTextWithStrikethrough() {
  const view = codeMirrorEditorRef.value.getView();
  if (!view) {
    console.warn("CodeMirror view is not available.");
    return;
  }

  const { from, to } = view.state.selection.main;
  if (from === to) {
    console.log("No text selected.");
    return;
  }

  const selectedText = view.state.doc.sliceString(from, to);
  const isAlreadyStrikethrough =
    selectedText.startsWith("\\sout{") && selectedText.endsWith("}");

  let newText = isAlreadyStrikethrough
    ? selectedText.slice(6, -1)
    : `\\sout{${selectedText}}`;

  const tr = view.state.update({
    changes: { from, to, insert: newText },
  });

  view.dispatch(tr);
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex flex-row">
      <div class="w-fit">
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="left">
            <Icon icon="lucide:undo" class="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <Icon icon="lucide:redo" class="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div class="w-fit ml-4">
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="bold" @click="wrapSelectedTextWithBold()">
            <Icon icon="radix-icons:font-bold" class="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" @click="wrapSelectedTextWithItalic()">
            <Icon icon="radix-icons:font-italic" class="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strikethrough"
            @click="wrapSelectedTextWithStrikethrough()"
          >
            <Icon icon="radix-icons:strikethrough" class="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strikethrough"
            @click="wrapSelectedTextWithItemize()"
          >
            <Icon icon="radix-icons:list-bullet" class="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="strikethrough" @click="insertImageCommand()">
            <Icon icon="radix-icons:image" class="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div class="flex flex-grow"></div>
      <div class="w-fit">
        <ToggleGroup>
          <ToggleGroupItem value="left">
            <div v-if="state == 'error'">
              <Icon icon="lucide:x" class="w-4 h-4" />
            </div>
            <div v-if="state == 'good'">
              <Icon icon="lucide:check" class="w-4 h-4" />
            </div>
            <div v-if="state == 'warning'">
              <Icon icon="lucide:triangle-alert" class="w-4 h-4" />
            </div>
            <div v-if="state == 'loading'">
              <Loader2 class="w-4 h-4 animate-spin" />
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
    <div
      class="flex flex-grow w-full mt-2 drop-shadow-[0_0px_5px_rgba(0,0,0,0.1)] h-0"
    >
      <div
        class="w-full h-full border bg-background rounded-t-md flex items-center justify-center overflow-hidden"
      >
        <div class="w-full h-full root-wrapper">
          <CodeMirrorEditor ref="codeMirrorEditorRef" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.root-wrapper {
  display: flex;
  flex-direction: row;

  .cm-editor {
    width: 0;
    flex-grow: 1;
  }
}
</style>
