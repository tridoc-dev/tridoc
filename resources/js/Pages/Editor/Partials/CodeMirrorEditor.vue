<template>
  <codemirror v-model="code" placeholder="Code goes here..." :autofocus="true" :indent-with-tab="true" :tab-size="2"
    :extensions="extensions" @ready="handleReady" @change="log('change', $event)" @focus="log('focus', $event)"
    @blur="log('blur', $event)" />
</template>

<script>
import { defineComponent, ref, shallowRef, watchEffect } from "vue";
import { Codemirror } from "vue-codemirror";
import { stex } from "@codemirror/legacy-modes/mode/stex";
import { StreamLanguage } from "@codemirror/language";
import { Vim, vim } from "@replit/codemirror-vim";
import { keymap } from "@codemirror/view";
import { EditorView } from "codemirror";
import { completeFromList, autocompletion } from "@codemirror/autocomplete"
import * as Y from "yjs"
import { WebsocketProvider } from "y-websocket"
import { yCollab } from "y-codemirror.next"
import texSnippets from "@/lib/tex.snippet.json"

// save callback function
function saveCallback(view) {
  console.log('save')
  console.log(view.state.doc.text)
  return true
}

export default defineComponent({
  components: {
    Codemirror,
  },
  props: {
    enableVimMode: Boolean,
    fontFamily: String,
    fontSize: String,
  },
  setup(props) {
    const completions = completeFromList(texSnippets)

    // define yjs
    const ydoc = new Y.Doc()
    // const provider = new WebsocketProvider(
    //   'ws://localhost:8080',
    //   'codemirror-demo',
    //   ydoc
    // )
    const ytext = ydoc.getText('codemirror-demo')
    const code = ytext.toString()

    // define custom theme, font family and size
    const theme = ref()
    watchEffect(() => {
      theme.value = EditorView.theme({
        '.cm-scroller': {
          "fontSize": props.fontSize + "px",
          "fontFamily": props.fontFamily
        }
      })
    })

    // extension
    const extensions = ref([])
    const baseExt = [
      StreamLanguage.define(stex),
      theme.value,
      autocompletion({ override: [completions] }),
      yCollab(ytext),
    ]

    // define non-vim mode extension
    // include custom keybinding
    const extWithoutVim = baseExt.slice(0)
    extWithoutVim.push(
      keymap.of([
        { key: 'Ctrl-s', run(_view) { return saveCallback(_view) } }
      ])
    )

    // define vim mode extension
    // include vim mode keybinding
    Vim.defineEx('write', 'w', function (_view) {
      saveCallback(_view.cm6)
    })
    const extWithVim = baseExt.slice(0)
    extWithVim.push(vim())

    // switch between vim mode and non-vim mode
    watchEffect(() => {
      extensions.value = props.enableVimMode
        ? extWithVim
        : extWithoutVim;
    });

    // Codemirror EditorView instance ref
    const view = shallowRef();
    const handleReady = (payload) => {
      view.value = payload.view;
    };

    return {
      code,
      extensions,
      handleReady,
      log: console.log,
    };
  },
});
</script>
