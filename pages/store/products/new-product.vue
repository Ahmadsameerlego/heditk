<template>
  <div class="content-box">
    <product-form />
  </div>
</template>

<script>
import productForm from "~/components/product-form.vue";
export default {
  components: { productForm },
  middleware: ["auth"],
  data() {
    return {};
  },

  methods: {},
};
</script>

<style></style>
