import 'helpers/modality';

import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import { routes } from './navigation.js';

import axios from 'axios'

// Allow inspection, even in production mode
Vue.config.devtools = true;

// Turn off the nagging production tip
Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    linkActiveClass: 'is-active'
});

Vue.mixin({
    methods: {
        globalDependencies() {
            return {
                api: {
                    ormURL: "http://" + location.hostname + ":8080/api/orm/",
                    rpcURL: "http://" + location.hostname + ":8080/api/rpc/"
                }
            }
        },
        request(modelObject) {
            return new Promise((resolve, reject) => {
                axios.get(modelObject, { 
                    timeout: 5000, 
                    headers: { } 
                }).then(response => resolve(response)).catch(() => reject)
            });
        }
    }
})
const app = new Vue({
    router,
    render(h) {
        return h(App);
    }
});

app.$mount('#app');
