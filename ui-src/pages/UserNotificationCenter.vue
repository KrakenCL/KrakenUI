<template>
    <section class="page page--ui-user-notification-center">
        <h2 class="page__title">User notification center settings</h2>
        <ui-collapsible title="Dashboard notifications" open>
            <h4> What notifications should be shown on dashboard: </h4>
            <ui-switch v-model="dashboardNotifications.modelChanged">Any model changes notification.</ui-switch>
        </ui-collapsible>
        <ui-collapsible title="E-mail notifications" open>
            <h4> E-mail server settings:</h4>
            <ui-textbox
                help="Please, set SMTP relay server address."
                label="SMTP relay address:"
                placeholder="mail.example.com"
                v-model.lazy="emailSettings.relay"
                disabled
            ></ui-textbox>
            <ui-textbox
                help="Please, set SMTP relay server port."
                label="SMTP relay port:"
                placeholder="25"
                v-model.lazy="emailSettings.port"
                disabled
            ></ui-textbox>
            <ui-switch v-model="emailSettings.useTLS" disabled>Use TLS protocol</ui-switch>
            <ui-textbox
                help="Please, set login."
                label="Login:"
                placeholder="user@example.com"
                v-model.lazy="emailSettings.login"
                disabled
            ></ui-textbox>
            <ui-textbox
                help="Please, set password."
                label="Password:"
                placeholder="password"
                type="password"
                v-model.lazy="emailSettings.password"
                disabled
            ></ui-textbox>
            <ui-textbox
                help="Please, set e-mail sender address."
                label="Sender:"
                placeholder="krakencl-robot@example.com"
                v-model.lazy="emailSettings.from"
                disabled
            ></ui-textbox>
            <ui-textbox
                help="Please, set list recipients."
                label="Recipients"
                placeholder="user@example.com, dsgroup@example.com"
                v-model.lazy="recipients"
                disabled
            ></ui-textbox>
            <h4> What notifications should be sent by email: </h4>
            
            <ui-switch v-model="emailNotifications.modelChanged">Any model changes notification.</ui-switch>
        </ui-collapsible>
    </section>
</template>

<script>
import UiCollapsible from 'src/UiCollapsible.vue';
import UiTextbox from 'src/UiTextbox.vue';
import UiSelect from 'src/UiSelect.vue';
import UiSwitch from 'src/UiSwitch.vue';
import UiButton from 'src/UiButton.vue';
import UiAlert from 'src/UiAlert.vue';

export default {
    components: {
        UiCollapsible,
        UiTextbox,
        UiSwitch,
        UiButton,
        UiSelect,
        UiAlert
    },
    computed: {
        recipients: {
            get() {
                return this.emailSettings.toEmail.join(', ');
            },
            set(value) {
                this.emailSettings.toEmail = value.split(', ');
            },
        }
    },
    data() {
        return {
            dashboardNotifications: {
                modelChanged: false,

            },
            emailSettings: {
                relay: null,
                port: null,
                login: null,
                password: null,
                useTLS: false,
                from: null,
                toEmail: []
            },
            emailNotifications: {
                modelChanged: false,

            }
        };
    }
};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-user-notification-center {
}
</style>
