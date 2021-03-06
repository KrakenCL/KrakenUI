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
        // ViewController features
        representationWillShow() {
            var action = this.$route.params.action
            if (typeof this.fetchRelatedCollectionsData === "function") {
                this.fetchRelatedCollectionsData()
            }
            if (action == null) {
                action = 'view'
                if (typeof this.fetchData === "function") {
                    this.fetchData()
                }
            } else if (action == 'view') {
                if (typeof this.fetchData === "function") {
                    this.fetchData()
                }
            } else if (action == 'create') {
                if (typeof this.newModelObjectPrepare === "function") {
                    this.newModelObjectPrepare()
                }
            }
        },
        notification(state, type, message) {
            
            if (typeof this.generalNotification === 'undefined') { return }
            if (typeof this.generalNotificationType === 'undefined') { return }
            if (typeof this.generalNotificationMessage === 'undefined') { return }
            this.generalNotification = state === 'show'

            if (type === 'success') {
                this.generalNotificationType = type
            } else if (type === 'warning') {
                this.generalNotificationType = type
            } else if (type === 'error') {
                this.generalNotificationType = type
            } else {
                this.generalNotificationType = 'warning'
            }
            this.generalNotificationMessage = message
            window.scrollTo(0,0);
        },
        globalDependencies() {
            return {
                api: {
                    ormURL: "http://" + location.hostname + ":8080/api/orm/",
                    rpcURL: "http://" + location.hostname + ":8080/api/rpc/"
                }
            }
        },
        request(modelObjectName, identifier) {
            let url = this.globalDependencies().api.ormURL + modelObjectName + "/" + (identifier ? identifier :"")
            console.log('load: ', modelObjectName, identifier, url);
            return new Promise((resolve, reject) => {
                axios.get(url, { timeout: 3000, headers: { 'Content-Type': 'application/json' } })
                .then((response) => {
                    const containsKey = (obj, key ) => Object.keys(obj).includes(key)
                    if (containsKey(response.data, 'value')){
                        resolve(response.data['value'])
                    } else if (containsKey(response.data, 'error')) {
                        reject(response.data['error'])
                    } else {
                        reject({ error: 'Incorrect response format'})
                    }
                    
                }).catch((error) => {
                    reject(error)
                }); 
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
