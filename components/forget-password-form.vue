<template>
  <form
    class="product-form-container"
    ref="form"
    @submit.prevent="handleSubmit"
  >
    <v-row>
      <v-col cols="12" md="12">
        <v-text-field
          v-model="form.phoneNo"
          name="phoneNo"
          :rules="phone"
          :label="$t('mobile')"
          required
          type="number"
        ></v-text-field>
      </v-col>
      <input type="text" hidden name="userType" v-model="form.userType" id="" />
    </v-row>
    <v-btn
      :disabled="disabled"
      :loading="loading"
      color="primary"
      class="submit-button"
      type="submit"
    >
      {{ $t("send") }}
    </v-btn>
  </form>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      loading: false,
      disabled: false,
      phone: [(v) => !!v || this.$t("phoneReq")],
      value: String,
      form: {
        phoneNo: "",
        userType: "store",
      },
    };
  },
  methods: {
    async handleSubmit() {
      const formData = new FormData(this.$refs.form);
      this.loading = true;
      this.disabled = true;

      await this.$axios
        .$post("forget-password", formData)
        .then((response) => {
          this.$store.dispatch("phoneNo", this.form.phoneNo);
          this.$router.push(this.localePath("/store/login/validation-code"));
          this.$refs.form.reset();
          this.loading = false;
          this.disabled = false;

          this.$swal.fire({
            title: response.message,
            timer: 1000,
            icon: "success",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
        })
        .catch((e) => {
          this.loading = false;
          this.disabled = false;
          this.$swal.fire({
            title: e.response.data.message,
            timer: 1000,
            icon: "error",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
        });
    },
  },
};
</script>
<style lang="scss"></style>
