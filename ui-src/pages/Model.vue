<template>
    <section class="page page--ui-model">
        <h2 class="page__title">Model</h2>

        <p>That is future model {{ identifier }} </p>
        <div>
        <p>Name: {{ coin.name }}</p>
        <p>Symbol: {{ coin.symbol }}</p>
        <p>Price (USD): {{ coin.price_usd }}</p>
        </div>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Coins',
    data() {
        return {
            identifier : this.$route.params.identifier,
            coin: {}
        };
    },
    created() {
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData',
        components: {}
    },
    methods: {
        fetchData() {
            axios.get('https://api.coinmarketcap.com/v1/ticker/'+this.$route.params.identifier+'/')
            .then((resp) => {
                this.coin = resp.data[0]
                    console.log(resp)
            })
            .catch((err) => {
                    console.log(err)
            })
        }
    }
};
</script>

<style lang="scss">
@import '~styles/imports';

.page--ui-model {
}
</style>
