import { Node, Plugin } from 'tiptap'
import { liftListItem } from 'tiptap-commands'
import { mapState, mapMutations } from 'vuex'
import { GridItemSplitListItem } from './helpers.js'

export default class GridItem extends Node {

  get name() {
    return 'grid_item'
  }

  get view () {
    return {
      props: ['node', 'updateAttrs', 'editable'],
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
          'formInputModels',
          'targetNodeId',
          'nodeStyle',
        ]),
        styles () {
          let styles = this.node.attrs.styles
          return [
            styles.paddingSize && styles.paddingDirection ? `p${styles.paddingDirection}-${styles.paddingSize}` : null,
            styles.marginDirection && styles.marginSize ? `m${styles.marginDirection}-${styles.marginSize}` : null,
          ].filter(val => val)
        },
        isTargetNode () {
          return this.id === this.targetNodeId
        },
        hasFormInput () {
          return this.node.attrs.hasFormInput
        },
        id () {
          return this.node.attrs.id
        },
        inputValue: {
          get() {
            return this.node.attrs.inputValue
          },
          set(inputValue) {
            this.updateAttrs({
              inputValue
            })
          }
        }
      },
      template: `
        <div class="grid-item">
          <span class="line-controller" :draggable="false" contenteditable="false" @click="onOpenNodeMenuOptions"></span>
          <div :class="styles">
            <template v-if="hasFormInput">
              <v-text-field v-model="inputValue" label="placeholder" required disabled></v-text-field>
            </template>
            <template v-else>
              <div ref="content" :contenteditable="editable.toString()"></div>
            </template>
          </div>
        </div>`.replace(/\s\s+/g, ''),
        mounted () {
          if (!this.node.attrs.id) {
            setTimeout(() => {
              this.updateAttrs({
                id: Math.random().toString(36).substr(2)
              }, 500)
            })
          }
        }
    }
  }

  get schema () {
    return {
      attrs: {
        id: {
          default: null
        },
        styles: {
          default: {}
        },
        hasFormInput: {
          default: false
        },
        inputValue: {
          default: null
        }
      },
      draggable: true,
      content: 'block*',
      toDOM: (node) => {
        return ['div', {
          'data-type': this.name,
          inputValue: node.attrs.inputValue
        }, 0];
      }
    }
  }

  keys({ type }) {
    return {
      Enter: GridItemSplitListItem(type),
      'Shift-Tab': liftListItem(type)
    }
  }
}
