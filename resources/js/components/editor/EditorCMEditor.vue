<script setup lang="ts">
import texSnippets from "@/lib/tex.snippet.json";
import { EditorView } from "codemirror";
import { Codemirror } from "vue-codemirror";
import { Vim, vim } from "@replit/codemirror-vim";
import { stex } from "@codemirror/legacy-modes/mode/stex";
import { autocompletion, completeFromList } from "@codemirror/autocomplete";
import { StreamLanguage } from "@codemirror/language";
import { keymap } from "@codemirror/view";
import { ref, shallowRef, watchEffect } from "vue";
import * as Y from "yjs";
// import { WebsocketProvider } from "y-websocket";
// import { yCollab } from "y-codemirror.next";
import { useEditorStore } from "../../stores/editor";
import { useRoute } from "vue-router";

// const provider = new WebsocketProvider(
//   'ws://localhost:8080',
//   'codemirror-demo',
//   ydoc
// )
const store = useEditorStore();
const completions = completeFromList(texSnippets);
const ydoc = new Y.Doc();
const ytext = ydoc.getText("codemirror-demo");
const code = ytext.toString();
const extensions = ref([] as any);
const view = shallowRef();
const handleReady = (payload: { view: any }) => {
  view.value = payload.view;
};

const route = useRoute();

function saveCallback(view: EditorView) {
  console.log("save");
  // console.log(view.state.doc.toString());

  store.sendDocumentContent(
    view.state.doc.toString(),
    route.params.id.toString()
  );
  return true;
}

Vim.defineEx("write", "w", function (_view: { cm6: any }) {
  saveCallback(_view.cm6);
});

watchEffect(() => {
  const baseExt = [
    StreamLanguage.define(stex),
    EditorView.theme({
      ".cm-scroller": {
        fontSize: store.settingEditorFontSize + "px",
        fontFamily: store.settingEditorFontFamily,
      },
    }),
    // autocompletion({ override: [completions] }),
    // yCollab(ytext),
  ];

  const nonVimExt = [
    ...baseExt,
    keymap.of([
      {
        key: "Ctrl-s",
        run(_view) {
          return saveCallback(_view);
        },
      },
    ]),
  ];

  const vimExt = [...baseExt, vim()];

  extensions.value = store.settingEnableVimMode ? vimExt : nonVimExt;
});
</script>

<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
    @change="console.log('change', $event)"
    @focus="console.log('focus', $event)"
    @blur="console.log('blur', $event)"
  />
</template>
