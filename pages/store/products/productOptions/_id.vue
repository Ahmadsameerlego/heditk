<template>
  <div class="content-box">
    <!-- <div class="note">{{ $t("saveFirst") }}</div> -->

    <!-- <v-sheet v-if="loadingPage" class="pa-3">
      <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
    </v-sheet> -->
    <product-option-form
      v-for="(optionData, index) in alloptionsData"
      :key="optionData.featureId"
      :index="index"
      :optionData="optionData"
      :productId="productId"
      :choosedItem="alloptionsData[index].options"
    />

    <v-btn color="mt-11" class="submit-button ma-0">
      <nuxt-link
        :to="
          productId
            ? localePath(`/store/products/productPrice/${productId}`)
            : localePath(`/store/products/productPrice`)
        "
      >
        الذهاب الي الاسعار
      </nuxt-link>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
      loading: false,
      loadingPage: true,
      choosedItems: null,
      multipleOptions: [],
      nameRules: [(v) => !!v || this.$t("reqFiled")],
      alloptionsData: [],
    };
  },
  computed: {
    productId() {
      return this.$route.params.id;
    },
  },

  mounted() {
    this.$axios
      .$get("productFeatureOptions", {
        params: { productId: this.productId },
      })
      .then((res) => {
        this.allfeatures = res.data;
        this.alloptionsData = res.data;
        console.log(res.data);
        console.log(res.data[0].options);
        this.loadingPage = false;
      });
  },
};
</script>

<style>
.diableButtons {
  opacity: 0.1;
  background: #1b7ab1ad;
}
</style>
