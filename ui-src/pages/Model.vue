<template>
    <section class="page page--ui-model">
        <h2 class="page__title">Model </h2>
        <p>That page provide posibility to setup your model.</p>

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
                help="Please, set short name of your model"
                label="Name"
                placeholder="ResNet-15"
                v-model="model.name"
            ></ui-textbox>

            <ui-textbox
                help="Please, set description of you model"
                label="Description"
                placeholder="ResNet-152 achieves a top-5 validation error of 4.49%"
                v-model="model.description"
            ></ui-textbox>

            <ui-textbox
                help="Please, set main (index) file to launch your model."
                label="Main file:"
                placeholder="main.py"
                v-model="model.mainFile"
            ></ui-textbox>
        </ui-collapsible>
        <br>
        <ui-switch v-model="model.dockerContainer" @change="useGitRepository">Use as Docker container</ui-switch>
        <ui-switch v-model="model.sourceType" true-value="git" false-value="archive" @change="useGitRepository">Use git repository as model source</ui-switch>
        <br>
        <ui-fileupload name="file" :disabled="model.sourceType != 'archive'">Upload model as archived folder</ui-fileupload>
        <br><br>
        <ui-collapsible title="Git repository settings" :disabled="model.sourceType != 'git'" :open="model.sourceType === 'git'">
            <h4> Server settings </h4>
            <ui-textbox
                help="Please, set git server protocol, address and port."
                label="Git server"
                placeholder="git@github.com:apple/swift.git"
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
        <ui-alert @dismiss="positiveNotification = false" type="success" v-show="positiveNotification">
                {{ positiveNotificationMessage }}
        </ui-alert>
        <ui-button :size="buttonSize" color="primary" :loading="saveSettingsISLoading" @click="sendSettingsOnServer">Save settings</ui-button>
    </section>
</template>

<script>
import UiCollapsible from 'src/UiCollapsible.vue';
import UiFileupload from 'src/UiFileupload.vue';
import UiTextbox from 'src/UiTextbox.vue';
import UiSwitch from 'src/UiSwitch.vue';
import UiButton from 'src/UiButton.vue';
import UiAlert from 'src/UiAlert.vue';

export default {
    components: {
        UiCollapsible,
        UiFileupload,
        UiTextbox,
        UiSwitch,
        UiButton,
        UiAlert
    },
    data() {
        return {
            gitSectionEnabled: false,
            model: {
                identifier: '7B84D8A6-0EEE-4D3B-9DEF-F547E9D945EC',
                name: 'ResNet-152',
                description: 'ResNet-152 achieves a top-5 validation error of 4.49%.',
                mainFile: 'Autoencoder/autoencoder.py',
                dockerContainer: true,
                sourceType: 'git',
                git: {
                    identifier: '7B84D8A6-0EEE-4D3B-9DEF-F547E9D945CC',
                    url: 'git@github.com:Octadero/rada.git',
                    branch: 'master',
                    authType: 'ssh-key',
                    sshKey: {
                        privateFile: 'LS0tLS1CRUdJTiBPUEVOU1NIIFBSSVZBVEUgS0VZLS0tLS0KYjNCbGJuTnphQzFyWlhrdGRqRUFBQUFBQkc1dmJtVUFBQUFFYm05dVpRQUFBQUFBQUFBQkFBQUJGd0FBQUFkemMyZ3RjbgpOaEFBQUFBd0VBQVFBQUFRRUFzd294YmVmVkdEeFdLamlKam9qK1N1WUZodGhYUFRZKzYxMFovL1kzV3Q3RklQZ2U1SmZQCmY5RG1zWG1ZSHhWZ2Z0YkVoRERUN0Y4QXVpeUJKdjJCa09ia1dyajhTVmc5K2lISlo4c2xkYktMaUc2akplZHVGYmlJUzIKUkw1NnFxeGFpalN2UFJCcnZmVnB5NHYwZC9RbmdwWXhSQm04SjlzT24zL3VwTHc5Qk1JbEhPN05US3grR2s0amIxakpkMgp6dUx3c21qTjA2Wkg4dWx0c2owbkZQQU5DdkZMQ3BLcVc0bVJkQUFWM0J3RkZzKzVVZVNOaG9ZZUpDVVBtdEVZUDg2RHBnCnBrdkE1dGd4OXp5eUdEUTdGU0tJWmdwblpqSXFkMkUycW1aN0Z4T2Z0NkhTZDJ1SU5YcEN1YnhjQWNNSHBBM3cvSFk0Y2kKUTkzdVdUVi9Rd0FBQTlpTjdUQnFqZTB3YWdBQUFBZHpjMmd0Y25OaEFBQUJBUUN6Q2pGdDU5VVlQRllxT0ltT2lQNUs1ZwpXRzJGYzlOajdyWFJuLzlqZGEzc1VnK0I3a2w4OS8wT2F4ZVpnZkZXQisxc1NFTU5Qc1h3QzZMSUVtL1lHUTV1UmF1UHhKCldEMzZJY2xueXlWMXNvdUlicU1sNTI0VnVJaExaRXZucXFyRnFLTks4OUVHdTk5V25MaS9SMzlDZUNsakZFR2J3bjJ3NmYKZis2a3ZEMEV3aVVjN3MxTXJINGFUaU52V01sM2JPNHZDeWFNM1Rwa2Z5NlcyeVBTY1U4QTBLOFVzS2txcGJpWkYwQUJYYwpIQVVXejdsUjVJMkdoaDRrSlErYTBSZy96b09tQ21TOERtMkRIM1BMSVlORHNWSW9obUNtZG1NaXAzWVRhcVpuc1hFNSszCm9kSjNhNGcxZWtLNXZGd0J3d2VrRGZEOGRqaHlKRDNlNVpOWDlEQUFBQUF3RUFBUUFBQVFCTWM3RFJ2cXBYRkFTek9MczgKZXpFaktILzVxYzN1M0lnWGx3VHdNT0pJVWxJWkZ2cVNJR1ZCcmlHa2JValJGUjdFYXM4MXAyZ0hTallVU2NiSXNIMndNMwpnVmFXS0pxejJqM3VPVEI4TXlOQkN6TEpOTUx6dnAySWVTc2Z4YnE1d0tsVTFOUnpuZHgwSENTVi8yaGdCSWtPa1RYdVg1CkxoN2YrYmlsU01VYmt0S0tBRkRZR2lMUG5NZXhIaDFLYThwdmY3ZmtoVERkdE5MSVlBcnU4VEZsbElUeVR5K0ZOVkpoTzgKSUtyazFPTWNlQ0RhNXAwM2Q4di82UkJoU0JHaWRmU3RLV09HOVR5OW4zVW9ZdHZXUGt6NWpuMk9kcmNYenJNNGcybU5KWApJSTZwZkV3bUw4dS9zVjJUcXNIdnRkYmtQbnA4VytEMGRQWkFxTmE3aVg0eEFBQUFnRGVDeU5tTzdUY2hkNllhQ2NONERSCmxOOHlVUW5wdVBhR2JsZWEycm5lcDM1QWlxSlJBaWRnNGFwYWVNY0ZqU1BoSlM3VzVnT0dET1VRaTZIaktSN1llZE9uSHQKY1lnaWNKYTRFbWNVdHdIMFpKdE51VWpMU05sRjcwVHpBcERRN2xHZlZxQ05haEl6aWV4K0dBT25POE9rN2c2Wis0YzFZTwp5U0JqQnJYTWdBQUFBQWdRRGtLcnhvdUZnM2QvakN4eGovdGozZ2E4Q0YzbXgxaWs2cVI3UDgrUE5Xa2FCWG1nMjZSSGt5Ckk2R0x3YzV1TVVFYm13SC9Qb2lXN3FTMFoyV0tPeGYyaFNQaytRU2xJQVpwTHFBVEJHVnRTSHBLb0VBSkdUM0hHOU5SSG0KR29lbjU2ZUx5OFJTS1dyZEdlQVBFWWdQTkFiVmtyN2x0NTN1Zm9YeEV4S2EvSUd3QUFBSUVBeU9GTkRSREJjeCtjLy9KawptczJWN1dnL0l6NmpmNUZpT1Fxb2RoOEFTQjgzcFRTTWttaGRKZ0wxTmZiN1lhVmJScTYzNHdzMXJWRll6b0pDdHBzQTl2CnBFNFN1bm1FRDBZUHh5SjZvWTFwenFWbE80LzErTUZxN0NWSE4rVC8zVy9EQXdnSG5xbzlYK01xdmFFbE9GWWFxVkdKd28KU3lMMkZqWTVIamk3Wi9rQUFBQWNjbTloYldsdVowQk1hV3hwWVhNdFRXRmpRbTl2YXk1c2IyTmhiQUVDQXdRRkJnYz0KLS0tLS1FTkQgT1BFTlNTSCBQUklWQVRFIEtFWS0tLS0tCg==',
                        publicFile: null,
                        password: null
                    },
                    credentials: {
                        login: null,
                        password: null
                    }
                },
                // sourceType: 'archive',
                // archive: {
                //     identifier: '7B84D8A6-0EEE-4D3B-9DEF-F547E9D94CCC',
                //     isUploaded: true,
                //     unarchived: true,
                //     structure: [
                //         {
                //             name: 'Autoencoder',
                //             childe: [
                //                 {
                //                     name: 'autoencoder.py'
                //                 }
                //             ]
                //         }, 
                //         {
                //             name: 'README.md'
                //         },
                //         {
                //             name: 'LICENSE'
                //         }

                //     ]
                // }
            },
            

            buttonSize: 'normal',
            saveSettingsISLoading: false,
            positiveNotification: false,
            positiveNotificationMessage: 'Settings saved!'
        };
    },
    methods: {
        useGitRepository(event) {
            console.log(this.model.sourceType);
        },
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

.page--ui-model {
    .ui-textbox {
        max-width: rem-calc(600px);
    }
}
</style>
