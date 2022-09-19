<template>
  <div class="product-details">
    <div class="product-gallary">
      <v-row>
        <v-col md="3" cols="12" class="h-100" v-if="productImages.length != 1">
          <div
            class="content-box side-image-container gap-2 d-flex align-center flex-row flex-md-column h-100"
          >
            <v-img
              @click="selectedImage(image)"
              v-for="image in productImages"
              :key="image"
              alt=""
              class="mt-3 rounded side-image"
              transition="slide-x-transition"
              lazy-src="https://picsum.photos/id/11/10/6"
              :src="image"
            ></v-img>
          </div>
        </v-col>

        <v-col :md="productImages.length != 1 ? 9 : 12" cols="12">
          <div class="content-box main-info-container">
            <v-row>
              <v-col md="4" cols="12">
                <transition name="slide-fade">
                  <v-img
                    :src="activeImage"
                    class="selectedImage rounded"
                    alt=""
                    lazy-src="https://picsum.photos/id/11/10/6"
                  >
                  </v-img>
                </transition>
              </v-col>

              <v-col md="8" cols="12">
                <div class="product-info border--bottom">
                  <div class="product-name">{{ productName }}</div>
                  <rating :readonly="true" :ratingStore="Productrating" />
                </div>
                <div class="info-text siz-14">
                  <div class="sections mt-3">
                    <span>{{ $t("sections") }}</span
                    >:
                    <span>{{ departmentName }}</span>
                  </div>
                  <div class="features mt-3" v-if="mainFeatures.length != 0">
                    <div>{{ $t("features") }}</div>
                    <v-skeleton-loader
                      v-if="loadingPage"
                      type=" actions"
                    ></v-skeleton-loader>

                    <form ref="form" @submit.prevent="handleSubmit" v-else>
                      <div class="d-flex align-items-center gap-2">
                        <input
                          type="text"
                          v-model="productId"
                          name="productId"
                          hidden
                        />

                        <div
                          v-for="feature in mainFeatures"
                          :key="feature.featureId"
                          class="select-container mt-1 select-size"
                        >
                          <label for="">{{ feature.title }}</label>
                          <select
                            @change="selectChange($event, feature.title)"
                            class="priceSelect w-100 mt-3"
                            id=""
                          >
                            <option disabled selected value>
                              --{{ $t("choose") }}--
                            </option>

                            <option
                              v-for="slectedFeature in feature.options"
                              :key="slectedFeature.optionId"
                              :value="slectedFeature.optionId"
                              :id="slectedFeature.optionId"
                              name="options"
                            >
                              {{ slectedFeature.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <v-btn
                        v-if="!loadingPage"
                        color="primary"
                        :disabled="disabled"
                        :loading="loading"
                        @click="GetPrice()"
                        class="tx-white a-btn-w mt-2"
                        >{{ $t("showPrice") }}
                      </v-btn>
                    </form>
                  </div>
                  <div class="avilNum mt-3" v-if="count">
                    <span>{{ $t("availablenumber") }}</span
                    >:
                    <span>{{ count }}</span>
                  </div>

                  <div class="priceBeforeDiscount mt-3" v-if="price">
                    <span>{{ $t("priceBeforeDiscount") }}</span
                    >:
                    <span>{{ price }}</span>
                  </div>
                  <div class="priceAfterDiscount mt-3" v-if="discount">
                    <span>{{ $t("priceAfterDiscount") }}</span
                    >:
                    <span class="tx-main">{{ discount }}</span>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="product_review_description">
      <v-row>
        <v-col md="6" cols="12" class="product_description_packaging siz-12">
          <!-- Start product_description -->
          <div class="product_description" v-if="description">
            <div class="content-box">
              {{ $t("description") }}
            </div>
            <div class="content-box mt-3">
              {{ description }}
            </div>
          </div>
          <!-- Start product_packaging -->
          <div class="product_packaging mt-4">
            <div class="content-box">
              {{ $t("packaging") }}
            </div>
            <div class="content-box mt-3">
              <div
                v-for="wrap in wraps"
                :key="wrap.warpId"
                class="product_packaging_dt d-flex justify-content-between align-center mt-3 pb-2"
              >
                <div class="image align-center d-flex gap-2 w-50">
                  <img
                    :src="wrap.uploads"
                    width="70px"
                    height="40px"
                    class="img-cover"
                    alt=""
                  />
                  <div>{{ wrap.wrapName }}</div>
                </div>
                <div class="tx-main text-e w-50">
                  {{ wrap.price }} {{ wrap.currency }}
                </div>
              </div>
            </div>
            <div class="mt-3 align-center d-flex gap-2 siz-12">
              <v-btn color="primary" class="a-btn-w">
                <nuxt-link
                  class="siz-12 tx-white d-flex"
                  :to="{
                    path: localePath(
                      `/store/products/editProduct/${productId}`
                    ),
                  }"
                >
                  {{ $t("edit") }}
                </nuxt-link>
              </v-btn>
              <v-btn color="red" class="tx-white a-btn-w" @click="openDialog()"
                >{{ $t("delete") }}
              </v-btn>

              <v-dialog v-model="dialog" persistent max-width="400">
                <v-card class="dFlex-col">
                  <v-card-title class="box-head">{{
                    $t("do_you_want_to_delete")
                  }}</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="a-btn-w"
                      dark
                      @click="deleteProduct(productId)"
                      color="red"
                      :disabled="disabled"
                      :loading="loading"
                      >{{ $t("yes") }}</v-btn
                    >
                    <v-btn
                      class="a-btn-w"
                      color="primary"
                      @click="dialog = false"
                      >{{ $t("no") }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </v-col>

        <v-col md="6" cols="12" class="product_review siz-12">
          <div class="product_review">
            <div class="content-box">
              {{ $t("productReviews") }}
            </div>
          </div>
          <div class="content-box mt-3">
            <div v-if="reviews.length != 0">
              <div
                v-for="review in reviews"
                :key="review.name"
                class="product_packaging_dt js-b d-flex align-start mt-3 pb-2"
              >
                <div>
                  <div class="image align-center d-flex gap-2 w-50">
                    <img
                      :src="review.image"
                      width="40px"
                      height="40px"
                      class="rounded-circle flex-shrink-0 img-cover"
                      alt=""
                    />
                    <div>
                      <div>{{ review.userName }}</div>
                      <rating :readonly="true" :ratingStore="review.rate" />
                    </div>
                  </div>
                  <div class="ma-3">
                    {{ review.comment }}
                  </div>
                </div>
                <div class="tx-gray text-e w-50 siz-12">
                  {{ review.timeAdd }}
                </div>
              </div>
            </div>

            <div v-else>
              {{ $t("noReviews") }}
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      disabled: false,
      loading: false,
      loadingPage: true,
      dialog: false,
      activeImage: null,
      activeImage: null,
      productImages: [],
      Productrating: null,
      productName: null,
      departmentName: null,
      description: null,
      price: null,
      count: null,
      discount: null,
      wraps: [],
      reviews: [],
      options: [],
      mainFeatures: [],

      test: {},
    };
  },

  computed: {
    productId() {
      return this.$route.params.id;
    },
  },

  mounted() {
    this.map = new Map();
    this.ProductDetails();
  },
  methods: {
    selectChange($e, title) {
      // console.log(title);
      // console.log($e.target.value);
      // this.map.set(`${title}`, $e.target.value);
      this.test[title] = $e.target.value;
      console.log(this.test);
    },

    GetPrice() {
      const array = [];

      for (const key in this.test) {
        array.push(this.test[key]);
      }
      console.log(array);

      this.options = array;
      this.price = "";
      this.count = "";
      this.$axios
        .$get("priceProduct", {
          params: {
            productId: this.productId,
            options: JSON.stringify(this.options),
          },
        })
        .then((res) => {
          console.log(res.data);
          // this.price = res.data.price;

          this.count = res.data.count;
          this.price = res.data.priceBeforeDiscount;
          this.discount = res.data.price;
          // this.discount = productDetails.discountPrice;

          this.loadingPage = false;
        })
        .catch((e) => {
          // alert(e);
          this.options = [];

          this.$swal.fire({
            title: this.$t("productNotFound"),
            timer: 1000,
            icon: "error",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
        });
    },

    selectID(id) {
      console.log("kkkkkkkkkkk", id);
    },
    openDialog() {
      this.dialog = true;
    },
    selectedImage(src) {
      this.activeImage = src;
    },

    // Get Product Details
    ProductDetails() {
      this.$axios
        .$get("storeProductDetails", { params: { productId: this.productId } })
        .then((data) => {
          let productDetails = data.data.product;
          this.productImages = productDetails.uploads;
          this.activeImage = productDetails.uploads[0];
          this.productName = productDetails.productName;
          this.Productrating = productDetails.rating;
          this.departmentName = productDetails.departmentName;
          this.description = productDetails.description;
          this.wraps = productDetails.wraps;
          this.mainFeatures = productDetails.features;
          console.log(this.mainFeatures);
          if (productDetails.type == "simple") {
            this.count = productDetails.count;
            this.price = productDetails.price;
            this.discount = productDetails.discountPrice;
          }
          //   opinions
          this.reviews = data.data.opinions;
          this.loadingPage = false;
        });
    },

    // delete Procut
    deleteProduct(id) {
      this.disabled = true;
      this.loading = false;
      this.$axios
        .$delete(`deleteProduct`, {
          data: { productId: id, userType: "store" },
        })
        .then((data) => {
          console.log(data.data);
          this.$router.push(`/store/products`);
          this.$swal.fire({
            title: this.$t("deleteDone"),
            timer: 1000,
            icon: "success",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
        });
    },
  },
};
</script>

<style lang="scss">
.v-dialog.v-dialog--active.v-dialog--persistent {
  background: #fff;
}
.js-b {
  justify-content: space-between;
}
.product-gallary {
  .side-image-container {
    background: #fff;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 350px;

    .side-image {
      width: 210px;
      max-width: 100%;
      height: 70px;
      object-fit: cover;
      // object-position: center;
      cursor: pointer;
    }
  }

  .main-info-container {
    background: #fff;
    min-height: 350px;
    .selectedImage {
      min-height: 330px;
      max-height: 100%;
      display: block;
      object-fit: cover;
      width: 100%;
    }
  }
}

.featurs-select {
  .v-input__slot {
    background: #f5f5f5 !important;
    box-shadow: none !important;
    font-size: 10px;
  }

  input,
  .v-label {
    font-size: 10px !important;
  }
}
.product_packaging_dt {
  &:not(:last-child) {
    border-bottom: 1px solid rgba(204, 204, 204, 0.568);
  }
}
@media (max-width: 960px) {
  .product-gallary .main-info-container {
    height: auto;
  }
  .product-gallary {
    .side-image-container {
      overflow-x: auto;
      overflow-y: hidden;
    }
  }
}
</style>