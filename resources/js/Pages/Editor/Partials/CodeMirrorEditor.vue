<template>
    <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '100%' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
      @change="log('change', $event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
    />
  </template>
  
  <script>
    import { defineComponent, ref, shallowRef } from 'vue'
    import { Codemirror } from 'vue-codemirror'
    import { stex } from '@codemirror/legacy-modes/mode/stex'
    import { StreamLanguage } from "@codemirror/language"

    const demoCode = `\\documentclass{article}
\\usepackage{amsmath}% For the equation* environment
\\begin{document}
\\section{First example}

The well-known Pythagorean theorem \\(x^2 + y^2 = z^2\\) was proved to be invalid for other exponents, meaning the next equation has no integer solutions for \\(n>2\\):

\\[ x^n + y^n = z^n \\]

\\section{Second example}

This is a simple math expression \\(\\sqrt{x^2+1}\\) inside text. 
And this is also the same: 
\\begin{math}
\\sqrt{x^2+1}
\\end{math}
but by using another command.

This is a simple math expression without numbering
\\[\\sqrt{x^2+1}\\] 
separated from text.

This is also the same:
\\begin{displaymath}
\\sqrt{x^2+1}
\\end{displaymath}

\\ldots and this:
\\begin{equation*}
\\sqrt{x^2+1}
\\end{equation*}
\\end{document}`

    export default defineComponent({
      components: {
        Codemirror
      },
      setup() {
        const code = ref(`${demoCode}`)
        // const extensions = [javascript(), oneDark]
        const extensions = [ StreamLanguage.define(stex) ]
  
        // Codemirror EditorView instance ref
        const view = shallowRef()
        const handleReady = (payload) => {
          view.value = payload.view
        }
  
        // Status is available at all times via Codemirror EditorView
        const getCodemirrorStates = () => {
          const state = view.value.state
          const ranges = state.selection.ranges
          const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
          const cursor = ranges[0].anchor
          const length = state.doc.length
          const lines = state.doc.lines
          // more state info ...
          // return ...
        }
  
        return {
          code,
          extensions,
          handleReady,
          log: console.log
        }
      }
    })
  </script>