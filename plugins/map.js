import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBYYsHfLvLMjJVwKp3jm2fw9jNo_JKfvik",
    libraries: "places",
  },
  installComponents: true,
});
