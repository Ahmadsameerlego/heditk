<template>
  <v-form
    class="auth-form-container"
    ref="form"
    v-model="valid"
    lazy-validation
    action
    @submit.prevent="userLogin"
  >
    <v-text-field
      v-model="formData.loginKey"
      :rules="emailRules"
      :label="$t('phoneNumberEmail')"
      required
    ></v-text-field>
    <v-text-field
      class="passwordInput"
      v-model="formData.password"
      :rules="passwordRules"
      :label="$t('password')"
      :append-icon="value ? 'mdi-eye-outline' : 'mdi-eye-remove-outline'"
      @click:append="() => (value = !value)"
      :type="value ? 'password' : 'text'"
      required
    ></v-text-field>

    <div class="d-flex align-center justify-space-between">
      <v-btn
        @click.enter="submitForm(formData)"
        :disabled="!valid"
        color="primary"
        class="mt-5"
      >
        {{ $t("Login") }}
      </v-btn>
      <nuxt-link :to="localePath('/store/login/forget-password')"
        >{{ $t("resetPassword") }}
      </nuxt-link>
    </div>
  </v-form>
</template>

<script>
export default {
  middleware: ["gust"],
  data() {
    return {
      valid: true,
      alertMsg: "",
      loginStatus: "",
      passwordRules: [(v) => !!v || this.$t("passwordRequired")],
      emailRules: [(v) => !!v || this.$t("reqFiled")],
      value: String,
      formData: {
        loginKey: "",
        password: "",
        deviceType: "web",
        deviceId: "123456",
        userType: "store",
      },
    };
  },
  methods: {
    async submitForm(formData) {
      this.valid = false;
      try {
        let response = await this.$auth.loginWith("local", {
          data: formData,
        });
        this.loginStatus = response.key;
        this.alertMsg = response.message;
        if (response.data.key == "success") {
          setTimeout(
            () => this.$router.push(this.localePath("/store/home")),
            500
          );
          console.log(response.data.data.image);
          // Save Data About Store In vuex
          localStorage.setItem("storeId", response.data.data.storeId);
          localStorage.setItem("rating", response.data.data.rating);
          localStorage.setItem("image", response.data.data.image);
          localStorage.setItem("name", response.data.data.name);
          this.$store.dispatch("storeId");
          this.$store.dispatch("rating");
          this.$store.dispatch("image");
          this.$store.dispatch("name");

          
          this.$store.dispatch("address", response.data.data.address);
          this.$store.dispatch("longitude", response.data.data.longitude);
          this.$store.dispatch("latitude", response.data.data.latitude);

          this.loginStatus = response.data.key;
          this.$auth.setUserToken(response.data.data.token);
          this.$i18n.locale == "ar"
            ? (this.$vuetify.rtl = true)
            : (this.$vuetify.rtl = false);

          this.$swal.fire({
            title: response.data.message,
            timer: 1000,
            icon: "success",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
        }
      } catch (e) {
        this.valid = true;
        console.log(e);
        this.$swal.fire({
          // title: "ادخل البيانات بشكل صحيح",
          title: e.response.data.message,

          timer: 1000,
          icon: "error",
          allowOutsideClick: false,
          showConfirmButton: false,
          showCancelButton: false,
        });
      }
    },
  },
};
</script>
<style lang="scss">
.form-alert {
  position: absolute;
  top: 0;
  left: 0;
}
.auth-form-container {
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
    padding-bottom: 10px;
    height: auto !important;
  }
  input {
    margin-top: 10px;
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

  .v-select__slot {
    .v-select__selections {
      margin-top: 10px;
      background: #f5f5f5;
      padding: 0 20px;
      border-radius: 4px;
      height: auto !important;
      .v-select__selection--comma {
        position: absolute;
        right: 8px;
        top: 30px;
        z-index: 1;
      }
      input {
      }
    }
    .v-input__append-inner {
      position: absolute;
      top: 30px;
      left: 10px;
    }
  }

  textarea {
    margin-top: 10px;
    background: #f5f5f5;
    padding: 20px;
    height: auto !important;
    border-radius: 5px;
  }

  .v-input--radio-group__input {
    flex-direction: row;
    .v-label {
      margin-top: 4px;
      font-size: 12px;
    }
  }
}

@media (min-width: 960px) {
  .auth-form-container {
    width: 70%;
    margin: 30px 0px auto;
  }
}

.app-container[dir="ltr"] {
  .product-form-container
    .v-select__slot
    .v-select__selections
    .v-select__selection--comma {
    right: auto;
    left: 8px;
  }
  .form-alert {
    left: inherit;
    right: 0;
  }
  .auth-form-container {
    label {
      position: static !important;
      right: 0 !important;
      left: auto !important;
    }

    .v-select__slot {
      .v-select__selections {
        .v-select__selection--comma {
          right: inherit;
          left: 8px;
        }
      }
      .v-input__append-inner {
        position: absolute;
        left: inherit;
        right: 10px;
      }
    }
  }
}
</style>
