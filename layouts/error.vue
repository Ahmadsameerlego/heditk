<template>
  <v-app class="">
    <div
      color="red"
      class="d-flex flex-column justify-center align-center vh-1"
    >
      <h1>{{ $t("notFound") }}</h1>
      <NuxtLink :to="({ name: 'custom-page-name' }, localePath('/store/home'))">
        <h1 class="mt-7">{{ $t("returnToWebsite") }}</h1>
      </NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: "guest",
  middleware: ["guest"],

  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 20px;
}
.vh-1 {
  height: 100vh;
}
</style>
