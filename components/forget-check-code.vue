<template>
  <form
    class="product-form-container"
    ref="form"
    @submit.prevent="handleSubmit"
  >
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.activationCode"
          name="activationCode"
          :rules="actvationCodeRule"
          :label="$t('activationCode')"
          required
          type="number"
        ></v-text-field>
      </v-col>

      <input type="text" hidden name="userType" v-model="form.userType" id="" />

      <input type="text" hidden name="phoneNo" v-model="form.phoneNo" id="" />
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
      actvationCodeRule: [(v) => !!v || this.$t("actvationCodereq")],
      value: String,
      form: {
        activationCode: null,
        phoneNo: "0123345683",
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
        .$post("forget-check-code", formData)
        .then((response) => {
          this.$store.dispatch("activationCode", this.form.activationCode);
          this.$router.push(this.localePath("/store/login/new-password"));
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
          console.log(e.response);
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
