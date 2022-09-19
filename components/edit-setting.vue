<template>
  <form
    class="settings-form product-form-container"
    ref="form"
    @submit.prevent="handleSubmit"
  >
    <v-row>
      <!-- Profile Image -->
      <v-col cols="12" md="12">
        <div class="mt-4">
          <UploadImage
            class="changeProfile"
            :delete="false"
            :name="uploadProfilePic"
            :currentImage="image"
            @UploadedImageSrc="gitImageSrc"
          />
        </div>
      </v-col>
      <!-- Profile Name -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.name_ar"
          name="name_ar"
          :rules="nameRules"
          :label="$t('storeNameAr')"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.name_en"
          name="name_en"
          :rules="nameRules"
          :label="$t('storeNameEn')"
          required
        ></v-text-field>
      </v-col>

      <!-- Commercial Image -->
      <v-col cols="12" md="6">
        <div class="mt-4">
          <label for="">{{ $t("CommercialRegistration") }}</label>
          <UploadImage
            :name="uploadcommercialImage"
            :currentImage="commercialImage"
            @UploadedImageSrc="gitImageSrc"
          />
        </div>
      </v-col>

      <!-- ID Image -->
      <v-col cols="12" md="6">
        <div class="mt-4">
          <label for="">{{ $t("nationalID") }}</label>
          <UploadImage
            :name="uploadnationalIdImage"
            :currentImage="nationalIdImage"
            @UploadedImageSrc="gitImageSrc"
          />
        </div>
      </v-col>

      <!-- Bank Data -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.bankName"
          name="bankName"
          :rules="nameRules"
          :label="$t('bankName')"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.accountName"
          name="accountName"
          :rules="nameRules"
          :label="$t('accountName')"
          required
        ></v-text-field>
      </v-col>
      <!-- account Number -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.accountNumber"
          name="accountNumber"
          :label="$t('accountNumber')"
          required
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.ibanNumber"
          name="ibanNumber"
          :label="$t('ibanNumber')"
          type="number"
          required
        ></v-text-field>
      </v-col>

      <!-- all allInterests -->
      <v-col cols="12">
        <label for="">{{ $t("storeallInterests") }}</label>

        <div class="allInterests-container cheackBox-content mt-4">
          <label v-for="Interest in allInterests" :key="Interest.ar">
            <input
              type="checkbox"
              v-model="form.interests"
              :value="Interest.departmentId"
              @change="changeIntersted(Interest.departmentId)"
            />
            <span class="checkbox-style">{{ Interest.ar }}</span>
          </label>
        </div>
      </v-col>

      <!-- store address -->
      <v-col cols="12 mt-4">
        <label for="">{{ $t("locations") }}</label>
        <input type="text" hidden name="address" v-model="Mapaddress" />
        <input type="text" hidden name="latitude" v-model="latitude" />
        <input type="text" hidden name="longitude" v-model="longitude" />
        <google-map />
      </v-col>

      <!-- Delivery -->
      <v-col cols="12 mt-4">
        <label for="">{{ $t("deliveryMethod") }}</label>
        <v-radio-group v-model="form.delivery" row>
          <v-radio name="delivery" label="ذاتي" value="owner"></v-radio>
          <v-radio name="delivery" label="شركه شحن" value="company"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.priceKm"
          name="priceKm"
          :label="$t('priceKm')"
          required
          type="number"
        ></v-text-field>
      </v-col>
    </v-row>

    <div class="d-flex align-items-center justify-content-center mt-5">
      <v-btn
        :disabled="disabled"
        :loading="loading"
        color="primary"
        class="submit-button"
        type="submit"
      >
        {{ $t("save") }}
      </v-btn>
      <v-btn color="primary" class="submit-button">
        <nuxt-link
          class="btn-a"
          :to="localePath('/store/settings/change-password')"
        >
          {{ $t("changePassword") }}
        </nuxt-link>
      </v-btn>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      disabled: false,
      loading: false,
      uploadProfilePic: "image",
      uploadcommercialImage: "commercialImage",
      uploadnationalIdImage: "nationalIdImage",
      nameRules: [(v) => !!v || this.$t("reqFiled")],
      emailRules: [
        (v) => !!v || this.$t("FieldRequired"),
        (v) => /.+@.+\..+/.test(v) || this.$t("reqFiled"),
      ],
      Rules: [
        (v) => !!v || this.$t("FieldRequired"),
        (v) => /.+@.+\..+/.test(v) || this.$t("reqFiled"),
      ],

      form: {
        name_ar: null,
        name_en: null,
        bankName: null,
        accountName: null,
        accountNumber: null,
        ibanNumber: null,

        interests: [],
        delivery: null,
        priceKm: null,
        commercialImage: null,
        cnationalIdImage: null,
        image: null,
      },
      allInterests: null,
      allInterestsselected: [],
      image: "",
      commercialImage: "",
      nationalIdImage: "",
    };
  },
  computed: {
    Mapaddress() {
      return this.$store.state.address;
    },
    latitude() {
      return this.$store.state.latitude;
    },
    longitude() {
      return this.$store.state.longitude;
    },
  },
  beforeMount() {
    this.storeData();
  },
  methods: {
    gitImageSrc(imageSrc) {
      this.form.image = imageSrc;
      this.form.commercialImage = imageSrc;
      this.form.cnationalIdImage = imageSrc;
      console.log(this.form.image);
      console.log(this.form.commercialImage);
      console.log(this.form.cnationalIdImage);
    },

    changeIntersted(val) {
      this.allInterestsselected.push(val);
    },

    // update Setting
    async handleSubmit() {
      const formData = new FormData(this.$refs.form);
      this.loading = true;
      this.disabled = true;
      formData.append("interests", JSON.stringify(this.form.interests));

      await this.$axios
        .$put("updateStoreProfile", formData)
        .then((data) => {
          console.log(data);
          // update data in store
          localStorage.setItem("storeId", data.data.storeId);
          localStorage.setItem("rating", data.data.rating);
          localStorage.setItem("image", data.data.image);
          localStorage.setItem("name", data.data.name);

          this.$store.dispatch("storeId");
          this.$store.dispatch("rating");
          this.$store.dispatch("image");
          this.$store.dispatch("name");

          // actions after 200
          this.$router.push(this.localePath("/store/home"));
          this.$auth.strategy.token.set(data.data.token);
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

    // Get Store Data
    storeData() {
      this.$axios.$get("profile").then((data) => {
        this.form.name_ar = data.data.name_ar;
        this.form.name_en = data.data.name_en;
        this.form.bankName = data.data.bankName;
        this.form.accountName = data.data.accountName;
        this.form.accountNumber = data.data.accountNumber;
        this.form.ibanNumber = data.data.ibanNumber;
        this.allInterests = data.data.allInterests;
        this.form.interests = data.data.interests;
        this.form.delivery = data.data.delivery;
        this.form.priceKm = data.data.priceKm;
        // this.form.address = data.data.address;
        this.$store.dispatch("address", data.data.address);
        this.$store.dispatch("longitude", data.data.longitude);
        this.$store.dispatch("latitude", data.data.latitude);

        this.commercialImage = data.data.commercialImage;
        this.nationalIdImage = data.data.nationalIdImage;
        this.image = data.data.image;
        this.newToken = data.data.token;
      });
    },
  },
};
</script>
<style lang="scss">
.allInterests-container {
  display: flex;
  gap: 15px;
  align-content: center;
  background-color: #f5f5f5;
  padding: 10px;
  flex-wrap: wrap;
  .v-input__slot {
    align-items: flex-start;
  }
  .v-label {
    color: #000 !important;
    font-size: 14px;
  }
}
.cheackBox-content {
  $--color-checkbox-border: #fff;
  $--color-checkbox-bg: #000;
  $--checkbox-width: 1.1rem;
  $--checkbox-height: 1.1rem;
  $--checkmark-width: 0.4em;
  $--checkmark-height: 0.6em;
  label {
    min-width: 50px;
  }
  label,
  input {
    cursor: pointer;
  }

  label,
  .checkbox-style {
    display: flex;
    align-items: center;
    column-gap: 1ch;
  }

  .checkbox-style {
    font-size: 12px;
    color: #000;
    &::before,
    &::after {
      content: "";
    }
    &::before {
      width: $--checkbox-width;
      height: $--checkbox-height;
      border: 1px solid #000;
      border-radius: 2px;
    }
    &::after {
      width: $--checkmark-width;
      height: $--checkmark-height;
      top: 40%;
      right: 9px;
      position: absolute;
      transform: rotate(45deg) translateY(-50%);
      border-bottom: 2px solid transparent;
      border-right: 2px solid transparent;
    }
  }

  input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    padding: 0;
    margin-bottom: 0;
    display: none;

    &:checked {
      + .checkbox-style::before {
        background-color: $--color-checkbox-bg;
      }
      + .checkbox-style::after {
        border-bottom-color: $--color-checkbox-border;
        border-right-color: $--color-checkbox-border;
      }
    }
  }

  // reset
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    position: relative;
    box-sizing: border-box;
    border: 0;
  }

  label {
    min-width: 170px;

    // flex-grow: 1;
  }
}

.changeProfile {
  overflow: hidden;
  width: 230px;
  border-radius: 5px;
  height: 90px;
  margin: 10px auto;
  position: relative;
  .input-file {
    width: 230px;
    height: 90px !important;
    border-radius: 5px;
    background: transparent !important;
    box-shadow: none !important;
    border: 0 !important;
    margin: 0 !important;
  }
  .v-input__prepend-outer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 230px;
    height: 90px !important;
    z-index: 9;
    margin: 0 !important;
  }
  fieldset {
    width: 230px;
    height: 90px;
  }
  .v-input__icon--clear,
  .icone.clear,
  .v-file-input__text {
    display: none !important;
  }
  .v-icon.v-icon.v-icon--link {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 5px;
    background: rgba(123, 123, 123, 0.493);
    transform: translate(-50%, -50%);
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
  }
  img {
    position: absolute;
    top: -20px;
    left: 0;
    width: 230px !important;
    object-fit: cover !important;
    height: 90px !important;
    display: block;
    top: 0;
    margin: 0 !important;
  }
}
</style>
