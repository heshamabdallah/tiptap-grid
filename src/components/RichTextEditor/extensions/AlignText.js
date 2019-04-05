import { Node } from 'tiptap'
import { wrappingInputRule, toggleWrap } from 'tiptap-commands'

class AlignTextBase extends Node {

  get align () {
    return 'left'
  }

  get name() {
    return `align_text_${this.align}`
  }

  get schema() {
    return {
      content: 'block*',
      group: 'block',
      defining: true,
      draggable: false,
      // define how the editor will detect your node from pasted HTML
      parseDOM: [
        { tag: 'div' },
      ],
      // this is how this node will be rendered
      // the '0' stands for its text content inside
      toDOM: (node) => ['div', { class: `text-xs-${this.align}` }, 0]
    }
  }

  // this command will be called from menus to add align text
  // `type` is the prosemirror schema object for this align text
  commands({ type }) {
    return (attrs) => toggleWrap(type)
  }
}

class AlignTextCenter extends AlignTextBase {
  get align () {
    return 'center'
  }
}

class AlignTextRight extends AlignTextBase {
  get align () {
    return 'right'
  }
}

class AlignTextJustify extends AlignTextBase {
  get align () {
    return 'justify'
  }
}

export { AlignTextBase as AlignTextLeft, AlignTextCenter, AlignTextRight, AlignTextJustify }
