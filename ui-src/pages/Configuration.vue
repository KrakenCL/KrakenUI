<template>
    <section class="page page--ui-configuration">
        <h2 class="page__title">Configuration</h2>

        <p>That is future configuration {{ identifier }} </p>
    </section>
</template>

<script>

export default {
    name: 'Config',
    data() {
        return {
            identifier : this.$route.params.confIdentifier,
        };
    }
};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-configuration {
}
</style>
