import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let nodeStyle = {
  paddingDirection: 'a',
  paddingSize: '0',
  marginDirection: 'a',
  marginSize: '0'
}
const store = new Vuex.Store({
  state: {
    nodeHasFormInput: null,
    targetNodeId: null,
    nodeMenu: {
      show: false,
      options: {}
    },
    nodeMenuStyles: {
      show: false,
      options: {}
    },
    nodeStyleDefault: JSON.parse(JSON.stringify(nodeStyle)),
    nodeStyle: nodeStyle,
    formInputModels: {}
  },
  mutations: {
    setNodeMenuModel (state, show) {
      state.nodeMenu.show = show
    },
    setNodeMenuOptions (state, options) {
      state.nodeMenu.options = options
    },
    setNodeMenuStylesModel (state, show) {
      state.nodeMenuStyles.show = show
    },
    setNodeMenuStylesOptions (state, options) {
      state.nodeMenuStyles.options = options
    },
    setNodeStyleKey (state, { key, value }) {
      state.nodeStyle[ key ] = value
    },
    setTargetNodeId (state, id) {
      state.targetNodeId = id
    },
    setNodeHasFormInput (state, node) {
      state.nodeHasFormInput = node
    }
  }
})

export default store
