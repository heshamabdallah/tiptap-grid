<template>
  <span>
    <button
      :key="index"
      class="menubar__button"
      @click="onAlignText(align)"
      v-for="(align, index) in aligns"
      :class="{ 'is-active': isAlignActive(align) }">
      <v-icon>format_align_{{ align }}</v-icon>
    </button>
  </span>
</template>

<script>
export default {
  props: {
    commands: {
      type: Object,
      required: true
    },
    isActive: {
      type: Object,
      required: true
    },
    aligns: {
      type: Array,
      default: () => (['left', 'center', 'right', 'justify'])
    }
  },
  methods: {
    isAlignActive (align) {
      return this.isActive[`align_text_${align}`]()
    },
    callCommand (align) {
      return this.commands[`align_text_${align}`]()
    },
    onAlignText(align) {
      this.$nextTick(() => {
        this.aligns.filter(txt => txt !== align && this.isAlignActive(txt)).forEach(txt => {
          this.callCommand(txt)
        })
        this.callCommand(align)
      })
    }
  }
}
</script>
