<template>
  <form
    class="product-form-container"
    ref="form"
    @submit.prevent="handleSubmit"
  >
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.firstName"
          name="firstName"
          :rules="nameRules"
          :label="$t('firstName')"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.lastName"
          name="lastName"
          :rules="nameRules"
          :label="$t('lastName')"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.email"
          name="email"
          :rules="emailRules"
          :label="$t('email')"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.phoneNo"
          name="phoneNo"
          :rules="nameRules"
          :label="$t('phoneNo')"
          required
          type="number"
        ></v-text-field>
      </v-col>

      <!-- start topic -->
      <v-col cols="12" md="6" class="select-department">
        <v-select
          v-on:change="selected_topicID(`${selectedTopic.topicId}`)"
          :label="$t('topic')"
          v-model="selectedTopic"
          :items="allTopics"
          item-text="topicName"
          filled
          return-object
        ></v-select>
        <input type="text" hidden v-model="form.topic" name="topic" />
      </v-col>

      <!-- End topic -->

      <!-- Start inquiry -->
      <v-col cols="12" md="6" class="select-department">
        <v-select
          v-on:change="selected_inquiryID(`${selectedInquies.inquiryId}`)"
          :label="$t('inquiry')"
          v-model="selectedInquies"
          :items="allInquiries"
          item-text="inquiryName"
          filled
          return-object
        ></v-select>
      </v-col>
      <input type="text" hidden v-model="form.inquiry" name="inquiry" />
      <!-- end inquiry -->
    </v-row>

    <div class="dFlex">
      <v-btn
        :disabled="disabled"
        :loading="loading"
        color="primary"
        class="submit-button"
        type="submit"
      >
        {{ $t("send") }}
      </v-btn>
    </div>

    <!-- user Type -->
    <input type="text" hidden v-model="form.userType" name="userType" />
  </form>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      nameRules: [
        (v) => !!v || this.$t("reqFiled"),
       ],
      emailRules: [
        (v) => !!v || this.$t("FieldRequired"),
        (v) => /.+@.+\..+/.test(v) || this.$t("reqFiled"),
      ],
      Rules: [
        (v) => !!v || this.$t("FieldRequired"),
        (v) => /.+@.+\..+/.test(v) || this.$t("reqFiled"),
      ],
      valid: true,
      disabled: false,
      loading: false,

      contact_inquiry: null,
      contact_topics: null,

      allTopics: null,
      allInquiries: null,

      selectedTopic: {
        topicName: null,
        topicId: null,
      },
      selectedInquies: {
        inquiryName: null,
        inquiryId: null,
      },

      topics: null,
      inquies: null,
      form: {
        firstName: "",
        lastName: "",
        email: null,
        phoneNo: null,
        topic: null,
        inquiry: null,
        userType: "user",
      },
    };
  },

  mounted() {
    // Get topics and inquires
    this.$axios.$get("topics-inquires").then((res) => {
      this.allTopics = res.data.topics;
      this.allInquiries = res.data.inquies;

      this.selectedTopic.topicName = res.data.topicName;
      this.selectedTopic.topicName = res.data.topicId;

      this.selectedInquies.inquiryName = res.data.inquiryName;
      this.selectedInquies.inquiryName = res.data.inquiryId;
    });
  },
  methods: {
    async handleSubmit() {
      const formData = new FormData(this.$refs.form);
      this.loading = true;
      this.disabled = true;

      await this.$axios
        .$post("contactus", formData)
        .then(({ data }) => {
          this.$router.push("/store/home");
          this.$refs.form.reset();
          this.loading = false;
          this.disabled = false;
          this.$swal.fire({
            title: data.data.message,
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

    // selected topic
    selected_topicID(topicId) {
      this.form.topic = topicId;
    },
    // selected inquiry
    selected_inquiryID(inquiryId) {
      this.form.inquiry = inquiryId;
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
