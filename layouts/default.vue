<template>
  <v-app
    transition="slide-y-transition"
    :class="applicationDir"
    class="app-container"
    :dir="$dir()"
  >
    <!-- Start Header -->
    <NavBar />
    <!-- End Header -->
    <v-row class="p-0 m-0">
      <!-- Start Sidebar -->
      <!-- <v-scroll-x-transition> -->
      <v-col md="3" xl="2" class="p-0 m-0">
        <v-fade-transition>
          <SideBar v-if="sideBarStatus" />
        </v-fade-transition>

        <div
          transition="slide-x-transition"
          @click="toggelSideBar"
          v-if="sideBarStatus"
          class="overlay-sideBar"
        ></div>
      </v-col>

      <!-- </v-scroll-x-transition> -->

      <!-- End Sidebar -->
      <v-col cols="12" md="9" xl="10" class="p-0 m-0">
        <!-- Start LayOut -->
        <div class="layout-default">
          <div class="component-container pa-6">
            <v-scroll-x-transition>
              <Nuxt />
            </v-scroll-x-transition>
          </div>
        </div>
        <!-- End LayOut -->
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import SideBar from "~/components/Side-bar.vue";
import NavBar from "~/components/Nav-bar.vue";

export default {
  data() {
    return {
      applicationDir: "",
    };
  },
  computed: {
    sideBarStatus() {
      return this.$store.state.ShowSideBar;
    },
  },
  updated() {
    this.$axios.$get("profile").then((data) => {
      localStorage.setItem("storeId", data.data.storeId);
      localStorage.setItem("rating", data.data.rating);
      localStorage.setItem("image", data.data.image);
      localStorage.setItem("name", data.data.name);
      this.$store.dispatch("storeId");
      this.$store.dispatch("rating");
      this.$store.dispatch("image");
      this.$store.dispatch("name", data.data.name);
      console.log(data.data.name);
    });
  },
  methods: {
    toggelSideBar() {
      this.$store.dispatch("ToggelSideBar");
    },

    hanelLang() {
      this.$axios.onRequest((config) => {
        config.headers["lang"] = this.$i18n.locale;
        return config;
      });
    },
  },
  mounted() {
    if (this.$i18n.locale == "ar") {
      this.$axios.setHeader("lang", "ar");
    } else {
      this.$axios.setHeader("lang", "en");
    }

    this.hanelLang();
  },
  components: { SideBar, NavBar },
};
</script>

<style lang="scss">
.app-container {
  .component-container {
    background-color: #f5f5f5;
    min-height: 100vh;
  }
}

.z-10000 {
  z-index: 1000000;
}
.overlay-sideBar {
  display: none;
  background-color: rgba(34, 34, 34, 0.489);
  position: absolute;
  left: 0;
  width: 100vw;
  height: 100% !important;
  z-index: 99;
  transition: 0.4s ease-in;
}
.app-container[dir="rtl"] {
  font-family: "mainFont", Fallback, sans-serif;
}

.app-container[dir="ltr"] {
  font-family: "Roboto", sans-serif;
}

@media (max-width: 960px) {
  .overlay-sideBar {
    display: block;
  }
}
</style>
