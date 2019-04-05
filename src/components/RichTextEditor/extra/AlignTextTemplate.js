import { Node, Plugin } from 'tiptap'
import { wrappingInputRule, toggleWrap, splitToDefaultListItem, liftListItem, wrapInList, splitListItem, setBlockType } from 'tiptap-commands'
import { mapState, mapMutations } from 'vuex'
import { markIsActive, getMarkAttrs, nodeIsActive } from 'tiptap-utils';
import store from '@/store'

export default class AlignTextTemplate extends Node {

  get name() {
    return 'align_text_template'
  }

  get view () {
    return {
      props: ['node', 'updateAttrs', 'editable'],
      computed: {
        align () {
          return `text-xs-${this.node.attrs.align}`
        },
      },
      template: `
        <div class="grid-item">
          <div :class="align">
            <div ref="content" :contenteditable="editable.toString()"></div>
          </div>
        </div>`.replace(/\s\s+/g, ''),
        created () {
          this.id = Math.random().toString(36).substr(2)
        }
    }
  }

  get schema () {
    return {
      attrs: {
        align: {
          default: 'left'
        }
      },
      draggable: false,
      content: 'block*',
      toDOM: () => {
        return ['div', {
          'data-type': this.name
        }, 0];
      }
    }
  }

  commands ({ type, nodeType, schema }) {
    console.log('type', type)
    console.log('schema', schema)
    return (attrs) => (state, dispatch, view) => {


      var isActive = nodeIsActive(state, type, attrs);

      if (isActive) {
        return setBlockType(toggletype)(state, dispatch, view);
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
}
