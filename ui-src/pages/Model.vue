<template>
    <section class="page page--ui-model">
        <h2 class="page__title">Model <i>{{ this.model.label }}</i></h2>
        <p>{{ this.model.description}}</p>
        <ui-alert @dismiss="generalNotification = false" :type="generalNotificationType" v-show="generalNotification">
                {{ generalNotificationMessage }}
        </ui-alert>
        <ui-collapsible title="General" close>
            <h4> General model settings: </h4>
            <ui-textbox
                disabled
                help="System generated identifier"
                label="Model identifier"
                placeholder="UUID"
                v-model="model.identifier"
            ></ui-textbox>

            <ui-textbox
                help="Please, set short label of your model"
                label="Label"
                placeholder="ResNet-50"
                v-model="model.label"
            ></ui-textbox>

            <ui-textbox
                help="Please, set description of you model"
                label="Description"
                placeholder="ResNet-152 achieves a top-5 validation error of 4.49%"
                v-model="model.description"
            ></ui-textbox>
        </ui-collapsible>
        <ui-collapsible title="Environment" close>
            <h4> General environment settings: </h4>
            <ui-textbox
                help="Please, set main (index) file to launch your model."
                label="Main file:"
                placeholder="models/samples/cookbook/regression/linear_regression.py"
                v-model="model.mainFile"
            ></ui-textbox>
            <ui-select
                label="Language"
                placeholder="Select a language"
                :options="languageEnvironments"
                v-model="model.language"
            ></ui-select>
            <ui-textbox
                help="Please, set list of pip installed dependencies (separated ', ')."
                label="Dependencies"
                placeholder="tensorflow,numpy, pandas"
                v-model.lazy="pipInstalledDependencies"
                :disabled="model.language.label.indexOf('python') === -1"
            ></ui-textbox>
            <br>
            <h4> TensorFlow options: </h4>
            <ui-switch v-model="model.tensorflow.useGPU">Use GPU accelerator</ui-switch>
            <ui-switch v-model="model.tensorflow.attachTensorBoard">Attach TensorBoard</ui-switch>
        </ui-collapsible>
        <br>
        <ui-switch v-model="model.dockerContainer" @change="model.dockerContainer">Use as Docker container</ui-switch>
        <ui-switch v-model="model.sourceType" true-value="git" false-value="archive" @change="useGitRepository">Use git repository as model source</ui-switch>
        <br>
        <ui-select
            label="Model from source point"
            placeholder="Select one of sourcePoints"
            :options="sourcePoints"
            v-model="model.archive.sourcePoint"
            :disabled="model.sourceType != 'archive'"
        ></ui-select>
        <br>
        <ui-collapsible title="Git repository settings" :disabled="model.sourceType != 'git'" :open="model.sourceType === 'git'">
            <h4> Server settings </h4>
            <ui-textbox
                help="Please, set git server protocol, address and port."
                label="Git server"
                placeholder="git@github.com:tensorflow/models.git"
                v-model="model.git.url"
            ></ui-textbox>
            <ui-textbox
                help="Please, set git repository branch name."
                label="Branch"
                placeholder="master"
                v-model="model.git.branch"
            ></ui-textbox>  
            <br>

            <h4> SSH key </h4>
            <ui-fileupload name="file">Choose private ssh key file</ui-fileupload>
            
            <br><br>
            <ui-textbox
                help="Please, set ssh key password."
                label="SSH Key password"
                type="password"
                placeholder="secret"
                v-model="model.git.password"
            ></ui-textbox>
            <br>

            <h4> Credentials </h4>
            <ui-textbox
                help="Please, set git login."
                label="User name or login"
                placeholder="usergit"
                v-model="model.git.credentials.login"
            ></ui-textbox>
            <ui-textbox
                help="Please, set password."
                label="Password"
                type="password"
                placeholder="secret"
                v-model="model.git.credentials.password"
            ></ui-textbox>
        </ui-collapsible>
        <ui-button :loading="savingModel" color="primary" @click="saveModel">Save model</ui-button>
    </section>
</template>

<script>
import UiCollapsible from 'src/UiCollapsible.vue';
import UiTextbox from 'src/UiTextbox.vue';
import UiSelect from 'src/UiSelect.vue';
import UiSwitch from 'src/UiSwitch.vue';
import UiButton from 'src/UiButton.vue';
import UiAlert from 'src/UiAlert.vue';
import UiFileupload from 'src/UiFileupload.vue';

import axios from 'axios'

export default {
    components: {
        UiCollapsible,
        UiTextbox,
        UiSwitch,
        UiButton,
        UiSelect,
        UiAlert,
        UiFileupload
    },
    computed: {
        pipInstalledDependencies: {
            get() {
                return this.model.pipInstalledDependencies.join(', ');
            },
            set(value) {
                this.model.pipInstalledDependencies = value.split(', ');
            },
        }
    },
    data() {
        return {
            gitSectionEnabled: false,
            languageEnvironments: [],
            sourcePoints: [],
            generalNotification : false,
            generalNotificationType: 'success',
            generalNotificationMessage: '',
            savingModel: false,
            model: {
                identifier : '',
                label: '',
                description: '',
                mainFile: '',
                dockerContainer: false,
                sourceType: 'archive',
                language: { label : '' },
                pipInstalledDependencies: [],
                tensorflow: {
                    useGPU: false,
                    attachTensorBoard: true,
                },
                git: {
                    identifier: '',
                    url: '',
                    branch:'',
                    authType: '',
                    sshKey: {
                        privateFile: '',
                        publicFile: null,
                        password: null
                    },
                    credentials: {
                        login: null,
                        password: null
                    }
                },
                archive: {
                    sourcePoint: "",
                }
            },
        };
    },
    methods: {

        fetchRelatedCollectionsData() {
            this.request('languageEnvironment').then((response) => {
                this.languageEnvironments = response
            }).catch((error) => this.notification('show', 'error', error))
            this.request('sourcePoint').then((response) => {
                this.sourcePoints = response
            }).catch((error) => this.notification('show', 'error', error))

        },
        fetchData() {
            var identifier = this.$route.params.identifier
            this.request('mlmodel', identifier).then((response) => {
                console.log(response)
            })
        },
        newModelObjectPrepare() {
        },
        useGitRepository(event) {
            console.log(this.model.sourceType);
        },
        saveModel(event) {
            this.savingModel = true
            this.notification('show', 'success', 'hi scrooll!')
        }
    },
    created() {
        this.representationWillShow()
    },
    watch: {
        '$route': 'representationWillShow',
        components: {}
    }
};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-model {
    .ui-textbox {
        max-width: rem-calc(600px);
    }
    .ui-select {
        max-width: rem-calc(600px);
    }
}
</style>
