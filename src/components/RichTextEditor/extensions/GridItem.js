import { Node, Plugin } from 'tiptap'
import { wrappingInputRule, toggleWrap, splitToDefaultListItem, liftListItem, wrapInList, splitListItem, setBlockType } from 'tiptap-commands'
import { mapState, mapMutations } from 'vuex'
import { markIsActive, getMarkAttrs, nodeIsActive } from 'tiptap-utils';
import store from '@/store'

export default class GridItem extends Node {

  get name() {
    return 'grid_item'
  }

  get view () {
    return {
      props: ['node', 'updateAttrs', 'editable'],
      data () {
        return {
          id: '',
          inputModel: null
        }
      },
      methods: {
        ...mapMutations([
          'setNodeMenuStylesOptions',
          'setNodeHasFormInput',
          'setNodeMenuOptions',
          'setNodeMenuModel',
          'setTargetNodeId',
          'setNodeStyleKey'
        ]),
        assignNodeStyleToMenuModels () {
          let styles = this.node.attrs.styles
          if (styles && typeof styles === 'object') {
            Object.keys(this.nodeStyleDefault).forEach(key => {
              let value = styles[key] ? styles[key] : this.nodeStyleDefault[key]
              this.setNodeStyleKey({key, value})
            })
          }
        },
        onOpenNodeMenuOptions (e) {
          this.assignNodeStyleToMenuModels()
          let rect = e.target.getBoundingClientRect()
          this.setTargetNodeId(this.id)
          this.setNodeMenuModel(true)
          let options = {
            positionX: window.scrollX + rect.left,
            positionY: window.scrollY + rect.top + 30
          }
          this.setNodeMenuOptions(options)
          this.setNodeMenuStylesOptions(options)
        },
        updateNodeStyles (styles) {
          if (this.isTargetNode) {
            this.updateAttrs({
              styles: JSON.parse(JSON.stringify(styles))
            })
          }
        },
        updateNodeContent () {
          this.updateAttrs({
            styles: JSON.parse(JSON.stringify(styles))
          })
        }
      },
      watch: {
        nodeStyle: {
          handler (styles) {
            this.updateNodeStyles(styles)
          },
          deep: true
        },
        nodeHasFormInput (id) {
          if (id && id === this.id) {
            this.setNodeHasFormInput(null)
            this.updateAttrs({
              hasFormInput: true
            })
          }
        }
      },
      computed: {
        ...mapState([
          'nodeHasFormInput',
          'nodeStyleDefault',
          'targetNodeId',
          'nodeStyle',
        ]),
        styles () {
          let styles = this.node.attrs.styles
          return [
            `p${styles.paddingDirection}-${styles.paddingSize}`,
            `m${styles.marginDirection}-${styles.marginSize}`,
            `text-xs-${styles.textAlign}`
          ]
        },
        isTargetNode () {
          return this.id === this.targetNodeId
        },
        hasFormInput () {
          return this.node.attrs.hasFormInput
        }
      },
      template: `
        <div class="grid-item">
          <span class="line-controller" :draggable="false" contenteditable="false" @click="onOpenNodeMenuOptions"></span>
          <div :class="styles">
            <template v-if="hasFormInput">
              <v-text-field v-model="inputModel" :counter="10" label="placeholder" required></v-text-field>
            </template>
            <template v-else>
              <div ref="content" :contenteditable="editable.toString()"></div>
            </template>
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
        styles: {
          default: {}
        },
        hasFormInput: {
          default: false
        }
      },
      draggable: true,
      content: 'block*',
      toDOM: () => {
        return ['div', {
          'data-type': this.name
        }, 0];
      }

    }
  }

  keys({ type }) {
    return {
      Enter: splitListItem(type),
      'Shift-Tab': liftListItem(type)
    }
  }
}
