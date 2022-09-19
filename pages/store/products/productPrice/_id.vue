<template>
  <div class="content-box">
    <p class="font-weight-bold">تعديل الاسعار</p>

    <div class="forms-container" ref="formsContainer">
      <div v-for="item in reqForm" :key="item">
        <price-form :index="item" />
      </div>

      <div
        v-for="currentPriceForm in currentPrices"
        :key="currentPriceForm._id"
      >
        <current-prices-form
          :currentPriceForm="currentPriceForm"
          :SelectedOptions="SelectedOptions"
          :index="currentPriceForm._id"
        />
      </div>
    </div>
    <div class="dFlex mt-8">
      <v-btn color="primary" @click="addPriceForm" class="submit-button">
        اضافه مجموعه
      </v-btn>
    </div>

    <v-btn color="mt-11" class="Flex submit-button ma-0">
      <nuxt-link :to="localePath(`/store/products/details/${productId}`)">
        انهاء المنتج
      </nuxt-link>
    </v-btn>
  </div>
</template>

<script>
import priceForm from "~/components/price-form.vue";
export default {
  middleware: ["auth"],
  components: { priceForm },
  data() {
    return {
      reqForm: 0,
      disabled: false,
      loading: false,
      loadingPage: true,
      currentPrices: null,
      SelectedOptions: null,

      multipleOptions: [],
      nameRules: [(v) => !!v || this.$t("reqFiled")],

      //features
      allfeatures: null,
      features: {
        featureId: "",
        featureName: "",
        options: "",
      },

      //options
      alloptionsData: [],
      alloptions: null,
      options: {
        optionId: "",
        featureOptionName: "",
      },

      form: {
        productCount: null,
        priceDiscount: null,
        price: null,
      },

      savedIdFature: [],
      lastSelect: "",
      cureentPrice: null,
    };
  },

  computed: {
    productId() {
      return this.$route.params.id;
    },
  },

  mounted() {
    this.$axios
      .$get("productPrices", {
        params: { productId: this.productId },
      })
      .then((res) => {
        // console.log(res.data.prices.length);
        // console.log(res.data);
        // console.log(res.data.prices);
        if (res.data.prices.length >= 0) {
          this.currentPrices = res.data.prices;
          this.SelectedOptions = res.data.features;
          // console.log(res.data.prices);
        }
      });
  },

  methods: {
    addPriceForm() {
      this.reqForm++;

      if (this.currentPrices.length > 0) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style>
.diableButtons {
  opacity: 0.1;
  background: #1b7ab1ad;
}
</style>
