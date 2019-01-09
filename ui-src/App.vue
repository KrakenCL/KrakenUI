<template>
    <div id="app" class="kraken-ui">
        <navbar
            :repoUrl="repoUrl"
            :title="pageTitle"
            :version="version"
            :versionUrl="versionUrl"

            @toggle-sidebar="sidebarOpen = !sidebarOpen"
        ></navbar>

        <transition name="transition-fade">
            <div
                class="kraken-ui-mobile-sidebar__backdrop"
                @click="sidebarOpen = false"
                v-show="showSidebar"
            ></div>
        </transition>

        <section class="kraken-ui-content">
            <transition name="transition-slide">
                <sidebar :version="version" :versionUrl="versionUrl" :repoUrl="repoUrl" v-show="showSidebar"></sidebar>
            </transition>

            <div class="kraken-ui-content__page-content" ref="pageContent">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import UiIcon from 'src/UiIcon.vue';
import UiIconButton from 'src/UiIconButton.vue';

export default {
    components: {
        Navbar,
        Sidebar,
        UiIcon,
        UiIconButton
    },

    data() {
        return {
            isMobile: false,
            sidebarOpen: false,
            version: '0.0.1',
            repoUrl: 'https://github.com/KrakenCL/KrakenCL/',
            versionUrl: 'https://github.com/KrakenCL/KrakenCL/releases/tag/v0.0.1',
            description: 'KrakenCL - Continuous Learning, integration, deployment service.',
            mobileMediaQuery: null
        };
    },

    computed: {
        pageTitle() {
            return this.$route.meta.title;
        },

        documentTitle() {
            return this.$route.meta.title + ' | ' + this.description;
        },

        showSidebar() {
            return this.isMobile ? this.sidebarOpen : true;
        }
    },

    watch: {
        '$route'() {
            document.title = this.documentTitle;

            this.$nextTick(() => {
                window.scrollTo(0, 0);
                this.sidebarOpen = false;
            });
        }
    },

    mounted() {
        document.title = this.documentTitle;

        this.mobileMediaQuery = window.matchMedia('screen and (max-width: 768px)');
        this.mobileMediaQuery.addListener(this.onResize);

        this.onResize(this.mobileMediaQuery);
    },

    beforeDestroy() {
        if (this.mobileMediaQuery) {
            this.mobileMediaQuery.removeListener(this.onResize);
        }
    },

    methods: {
        onResize(mediaQuery) {
            this.isMobile = mediaQuery.matches;
        }
    }
};
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
