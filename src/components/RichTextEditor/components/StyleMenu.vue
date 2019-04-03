<template>
  <v-menu v-model="nodeMenuStyles.show" v-bind="bindOptions">
    <v-container fluid="fluid" grid-list-lg class="py-3">
      <v-layout row="row" wrap="wrap">
        <v-flex class="d-flex" xs4 v-for="(align, index) in aligns" @click="onChangeTexAlign(align)" :key="index">
          <div class="text-xs-center text-capitalize align-options" :class="{'text-align-active': align === nodeStyle.textAlign}">
            {{align}}
          </div>
        </v-flex>
        <v-flex class="d-flex" xs12>
          <v-select class="pr-2" :items="directions" v-model="nodeStyle.paddingDirection">
            <template v-slot:prepend><strong class="primary--text mt-1">p</strong></template>
          </v-select>
          <v-select :items="sizes.slice(1)"  v-model="nodeStyle.paddingSize"></v-select>
        </v-flex>
        <v-flex class="d-flex" xs12>
          <v-select class="pr-2" :items="directions" v-model="nodeStyle.marginDirection">
            <template v-slot:prepend><strong class="primary--text mt-1">m</strong></template>
          </v-select>
          <v-select :items="sizes" v-model="nodeStyle.marginSize"></v-select>
        </v-flex>
      </v-layout>
    </v-container>
  </v-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data: () => ({
    directions: ['t', 'b', 'l', 'r', 'x', 'y', 'a'],
    sizes: ['auto', '0', '1', '2', '3', '4', '5'],
    aligns: ['left', 'center', 'right']
  }),
  methods: {
    ...mapMutations(['setNodeStyleKey']),
    onChangeTexAlign(align) {
      this.setNodeStyleKey({key: 'textAlign', value: align})
    }
  },
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
