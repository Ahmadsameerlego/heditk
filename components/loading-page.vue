<template>
  <div class="laoding-page" v-if="loadingPage">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  props: { loadingPage: "true" },
};
</script>

<style>
.laoding-page {
  width: 100vh;
  height: 100vw;
  position: fixed;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
