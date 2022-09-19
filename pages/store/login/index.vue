<template class="posetion-relative">
  <div class="content-box">
    <auth-form />
  </div>
</template>

<script>
export default {
  layout: "guest",
  middleware: ["guest"],

  mounted() {
    localStorage.clear();
    this.$i18n.locale == "ar"
      ? (this.$vuetify.rtl = true)
      : (this.$vuetify.rtl = false);
  },
};
</script>
<style lang="scss" scoped>
@media (min-width: 960px) {
  .content-box {
    width: 70%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
