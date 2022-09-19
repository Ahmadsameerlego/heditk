export default function ({ app, $axios, env }) {
  // onBeforeLanguageSwitch called right before setting a new locale
  app.i18n.onBeforeLanguageSwitch = (
    oldLocale,
    newLocale,
    isInitialSetup,
    context
  ) => {
    console.log(1, oldLocale, newLocale, isInitialSetup);
    if (newLocale == "ar") {
      this.$axios.setHeader("lang", "en");
    } else {
      this.$axios.setHeader("lang", "ar");
    }
    $axios.onRequest((config) => {
      config.headers.common["Authorization"] = `Bearer ${env.WP_API_KEY}`;
    });
  };
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    console.log(2, oldLocale, newLocale);
  };
}
