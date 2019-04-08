import { Node } from 'tiptap'
import { wrappingInputRule, wrapInList } from 'tiptap-commands'

export default class GridContainer extends Node {

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

  commands({ type, schema }) {
    return () => wrapInList(type)
  }

  inputRules({ type }) {
    return [
      wrappingInputRule(/^\s*(\[ \])\s$/, type),
    ]
  }
}
