<template>
    <section class="page page--ui-sourcePoint">
        <h2 class="page__title">SourcePoint</h2>
        <h3>Source point anchor:</h3>
        <ui-textbox
            disabled
            label="Source point identifier"
            placeholder="UUID"
            v-model="identifier"
        ></ui-textbox>
        <ui-textbox
            label="Source point name"
            placeholder="Archived folder"
            v-model="sourcePoint.name"
        ></ui-textbox>
        <ui-textbox
            disabled
            help="Source point must be pointed on folder on your file system, select anchor in file manager window."
            label="Source point anchor"
            placeholder="Folder not selected"
            v-model="sourcePoint.anchor.name"
        ></ui-textbox>
        <ui-collapsible title="File manager, your file system.">
        <h3>You can select folder as anchor for your source point.</h3>
        <ul>
            <ui-tree-item
                class="ui-tree-item"
                :model="treeData"
                @didReceiveEvent="didReceiveEvent">
            </ui-tree-item>
        </ul>

        <ui-fileupload name="file" accept="application/zip" :disabled="uploadingArchive" @change="processFile($event)">Upload model as archived folder</ui-fileupload>
        <br/><br/>
        <ui-preloader :show="uploadingArchive"></ui-preloader>
        <ui-alert @dismiss="showNotification = false" :type="notificationType" v-show="showNotification">
                {{ notificationMessage }}
        </ui-alert>
        </ui-collapsible>
        <br/>
        <ui-button :loading="saveSourcePointISLoading" @click="sendSourcePointOnServer">Save</ui-button>

    </section>
</template>

<script>

import UiCollapsible from 'src/UiCollapsible.vue';
import UiFileupload from 'src/UiFileupload.vue';
import UiPreloader from 'src/UiPreloader.vue';
import UiAlert from 'src/UiAlert.vue';
import UiTreeItem from '../Tree.vue';
import UiButton from 'src/UiButton.vue';

import UiTextbox from 'src/UiTextbox.vue';
import axios from 'axios'

export default {
    name: 'SourcePoint',
    components: {
        UiCollapsible,
        UiFileupload,
        UiPreloader,
        UiTreeItem,
        UiTextbox,
        UiButton,        
        UiAlert
    },
    data() {
        return {
            sourcePoint: {
                identifier: '',
                name: '',
                anchor: {
                    name: '',
                    identifier: ''
                }
                

            },
            treeData : {
                name: 'Your root folder',
                identifier: '8E28A64C-7200-49A3-A9A3-AD1B01EF45EC',
                allowedOperations: ["read"],
                children: [ 
                    { 
                        name: 'Google Drive', 
                        identifier: '6DEAA04A-24EA-4BB6-BDFF-2521BABC9CAF',
                        allowedOperations: ["select", "read"],
                        children: [
                            { 
                                name: 'models',
                                identifier: '24887CEB-F30A-49F6-AED1-83BAEA33B54D'
                            }
                        ]
                    },
                    { 
                        name: 'Google Cloud Bucket', 
                        identifier: '857550A5-982A-4964-9A28-32C6D669145C',
                        allowedOperations: ["select", "read"],
                        children: [
                            { 
                                name: 'test-models',
                                identifier: '24887DDD-F30A-49F6-AED1-83BAEA33B54D' 
                            },
                            { 
                                name: 'prod-models',
                                identifier: '34887DDD-F30A-49F6-AED1-83BAEA33B54D' 
                            }
                        ]
                    },
                    { 
                        name: 'Archived', 
                        identifier: '97FDDE21-411D-4873-B641-2E731028C582',
                        allowedOperations: ["select", "read", "delete"],
                        children: [
                            { 
                                name: 'data.hd5',
                                identifier: 'B96C7173-ADA2-4CB4-A3C8-219A13380A5D'
                            },
                            { 
                                name: 'model.py',
                                identifier: '0838F427-71B4-40BF-AADA-43134099561A' 
                            },
                            {
                                name: 'tmp',
                                identifier: '442F60F4-6B97-44D1-8D22-6A35DE1B1FED',
                                allowedOperations: ["select", "read", "delete"],
                                children: [
                                    { 
                                        name: 'data.hd5',
                                        identifier: 'B96C7173-ADA2-4CB4-A3C8-219A13380A5D'
                                    },
                                    { 
                                        name: 'model.py',
                                        identifier: 'E3BDB14C-21F6-49FE-B13E-9EF9C28741BF' 
                                    }
                                ]
                            }
                        ]
                    },
                    ]
            },
            saveSourcePointISLoading: false,
            identifier : this.$route.params.identifier,
            showNotification: false,
            notificationMessage: '',
            notificationType: 'success',
            uploadingArchive: false,

        };
    },
    methods: {
        sendSourcePointOnServer() {

        },
        didReceiveEvent(event, item) {
            console.log(event);
            if (event === "delete") {
                this.notificationMessage = 'You can\'t delete that folder. Feature is not available.'
                this.notificationType = 'warning'
                this.showNotification = true
            }

            if (event != "select") {
                return
            }
            
            if (item.allowedOperations.indexOf("select") > -1) {
                this.showNotification = true
                this.notificationMessage = 'Selected ' + item.name + 'as source point anchor.'
                this.notificationType = 'success'
                this.sourcePoint.anchor.name = item.name
                this.sourcePoint.anchor.identifier = item.identifier
            } else {
                this.showNotification = true
                this.notificationMessage = 'You can\'t select that folder as source point anchor.'
                this.notificationType = 'warning'
            }
        },
        processFile(event) {

            this.showNotification = false;
            this.uploadingArchive = true;
            
            let formData = new FormData();
            for (var i = 0; i < event.length; i++) {
                formData.append('file', event[i]);
            }
            axios.post('https://service.com/fileupload', formData, { timeout: 5000, headers: { 'Content-Type': 'multipart/form-data' } })
            .then(function(response){
                this.showNotification = true;
                this.notificationMessage = 'Success!'
                this.notificationType = 'success'
                this.uploadingArchive = false;
            }).catch((error) => {
                this.showNotification = true;
                this.notificationMessage = error;
                this.notificationType = 'error'
                this.uploadingArchive = false;
            });
        }
    }
};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-sourcePoint {
    .ui-textbox {
        max-width: rem-calc(600px);
    }
}
</style>
