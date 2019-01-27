<template>
<li>
    <div
      :class="{folder: isFolder}"
      @click="click"
      >
      <span v-if="isFolder" @click="toggle"><ui-icon :icon="icon"></ui-icon></span><span v-else><ui-icon icon="attach_file" size="small"></ui-icon></span>{{ model.name }}
    </div>
    <ul v-show="open" v-if="isFolder">
        <ui-tree-item
        class="ui-tree-item"
        v-for="(model, index) in model.children"
        :key="index"
        :model="model"
        @didSelect="select"
        >
      </ui-tree-item>
    </ul>
  </li>
</template>

<script>
import UiIcon from 'src/UiIcon.vue';

export default {
    name: 'ui-tree-item',

    props: {
        model: Object,
        didSelect: Function
    },

    computed: {
        isFolder: function () {
            return this.model.children && this.model.children.length
        },
        icon() {
            return (this.open ? 'keyboard_arrow_down' : 'keyboard_arrow_right');
        }
    },
    methods: {
        toggle(e) {
            if (this.isFolder) {
                this.open = !this.open
            }
        },
        select(e) {
            this.$emit('didSelect', e);
        },
        click(e) {
            if (this.isFolder) {
                this.$emit('didSelect', this.model);
            }
        }
    },
    components: {
        UiIcon
    },
    data() {
        return {
            open: false
        }
    }
};
</script>

<style lang="scss">
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
}
.ui-tree-item {
  cursor: pointer;
}
.folder {
  font-weight: bold;
  font-size: 1.0rem;
}
ul {
  padding-left: 2.5em;
  line-height: 2em;
  list-style-type: none;
}
</style>
