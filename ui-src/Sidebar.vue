<template>
    <aside class="kraken-ui-sidebar">
        <brand
            class="kraken-ui-sidebar__header"

            :repo-url="repoUrl"
            :version-url="versionUrl"
            :version="version"
        ></brand>

        <div class="kraken-ui-sidebar__scrollable">
            <div class="kraken-ui-sidebar__description">
                <p>Continuous Learning, Integration, Deployment service.</p>
            </div>

            <ul class="kraken-ui-sidebar__menu">
                <li class="kraken-ui-sidebar__menu-section">
                    <div class="kraken-ui-sidebar__menu-section-header">Usage</div>

                    <ul class="kraken-ui-sidebar__menu-section-links">
                        <li>
                            <a
                                class="kraken-ui-sidebar__menu-item"
                                href="https://krakencl.com/krakencl"
                                rel="noopener"
                                target="_blank"
                            >Getting Started <ui-icon>open_in_new</ui-icon></a>
                        </li>

                        <li>
                            <a
                                class="kraken-ui-sidebar__menu-item"
                                href="https://krakencl.com/enterprise"
                                rel="noopener"
                                target="_blank"
                            >More features<ui-icon>open_in_new</ui-icon></a>
                        </li>
                    </ul>
                </li>

                <li class="kraken-ui-sidebar__menu-section" v-for="section in menu" :key="section.title">
                    <div class="kraken-ui-sidebar__menu-section-header">{{ section.title }}</div>

                    <ul class="kraken-ui-sidebar__menu-section-links">
                        <li v-for="item in section.menu" :key="item.path">
                            <router-link
                                class="kraken-ui-sidebar__menu-item" exact
                                :to="item.path"
                            >
                                {{ item.title }}
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li class="kraken-ui-sidebar__menu-section" v-for="section in models" :key="section.title">
                    <div class="kraken-ui-sidebar__menu-section-header">{{ section.title }}</div>

                    <ul class="kraken-ui-sidebar__menu-section-links">
                        <li v-for="item in section.menu" :key="item.path">
                            <router-link
                                class="kraken-ui-sidebar__menu-item" exact
                                :to="item.path"
                            >
                                {{ item.title }}
                            </router-link>
                        </li>
                    </ul>
                </li>                
            </ul>
        </div>
    </aside>
</template>

<script>

import { menu } from './navigation.js';
import Model from './pages/Model.vue';
import Brand from './Brand.vue';
import UiIcon from 'src/UiIcon.vue';
import UiSelect from 'src/UiSelect.vue';
import axios from 'axios'

export default {
    components: {
        Brand,
        UiIcon,
        UiSelect
    },

    props: {
        version: String,
        versionUrl: String,
        repoUrl: String
    },

    data() {
        return {
            menu,
            models : []
        };
    },

    methods: {
        onVersionSelect(version) {
            if (version === '1.0.1') {
                return;
            }

            let root = '';
            const component = window.location.hash + (version === '0.8.9' ? '-docs' : '');

            // This is in contrast to localhost, whose root is '/'
            if (window.location.hostname === 'josephuspaye.github.io') {
                root = 'https://josephuspaye.github.io/Keen-UI';
            }

            window.location = `${root}/${version}/${component}`;
        },
        fetchData() {
            axios.get('https://api.coinmarketcap.com/v1/ticker/')
            .then((resp) => {
                var models = []
                for (let element of resp.data) {
                    if (element['name'] == null) {
                        console.log(element);
                        continue
                    }
                    
                let model = {
                    path: '/model/'+element['id'],
                    component: Model,
                    title: element['name'],
                    sourceUrl: 'src/Model.vue'
                } 
                models.push(model)
                }
                let model_menu = { 
                    title :  "Models",
                    menu : models
                 }
                this.models = [model_menu]
            })
            .catch((err) => {
                    console.log(err)
            })
        }
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
@import './styles/imports.scss';

.kraken-ui-sidebar {
    background-color: #FFF;
    box-shadow: 0 2px 5px 0 rgba(black, 0.16), 0 2px 10px 0 rgba(black, 0.12);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    height: 100vh;
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: rem($sidebar-width);
    z-index: 1;

    @media screen and (max-width: $mobile-breakpoint) {
        max-width: rem($sidebar-width-mobile);
        z-index: $z-index-nav-drawer;
    }
}

.kraken-ui-sidebar__scrollable {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}

.kraken-ui-sidebar__description {
    color: rgba(black, 0.54);
    padding: rem(16px);

    p {
        margin: 0;

        & + p {
            margin-top: rem(12px);
        }
    }
}

.kraken-ui-sidebar__menu,
.kraken-ui-sidebar__menu-section-links {
    list-style: none;
    margin: 0;
    padding: 0;
}

.kraken-ui-sidebar__menu-section-header {
    color: rgba(black, 0.7);
    font-size: 1.1em;
    font-weight: bold;
    padding: rem(16px);
}

.kraken-ui-sidebar__menu-item {
    align-items: center;
    color: rgba(black, 0.87);
    display: flex;
    padding: rem(12px);
    padding-left: rem(40px);

    &.is-active {
        color: $link-color;
        font-weight: 600;
        background-color: rgba(black, 0.05);
    }

    &:hover,
    &:focus {
        text-decoration: none;
        background-color: rgba(black, 0.05);
    }

    .ui-icon {
        font-size: rem(18px);
        margin-left: rem(12px);
        color: #868686;
    }
}

.kraken-ui-mobile-sidebar__backdrop {
    background-color: rgba(black, 0.2);
    bottom: 0;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: $z-index-nav-drawer - 1;
    display: none;

    @media screen and (max-width: $mobile-breakpoint) {
        display: block;
    }
}

.transition-fade-enter-active,
.transition-fade-leave-active {
    transition: opacity 0.2s ease-out;
}

.transition-fade-enter,
.transition-fade-leave-active {
    opacity: 0;
}

.transition-slide-enter-active,
.transition-slide-leave-active {
    transition: transform 0.2s ease-out;
}

.transition-slide-enter,
.transition-slide-leave-active {
    transform: translateX(-$sidebar-width-mobile);
}
</style>