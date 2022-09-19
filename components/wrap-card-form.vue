<template>
  <form
    class="product-form-container"
    ref="form"
    @submit.prevent="handleSubmit"
  >
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.name_ar"
          name="name_ar"
          :counter="30"
          :rules="nameRules"
          :label="$t('packageNameAr')"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.name_en"
          name="name_en"
          :counter="30"
          :rules="nameRules"
          :label="$t('packageNameEn')"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="select-department">
        <v-select
          v-on:change="selectedDepartmentID(selectedDepartment.departmentId)"
          v-model="selectedDepartment"
          :items="departments"
          item-text="departmentName"
          :label="$t('mainSectionName')"
          filled
          dense
          return-object
        ></v-select>
      </v-col>

      <v-col cols="12" md="6">
        <div class="">
          <label for="">{{ $t("cardimage") }}</label>
          <UploadImage
            :name="uploadName"
            :currentImage="currentImage"
            @UploadedImageSrc="gitImageSrc"
          />
        </div>
      </v-col>
      <v-col class="mt-md-n10 pa-md-6" cols="12" md="6">
        <v-text-field
          v-model="form.price"
          name="price"
          :rules="nameRules"
          :label="$t('packagePrice')"
          type="number"
          required
        ></v-text-field>
      </v-col>
      <input
        type="text"
        hidden
        v-if="cardID"
        v-model="form.wrapId"
        name="wrapId"
      />
      <input
        type="text"
        hidden
        v-model="form.departmentId"
        name="departmentId"
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
      nameRules: [(v) => !!v || this.$t("reqFiled")],

      valid: true,
      disabled: false,
      loading: false,
      uploadName: "uploads",

      departments: null,
      selectedDepartment: {
        departmentId: "",
        departmentName: "",
        ar: "",
        en: "",
      },

      form: {
        wrapId: this.$route.params.id,
        name_ar: "",
        name_en: "",
        uploads: "",
        price: "",
        departmentId: "",
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

  beforeMount() {
    this.$axios
      .$get("getWrap", { params: { wrapId: this.cardID } })
      .then((data) => {
        this.form.name_ar = data.data.name_ar;
        this.form.name_en = data.data.name_en;
        this.currentImage = data.data.uploads;
        this.form.price = data.data.price;
         this.selectedDepartment = {
          departmentName: data.data.departmentName,
          departmentId: data.data.departmentId,
        };
        // this.selectedDepartment.departmentName = data.data.departmentName;
        // this.selectedDepartment.ar = data.data.departmentName;
        // this.selectedDepartment.en = data.data.departmentName;

        // console.log(data.data.departmentName);

        this.selectedDepartment.departmentId = data.data.departmentId;
        this.selectedDepartmentID(this.selectedDepartment.departmentId);
        // console.log(data.data.departmentId);
        // alert(data.data.departmentName);
      });
  },

  mounted() {
    console.log(this.selectedDepartment.departmentName);
    this.cardID && this.getCard();
    // Get category
    this.$axios.$get("categories").then((res) => {
      this.departments = res.data;
    });
  },
  methods: {
    async handleSubmit() {
      const formData = new FormData(this.$refs.form);
      this.loading = true;
      this.disabled = true;

      if (!this.cardID) {
        await this.$axios
          .$post("addWrap", formData)
          .then(({ data }) => {
            this.$router.push("/store/packaging");
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
          .$post("editWrap", formData)
          .then((data) => {
            this.$router.push("/store/packaging");
            this.$refs.form.reset();
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
      }
    },

    // selected categoriey
    selectedDepartmentID(returnedDepartmentId) {
      this.form.departmentId = returnedDepartmentId;
    },

    gitImageSrc(imageSrc) {
      this.form.uploads = imageSrc;
      console.log(this.form.uploads);
    },

    // Edit Gift Card
    getCard() {
      // Send Param With ?
      this.$axios
        .$get("getWrap", { params: { wrapId: this.cardID } })
        .then((data) => {
          this.form.name_ar = data.data.name_ar;
          this.form.name_en = data.data.name_en;
          this.currentImage = data.data.uploads;
          this.form.price = data.data.price;
          this.form.departmentId = data.data.departmentId;
          this.selectedDepartment.departmentName = data.data.departmentName;
          this.selectedDepartment.departmentId = data.data.departmentId;
          this.selectedDepartmentID(this.selectedDepartment.departmentId);
          console.log(data.data.departmentId);
          // alert(";l");
        });
    },
  },
};
</script>
<style lang="scss">
.v-responsive__sizer {
  padding-bottom: 0 !important;
}
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

.select-department {
  .v-select__slot .v-select__selections .v-select__selection--comma {
    position: static !important;
    right: 7px;
    top: 30px;
    height: 100%;
    font-size: 14px;
  }

  .v-select__selections {
    margin-top: 6px;
    padding: 0 !important;
  }
  .v-input__icon {
    height: 0;
  }
  .v-input__slot {
    padding: 0 !important;
  }
}

.v-input__slot {
  background: transparent !important;
}
.product-form-container .submit-button {
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
