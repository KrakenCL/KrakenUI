<template>
    <nav class="kraken-ui-navbar">
        <brand
            class="kraken-ui-navbar__left"
            :repo-url="repoUrl"
            :version-url="versionUrl"
            :version="version"
        ></brand>

        <div class="kraken-ui-navbar__right">
            <div class="kraken-ui-navbar__right-container">
                <ui-icon-button
                    class="kraken-ui-navbar__menu-button"
                    color="white"
                    type="clear"

                    @click="$emit('toggle-sidebar')"
                >
                    <ui-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6h18v2.016H3V6zm0 6.984v-1.97h18v1.97H3zM3 18v-2.016h18V18H3z"/></svg>
                    </ui-icon>
                </ui-icon-button>

                <h1 class="kraken-ui-navbar__title">{{ title }}</h1>
            </div>
        </div>
    </nav>
</template>

<script>
import Brand from './Brand.vue';
import UiIcon from 'src/UiIcon.vue';
import UiIconButton from 'src/UiIconButton.vue';

export default {
    components: {
        Brand,
        UiIcon,
        UiIconButton
    },

    props: {
        version: String,
        versionUrl: String,
        repoUrl: String,
        title: String,
        sourceUrl: String
    }
};
</script>

<style lang="scss">
@import './styles/imports.scss';

.kraken-ui-navbar {
    height: rem(48px);
    background-color: $toolbar-color;
    color: white;
    width: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    z-index: $z-index-toolbar;
    position: fixed;
}

.kraken-ui-navbar__left {
    flex-shrink: 0;
    width: rem($sidebar-width)!important;

    @media screen and (max-width: $mobile-breakpoint) {
        display: none;
    }
}

.kraken-ui-navbar__right {
    display: flex;
    align-items: center;
    flex-grow: 1;
}

.kraken-ui-navbar__right-container {
    margin: 0 auto;
    width: 100%;
    max-width: rem(1092px);
    padding-left: rem(32px);
    padding-right: rem(32px);
    display: flex;
    align-items: center;

    @media screen and (max-width: $mobile-breakpoint) {
        padding-left: rem(24px);
        padding-right: rem(24px);
    }
}

.ui-icon-button.kraken-ui-navbar__menu-button {
    margin-right: rem(16px);
    cursor: pointer;
    display: none;

    @media screen and (max-width: $mobile-breakpoint) {
        display: flex;
    }
}

.kraken-ui-navbar__title {
    margin: 0;
    flex-grow: 1;
    font-weight: normal;
    font-size: 1.3rem;
}

.kraken-ui-navbar__action {
    margin-left: auto;
    font-size: 0.9rem;
    color: white;
}
</style>
