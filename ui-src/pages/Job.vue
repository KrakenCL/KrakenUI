<template>
    <section class="page page--ui-job">
        <h2 class="page__title"><ui-icon :icon="job.icon" :class="job.icon_style"></ui-icon> Job {{ identifier }} </h2>
        <h4> Job result information:</h4>
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
        <br/>
        <ui-button 
            icon="timeline"
            size="normal"
        >
            Open TensorBoard
        </ui-button>
        <br/><br/>
        <ui-collapsible title="General" close>
                <h4> Language:</h4>
                <code class="job-log-output">{{ job.general.language }}</code>

                <h4> Launch arguments:</h4>
                <code class="job-log-output">{{ job.general.arguments }}</code>
                <h4> PIP installed dependencies:</h4>
                <code class="job-log-output">{{ job.general.pipInstalledDependencies }}</code>
                <h4> Model source information </h4>
                <code class="job-log-output">{{ job.general.model }}</code>
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
                <a href=""><ui-icon-button icon="get_app" size="small" color="primary"></ui-icon-button> Output-log.txt (1204Kb)</a>

                <h4> Error log output:</h4>
                <code class="job-lo-error-output">
                    <vue-custom-scrollbar class="scroll-area">{{ job.errorOutput }}</vue-custom-scrollbar>
                </code>
                <br>
                <a href=""><ui-icon-button icon="get_app" size="small" color="primary"></ui-icon-button> Output-error-log.txt (1204Kb)</a>


        </ui-collapsible>

        <ui-collapsible title="Artifacts" close>
        <table class="table artifacts-table">
            <tbody>
                <tr v-for="file in job.artifacts" :key="file.filename">
                    <td class="artifact-table-filename-collumn">
                        <a :href="file.url">{{ file.filename }}</a>
                    </td>
                    <td class="artifact-table-size-collumn">
                        {{ file.size / 1024 }} Kb.
                    </td>
                </tr>
            </tbody>
        </table>            
        </ui-collapsible>
        
    </section>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import UiCollapsible from 'src/UiCollapsible.vue';
import UiTextbox from 'src/UiTextbox.vue';
import UiSelect from 'src/UiSelect.vue';
import UiSwitch from 'src/UiSwitch.vue';
import UiButton from 'src/UiButton.vue';
import UiIconButton from 'src/UiIconButton.vue';
import UiIcon from 'src/UiIcon.vue';

export default {
    components: {
        vueCustomScrollbar,
        UiIcon,
        UiCollapsible,
        UiIconButton,
        UiTextbox,
        UiSwitch,
        UiButton,
        UiSelect
    },
    computed: {
        tensorflowIcon() {
            var icon = '<svg viewBox="0 0 30.0 32.0" height="100" width="100" id="icon-link"><defs><symbol><g transform="translate(-77.942529,-177.00005)" id="layer1"><g id="g4550"><path style="fill:#e55b2d;fill-opacity:1" d="m 360.04883,687.87305 v 18.89843 l 32.73047,18.89844 v -18.89844 z m -65.46289,18.89843 v 18.89844 l 16.36523,9.44727 V 716.2207 Z m 49.0957,9.44922 -16.36523,9.44922 v 56.69141 l 16.36523,9.44922 v -37.79493 l 16.36719,9.44922 v -18.89843 l -16.36719,-9.44922 z" transform="scale(0.26458333)" id="path4508" /><path style="fill:#ed8e24;fill-opacity:1" d="m 360.04883,687.87305 -49.09766,28.34765 v 18.89649 l 32.73047,-18.89649 v 18.89649 l 16.36719,-9.44727 z m 49.09765,9.44922 -16.36718,9.44921 v 18.89844 l 16.36718,-9.44922 z m -32.73242,37.79492 -16.36523,9.44922 v 18.89843 l 16.36523,-9.44922 z m -16.36523,28.34765 -16.36719,-9.44922 v 37.79493 l 16.36719,-9.44922 z" transform="scale(0.26458333)" id="path4491" /><path style="fill:#f8bf3c;fill-opacity:1" d="m 360.04883,668.97656 -65.46289,37.79492 16.36523,9.44922 49.09766,-28.34765 32.73047,18.89843 16.36718,-9.44921 z m 0,56.69336 -16.36719,9.44727 16.36719,9.44922 16.36523,-9.44922 z" transform="scale(0.26458333)" id="path4506" /></g></g></symbol></defs></svg>';
            return icon
        }
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
                icon: 'done',
                icon_style: 'ui-positive-icon',
                artifacts: [
                    {
                        filename: 'DataOutput0.hd5',
                        url:'/static/job/ACD75037-A1FB-4A01-A404-765AF3AA261C/E0481ED3-FB47-40D0-BDCB-6E0C970CD416.zip',
                        size: 100452
                    },
                    {
                        filename: 'DataOutput1.hd5',
                        url:'/static/job/ACD75037-A1FB-4A01-A404-765AF3AA261C/E0481ED3-FB47-40D0-BDCB-6E0C970CD416.zip',
                        size: 342354
                    },
                    {
                        filename: 'DataOutput2.hd5',
                        url:'/static/job/ACD75037-A1FB-4A01-A404-765AF3AA261C/E0481ED3-FB47-40D0-BDCB-6E0C970CD416.zip',
                        size: 733458
                    }
                ],
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
                        title: 'SourcePoint',
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
                    model: {
                        git: {
                            identifier: '7B84D8A6-0EEE-4D3B-9DEF-F547E9D945CC',
                            url: 'git@github.com:Octadero/rada.git',
                            branch: 'master',
                            commit: 'b939e5faa0c491d3b091b6ecbcb0e85490c0bca1 [b939e5f]',
                            author: 'Volodymyr Pavliukevych <volodymyr@krakencl.com>',
                            date: 'January 8, 2019 at 6:55:57 PM GMT+2',
                            labels: 'HEAD master origin/master origin/HEAD',
                        },
                        archivedFolder: [
                            {
                                name: 'module.py',
                                size: 4063,
                                md5: '6dd011988a47480c5be26670b3be0b92',
                            },
                            {
                                name: 'train.py',
                                size: 6530,
                                md5: '04bc14833157598b93bacee36da1c957',
                            },
                            {
                                name: 'data_loader.py',
                                size: 1528,
                                md5: 'bd35133d292d891024c8b62d72950f28',
                            },
                        ]
                    }
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
    .artifacts-table {
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
    .artifact-table-filename-collumn {
        width: 70%;
    }
    .artifact-table-size-collumn {
        width: 30%;
    }
    .ui-positive-icon {
        font-size: rem(24px);
        margin-left: rem(12px);
        margin-right: rem(12px);
        color: #09875b;
    }
    .ui-warning-icon {
        font-size: rem(24px);
        margin-left: rem(12px);
        margin-right: rem(12px);
        color: #ff6f01;
    }

}
</style>
