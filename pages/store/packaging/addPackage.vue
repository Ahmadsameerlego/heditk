<template>
  <div class="content-box">
    <wrap-card-form />
  </div>
</template>

<script>
import wrapCardForm from "~/components/wrap-card-form.vue";
export default {
  middleware: ["auth"],
  components: { wrapCardForm },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style></style>
