import { Node } from 'tiptap'
import { toggleWrap, textblockTypeInputRule, setBlockType, toggleBlockType, toggleMark, wrapIn } from 'tiptap-commands'
import * as commands from 'tiptap-commands'
console.log('commands', commands)
import { nodeIsActive } from 'tiptap-utils';

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
console.log(Heading)

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}


export default class AlignText extends Node {
  // align = 'center'

  get name() {
    return 'align_text'
  }

  get schema() {
    return {
      attrs: {
        align: {
          default: 'center'
        }
      },
      // content: 'inline*',
      content: 'block+',
      group: 'block',
      defining: true,
      draggable: false,
      parseDOM: this.options.levels.map(align => {
        return {
          tag: 'div',
          attrs: {
            align: align
          }
        };
      }),
      toDOM: function toDOM(node) {
        return ['div', { class: 'text-xs-' + node.attrs.align }, 0]
      }
    }
  }

  // keys ({ type }) {
  //   return this.options.aligns.reduce(function (items, align) {
  //     return _objectSpread({}, items, _defineProperty({}, "Shift-Ctrl-".concat(align), setBlockType(type, {
  //       align: align
  //     })));
  //   }, {});
  // }

  // inputRules ({ type }) {
  //   return this.options.aligns.map(function (align) {
  //     return textblockTypeInputRule(new RegExp("^(#{1,".concat(align, "})\\s$")), type, function () {
  //       return {
  //         align: align
  //       }
  //     })
  //   })
  // }

  // get schema() {
  //   return {
  //     // content: 'inline*',
  //     content: 'block*',
  //     // content: 'block*',
  //     group: 'block',
  //     defining: false,
  //     draggable: false,
  //     // parseDOM: [
  //     //   { tag: 'div' },
  //     // ],
  //     toDOM: (node) => {
  //       console.log(node.attrs.align)
  //       return ['div', {
  //         class: 'text-xs-' + this.align
  //       }, 0]
  //     }

  //   }
  // }

  get defaultOptions () {
    return {
      aligns: ['left', 'center', 'right'],
      levels: ['left', 'right']
    }
  }
  commands ({ type, nodeType, schema, toggletype }) {
    console.log('type', type)



    // return (attrs) => toggleBlockType(type, schema.nodes.paragraph, attrs)
    // return () => toggleWrap(type)
    // return attrs => toggleBlockType(type, schema.nodes.paragraph, attrs)
    // return (attrs) => {
    //   return function (state, dispatch, view) {
    //     var isActive = nodeIsActive(state, type, attrs);
    //     console.log('isActive', isActive)

    //     if (isActive) {
    //       return setBlockType(toggletype)(state, dispatch, view);
    //     }

    //     return setBlockType(type, attrs)(state, dispatch, view);
    //   };
    // }

    // return (attrs) => toggleBlockType(type, schema.nodes.paragraph, attrs)
    // console.log('schema', schema)
    // return commands.setBlockType(type)
    return (attrs) => (state, dispatch, view) => {


    var ref = state.selection;
    var from = ref.from;
    var to = ref.to;
    var applicable = false;
    state.doc.nodesBetween(from, to, function (node, pos) {
      if (applicable) { return false }
      if (!node.isTextblock || node.hasMarkup(nodeType, attrs)) { return }
      if (node.type == nodeType) {
        applicable = true;
      } else {
        var $pos = state.doc.resolve(pos), index = $pos.index();
        applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType);
      }
    });
    if (!applicable) { return false }
    if (dispatch) { dispatch(state.tr.setBlockType(from, to, nodeType, attrs).scrollIntoView()); }
    return true
    
        var isActive = nodeIsActive(state, type, attrs);
        console.log('isActive', isActive)

        if (isActive) {
          return toggleWrap(toggletype)(state, dispatch, view);
        }

        return toggleWrap(type, attrs)(state, dispatch, view);

    return setBlockType(type)(state, dispatch, view);

      var isActive = nodeIsActive(state, type, attrs);

        // return setBlockType(toggletype)(state, dispatch, view);
      if (isActive) {
      }

      return setBlockType(type, attrs)(state, dispatch, view);

      var ref = state.selection;
      var from = ref.from;
      var to = ref.to;
      var applicable = false;
      console.log('ref', ref)
      console.log('from', from)
      console.log('to', to)
      state.doc.nodesBetween(from, to, function (node, pos) {
        if (applicable) { return false }
        if (!node.isTextblock || node.hasMarkup(nodeType, attrs)) { return }
        if (node.type == nodeType) {
          applicable = true;
        } else {
          var $pos = state.doc.resolve(pos), index = $pos.index();
          applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType);
        }
      });
      if (!applicable) { return false }
      if (dispatch) { dispatch(state.tr.setBlockType(from, to, nodeType, attrs).scrollIntoView()); }
      return true

    }
  }
  // commands ({ type, schema }) {
  //   return function (attrs) {
  //     // return commands.splitBlockKeepMarks(type)
  //     // return commands.splitBlockKeepMarks(state, dispatch)
  //     // return commands.setBlockType(type)
  //     return toggleBlockType(type, schema.nodes.paragraph, attrs)
  //   }
  // }


  // commands({ type, schema }) {
  //   return () => toggleWrap(type)
  // }
}


// class AlignTextLeft extends AlignTextBase {
//   align = 'left'
// }

// class AlignTextCenter extends AlignTextBase {
//   align = 'center'
// }

// class AlignTextRight extends AlignTextBase {
//   align = 'right'
// }

// export {
//   AlignTextLeft,
//   AlignTextCenter,
//   AlignTextRight
// }
