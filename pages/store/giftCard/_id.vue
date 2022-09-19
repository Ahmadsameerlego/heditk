<template>
  <div class="page-container">
    <div class="content-box">
      <GiftCardForm />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {};
  },

  methods: {},
};
</script>

<style></style>
