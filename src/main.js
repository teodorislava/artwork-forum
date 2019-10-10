import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex';
import VueResource from 'vue-resource';
import VueCookies from 'vue-cookie';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import VueBootstrap from 'bootstrap-vue';
import { store } from './store/store';
import Routes from './routes';
import FileUpload from 'v-file-upload'
 
Vue.use(FileUpload);
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueCookies);
Vue.use(VueBootstrap);
Vue.use(VeeValidate, {fieldsBagName: 'formFields'});

const router = new VueRouter({
  routes: Routes,
  mode:'history'
});

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app');
