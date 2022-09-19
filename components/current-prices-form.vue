<template>
  <div>
    <!-- <v-sheet v-if="loadingPage" class="pa-3">
      <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
    </v-sheet> -->
    <form
      class="product-form-container"
      :ref="index"
      @submit.prevent="handleSubmit(index)"
    >
      <div>
        <!-- Select -->
        <input type="text" hidden name="priceId" v-model="index" />
        <div
          v-for="option in SelectedOptions"
          :key="option.featureId"
          class="mt-4"
        >
          <label for="">{{ option.title }}</label>
          <select class="priceSelect w-100 mt-3" name="options" id="">
            <option
              v-for="optionSelect in option.options"
              :key="optionSelect.optionId"
              :value="optionSelect.optionId"
              :selected="
                currentPriceForm.options.includes(optionSelect.optionId)
                  ? true
                  : false
              "
            >
              <!-- 

                      :selected="
                optionSelect.optionId == '62c1ddfab58bb50983d94daf'
                  ? true
                  : false
              "
             -->
              {{ optionSelect.name }}
            </option>
          </select>
        </div>

        <div class="row mt-6">
          <div class="col-md-6 col-12">
            <div
              class="v-input theme--light v-text-field v-text-field--is-booted"
            >
              <div class="v-input__control">
                <div class="v-input__slot">
                  <div class="v-text-field__slot">
                    <v-text-field
                      v-model="form.count"
                      name="count"
                      :rules="nameRules"
                      :label="$t('count')"
                      type="number"
                      required
                    ></v-text-field>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div
              class="v-input theme--light v-text-field v-text-field--is-booted"
            >
              <div class="v-input__control">
                <div class="v-input__slot">
                  <div class="v-text-field__slot">
                    <v-text-field
                      v-model="form.price"
                      name="price"
                      :rules="nameRules"
                      :label="$t('price')"
                      type="number"
                      required
                    ></v-text-field>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-12">
            <div
              class="v-input theme--light v-text-field v-text-field--is-booted"
            >
              <div class="v-input__control">
                <div class="v-input__slot">
                  <div class="v-text-field__slot">
                    <v-text-field
                      v-model="form.discountPrice"
                      name="discountPrice"
                      :rules="nameRules"
                      :label="$t('priceAfterDiscount')"
                      type="number"
                      required
                    ></v-text-field>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dFlex">
        <button
          :ref="'btn_' + index"
          type="submit"
          class="submit-button v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary"
        >
          <span class="v-btn__content"> {{ $t("save") }} </span>
        </button>
        <button
          :ref="'delete_' + index"
          type="button"
          @click="deletePrice(index, currentPriceForm._id)"
          class="submit-button v-btn v-btn--is-elevated v-btn--has-bg tx-white v-size--default red"
          color="red"
          dark
        >
          <span class="v-btn__content"> {{ $t("delete") }} </span>
        </button>
      </div>
      <input type="text" hidden name="productId" v-model="productId" />
    </form>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  props: {
    index: null,
    currentPriceForm: null,
    SelectedOptions: null,
  },

  data() {
    return {
      nameRules: [(v) => !!v || this.$t("reqFiled")],

      selectedVal: [],
      loadingPage: true,
      optionsData: null,
      form: {
        price: null,
        count: null,
        discountPrice: null,
        options: null,
        productId: null,
      },
    };
  },

  computed: {
    productId() {
      return this.$route.params.id;
    },
  },

  mounted() {
    console.log("selects ", this.SelectedOptions);
    console.log("options must be seleted", this.currentPriceForm.options);

    if (this.currentPriceForm) {
      this.form.count = this.currentPriceForm.count;
      this.form.price = this.currentPriceForm.price;
      this.form.discountPrice = this.currentPriceForm.discountPrice;
    }
    // this.$axios
    //   .$get("productPrices", {
    //     params: { productId: localStorage.getItem("productId") },
    //   })
    //   .then((res) => {
    //     this.form.productId = localStorage.getItem("productId");
    //     this.optionsData = res.data.features;
    //     console.log(this.optionsData);
    //     this.loadingPage = false;
    //   });
  },

  methods: {
    deletePrice(index, _id) {
      this.$refs[index].classList.add("d-none");

      // this.loading = true;
      // this.disabled = true;
      this.$axios
        .$delete(`deletePrice`, { data: { priceId: _id } })
        .then((data) => {
          this.$swal.fire({
            title: this.$t("successfullyDeleted"),
            timer: 1000,
            icon: "success",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
          this.dialog = false;
          this.loading = false;
          this.disabled = false;
        })
        .catch((errors) => {
          // console.log(errors);
          this.$swal.fire({
            title: this.$t("deleteFail"),
            timer: 1000,
            icon: "error",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
        });
    },
    async handleSubmit(index) {
      var formData = new FormData(this.$refs[index]);
      this.loading = true;
      this.disabled = true;
      console.log(index);
      //   formData.append("options", JSON.stringify(this.form.options));
      await this.$axios
        .$post("prices", formData)
        .then((data) => {
          // this.multipleOptions = [];
          // this.form.options = [];

          // this.$refs[index].classList.add("d-none");
          this.loading = false;
          this.disabled = false;
          this.$swal.fire({
            // title: data.message,
            timer: 1000,
            icon: "success",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
        })
        .catch((e) => {
          console.log("error", e);
          this.loading = false;
          this.disabled = false;
        });
    },

    // createGroup() {},
  },
};
</script>