<template>
  <form
    class="product-form-container"
    ref="form"
    @submit.prevent="handleSubmit"
  >
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.text_ar"
          name="text_ar"
          :rules="nameRules"
          :label="$t('cardNameAr')"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.text_en"
          name="text_en"
          :rules="nameRules"
          :label="$t('cardNameEn')"
          required
        ></v-text-field>
      </v-col>

      <input
        type="text"
        hidden
        v-if="cardID"
        v-model="form.textId"
        name="textId"
      />
    </v-row>

    <div class="dFlex">
      <v-btn
        :disabled="disabled"
        :loading="loading"
        color="primary"
        class="submit-button"
        type="submit"
      >
        {{ submmitBtn }}
      </v-btn>
    </div>
  </form>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      valid: true,
      disabled: false,
      loading: false,
      nameRules: [(v) => !!v || this.$t("FieldRequired")],
      Rules: [(v) => !!v || this.$t("FieldRequired")],
      form: {
        text_ar: "",
        text_en: "",
        uploads: "",
        textId: this.$route.params.id,
      },
      currentImage: "",
    };
  },

  computed: {
    cardID() {
      return this.$route.params.id;
    },

    submmitBtn() {
      return this.cardID ? this.$t("save") : this.$t("add");
    },
  },

  mounted() {
    this.cardID && this.getCard();
  },
  methods: {
    async handleSubmit() {
      const formData = new FormData(this.$refs.form);
      this.loading = true;
      this.disabled = true;

      if (!this.cardID) {
        await this.$axios
          .$post("addText", formData)
          .then(({ data }) => {
            // this.$router.push("/store/giftCard");
            this.$router.push(this.localePath("/store/giftText"));
            this.$refs.form.reset();
            this.loading = false;
            this.disabled = false;
            this.$swal.fire({
              title: this.$t("itemAdded"),
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
      } else {
        console.log(this.cardID);
        await this.$axios
          .$post("editText", formData)
          .then(({ data }) => {
            this.$router.push("/store/giftText");
            this.$refs.form.reset();
            this.loading = false;
            this.disabled = false;
            this.$swal.fire({
              title: "تم تعديل العنصر",
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
      }
    },

    gitImageSrc(imageSrc) {
      this.form.uploads = imageSrc;
      console.log(this.form.uploads);
    },

    // Edit Gift Card
    getCard() {
      // Send Param With ?
      this.$axios
        .$get("getText", { params: { textId: this.cardID } })
        .then((data) => {
          console.log(data);
          this.form.text_ar = data.data.text_ar;
          this.form.text_en = data.data.text_en;
          this.currentImage = data.data.uploads;
        });
    },
  },
};
</script>
<style lang="scss">
.v-input input {
  min-height: 40px;
  max-height: 40px !important;
}
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  border: 0px;
}

.submit-button {
  min-width: 200px !important;
  text-align: center;
  margin: 10px auto !important;
  display: block;
}

.product-form-container
  .v-select__slot
  .v-select__selections
  .v-select__selection--comma {
  top: 30px;
}
.product-form-container {
  .v-text-field__slot,
  .v-select__slot {
    display: block !important;
    height: auto !important;
  }
  label {
    position: static !important;
    right: 0 !important;
    left: auto !important;
    display: block !important;
    text-align: start !important;
    transform: translate(0, 0px) !important;
    font-size: 14px;
    color: #222 !important;
    padding-bottom: 0px;
    height: auto !important;
  }
  input {
    margin-top: 0px;
    background: #f5f5f5;
    padding: 20px;
    height: auto !important;
    border-radius: 5px;
  }

  .v-input__slot {
    &::before,
    &::after {
      content: "" !important;
      display: none !important;
    }
  }
}
</style>
