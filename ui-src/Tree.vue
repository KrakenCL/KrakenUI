<template>
<li>
    <div :class="{folder: isFolder}">
        <span v-if="isFolder" @click="toggle"><ui-icon :icon="icon"></ui-icon></span><span v-else><ui-icon class="ui-icon-attachment" icon="attach_file"></ui-icon></span><span @click="click">{{ model.name }}</span><span v-if="canDelete" @click="removeFolder"><ui-icon class="ui-icon-delete" icon="delete"></ui-icon></span>
    </div>
    <ul v-show="open" v-if="isFolder">
        <ui-tree-item
        class="ui-tree-item"
        v-for="(model, index) in model.children"
        :key="index"
        :model="model"
        @didReceiveEvent="select"
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
        didReceiveEvent: Function
    },

    computed: {
        isFolder: function () {
            return this.model.children && this.model.children.length
        },
        canDelete(){
            if (this.isFolder) {
                return this.model.allowedOperations.indexOf("delete") > -1
            } else {
                return false
            }
            
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
            this.$emit('didReceiveEvent', this.open ? 'ufold' : 'fold', this.model);
        },
        removeFolder(e) {
            if (this.isFolder && this.canDelete) {
                this.$emit('didReceiveEvent', 'delete', this.model);    
            }            
        },
        select(event, item) {
            this.$emit('didReceiveEvent', event, item);
        },
        click(e) {
            if (this.isFolder) {
                this.$emit('didReceiveEvent', 'select', this.model);
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
@import './styles/imports.scss';

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
.ui-icon-delete {
        font-size: rem(20px);
        margin-left: rem(10px);
        margin-right: rem(10px);
        color: lightcoral;
}
.ui-icon-attachment {
        font-size: rem(18px);
        margin-left: rem(5px);
        margin-right: rem(5px);
        color: lightblue;
}
ul {
  padding-left: 2.5em;
  line-height: 2em;
  list-style-type: none;
}
</style>
