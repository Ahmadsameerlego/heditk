<template>
  <v-card class="single-page">
    <v-list-item-icon class="ps-1 tx-canter-m">
      <v-icon x-large>mdi-cash-multiple </v-icon>
    </v-list-item-icon>
    <h2>{{ cash }}</h2>
    <v-btn color="primary" class="mt-3" @click.prevent="settlement()">{{
      $t("settlement")
    }}</v-btn>
  </v-card>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      cash: "",
    };
  },

  mounted() {
    this.$axios
      .$get("walletOrPoints", {
        params: { type: "wallet" },
      })
      .then((res) => {
        this.cash = res.data;
      });
  },

  methods: {
    settlement() {
      this.$axios
        .$post("settlement", {
          token: localStorage.getItem("auth._token.local"),
        })
        .then((res) => {
          this.$swal.fire({
            title: res.message,
            timer: 1000,
            icon: "success",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
        });
    },
  },
  // asyncData({ $axios }) {
  //   return $axios.$get("walletOrPoints", params: {type:"wallet"}).then((res) => {
  //     return {
  //
  //     };
  //   });
  // },
};
</script>

<style lang="scss">
.tx-canter-m {
  text-align: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
.single-page {
  background: #fff;
  height: 90vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  .v-icon {
    font-size: 10rem !important;
    color: #000;
  }
}
</style>
