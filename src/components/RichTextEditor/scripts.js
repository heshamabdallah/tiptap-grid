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

let __setContentTimeOut = null
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
      breakingIndexes: [],
      editor: new Editor({
        extensions: [
          new AlignTextLeft(),
          new AlignTextCenter(),
          new AlignTextRight(),
          new AlignTextJustify(),
          new GridContainer(),
          new GridItem(),
          new GridPage(),
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
            clearTimeout(__setContentTimeOut)
            __setContentTimeOut = setTimeout(() => {
              this.handlePdfPages(json)
            }, 300)
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
              if (!e.shiftKey && !e.ctrlKey && !e.altKey && e.keyCode === 13) {
                // enter has been hitted!
              }
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
    getBreakingData () {
      let container = this.editor.view.dom, height = 0, lastIndex = 0
      let gridItems = Array.from(container.querySelectorAll('[data-type="grid_item"]'))
      return gridItems.reduce((indexes, item, index) => {
        height += item.offsetHeight
        if (height > 842 || (gridItems.length - 1 === index)) {
          indexes.push({start: lastIndex, end: index, height: height})
          lastIndex = index + 1
          height = 0
        }
        return indexes
      }, [])
    },
    handlePdfPages (json) {
      let breakingIndexes = this.getBreakingData()
      let emptyBreakingIndexes = (!this.breakingIndexes.length && breakingIndexes.length > 1)
      let newPageAdded = (this.breakingIndexes.length && this.breakingIndexes.length !== breakingIndexes.length)
      let pagesHeightChanged = (this.breakingIndexes.length && this.breakingIndexes.map(row => row.height).join() !== breakingIndexes.map(row => row.height).join())
      if (emptyBreakingIndexes || newPageAdded) {
        // A4 size: 595 pixels x 842 pixels
        let content = json.content.filter(row => row.type === 'grid_container')
          .map(row => row.content).flat()
          .filter(row => row.type === 'grid_page')
          .map(row => row.content).flat()
        let data = {
          type: 'doc',
          content: [{
            type: 'grid_container',
            content: breakingIndexes.map(row => {
              return {
                type: 'grid_page',
                content: content.slice(row.start, row.end)
              }
            })
          }]
        }
        let doc = document.documentElement
        let topScroll = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)

        this.editor.setContent(data, false)
        window.scrollTo(0, topScroll + 280)
        this.editor.blur()
        this.breakingIndexes = breakingIndexes
      }
    },
    setContentToDefault (duplicate) {
      // let content = ('{"type":"grid_item","content":[{"type":"paragraph"}]},').repeat(duplicate).slice(0, -1)
      // content = `{"type":"doc","content":[{"type":"grid_container","content":[${content}]}]}`
      // this.editor.setContent(JSON.parse(content))
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
