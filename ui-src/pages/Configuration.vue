<template>
    <section class="page page--ui-configuration">
        <h2 class="page__title">Configuration {{ identifier }}</h2>
        <h3>Model: {{ configuration.model.name }}</h3>
        <ui-textbox
                help="Please, set configuration name."
                label="Name:"
                placeholder="Configuration #1"
                v-model.lazy="configuration.name"
        ></ui-textbox>
        <ui-textbox
                help="Please, set list of extra arguments (separated ', ')."
                label="Command line extra arguments:"
                placeholder="--epoch, 1000, --paramX, 100"
                v-model.lazy="extraArguments"
        ></ui-textbox>
        <br>
        <table class="environment-table">
            <tbody>
                <tr v-for="(environment, index) in configuration.extraEnvironment" :key="environment.key">
                    <td class="environment-table-title-collumn">
                        <ui-textbox
                            placeholder="PATH"
                            v-model="configuration.extraEnvironment[index].key"
                            @input="updateExtraEnvironmentKey(index)"
                            :autofocus="keyAutofocusIndex == index"
                        ></ui-textbox>
                        
                    </td>
                    <td class="environment-table-value-collumn">
                        <ui-textbox
                            placeholder="/ust/local/path/bin:{PATH}"
                            v-model="configuration.extraEnvironment[index].value"
                        ></ui-textbox>
                    </td>
                    <td class="environment-table-action-collumn">
                        <ui-icon-button color="red" icon="delete_outline" size="normal" type="secondary" @click="removeExtraEnvironment(index)"></ui-icon-button>                    
                    </td>
                </tr>
            </tbody>
        </table>
        <ui-icon-button color="primary" icon="add" size="normal" type="secondary" @click="addExtraEnvironment"></ui-icon-button>
        <br/>
        <br/>
        <ui-button color="primary" icon="save" @click="save">Save</ui-button>
        <ui-button color="green" icon="file_copy">Copy</ui-button>
        <ui-button color="red" icon="delete">Delete</ui-button>
    </section>
</template>

<script>

import UiCollapsible from 'src/UiCollapsible.vue';
import UiIconButton from 'src/UiIconButton.vue';
import UiTextbox from 'src/UiTextbox.vue';
import UiSelect from 'src/UiSelect.vue';
import UiSwitch from 'src/UiSwitch.vue';
import UiButton from 'src/UiButton.vue';
import UiIcon from 'src/UiIcon.vue';

export default {
    components: {
        UiIcon,
        UiCollapsible,
        UiIconButton,
        UiTextbox,
        UiSwitch,
        UiButton,
        UiSelect
    },
    computed: {
        extraArguments: {
            get() {
                return this.configuration.extraArguments.join(', ');
            },
            set(value) {
                this.configuration.extraArguments = value.split(', ');
            },
        }
    },
    data() {
        return {
            keyAutofocusIndex: null,
            identifier : this.$route.params.identifier,
            configuration: {
                name: 'Simple conf',
                model: {
                    name: 'ResNet 1500'
                },
                extraEnvironment: [
                    {
                        key: 'PATH',
                        value: '/path/bin/:{PATH}'
                    },
                    {
                        key: 'isTRAIN',
                        value: 'TRUE'
                    }
                ],
                extraArguments: [
                    "--epoch",
                    "1000",
                    "--train"
                ],
            }
        };
    },
    methods: {
        save() {
            console.log(this.configuration.extraEnvironment);
        },
        addExtraEnvironment(event) {
            let keys = this.configuration.extraEnvironment.map((item) => { 
                return item.key;
            });
            if (keys.includes("") != true) {
                this.configuration.extraEnvironment.push({key: null, value: null})
            }
        },
        removeExtraEnvironment(index) {
            this.configuration.extraEnvironment.splice(index);
        },
        updateExtraEnvironmentKey(index) {
            this.keyAutofocusIndex = index
        }
    }
};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-configuration {
    .ui-textbox {
        max-width: rem-calc(600px);
    }
    .environment-table {
        margin-bottom: rem-calc(12px);
        min-width: rem-calc(200px);
        max-width: rem-calc(600px);
    }
    .environment-table-title-collumn {
        width: 40%;
    }
    .environment-table-value-collumn {
        width: 40%;
    }
    .environment-table-action-collumn {
        width: 20%;
    }
}
</style>
