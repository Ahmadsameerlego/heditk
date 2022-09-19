<template>
  <div class="lang-options p-0 m-0 d-flex gap-2 ms-5 me-4">
    <div class="selected-lang-container">
      <v-btn
        @click="changeLang"
        depressed
        class="selected-lang d-flex align-center justify-center"
      >
        <span class="lang-name">
          {{ this.$i18n.locale == "ar" ? "عربي" : "english" }}
        </span>
        <img
          :src="
            this.$i18n.locale == 'ar'
              ? require('../assets/imgs/egypt.png')
              : require('../assets/imgs/united-kingdom.png')
          "
          class="flag-img"
          alt=""
        />
      </v-btn>
      <div
        transition="slide-y-transition"
        v-if="LangOption"
        :elevation="6"
        class="lang-dropdown pa-1 d-flex flex-column align-center justify-center"
      >
        <div
          @click="chooseLang"
          class="lang-en mt-2 d-flex align-center justify-center"
        >
          <router-link
            class="d-flex align-center justify-center"
            :to="
              this.$i18n.locale == 'ar'
                ? switchLocalePath('en')
                : switchLocalePath('ar')
            "
          >
            <span> {{ this.$i18n.locale == "ar" ? "english" : "عربي" }} </span>
            <img
              :src="
                this.$i18n.locale == 'ar'
                  ? require('../assets/imgs/united-kingdom.png')
                  : require('../assets/imgs/egypt.png')
              "
              class="flag-img"
              alt=""
            />
          </router-link>
        </div>
      </div>
    </div>
    <!-- <v-btn @click="$vuetify.rtl = false">Toggle</v-btn> -->
  </div>
</template>
<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      LangOption: false,
      currentFlag: "",
      currentLang: "",
    };
  },
  mounted() {
    this.$i18n.locale == "ar"
      ? (this.$vuetify.rtl = true)
      : (this.$vuetify.rtl = false);
  },
  methods: {
    changeLang() {
      this.LangOption = !this.LangOption;
    },

    chooseLang({ app }) {
      console.log("data.data.name");

      this.LangOption = false;

      // onBeforeLanguageSwitch called right before setting a new locale
      this.$i18n.onBeforeLanguageSwitch = (
        oldLocale,
        newLocale,
        isInitialSetup,
        context
      ) => {
        // console.log(1, oldLocale, newLocale, isInitialSetup);
        this.LangOption = false;
      };
      // onLanguageSwitched called right after a new locale has been set
      this.$i18n.onLanguageSwitched = (oldLocale, newLocale) => {
        // console.log(2, oldLocale, newLocale);
        this.LangOption = false;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.selected-lang-container {
  position: relative;
  .lang-dropdown {
    z-index: 10;
    background: #eee;
    border-radius: 5px;
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    min-width: 110px;
  }
  .flag-img {
    object-fit: cover;
    width: 30px;
    height: 15px;
  }
  span,
  a {
    min-width: 50px;
    display: inline-block;
    font-size: 14px;
    color: rgb(18, 59, 87);
    margin: 0 10px;
  }
}
</style>