<template>
  <v-menu v-model="nodeMenuStyles.show" v-bind="bindOptions">
    <v-container fluid="fluid" grid-list-lg class="py-3">
      <v-layout row="row" wrap="wrap">
        <v-flex class="d-flex" xs12>
          <v-select class="pr-2" :items="directions" v-model="nodeStyle.paddingDirection">
            <template v-slot:prepend><strong class="mt-2 mr-3">Padding</strong></template>
          </v-select>
          <v-select :items="sizes.slice(1)"  v-model="nodeStyle.paddingSize"></v-select>
        </v-flex>
        <v-flex class="d-flex" xs12>
          <v-select class="pr-2" :items="directions" v-model="nodeStyle.marginDirection">
            <template v-slot:prepend><strong class="mt-2 mr-3">Margin</strong></template>
          </v-select>
          <v-select :items="sizes" v-model="nodeStyle.marginSize"></v-select>
        </v-flex>
      </v-layout>
    </v-container>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    directions: [
      {text: 'All', value: 'a'},
      {text: 'Top', value: 't'},
      {text: 'Bottom', value: 'b'},
      {text: 'Left', value: 'l'},
      {text: 'Right', value: 'r'},
      {text: 'X-Axis', value: 'x'},
      {text: 'Y-Axis', value: 'y'},
    ],
    sizes: [{text: 'Auto', value: 'auto'}, '0', '1', '2', '3', '4', '5']
  }),
  computed: {
    ...mapState(['nodeMenuStyles', 'nodeStyle']),
    bindOptions () {
      return {
        ...this.nodeMenuStyles.options,
        transition: 'slide-y-transition',
        closeOnContentClick: false,
        maxWidth: '450px',
        bottom: true
      }
    }
  }
}
</script>

<style lang="scss">
.align-options {
  cursor: pointer;
  &.text-align-active {
    font-weight: bold;
  }
}
</style>
