<template>
    <section class="page page--ui-datasource">
        <h2 class="page__title">DataSource</h2>

        <p>That is future DataSource {{ identifier }} </p>
    </section>
</template>

<script>

export default {
    name: 'DataSource',
    data() {
        return {
            identifier : this.$route.params.identifier,
        };
    }
};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-datasource {
}
</style>
