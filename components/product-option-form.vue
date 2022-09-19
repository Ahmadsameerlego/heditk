<template>
  <div class="content-box">
    <form
      class="product-form-container"
      :id="index"
      @submit.prevent="handleSubmit(index)"
    >
      <input type="text" hidden v-model="productId" name="productId" />
      <div>
        <v-row class="mt-5">
          <v-col cols="12" md="12">
            <input
              type="text"
              class="w-100"
              v-model="optionData.featureId"
              name="featureId"
              hidden
            />
            <v-select
              v-on:change="
                selectedOptions(multipleOptions, optionData.featureId, index)
              "
              v-model="multipleOptions"
              :items="optionData.options"
              item-text="featureOptionName"
              :rules="[(v) => !!v || 'Item is required']"
              :label="optionData.featureName"
              multiple
              chips
              return-object
              persistent-hint
              require="true"
            ></v-select>
            <div class="dFlex">
              <v-btn color="primary" type="submit" :id="'btn' + index">
                {{ $t("save") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    index: null,
    productId: null,
    optionData: null,
    choosedItem: [],
  },
  data() {
    return {
      disabled: false,
      loading: false,
      loadingPage: true,

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
        productId: this.productId,
        featureId: null,
        options: [],
      },

      savedIdFature: [],
      lastSelect: "",
    };
  },

  mounted() {

    this.multipleOptions = this.choosedItem.filter((el) => el.select);

    let fArr = [];
    for (let i = 0; i < this.multipleOptions.length; i++) {
      console.log(this.multipleOptions[i]["select"]);

      fArr.push(this.multipleOptions[i]["optionId"]);
    }
    this.form.options = fArr;
  },

  methods: {
    async handleSubmit(index) {
      var formData = new FormData(document.getElementById(index));
      document.getElementById("btn" + index).classList.add("diableButtons");
      //   document.getElementById("btn" + index).disabled = true;
      this.loading = true;
      this.disabled = true;
      console.log(document.getElementById("btn" + index));
      formData.append("options", JSON.stringify(this.form.options));

      await this.$axios
        .$post("featureOption", formData)
        .then((data) => {
          this.multipleOptions = [];
          this.form.options = [];

          //   this.$refs.form.reset();
          this.loading = false;
          this.disabled = false;
          this.$swal.fire({
            title: data.message,
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

    // submit option

    // selected optionId
    selectedOptions(optionsID) {
      console.log("aaaaaaa", this.form.options);
      this.form.options = [];
      let optionIdArray = [];
      let fArr = [];
      for (let i = 0; i < optionsID.length; i++) {
        optionIdArray.push(optionsID[i]["optionId"]);
      }
      this.form.options = optionIdArray;
      console.log("Options ID", optionIdArray);
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
