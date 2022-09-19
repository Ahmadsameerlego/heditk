<template class="posetion-relative">
  <div class="content-box">
    <change-password-form />
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  mounted() {
    this.$i18n.locale == "ar"
      ? (this.$vuetify.rtl = true)
      : (this.$vuetify.rtl = false);
  },
};
</script>
<style lang="scss" scoped></style>
