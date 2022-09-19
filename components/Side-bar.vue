<template>
  <v-card transition="fab-transition" class="sideBar">
    <v-navigation-drawer class="sideBarContainer" permanent expand="true">
      <div class="d-flex mt-3 align-center justify-start pa-2">
        <div class="px-2 d-flex gap-2">
          <div class="brand-logo d-flex justify-center align-center">
            <img class="img-cover" :src="storeimage" />
          </div>
        </div>

        <div class="d-flex font-weight-bold siz-14 gap-1 flex-column">
          <div class="ms-1">{{ name }}</div>
          <rating :readonly="true" :ratingStore="storeRate" />
        </div>
      </div>

      <v-list nav dense>
        <v-list-item class="pa-0">
          <nuxt-link
            class="side-links"
            exact
            :to="({ name: 'custom-page-name' }, localePath('/store/home'))"
          >
            <div class="d-flex">
              <v-list-item-icon class="ps-1">
                <v-icon small> mdi-car-cruise-control </v-icon>
              </v-list-item-icon>
            </div>
            <v-list-item-title>{{ $t("home") }}</v-list-item-title>
            <v-icon class="mt-1" small>mdi-chevron-left</v-icon>
          </nuxt-link>
        </v-list-item>
        <v-list-item class="pa-0">
          <nuxt-link class="side-links" :to="localePath('/store/order')">
            <div class="d-flex">
              <v-list-item-icon class="ps-1">
                <v-icon small>mdi-hands-pray </v-icon>
              </v-list-item-icon>
            </div>
            <v-list-item-title>{{ $t("orders") }}</v-list-item-title>
            <v-icon class="mt-1" small>mdi-chevron-left</v-icon>
          </nuxt-link>
        </v-list-item>
        <v-list-item class="pa-0">
          <nuxt-link class="side-links" :to="localePath('/store/products')">
            <div class="d-flex">
              <v-list-item-icon class="ps-1">
                <v-icon small>mdi-cube-outline </v-icon>
              </v-list-item-icon>
            </div>
            <v-list-item-title>{{ $t("products") }}</v-list-item-title>
            <v-icon class="mt-1" small>mdi-chevron-left</v-icon>
          </nuxt-link>
        </v-list-item>
        <v-list-item class="pa-0">
          <nuxt-link class="side-links" :to="localePath('/store/packaging')">
            <div class="d-flex">
              <v-list-item-icon class="ps-1">
                <v-icon small>mdi-package-variant-closed </v-icon>
              </v-list-item-icon>
            </div>
            <v-list-item-title>{{ $t("packaging") }}</v-list-item-title>
            <v-icon class="mt-1" small>mdi-chevron-left</v-icon>
          </nuxt-link>
        </v-list-item>
        <v-list-item class="pa-0">
          <nuxt-link class="side-links" :to="localePath('/store/giftCard')">
            <div class="d-flex">
              <v-list-item-icon class="ps-1">
                <v-icon small>mdi-cards-variant </v-icon>
              </v-list-item-icon>
            </div>
            <v-list-item-title>{{ $t("giftCards") }}</v-list-item-title>
            <v-icon class="mt-1" small>mdi-chevron-left</v-icon>
          </nuxt-link>
        </v-list-item>
        <v-list-item class="pa-0">
          <nuxt-link class="side-links" :to="localePath('/store/giftText')">
            <div class="d-flex">
              <v-list-item-icon class="ps-1">
                <v-icon small>mdi-card-text-outline </v-icon>
              </v-list-item-icon>
            </div>
            <v-list-item-title>{{ $t("giftText") }}</v-list-item-title>
            <v-icon class="mt-1" small>mdi-chevron-left</v-icon>
          </nuxt-link>
        </v-list-item>
        <v-list-item class="pa-0">
          <nuxt-link
            class="side-links"
            :to="localePath('/store/financialAccounts')"
          >
            <div class="d-flex">
              <v-list-item-icon class="ps-1">
                <v-icon small>mdi-newspaper-variant-multiple-outline </v-icon>
              </v-list-item-icon>
            </div>
            <v-list-item-title>{{ $t("financialAccounts") }}</v-list-item-title>
            <v-icon class="mt-1" small>mdi-chevron-left</v-icon>
          </nuxt-link>
        </v-list-item>
        <v-list-item class="pa-0">
          <nuxt-link class="side-links" :to="localePath('/store/bills')">
            <div class="d-flex">
              <v-list-item-icon class="ps-1">
                <v-icon small> mdi-newspaper-variant </v-icon>
              </v-list-item-icon>
            </div>
            <v-list-item-title>{{ $t("Bills") }}</v-list-item-title>
            <v-icon class="mt-1" small>mdi-chevron-left</v-icon>
          </nuxt-link>
        </v-list-item>
        <v-list-item class="pa-0">
          <nuxt-link class="side-links" :to="localePath('/store/settings')">
            <div class="d-flex">
              <v-list-item-icon class="ps-1">
                <v-icon small>mdi-cog-outline </v-icon>
              </v-list-item-icon>
            </div>
            <v-list-item-title>{{ $t("settings") }}</v-list-item-title>
            <v-icon class="mt-1" small>mdi-chevron-left</v-icon>
          </nuxt-link>
        </v-list-item>
        <v-list-item class="pa-0">
          <nuxt-link class="side-links" :to="localePath('/store/wallet')">
            <div class="d-flex">
              <v-list-item-icon class="ps-1">
                <v-icon small>mdi-wallet-plus-outline</v-icon>
              </v-list-item-icon>
            </div>
            <v-list-item-title>{{ $t("wallet") }}</v-list-item-title>
            <v-icon class="mt-1" small>mdi-chevron-left</v-icon>
          </nuxt-link>
        </v-list-item>
        <v-list-item class="pa-0">
          <nuxt-link class="side-links" :to="localePath('/store/contactUs')">
            <div class="d-flex">
              <v-list-item-icon class="ps-1">
                <v-icon small>mdi-phone-outline </v-icon>
              </v-list-item-icon>
            </div>
            <v-list-item-title>{{ $t("contactUS") }}</v-list-item-title>
            <v-icon class="mt-1" small>mdi-chevron-left</v-icon>
          </nuxt-link>
        </v-list-item>
        <v-list-item class="pa-0">
          <button
            @click.prevent="logout"
            :disabled="disabled"
            :loading="loading"
            class="side-links text-start"
          >
            <div class="d-flex">
              <v-list-item-icon class="ps-1">
                <v-icon small>mdi-cart </v-icon>
              </v-list-item-icon>
            </div>
            <v-list-item-title>{{ $t("logout") }} </v-list-item-title>
            <v-icon class="mt-1" small>mdi-chevron-left</v-icon>
          </button>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      deviceId: "123456",
      loading: false,
      disabled: false,
    };
  },

  mounted() {
    this.storeData();
  },
  computed: {
    storeRate() {
      return this.$store.state.rating;
    },
    storeimage() {
      return this.$store.state.image;
    },
    name() {
      return this.$store.state.name;
    },
  },
  methods: {
    logout() {
      (this.disabled = true),
        (this.loading = true),
        setTimeout(
          () => this.$router.push(this.localePath("/store/login")),
          2000
        );

      this.$auth.logout(),
        this.$i18n.locale == "ar"
          ? (this.$vuetify.rtl = true)
          : (this.$vuetify.rtl = false);
    },

    // Get Store Data
    storeData() {
      this.$axios.$get("profile").then((data) => {
        localStorage.setItem("storeId", data.data.storeId);
        localStorage.setItem("rating", data.data.rating);
        localStorage.setItem("image", data.data.image);
        localStorage.setItem("name", data.data.name);
        this.$store.dispatch("storeId");
        this.$store.dispatch("rating");
        this.$store.dispatch("image");
        this.$store.dispatch("name");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sideBar {
  height: 100vh !important;
  overflow-y: auto;
  .v-list-item__title {
    font-size: 11px !important;
  }
}

.v-navigation-drawer {
  height: 100vh !important;
}
.v-navigation-drawer__content {
  height: 100vh !important;
}

.sideBarContainer {
  width: 100% !important;
  height: 100% !important;
}

.side-links {
  display: flex;
  align-items: center;
  color: #878787;
  gap: 6px;
  width: 100%;
  height: 30px;
  transition: all 0.3s;
  border-inline-start: 1.5px solid #fff;

  .v-list-item__icon {
    margin: 0;
    margin-top: 3px;
  }

  // &.nuxt-link-exact-active,
  &.nuxt-link-active,
  &:hover {
    border-inline-start: 3px solid #111;
    font-weight: bold;
    color: #000;
    .v-icon {
      color: #000;
    }
  }
}
.brand-logo {
  width: 70px !important;
  height: 45px !important;

  img {
    object-fit: cover;
    object-position: top;
    border-radius: 4px;
    width: 100%;
    height: 100%;
  }
}

// EN Style
.app-container[dir="ltr"] {
  .mdi-chevron-left {
    transform: rotate(180deg);
  }
}

// Media Style
@media (max-width: 960px) {
  .sideBar {
    position: absolute;
    width: 225px;
    right: 0;
    z-index: 100;
    height: 100% !important;
    overflow-y: auto;
    box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2),
      0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
  }

  .app-container[dir="ltr"] {
    .sideBar {
      right: auto;
      left: 0;
    }
    .mdi-chevron-left {
      transform: rotate(180deg);
    }
  }
}
</style>
