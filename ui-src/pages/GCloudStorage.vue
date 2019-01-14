<template>
    <section class="page page--ui-google-cloud-storage">
        <h2 class="page__title">Google Cloud Storage settings</h2>
        <ui-alert @dismiss="positiveNotification = false" type="success" v-show="positiveNotification">
                {{ positiveNotificationMessage }}
        </ui-alert>
        <ui-button :size="buttonSize" color="primary" :loading="saveSettingsISLoading" @click="sendSettingsOnServer">Authorise on Google server</ui-button>
    </section>
</template>

<script>
import UiTextbox from 'src/UiTextbox.vue';
import UiSwitch from 'src/UiSwitch.vue';
import UiButton from 'src/UiButton.vue';
import UiAlert from 'src/UiAlert.vue';

export default {
    components: {
        UiTextbox,
        UiSwitch,
        UiButton,
        UiAlert
    },
    data() {
        return {
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

.page--ui-edit-google-cloud-storage {
}
</style>
