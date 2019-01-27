<template>
    <section class="page page--ui-sourcePoint">
        <h2 class="page__title">SourcePoint</h2>

        <p>That is future SourcePoint {{ identifier }} </p>
        <ul>
            <ui-tree-item
                class="ui-tree-item"
                :model="treeData"
                @didSelect="selectItem">
            </ui-tree-item>
        </ul>

        <!-- <ui-fileupload name="file" accept="application/zip" :disabled="model.sourceType != 'archive' || uploadingArchive" @change="processFile($event)">Upload model as archived folder</ui-fileupload> -->
        <!-- <br> -->
        <!-- <ui-preloader :show="uploadingArchive"></ui-preloader> -->
        <!-- <br> -->
        <!-- <ui-alert @dismiss="archivedModelPositiveNotification = false" type="success" v-show="archivedModelPositiveNotification"> -->
                <!-- {{ archivedModelPositiveNotificationMessage }} -->
        <!-- </ui-alert> -->
        <!-- <ui-alert @dismiss="archivedModelErrorNotification = false" type="error" v-show="archivedModelErrorNotification"> -->
                <!-- {{ archivedModelErrorNotificationMessage }} -->
        <!-- </ui-alert> -->
    </section>
</template>

<script>
import UiTreeItem from '../Tree.vue';

export default {
    name: 'SourcePoint',
    components: {
        UiTreeItem
    },
    data() {
        return {
            treeData : {
                name: 'Source pointers',
                identifier: '8E28A64C-7200-49A3-A9A3-AD1B01EF45EC',
                children: [ 
                    { 
                        name: 'Google Drive', 
                        identifier: '6DEAA04A-24EA-4BB6-BDFF-2521BABC9CAF',
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
                        children: [
                            { 
                                name: 'data.hd5',
                                identifier: 'B96C7173-ADA2-4CB4-A3C8-219A13380A5D'
                            },
                            { 
                                name: 'model.py',
                                identifier: 'E3BDB14C-21F6-49FE-B13E-9EF9C28741BF' 
                            },
                            {
                                name: 'tmp',
                                identifier: '',
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
            identifier : this.$route.params.identifier,
            archivedModelPositiveNotification: false,
            archivedModelPositiveNotificationMessage: '',
            archivedModelErrorNotification: false,
            archivedModelErrorNotificationMessage: '',
            uploadingArchive: false,
        };
    },
    methods: {
        selectItem(element) {
            console.log('calback: ' + JSON.stringify(element) )
        },
        processFile(event) {
            this.archivedModelPositiveNotification = false;
            this.archivedModelErrorNotification = false;
            this.uploadingArchive = true;
            
            let formData = new FormData();
            for (var i = 0; i < event.length; i++) {
                formData.append('file', event[i]);
            }
            axios.post('https://service.com/fileupload', formData, { timeout: 5000, headers: { 'Content-Type': 'multipart/form-data' } })
            .then(function(response){
                this.archivedModelPositiveNotification = true;
                this.archivedModelPositiveNotificationMessage = 'Success!'
                this.uploadingArchive = false;
            }).catch((error) => {
                this.archivedModelErrorNotification = true;
                this.archivedModelErrorNotificationMessage = error;
                this.uploadingArchive = false;
            });
        }
    }
};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-sourcePoint {
}
</style>
