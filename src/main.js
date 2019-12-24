import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'babel-polyfill';

//Creating a default event bus to be used amongst the components
//export const bus = new Vue();

//Adding the usage of bootstrap
Vue.use(BootstrapVue)

//Creating the container that renders the app object
new Vue({
  render: h => h(App),
}).$mount('#app')