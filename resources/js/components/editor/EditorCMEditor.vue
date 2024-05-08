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
import { useEditorStore } from "../../stores/editor";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const store = useEditorStore();
const { code } = storeToRefs(store);
const completions = completeFromList(texSnippets);
const extensions = ref([] as any);
const view = shallowRef();
const handleReady = (payload: { view: any }) => {
  view.value = payload.view;
};

const route = useRoute();

async function saveCallback() {
  store.compileLatexStatus = "compiling";
  await store.sendDocumentContent(route.params.id.toString());
  await store.compileLatex(route.params.id.toString());
  return true;
}

Vim.defineEx("write", "w", function (_view: { cm6: any }) {
  saveCallback();
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
    autocompletion({ override: [completions] }),
    // yCollab(ytext),
  ];

  const nonVimExt = [
    ...baseExt,
    keymap.of([
      {
        key: "Ctrl-s",
        run(_view) {
          saveCallback();
          return true;
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
