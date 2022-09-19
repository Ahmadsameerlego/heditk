<template>
  <form
    class="product-form-container"
    ref="form"
    @submit.prevent="handleSubmit"
  >
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          class="passwordInput"
          v-model="form.password"
          name="oldPassword"
          :rules="passwordRules"
          :label="$t('currentPassword')"
          :append-icon="
            currentPassword ? 'mdi-eye-outline' : 'mdi-eye-remove-outline'
          "
          @click:append="() => (currentPassword = !currentPassword)"
          :type="currentPassword ? 'password' : 'text'"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          class="passwordInput"
          v-model="form.Newpassword"
          name="password"
          :rules="newPasswordRule"
          :label="$t('NewPassword')"
          :append-icon="
            newPassword ? 'mdi-eye-outline' : 'mdi-eye-remove-outline'
          "
          @click:append="() => (newPassword = !newPassword)"
          :type="newPassword ? 'password' : 'text'"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          class="passwordInput"
          v-model="form.confirmNewPassword"
          :rules="confirmRule"
          :label="$t('confirmNewPassword')"
          :append-icon="
            confirmNewPassword ? 'mdi-eye-outline' : 'mdi-eye-remove-outline'
          "
          @click:append="() => (confirmNewPassword = !confirmNewPassword)"
          :type="confirmNewPassword ? 'password' : 'text'"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <div class="dFlex">
      <v-btn
        :disabled="disabled"
        :loading="loading"
        color="primary"
        class="submit-button"
        type="submit"
      >
        {{ $t("save") }}
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
      passwordRules: [(v) => !!v || this.$t("passwordRequired")],
      newPasswordRule: [
        (v) => !!v || this.$t("passwordRequired"),
        (v) =>
          (v && v.length >= 8) || this.$t("the_password_must_be_at_least_8"),
      ],
      confirmRule: [
        (v) =>
          (!!v && this.form.Newpassword == this.form.confirmNewPassword) ||
          this.$t("confirmPassword"),
      ],
      value: String,
      currentPassword: String,
      newPassword: String,
      confirmNewPassword: String,
      form: {
        password: "",
        Newpassword: "",
        confirmNewPassword: "",
      },
    };
  },

  methods: {
    async handleSubmit() {
      if (this.form.Newpassword == this.form.confirmNewPassword) {
        const formData = new FormData(this.$refs.form);
        this.loading = true;
        this.disabled = true;

        await this.$axios
          .$post("update-passward", formData)
          .then((response) => {
            this.$router.push(this.localePath("/store/settings"));
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
              timer: 2000,
              icon: "error",
              allowOutsideClick: false,
              showConfirmButton: false,
              showCancelButton: false,
            });
            console.log("error", e);
            this.loading = false;
            this.disabled = false;
          });
      } else {
        alert("stop");
      }
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
