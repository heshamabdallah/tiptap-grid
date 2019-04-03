import { Node } from 'tiptap'
import { wrappingInputRule, wrapInList } from 'tiptap-commands'

export default class GridContainer extends Node {

  get name() {
    return 'grid_container'
  }

  // the prosemirror schema object
  // take a look at https://prosemirror.net/docs/guide/#schema for a detailed explanation
  get schema() {
    return {
      group: 'block',
      content: 'grid_item+',
      toDOM: () => {
        return ['div', {
          'data-type': this.name,
          class: 'grid-container'
        }, 0];
      },
      parseDOM: [{
        priority: 51,
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
