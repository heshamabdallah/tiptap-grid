import { Node, Plugin } from 'tiptap'
import { wrappingInputRule } from 'tiptap-commands'

export default class GridPage extends Node {

  get name() {
    return 'grid_page'
  }

  get schema() {
    return {
      group: 'block',
      content: 'grid_item+',
      toDOM: () => {
        return ['div', {
          'data-type': this.name,
          class: 'grid-page row wrap layout'
        }, 0];
      },
      parseDOM: [{
        tag: "[data-type=\"".concat(this.name, "\"]")
      }]
    }
  }
  
  inputRules({ type }) {
    return [
      wrappingInputRule(/^\s*(\[ \])\s$/, type),
    ]
  }
}
