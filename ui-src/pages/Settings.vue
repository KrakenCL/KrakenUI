<template>
    <section class="page page--settings">
        <h2 class="page__title">Settings</h2>

        <p>That page provide posibility to setup your server settings and environment.</p>

        <ui-collapsible title="Environment settings" open>
            <h4> Python environment </h4>

            <ui-textbox
                help="Please, set full path to python environment"
                label="Python 2"
                placeholder="/path/to/python2"
                v-model="python2path"
            ></ui-textbox>

            <ui-textbox
                help="Please, set full path to python environment"
                label="Python 3"
                placeholder="/path/to/python3"
                v-model="python3path"
            ></ui-textbox>
            <br>

            <h4> TensorFlow environment </h4>
            <ui-textbox
                help="Please, set full path to tensorboard"
                label="TensorBoard"
                placeholder="/path/to/tensorboard"
                v-model="tensorboard"
            ></ui-textbox>
            <br>

            <h4> Swift environment </h4>
            <ui-textbox
                help="Please, set full path to swift toolchain"
                label="swift toolchain"
                placeholder="/path/to/Toolchains"
                v-model="swiftToolchains"
            ></ui-textbox>
        </ui-collapsible>
    </section>
</template>

<script>
import UiCollapsible from 'src/UiCollapsible.vue';
import UiTextbox from 'src/UiTextbox.vue';

export default {
    components: {
        UiCollapsible,
        UiTextbox
    },
    data() {
        return {
            python2path: '',
            python3path: '',
            tensorboard: '',
            swiftToolchains:  ''
        };
    }
};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-settings {
    .ui-textbox {
        max-width: rem-calc(600px);
    }
}
</style>