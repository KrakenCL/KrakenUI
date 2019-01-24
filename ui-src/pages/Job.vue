<template>
    <section class="page page--ui-job">
        <h2 class="page__title"> Job {{ identifier }} </h2>
        <h4> Job result:</h4>
        <br>
        <table class="table details-table">
            <tbody>
                <tr v-for="detail in job.details" :key="detail.title">
                    <td class="details-table-title-collumn">
                        {{ detail.title }}:
                    </td>
                    <td class="details-table-value-collumn">
                        {{ detail.value }}
                    </td>
                </tr>
            </tbody>
        </table>
        <br>
        <ui-collapsible title="General" close>
                <h4> Language:</h4>
                <code class="job-log-output">{{ job.general.language }}</code>

                <h4> Launch arguments:</h4>
                <code class="job-log-output">{{ job.general.arguments }}</code>
                <h4> PIP installed dependencies:</h4>
                <code class="job-log-output">{{ job.general.pipInstalledDependencies }}</code>

        </ui-collapsible>
        <ui-collapsible title="Environment" close>
                <h4> Environment settings:</h4>
                <code class="job-log-output">
                    <vue-custom-scrollbar class="scroll-area">{{ job.environment }}</vue-custom-scrollbar>
                </code>
        </ui-collapsible>
        
        <ui-collapsible title="Launch log output" clse>
                <h4> Standard log output:</h4>
                <code class="job-log-output">
                    <vue-custom-scrollbar class="scroll-area">{{ job.stdOutput }}</vue-custom-scrollbar>
                </code>
                <br>
                <ui-icon-button icon="get_app" color="primary"></ui-icon-button>

                <h4> Error log output:</h4>
                <code class="job-lo-error-output">
                    <vue-custom-scrollbar class="scroll-area">{{ job.errorOutput }}</vue-custom-scrollbar>
                </code>
                <br>
                <ui-icon-button icon="get_app" color="primary"></ui-icon-button>

        </ui-collapsible>

        <ui-collapsible title="Artifacts" close>
            <a href=""><ui-icon-button icon="get_app" size="small" color="primary"></ui-icon-button> Datasource output.hd5</a>
            <br><br>
            <a href=""><ui-icon-button icon="get_app" size="small" color="primary"></ui-icon-button> Datasource output2.hd5</a>
            
        </ui-collapsible>
    </section>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import UiCollapsible from 'src/UiCollapsible.vue';
import UiFileupload from 'src/UiFileupload.vue';
import UiPreloader from 'src/UiPreloader.vue';
import UiTextbox from 'src/UiTextbox.vue';
import UiSelect from 'src/UiSelect.vue';
import UiSwitch from 'src/UiSwitch.vue';
import UiButton from 'src/UiButton.vue';
import UiIconButton from 'src/UiIconButton.vue';
import UiAlert from 'src/UiAlert.vue';
import axios from 'axios'

export default {
    components: {
        vueCustomScrollbar,
        UiCollapsible,
        UiIconButton,
        UiFileupload,
        UiPreloader,
        UiTextbox,
        UiSwitch,
        UiButton,
        UiSelect,
        UiAlert
    },
    computed: {
            // jobDetails: function () {
            //     var details = {};
            //     details['id'] = '1';
            //     details['title'] = 'TITLEw';
            //     return [details];
            // }
    },
    data() {
        return {
            identifier : this.$route.params.identifier,
            job: {
                details: [
                    {
                        title: 'Model',
                        value: 'ResNet 2.4'
                    },
                    {
                        title: 'Configuration',
                        value: 'SimpleRun'
                    },
                    {
                        title: 'Fired trigger',
                        value: 'Scheduled 3:00PM'
                    },
                    {
                        title: 'Launch time',
                        value: '21 of Jan 2019 3:00:01PM UTC+0000'
                    },
                    {
                        title: 'Finish time',
                        value: '21 of Jan 2019 5:00:01PM UTC+0000'
                    },
                    {
                        title: 'Duration',
                        value: '2 hours 1 minut 0 seconds'
                    },
                    {
                        title: 'Result',
                        value: 'Finished'
                    },
                    {
                        title: 'DataSource',
                        value: 'Home Google Drive'
                    }
                ],
                status: {
                    code: 100,
                    message: 'Finished',
                },
                general: {
                    language: 'python2',
                    pipInstalledDependencies: ["numpy", "pandas"],
                    arguments: ["--train", "--epoch", "1000", "--gpu-enable"],
                },
                environment: 'TERM_PROGRAM=Apple_Terminal\nTERM=xterm-256color\nSHELL=/bin/bash\nTMPDIR=/var/folders/pz/s7d9jjkj29ggcbwjdpbt48xr0000gn/T/\nApple_PubSub_Socket_Render=/private/tmp/com.apple.launchd.sxwkqvTyDL/Render\nTERM_PROGRAM_VERSION=421.1\nTERM_SESSION_ID=99F0BB5C-4DF9-481E-BDEE-F02EB7D0A29A\nUSER=roaming\nSSH_AUTH_SOCK=/private/tmp/com.apple.launchd.n1cgoxoBVq/Listeners\nPATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin\nPWD=/Users/roaming/Projects/KrakenUI\nXPC_FLAGS=0x0\nXPC_SERVICE_NAME=0\nHOME=/Users/roaming\nSHLVL=1\nLOGNAME=roaming\nLC_CTYPE=UTF-8\n_=/usr/bin/env',
                stdOutput: 'default	15:06:55.779673 +0200	com.apple.WebKit.Networking	TIC TCP Conn Connected [1659:0x7f9c9a1c6420]: Err(16)\ndefault	15:06:55.779891 +0200	com.apple.WebKit.Networking	TIC TCP Conn Event [1659:0x7f9c9a1c6420]: 1\ndefault	15:06:55.780174 +0200	com.apple.WebKit.Networking	Task <DB6B6591-D200-456C-9547-49807102D53C>.<8810> now using Connection 1659\ndefault	15:06:55.780457 +0200	com.apple.WebKit.Networking	Task <DB6B6591-D200-456C-9547-49807102D53C>.<8810> sent request, body N\ndefault	15:06:55.835082 +0200	com.apple.WebKit.Networking	Task <DB6B6591-D200-456C-9547-49807102D53C>.<8810> received response, status 200 content C\ndefault	15:06:55.835591 +0200	com.apple.WebKit.Networking	0x112feab00 - NetworkResourceLoader::didReceiveResponse: (pageID = 124, frameID = 1, resourceID = 233, httpStatusCode = 200, length = -1)\ndefault	15:06:55.835833 +0200	com.apple.WebKit.Networking	0x112feab00 - NetworkResourceLoader::didReceiveBuffer: Started receiving data (pageID = 124, frameID = 1, resourceID = 233)\ndefault	15:06:55.836205 +0200	com.apple.WebKit.WebContent	0x520c75930 - WebResourceLoader::didReceiveResponse: (pageID = 124, frameID = 1, resourceID = 233, status = 200)\ndefault	15:06:55.836309 +0200	com.apple.WebKit.WebContent	0x520c75930 - WebResourceLoader::didReceiveData: Started receiving data (pageID = 124, frameID = 1, resourceID = 233)\ndefault	15:06:55.888471 +0200	com.apple.WebKit.Networking	Task <DB6B6591-D200-456C-9547-49807102D53C>.<8810> response ended\ndefault	15:06:55.888569 +0200	com.apple.WebKit.Networking	Task <DB6B6591-D200-456C-9547-49807102D53C>.<8810> done using Connection 1659\ndefault	15:06:55.889001 +0200	com.apple.WebKit.Networking	0x112feab00 - NetworkResourceLoader::didFinishLoading: (pageID = 124, frameID = 1, resourceID = 233, length = 12)\n',
                errorOutput: 'default	15:06:55.779673 +0200	com.apple.WebKit.Networking	TIC TCP Conn Connected [1659:0x7f9c9a1c6420]: Err(16)\ndefault	15:06:55.779891 +0200	com.apple.WebKit.Networking	TIC TCP Conn Event [1659:0x7f9c9a1c6420]: 1\ndefault	15:06:55.780174 +0200	com.apple.WebKit.Networking	Task <DB6B6591-D200-456C-9547-49807102D53C>.<8810> now using Connection 1659\ndefault	15:06:55.780457 +0200	com.apple.WebKit.Networking	Task <DB6B6591-D200-456C-9547-49807102D53C>.<8810> sent request, body N\ndefault	15:06:55.835082 +0200	com.apple.WebKit.Networking	Task <DB6B6591-D200-456C-9547-49807102D53C>.<8810> received response, status 200 content C\ndefault	15:06:55.835591 +0200	com.apple.WebKit.Networking	0x112feab00 - NetworkResourceLoader::didReceiveResponse: (pageID = 124, frameID = 1, resourceID = 233, httpStatusCode = 200, length = -1)\ndefault	15:06:55.835833 +0200	com.apple.WebKit.Networking	0x112feab00 - NetworkResourceLoader::didReceiveBuffer: Started receiving data (pageID = 124, frameID = 1, resourceID = 233)\ndefault	15:06:55.836205 +0200	com.apple.WebKit.WebContent	0x520c75930 - WebResourceLoader::didReceiveResponse: (pageID = 124, frameID = 1, resourceID = 233, status = 200)\ndefault	15:06:55.836309 +0200	com.apple.WebKit.WebContent	0x520c75930 - WebResourceLoader::didReceiveData: Started receiving data (pageID = 124, frameID = 1, resourceID = 233)\ndefault	15:06:55.888471 +0200	com.apple.WebKit.Networking	Task <DB6B6591-D200-456C-9547-49807102D53C>.<8810> response ended\ndefault	15:06:55.888569 +0200	com.apple.WebKit.Networking	Task <DB6B6591-D200-456C-9547-49807102D53C>.<8810> done using Connection 1659\ndefault	15:06:55.889001 +0200	com.apple.WebKit.Networking	0x112feab00 - NetworkResourceLoader::didFinishLoading: (pageID = 124, frameID = 1, resourceID = 233, length = 12)\n'
            }
        };
    },
    methods: {
    }
};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-job {
    .job-log-output {
        padding: 10px;
        display: block;
        white-space: pre;
        background-color: lightgrey;
        color: black;
        
    }
    .job-lo-error-output {
        padding: 10px;
        display: block;
        white-space: pre;
        background-color: rgb(252, 218, 218);
    }
    .scroll-area {
        position: relative;
        margin: auto;
    }
    .details-table {
        margin-bottom: rem-calc(12px);
        min-width: rem-calc(200px);
        max-width: rem-calc(600px);
    }
    .details-table-title-collumn {
        width: 30%;
        text-align: right;

    }
    .details-table-value-collumn {
        width: 70%;
    }

}
</style>
