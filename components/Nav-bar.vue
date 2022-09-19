<template>
  <div>
    <div class="nav-bar d-md-flex align-center justify-space-between">
      <v-col md="3" xl="2" class="bg-main p-0 m-0">
        <nuxt-link class="logo bg-main" :to="localePath('/store/products')">
          <img src="~/assets/imgs/logo1.png" alt="" />
        </nuxt-link>
      </v-col>
      <v-col md="9" xl="10" class="header-content-bar p-0">
        <v-row class="p-0 m-0 align-center">
          <v-col class="d-none d-sm-block" md="8">
            <v-breadcrumbs :items="items">
              <template v-slot:item="{ item }">
                <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
                  {{ item.text }}
                </v-breadcrumbs-item>
              </template>
            </v-breadcrumbs>
          </v-col>
          <v-col
            md="4"
            class="d-flex justify-xs-center justify-end align-center"
          >
            <div class="notfication-lang d-flex pe-5 align-center">
              <nuxt-link class="" :to="localePath('/store/notification')">
                <v-btn icon>
                  <v-icon class="tx-main">mdi-bell-outline</v-icon>
                </v-btn>
              </nuxt-link>

              <language-option />
              <v-btn
                @click="toggelSideBar"
                class="bg-transparent d-block d-md-none tpgelSide tx-w ms-3"
              >
                <v-icon>mdi-format-align-justify</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  props: {},
  computed: {
    items() {
      return this.$store.state.items;
    },
  },

  watch: {
    $route(to, from) {
      console.log("route change to", to.name);
      // console.log("route change from", from);

      if (window.innerWidth <= 960) {
        this.$store.dispatch("CloseSideBar");
        window.addEventListener("resize", this.OpenSideBar);
      }
      this.$store.dispatch("pageLinksAction", this.$t(to.name));
      this.$i18n.locale == "ar"
        ? (this.$vuetify.rtl = true)
        : (this.$vuetify.rtl = false);
    },
  },
  destroyed() {
    // this.$store.dispatch("pageLinksAction");
  },
  methods: {
    toggelSideBar() {
      this.$store.dispatch("ToggelSideBar");
    },
    CloseSideBarSize() {
      this.$store.dispatch("CloseSideBar");
    },
    OpenSideBarSize() {
      this.$store.dispatch("OpenSideBar");
    },

    sideBarStatus() {
      if (window.innerWidth <= 960) {
        this.$store.dispatch("CloseSideBar");
        window.addEventListener("resize", this.OpenSideBarSize);
      } else {
        this.$store.dispatch("OpenSideBar");
        window.addEventListener("resize", this.OpenSideBarSize);
      }
    },
  },

  mounted() {
    this.$store.dispatch("pageLinksAction", this.$t(`${$nuxt.$route.name}`));
    console.log(this.$t(`${$nuxt.$route.name}`));
    if (window.innerWidth <= 960) {
      this.$store.dispatch("CloseSideBar");
      window.addEventListener("resize", this.OpenSideBarSize);
    } else {
      this.$store.dispatch("OpenSideBar");
      window.addEventListener("resize", this.OpenSideBarSize);
    }
  },

  // created() {
  //   window.addEventListener("resize", this.sideBarStatus);
  // },
  // destroyed() {
  //   window.removeEventListener("resize", this.sideBarStatus);
  // },

  unmounted() {
    window.removeEventListener("resize", this.sideBarStatus);
    window.addEventListener("resize", this.sideBarStatus);
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  border-bottom: 1px solid rgba(17, 17, 17, 0.411);
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 81px;

  img {
    width: 120px;
    height: 60px;
    object-fit: cover;
  }
}
</style>
