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
import GridItem from './extensions/GridItem.js'

import EditorStyleMenu from './components/StyleMenu'
import EditorNodeMenu from './components/NodeMenu'

export default {
  components: {
    EditorStyleMenu,
    EditorNodeMenu,
    EditorMenuBar,
    EditorContent
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
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
        onUpdate: (e) => {
          console.log(JSON.stringify(this.editor.getJSON()))
          //
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
  created () {
    setTimeout(() => {
      this.editor.setContent(JSON.parse('{"type":"doc","content":[{"type":"grid_container","content":[{"type":"grid_item","attrs":{"styles":{"paddingDirection":"a","paddingSize":"0","marginDirection":"a","marginSize":"0","textAlign":"center"},"hasFormInput":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"I\'m styled and aligned to "},{"type":"text","marks":[{"type":"bold"}],"text":"center"},{"type":"text","text":"!"}]}]},{"type":"grid_item","attrs":{"styles":{"paddingDirection":"a","paddingSize":"0","marginDirection":"a","marginSize":"0","textAlign":"right"},"hasFormInput":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"I\'m styled and aligned to "},{"type":"text","marks":[{"type":"bold"}],"text":"right"},{"type":"text","text":"!"}]}]},{"type":"grid_item","attrs":{"styles":{"paddingDirection":"a","paddingSize":"0","marginDirection":"a","marginSize":"0","textAlign":"left"},"hasFormInput":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"I\'m not styled and aligned by default to "},{"type":"text","marks":[{"type":"bold"}],"text":"left"},{"type":"text","text":"!"}]}]},{"type":"grid_item","attrs":{"styles":{"paddingDirection":"x","paddingSize":"4","marginDirection":"a","marginSize":"0","textAlign":"left"},"hasFormInput":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"I\'m text with "},{"type":"text","marks":[{"type":"bold"}],"text":"x padding"},{"type":"text","text":"!"}]}]},{"type":"grid_item","attrs":{"styles":{"paddingDirection":"y","paddingSize":"2","marginDirection":"a","marginSize":"0","textAlign":"left"},"hasFormInput":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"I\'m text with "},{"type":"text","marks":[{"type":"bold"}],"text":"y padding"},{"type":"text","text":"!"}]}]},{"type":"grid_item","attrs":{"styles":{"paddingDirection":"y","paddingSize":"3","marginDirection":"a","marginSize":"0","textAlign":"left"},"hasFormInput":true},"content":[{"type":"paragraph"}]}]}]}'))
    }, 500)
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
