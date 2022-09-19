import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  env: {
    baseUrl:
      process.env.BASE_URL || "https://newbaseproject.4hoste.com:30030/api/",
      // process.env.BASE_URL || "https://www.getpostman.com/collections/96b6aa573b410f03fbf1/",
  },
  head: {
    titleTemplate: "%s - Dashboard",
    title: "shop zone",
    script: [
      {
        hid: "stripe",
        src: "https://unpkg.com/vue-upload-multiple-image@1.1.6/dist/vue-upload-multiple-image.js",
      },
    ],
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        hid: "icon",
        type: "image/x-icon",
        href: "/fav.jpeg",
      },
    ],
  },

  router: {
    linkExactActiveClass: "exact-active-link",
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["assets/style.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/rtl-ltr.js", defer: true },
    { src: "~/plugins/qr-code.js", mode: "client" },
    { src: "~/plugins/vuetifyDir.js", mode: "client" },
    { src: "~/plugins/map.js", ssr: true },
  ],

  components: true,

  buildModules: ["@nuxtjs/vuetify"],
  // vendor: ['aframe']'

  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    // i 18
    "@nuxtjs/i18n",
    // Axios
    "@nuxtjs/axios",
    // Auth
    "@nuxtjs/auth-next",
    // alert
    "vue-sweetalert2/nuxt",
    // google map
    // [
    //   "nuxt-gmaps",
    //   {
    //     key: "AIzaSyBYYsHfLvLMjJVwKp3jm2fw9jNo_JKfvik",
    //   },
    // ],
  ],
  i18n: {

    locales: [
      { code: "en", iso: "en-US", file: require("./lang/en.json"), dir: "ltr" },
      { code: "ar", iso: "ar-EG", file: require("./lang/ar.json"), dir: "rtl" },
    ],
    defaultLocale: "ar",
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en: require("./lang/en.json"),
        ar: require("./lang/ar.json"),
      },
    },
  },

  content: {},

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    rtl: true,

    theme: {
      light: true,
      themes: {
        dark: {
          primary: "#f00",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          // main: "#000",
          primary: "#000",
          lightGray: "#f5f5f5",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {
    transpile: [/^vue2-google-maps($|\/)/],
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "sign-in", method: "post", propertyName: "token" },
          refresh: {
            url: "updateStoreProfile",
            method: "put",
            propertyName: "token",
          },

          logout: {
            url: "sign-out",
            method: "delete",
            data: { deviceId: "123456" },
          },
          user: false,
        },
        // tokenRequired: true,
        // tokenType: "",
      },
    },
    redirect: {
      login: "/store/login",
      logout: "/store/login",
      callback: "/store/login",
      home: "/store/home",
    },
  },

  axios: {
    baseURL:
      process.env.BASE_URL || "https://newbaseproject.4hoste.com:30030/api/",
      // process.env.BASE_URL || "https://www.getpostman.com/collections/96b6aa573b410f03fbf1/",
  },
  sitemap: {
    hostname: process.env.BASE_URL,
  },
};
