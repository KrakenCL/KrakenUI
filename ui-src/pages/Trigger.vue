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
            <ui-select
                label="Model"
                placeholder="Select one of the models to launch"
                :options="models"
                v-model="trigger.model"
            ></ui-select>
            <ui-select
                label="SourcePoint"
                placeholder="Select one of sourcePoints"
                :options="configurations"
                v-model="trigger.configuration"
            ></ui-select>

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
            <ui-switch v-model="trigger.gitCommit.isEnable"> Launch by any git commit </ui-switch>
            <br/>
            <ui-switch v-model="trigger.apicall.isEnable"> Launch by API call </ui-switch>
            <ui-textbox
                disabled
                label="Path to API call to launch trigger"
                v-model="trigger.apicall.path"
            ></ui-textbox>
            <br>

            <ui-switch v-model="trigger.sourcePoint.isEnable"> Launch by SourcePoint event </ui-switch>
            <ui-select
                label="SourcePoint"
                placeholder="Select one of sourcePoints"
                :options="sourcePoints"
                v-model="trigger.sourcePoint.identifier"
                :disabled="!trigger.sourcePoint.isEnable"
            ></ui-select>
            <ui-select
                label="SourcePoint event"
                placeholder="Select one of events"
                :options="sourcePointEvents"
                v-model="trigger.sourcePoint.event"
                :disabled="!trigger.sourcePoint.isEnable"
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
    computed: {
        configurations: {
            get() {
                return [
                    {
                        label: "SimpleVersion1",
                        value: 1
                    },
                    {
                        label: "SimpleVersion2",
                        value: 2
                    }
                ]
            },
        }
    },
    data() {
        return {
            models: [{
                label: "ResNet",
                value: "identifier",
                configurations: [
                    {
                        label: "SimpleVersion",
                        value: 1
                    },
                    {
                        label: "SimpleVersion",
                        value: 2
                    }
                ]
            }],
            
            identifier : this.$route.params.identifier,
            dailyHouts: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
            dailyMinutes: ["1", "5", "10", "15", "20", "25", "30", "35", "40", "45", "59"],
            sourcePoints: ["ArchivedFolder", "Home-GDisk", "Work-GDisk", "Google Cloud bucket"],
            sourcePointEvents: ["NewFileAvailable", "FileSizeChanged"],
            trigger: {
                model:'',
                configuration: '',
                isEnable: true,
                name: '',
                description: '',
                apicall: {
                    isEnable: true,
                    path: '/api/trigger/launch/EB3F50A5-65FA-4579-813D-C46CEE30A9EB'
                },
                sourcePoint: {
                    isEnable: true,
                    identifier: "",
                    event: "",
                },
                gitCommit: {
                    isEnable: false,
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
