<template>
    <section class="page page--ui-trigger">
        <h2 class="page__title">Trigger</h2>

        <p>That is future trigger {{ identifier }} </p>
    </section>
</template>

<script>

export default {
    name: 'Trigger',
    data() {
        return {
            identifier : this.$route.params.identifier,
        };
    }
};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-trigger {
}
</style>
