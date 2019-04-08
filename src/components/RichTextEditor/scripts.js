import { Editor, EditorContent, EditorMenuBar } from 'tiptap'

import {
  Placeholder,
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'

import GridContainer from './extensions/GridContainer.js'
import GridPage from './extensions/GridPage.js'
import GridItem from './extensions/GridItem.js'
import { AlignTextLeft, AlignTextCenter, AlignTextRight, AlignTextJustify } from './extensions/AlignText.js'

import EditorAlignTextControllers from './components/AlignTextControllers'
import EditorStyleMenu from './components/StyleMenu'
import EditorNodeMenu from './components/NodeMenu'

export default {
  components: {
    EditorAlignTextControllers,
    EditorStyleMenu,
    EditorNodeMenu,
    EditorMenuBar,
    EditorContent
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new AlignTextLeft(),
          new AlignTextCenter(),
          new AlignTextRight(),
          new AlignTextJustify(),
          new GridPage(),
          new GridItem(),
          new GridContainer(),
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: '',
        onUpdate: ({ getJSON, getHTML, state, transaction }) => {
          let json = getJSON(), html = getHTML()
          if (String(html).search('data-type="grid_container"') === -1) {
            this.setContentToDefault(1)
          } else if (json.content && json.content.some(row => row.type !== 'grid_container')) {
            // there is empty or foreign types
            this.editor.setContent({
              type: 'doc',
              content: json.content.filter(row => row.type === 'grid_container')
            })
          } else {
            this.handlePdfPages(json)
          }
        },
        onInit: (e) => {
          //
        },
        autoFocus: true,
        useBuiltInExtensions: true,
        editorProps: {
          handleDOMEvents: {
            keyup: (view, e) => {
              //
            }
          },
          handleClick: (view, pos, e) => {
            // Called when the editor is clicked
          },
          handleClickOn: (view, pos, node, nodePos, e, direct) => {
            // Called for each node around a click
          },
          handleDoubleClickOn: (view, pos, event) => {
            // console.log('handleDoubleClickOn')
          },
          handleKeyPress (view, pos, event) {
            // console.log('handleKeyPress')
          },
          handleKeyDown (view, pos, event) {
            // console.log('handleKeyDown')
          }
        }
      }),
    }
  },
  methods: {
    handlePdfPages (json) {
      // A4 size: 595 pixels x 842 pixels
      let content = json.content.filter(row => row.type === 'grid_container')
        .map(row => row.content).flat()
        .filter(row => row.type === 'grid_page')
        .map(row => row.content).flat()
        // .slice()

      let container = this.editor.view.dom
      if (container) {
        let height = 0
        let breakingIndexes = Array.from(container.querySelectorAll('[data-type="grid_item"]')).reduce((indexes, item, index) => {
          height += item.offsetHeight
          if (height > 842) {
            height = 0
            indexes.push(index)
          }
          return indexes
        }, [])

        if (breakingIndexes.length) {
          breakingIndexes.push(content.length)
          let prevBreakingIndexIndex = 0
          let data = {
            type: 'doc',
            content: [{
              type: 'grid_container',
              content: breakingIndexes.map((breakingIndex, index, self) => {
                prevBreakingIndexIndex = self[index - 1]
                return {
                  type: 'grid_page',
                  content: content.splice(0, (!prevBreakingIndexIndex ? breakingIndex : (breakingIndex - prevBreakingIndexIndex)))
                }
              })
            }]
          }
          // console.log('data', data)
          this.editor.setContent(data)
          // console.log('editor', this.editor)
          // console.log('editor', this.editor.state.selection)
          // this.editor.focus()
        }
      }
    },
    setContentToDefault (duplicate) {
      let content = ('{"type":"grid_item","content":[{"type":"paragraph"}]},').repeat(duplicate).slice(0, -1)
      content = `{"type":"doc","content":[{"type":"grid_container","content":[{"type":"grid_page","content":[${content}]}]}]}`
      this.editor.setContent(JSON.parse(content))
    }
  },
  created () {
    setTimeout(() => {
      this.setContentToDefault(10)
    }, 500)
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
