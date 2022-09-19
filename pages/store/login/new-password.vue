<template class="posetion-relative">
  <div class="content-box">
    <new-password-form />
  </div>
</template>

<script>
import newPasswordForm from "~/components/new-password-form.vue";
export default {
  components: { newPasswordForm },
  layout: "guest",
  middleware: ["guest"],

  mounted() {
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
