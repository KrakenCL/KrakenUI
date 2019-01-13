<template>
    <section class="page page--ui-dashboard">
        <h2 class="page__title">Dashboard</h2>

        <div class="page__dashboard-notifications">
            <ui-alert @dismiss="positiveNotification = false" type="success" v-show="positiveNotification">
                Service is working in normal mode everything is ok.
            </ui-alert>

            <ui-alert @dismiss="issueNotification = false" type="warning" v-show="issueNotification">
                Some warning is needs your attention: <router-link class="" exact :to="warningObjectPath"> {{ warningIdentifier }} </router-link>
            </ui-alert>

            <ui-alert @dismiss="errorNotification = false" type="error" v-show="errorNotification">
                There is an error: <router-link class="" exact :to="errorObjectPath"> {{ errorIdentifier }} </router-link>
            </ui-alert>
        </div>
    </section>
</template>

<script>
import UiAlert from 'src/UiAlert.vue';
import UiButton from 'src/UiButton.vue';
import UiIcon from 'src/UiIcon.vue';

export default {
    data() {
        return {
            warningIdentifier: '123',
            warningObjectPath: '/model/bitcoin/configuration/1',
            errorIdentifier: '321',
            errorObjectPath: '/model/bitcoin/configuration/2',
            positiveNotification: true,
            issueNotification: true,
            errorNotification: true
        };
    },

    components: {
        UiAlert,
        UiButton,
        UiIcon
    }
};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-dashboard {
}
</style>
