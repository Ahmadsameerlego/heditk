<template>
  <div class="content-box">
    <GiftCardForm />
  </div>
</template>

<script>
import GiftCardForm from "~/components/Gift-card-form.vue";
export default {
  middleware: ["auth"],
  data() {
    return {};
  },

  methods: {},
  components: { GiftCardForm },
};
</script>

<style></style>
