export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.headers.common["lang"] = "localeaaaa";
  });
}
