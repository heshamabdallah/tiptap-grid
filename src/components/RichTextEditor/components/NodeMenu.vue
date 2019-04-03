<template>
  <v-menu v-model="nodeMenu.show" v-bind="bindOptions">
    <v-list>
      <v-list-tile @click="openStyleMenu">
        <v-list-tile-title>Styles</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="addInput">
        <v-list-tile-title>Add Form Input</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['setNodeMenuStylesModel', 'setNodeHasFormInput']),
    openStyleMenu () {
      this.setNodeMenuStylesModel(true)
    },
    addInput () {
      this.setNodeHasFormInput(this.targetNodeId)
    }
  },
  computed: {
    ...mapState(['nodeMenu', 'targetNodeId']),
    bindOptions () {
      return {
        ...this.nodeMenu.options,
        transition: 'slide-y-transition',
        minWidth: '200px',
        bottom: true
      }
    }
  }
}
</script>
