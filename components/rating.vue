<template>
  <v-rating
    class="iconeStar"
    :ratingStore="ratingStore"
    v-model="ratingStore"
    :readonly="readonly"
  ></v-rating>
</template>

<script>
export default {
  middleware: ["auth"],
  props: {
    ratingStore: "",
    readonly: "",
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.iconeStar {
  .mdi-star::before {
    color: gold !important;
    font-size: 18px;

    // background: gold !important;
  }
  .mdi-star-outline::before {
    font-size: 18px;
    color: #ccc;
  }
}
.v-rating .v-icon {
  padding: 5px 0px !important;
}
</style>
