import Vue from "vue";
import App from "./App.vue";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import VueMoment from "vue-moment";
import moment from "moment-timezone";

import VueLodash from "vue-lodash";

import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuetify);
Vue.use(VueMoment, {
  moment
});
Vue.use(VueLodash);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
moment.tz.setDefault("UTC");

new Vue({
  vuetify: new Vuetify({}),
  render: h => h(App)
}).$mount("#app");
