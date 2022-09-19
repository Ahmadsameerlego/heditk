export default function ({ app, redirect }) {
  if (app.$auth.loggedIn) {
    if (app.i18n.locale == "ar") {
      return redirect("/store/home/");
    }
    if (app.i18n.locale == "en") {
      return redirect("/en/store/home/");
    }
  }
}
