<template>
  <v-scroll-y-transition>
    <v-app transition="slide-y-transition" class="app-container" :dir="$dir()">
      <!-- Start Header -->
      <v-container>
        <div class="d-flex align-center justify-space-around">
          <div class="logo">
            <img src="~/assets/imgs/logoblack.png" alt="Logo" />
          </div>
          <language-option />
        </div>
      </v-container>
      <!-- End Header -->

      <!-- Start LayOut -->
      <div class="layout-default">
        <div class="component-container pa-6">
          <v-scroll-x-transition>
            <Nuxt />
          </v-scroll-x-transition>
        </div>
      </div>
    </v-app>
  </v-scroll-y-transition>
</template>

<script>
import SideBar from "~/components/Side-bar.vue";
import NavBar from "~/components/Nav-bar.vue";

export default {
    data() {
    return {};
  },

  watch: {
    langLocal() {
      this.$i18n.locale == "ar"
        ? (this.$vuetify.rtl = true)
        : (this.$vuetify.rtl = false);
    },
  },
  computed: {
    sideBarStatus() {
      return this.$store.state.ShowSideBar;
    },
  },
  methods: {},
  mounted() {
    this.langLocal;
  },
  components: { SideBar, NavBar },
};
</script>

<style lang="scss">
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 81px;

  img {
    width: 200px;
    height: 60px;
    object-fit: cover;
  }
}
.app-container[dir="rtl"] {
  font-family: "mainFont", Fallback, sans-serif;
  .v-btn {
    letter-spacing: 0 !important;
  }
  .component-container {
    background-color: #f5f5f5;
    min-height: 100vh;
  }
}

.app-container[dir="ltr"] {
  font-family: "Roboto", sans-serif;
}
</style>
