<template>
    <section class="page page--ui-trigger">
        <h2 class="page__title">Trigger</h2>
        <h3> General triger settings: </h3>
            <ui-switch v-model="triger.isEnable">That triger enabled</ui-switch>

            <ui-textbox
                help="Triger short name"
                label="Name"
                placeholder="Scheduled 3:00PM"
                v-model="triger.name"
            ></ui-textbox>
    </section>
</template>

<script>
import UiTextbox from 'src/UiTextbox.vue';
import UiSelect from 'src/UiSelect.vue';
import UiSwitch from 'src/UiSwitch.vue';
import UiButton from 'src/UiButton.vue';
import UiAlert from 'src/UiAlert.vue';

export default {
    components: {
        UiTextbox,
        UiSwitch,
        UiButton,
        UiSelect,
        UiAlert
    },
    data() {
        return {
            identifier : this.$route.params.identifier,
            triger: {
                isEnable: true,
            }
        };
    },
    methods: {
        fetchData() {
            console.log("loadede");
        },
    },
    created() {
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData',
        components: {}
    }
    

};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-trigger {
}
</style>
