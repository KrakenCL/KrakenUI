<template>
    <section class="page page--ui-trigger">
        <h2 class="page__title">Trigger</h2>
        <h3> General trigger settings: </h3>
            <ui-switch v-model="trigger.isEnable"> Enabled </ui-switch>

            <ui-textbox
                help="Trigger short name"
                label="Name"
                placeholder="Scheduled 3:00PM"
                v-model="trigger.name"
            ></ui-textbox>
            <ui-textbox
                help="Optional trigger description"
                label="Description"
                placeholder="Every day at night"
                v-model="trigger.description"
            ></ui-textbox>

            <ui-switch v-model="trigger.schedule.isEnable"> Periodically schedule </ui-switch>
            <br>
            <div>
                <table class="table daily-table">
                    <tbody>
                        <tr>
                            <td>
                                 <h4>Daily at:</h4>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <ui-select
                                    label="Hour"
                                    placeholder="Select a hour"
                                    :options="dailyHouts"
                                    v-model="trigger.schedule.periodically[0].daily.hour"
                                    :disabled="!trigger.schedule.isEnable"
                                ></ui-select>
                            </td>
                            <td>
                                <ui-select
                                    label="Minute"
                                    placeholder="Select a minut"
                                    :options="dailyMinutes"
                                    v-model="trigger.schedule.periodically[0].daily.minut"
                                    :disabled="!trigger.schedule.isEnable"
                                ></ui-select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <ui-switch v-model="trigger.apicall.isEnable"> Launch by API call </ui-switch>
            <ui-textbox
                disabled
                label="Path to API call to launch trigger"
                v-model="trigger.apicall.path"
            ></ui-textbox>
            <br>

            <ui-switch v-model="trigger.datasource.isEnable"> Launch by DataSource event </ui-switch>
            <ui-select
                label="DataSource"
                placeholder="Select one of datasources"
                :options="datasources"
                v-model="trigger.datasource.identifier"
                :disabled="!trigger.datasource.isEnable"
            ></ui-select>
            <ui-select
                label="DataSource event"
                placeholder="Select one of events"
                :options="datasourceEvents"
                v-model="trigger.datasource.event"
                :disabled="!trigger.datasource.isEnable"
            ></ui-select>            
            <br>
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
            dailyHouts: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
            dailyMinutes: ["1", "5", "10", "15", "20", "25", "30", "35", "40", "45", "59"],
            datasources: ["ArchivedFolder", "Home-GDisk", "Work-GDisk", "Google Cloud bucket"],
            datasourceEvents: ["NewFileAvailable", "FileSizeChanged"],
            trigger: {
                isEnable: true,
                name: '',
                description: '',
                apicall: {
                    isEnable: true,
                    path: '/api/trigger/launch/EB3F50A5-65FA-4579-813D-C46CEE30A9EB'
                },
                datasource: {
                    isEnable: true,
                    identifier: null,
                    event: null,
                },
                schedule: {
                    isEnable: true,
                    periodically: [
                        {
                            daily: {
                                hour: "15",
                                minut: "30",
                            }
                        }
                    ],
                }

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
    .daily-table {
        margin-bottom: rem-calc(12px);
        max-width: rem-calc(200px);
    }
    .ui-select {
        margin-bottom: rem-calc(32px);
        max-width: rem-calc(400px);
    }
}
</style>
