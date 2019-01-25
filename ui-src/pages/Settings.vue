<template>
    <section class="page page--settings">
        <h2 class="page__title">Settings</h2>

        <p>That page provide posibility to setup your server settings and environment.</p>

        <ui-collapsible title="Environment settings" close>
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

            <h4> TensorFlow environment </h4>
            <ui-textbox
                help="Please, set full path to tensorboard"
                label="TensorBoard"
                placeholder="/path/to/tensorboard"
                v-model="tensorboard"
            ></ui-textbox>

            <h4> Swift environment </h4>
            <ui-textbox
                help="Please, set full path to swift toolchain"
                label="swift toolchain"
                placeholder="/path/to/Toolchains"
                v-model="swiftToolchains"
            ></ui-textbox>
        </ui-collapsible>
        <ui-collapsible title="Docker settings" close>
            <h4> Docker environment </h4>

            <ui-textbox
                help="Please, set Docker server protocol, address and port."
                label="Docker server"
                placeholder="tcp://127.0.0.1:2376"
                v-model="dockerServerAddress"
            ></ui-textbox>
            <ui-switch v-model="isDockerServerUseTLS">Use TLS</ui-switch>
        </ui-collapsible>
        <ui-alert @dismiss="positiveNotification = false" type="success" v-show="positiveNotification">
                {{ positiveNotificationMessage }}
        </ui-alert>
        <ui-button :size="buttonSize" color="primary" :loading="saveSettingsISLoading" @click="sendSettingsOnServer">Save settings</ui-button>
    </section>
</template>

<script>
import UiCollapsible from 'src/UiCollapsible.vue';
import UiTextbox from 'src/UiTextbox.vue';
import UiSwitch from 'src/UiSwitch.vue';
import UiButton from 'src/UiButton.vue';
import UiAlert from 'src/UiAlert.vue';

export default {
    components: {
        UiCollapsible,
        UiTextbox,
        UiSwitch,
        UiButton,
        UiAlert
    },
    data() {
        return {
            python2path: '',
            python3path: '',
            tensorboard: '',
            swiftToolchains:  '',
            dockerServerAddress: '',
            isDockerServerUseTLS: true,
            buttonSize: 'normal',
            saveSettingsISLoading: false,
            positiveNotification: false,
            positiveNotificationMessage: 'Settings saved!'
        };
    },
    methods: {
        sendSettingsOnServer(event) {
            this.saveSettingsISLoading = true;
            this.positiveNotification = false;

            setTimeout(() => {
                this.saveSettingsISLoading = false;
                this.positiveNotification = true;
            }, 2000);
        }
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