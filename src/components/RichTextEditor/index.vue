<template>
  <div>
    <editor-style-menu></editor-style-menu>
    <editor-node-menu></editor-node-menu>
    <div class="editor">
      <editor-menu-bar :editor="editor">
        <div class="menubar" slot-scope="{ commands, isActive }">
          <button
            class="menubar__button"
            id="grid_container"
            :class="{ 'is-active': isActive.grid_container() }"
            @click="commands.grid_container">
            <v-icon>playlist_add</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold">
            <v-icon>format_bold</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic">
            <v-icon>format_italic</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike">
             <v-icon>format_strikethrough</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline">
            <v-icon>format_underline</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph">
            <v-icon>title</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })">
            <span class="theme--light v-icon">H1</span>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })">
            <span class="theme--light v-icon">H2</span>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })">
            <span class="theme--light v-icon">H3</span>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list">
            <v-icon>format_list_bulleted</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list">
            <v-icon>format_list_numbered</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote">
            <v-icon>format_quote</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block">
            <v-icon>code</v-icon>
          </button>

          <button
            class="menubar__button"
            @click="commands.horizontal_rule">
            <v-icon>minimize</v-icon>
          </button>

          <button
            class="menubar__button"
            @click="commands.undo">
            <v-icon>undo</v-icon>
          </button>

          <button
            class="menubar__button"
            @click="commands.redo">
            <v-icon>redo</v-icon>
          </button>

        </div>
      </editor-menu-bar>
      <editor-content class="editor-content" :editor="editor" />
    </div>
  </div>
</template>

<script src="./scripts.js"></script>

<style src="./styles.css"></style>

<style lang="scss">
.editor {
  position: relative;
  .editor-content {
    .grid-container {
      .grid-item {
        position: relative;
        .line-controller {
          top: 0;
          color: #aaa;
          left: -50px;
          width: 30px;
          height: 30px;
          display: block;
          cursor: pointer;
          position: absolute;
          font-weight: normal;
          transition: all 0.3s;
          &::before {
            top: -8px;
            left: 5px;
            width: 100%;
            height: 100%;
            content: '+';
            font-size: 30px;
            position: absolute;
          }
          &:hover {
            background: #eee;
          }
        }
      }
    }
  }
}
</style>
