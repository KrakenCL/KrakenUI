<template>
    <section class="page page--ui-job">
        <h2 class="page__title">job</h2>

        <p>That is future job {{ identifier }} </p>
    </section>
</template>

<script>
console.log("Job load: " + new Date());
export default {
    data() {
        return {
            identifier : this.$route.params.identifier,
        };
    }
};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-job {
}
</style>
