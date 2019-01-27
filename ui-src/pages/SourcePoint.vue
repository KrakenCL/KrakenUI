<template>
    <section class="page page--ui-sourcePoint">
        <h2 class="page__title">SourcePoint</h2>

        <p>That is future SourcePoint {{ identifier }} </p>
        

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

export default {
    name: 'SourcePoint',
    data() {
        return {
            identifier : this.$route.params.identifier,
            archivedModelPositiveNotification: false,
            archivedModelPositiveNotificationMessage: '',
            archivedModelErrorNotification: false,
            archivedModelErrorNotificationMessage: '',
            uploadingArchive: false,
        };
    },
    methods: {
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
    .item {
        cursor: pointer;
    }
    .bold {
        font-weight: bold;
    }
    ul {
        padding-left: 1em;
        line-height: 1.5em;
        list-style-type: dot;
    }
}
</style>
