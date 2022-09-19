<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn :color="color" class="min-btn-w" v-bind="attrs" v-on="on">
          <v-icon class="ms-2 me-2"> mdi-paper-roll-outline </v-icon>
          {{ $t("ShowBill") }}
        </v-btn>
      </template>

      <v-card class="scroll-responsive">
        <div class="bill-header d-flex pa-3 align-center justify-space-between">
          <v-btn text @click="dialog = false">
            <v-icon small> mdi-close-circle </v-icon>
          </v-btn>
          <div class="brand-logo d-flex justify-center align-center">
            <img class="img-cover center-logo" src="~/assets/imgs/logoblack.png" />
          </div>
          <a href="kkk" color="primary" download>
            <v-icon class="tx-main"> mdi-download </v-icon>
          </a>
        </div>

        <div class="bill-content pa-4 siz-14">
          <!-- Bill Info -->
          <v-row class="Bill-Info bill-box">
            <v-col cols="6">
              <span>{{ $t("billNumber") }}:</span>
              <span>324134</span>
            </v-col>
            <v-col cols="6">
              <span>{{ $t("orderNumber") }}:</span>
              <span>324134</span>
            </v-col>
            <v-col cols="6">
              <span>{{ $t("orderDate") }}:</span>
              <span>324134</span>
            </v-col>
            <v-col cols="6">
              <span>{{ $t("orderTime") }}:</span>
              <span>324134</span>
            </v-col>
          </v-row>
          <!-- order Details -->
          <v-row class="order-details-bill bill-box">
            <v-col cols="12">
              <span>{{ $t("orderDetails") }}:</span>
              <span>52345</span>
            </v-col>
            <v-col cols="6">
              <span>{{ $t("productName") }}:</span>
              <span>324134</span>
            </v-col>
            <v-col cols="6">
              <span>{{ $t("productPrice") }}:</span>
              <span>324134</span>
            </v-col>
          </v-row>
          <!-- store Details -->
          <v-row class="store-details-bill bill-box">
            <v-col cols="12">
              <span>{{ $t("storeDetails") }}:</span>
              <span>52345</span>
            </v-col>
            <v-col cols="6">
              <span>{{ $t("storeName") }}:</span>
              <span>324134</span>
            </v-col>
            <v-col cols="6">
              <span>{{ $t("CommercialRegistrationNo") }}:</span>
              <span>324134</span>
            </v-col>
          </v-row>
          <!-- order Quantity -->
          <v-row class="order-quantity-bill bill-box">
            <v-col xs="12">
              <span>{{ $t("productsNumber") }}:</span>
              <span>52345</span>
            </v-col>
            <v-col cols="6">
              <span>{{ $t("paymentMethood") }}:</span>
              <span>324134</span>
            </v-col>
            <v-col cols="6">
              <span>{{ $t("shippingBy") }}:</span>
              <span>324134</span>
            </v-col>
            <v-col cols="6">
              <span>{{ $t("deliveryFee") }}:</span>
              <span>324134</span>
            </v-col>
            <v-col cols="6">
              <span>{{ $t("discountValue") }}:</span>
              <span>324134</span>
            </v-col>
            <v-col cols="6">
              <span>{{ $t("total") }}:</span>
              <span>324134</span>
            </v-col>
          </v-row>
        </div>

        <div class="text-center pa-5">
          <qr-code
            class="d-inline m-auto qr-img"
            text="https://goo.gl/9eIWP9"
            size="100"
            color="#000"
            bg-color="#fff"
            error-level="L"
          >
          </qr-code>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  props: {
    color: "",
    showBill: "",
  },
  data() {
    return {
      dialog: this.showBill,
    };
  },
  methods: {
    onDecode(decodedString) {
      alert(decodedString);
    },
  },
};
</script>

<style scoped lang="scss">
.center-logo {
  width: 150px;
}

.bill-content {
  .bill-box {
    color: #666464 !important;
    border-bottom: 1px solid #ccc;

    div {
      padding-bottom: 5px;
    }
    &:last-child {
      border-bottom: 1px solid rgba(204, 204, 204, 0);
    }
  }
}
</style>
