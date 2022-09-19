<template>
  <div class="order-details">
    <!-- Order Info -->

    <v-skeleton-loader
      v-if="loadingPage"
      type="actions, list-item-three-line,card-heading"
    ></v-skeleton-loader>
    <div v-else class="order-info">
      <div class="content-box pb-6">
        <v-row>
          <v-col cols="12" lg="8">
            <div class="orderNum siz-14">
              {{ $t("orderNumber") }}: {{ orderInfo.orderNumber }}
            </div>
            <v-row class="mt-3">
              <v-col class="pt-0 pb-2 siz-12" sm="6" xs="12">
                {{ $t("orderTime") }}: {{ orderInfo.orderTime }}
              </v-col>
              <v-col class="pt-0 pb-2 siz-12" sm="6" xs="12">
                {{ $t("paymentMethood") }}:
                <span class="tx-main">{{ orderInfo.paymentMethood }}</span>
              </v-col>
              <v-col class="pt-0 pb-2 siz-12" sm="6" xs="12">
                {{ $t("orderDate") }}: {{ orderInfo.orderDate }}
              </v-col>
              <v-col class="pt-0 pb-2 siz-12" sm="6" xs="12">
                {{ $t("shippingBy") }}: {{ orderInfo.shippingBy }}
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" lg="4">
            <div class="d-flex gap-2 align-center siz-14 justify-end">
              <div class="order-status">
                <v-btn color="" class="min-btn-w tx-main shadow-0 show-only">
                  {{ orderInfo.status }}
                </v-btn>
              </div>
              <div class="show-bill" v-if="bill.invoicePdf">
                <v-btn color="primary pa-0">
                  <a
                    :href="bill.invoicePdf"
                    target="_blank"
                    class="min-btn-w bg-main text--white"
                  >
                    <v-icon class="ms-2 me-2"> mdi-paper-roll-outline </v-icon>
                    {{ $t("ShowBill") }}
                  </a>
                </v-btn>

                <!-- <v-btn color="primary">{{ orderInfo.status }}</v-btn> -->
                <!-- <pop-up-bill :showBil="showBill" :color="BillButton" /> -->
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- order Tabel -->
    <v-skeleton-loader
      v-if="loadingPage"
      class="mt-3"
      type="card-heading, image, actions"
    ></v-skeleton-loader>
    <div
      v-else
      class="products-tabel main-table-contant content-box border-b shadow-0 order-details mt-5"
    >
      <client-only>
        <v-data-table
          mobile-breakpoint="0"
          class="elevation-1"
          :headers="headers"
          :items="items"
          :items-per-page="5"
          :footer-props="{
            showFirstLastPage: false,
            'items-per-page-text': '    ',
          }"
        >
          <template v-slot:[`item.productInfo`]="{ item }">
            <div class="d-flex justify-center gap-1 pa-2 ps-0">
              <v-img
                alt=""
                lazy-src="https://picsum.photos/id/11/10/6"
                class="cover tableImage rounded"
                :src="item.uploads[0]"
              ></v-img>
              <div class="siz-10">
                <p class="m-0">{{ item.productName }}</p>
                <div class="tx-gray">{{ item.description }}</div>
              </div>
            </div>
          </template>

          <template v-slot:[`item.full_department`]="{ item }">
            {{ item.departmentName }}, {{ item.subDepartName }}
          </template>
        </v-data-table>
      </client-only>
    </div>

    <!-- order Note -->
    <v-skeleton-loader
      v-if="loadingPage"
      class="mt-3"
      type=" divider, list-item-three-line, card-heading, image, actions"
    ></v-skeleton-loader>
    <div v-else class="content-box mt-5">
      <h3>{{ $t("orderNote") }}</h3>
      <p v-if="orderInfo.orderNote">{{ orderInfo.orderNote }}</p>
      <p class="text-center mt-3 tx-main font-weight-bold" v-else>
        {{ $t("noOrderNote") }}
      </p>
    </div>

    <!--Sender And receiver info -->
    <v-skeleton-loader
      v-if="loadingPage"
      class="mt-3"
      type=" divider, list-item-three-line, card-heading, image, actions"
    ></v-skeleton-loader>
    <v-row v-else class="Sender_receiver_info mt-3">
      <v-col v-if="clintInfo.user" cols="12" md="6">
        <div class="content-box h-100">
          <div class="font-weight-bold mb-3">{{ $t("senderInfo") }}</div>
          <p class="siz-14">{{ clintInfo.user.userName }}</p>
          <p class="siz-14">{{ clintInfo.user.phoneNo }}</p>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="content-box h-100">
          <div class="font-weight-bold mb-3">{{ $t("receiverInfo") }}</div>
          <p class="siz-14">{{ clintInfo.receiver.userName }}</p>
          <p class="siz-14">{{ clintInfo.receiver.phoneNo }}</p>
          <p class="siz-14">{{ clintInfo.receiver.address }}</p>
        </div>
      </v-col>
    </v-row>

    <!-- order deta -->
    <v-skeleton-loader
      v-if="loadingPage"
      class="mt-3"
      type=" divider, list-item-three-line, card-heading, image, actions"
    ></v-skeleton-loader>
    <div v-else class="content-box order-val mt-5">
      <div class="d-flex justify-center gap-2 bg-body pa-4">
        <div>{{ $t("orderValue") }}</div>
        <div>{{ $t("deliveryFee") }}</div>
        <div>{{ $t("discountValue") }}</div>
        <div>{{ $t("total") }}</div>
      </div>
      <div class="d-flex justify-center gap-2 tx-main pa-4">
        <div>{{ orderInfo.orderPrice }}</div>
        <div>{{ orderInfo.deliveryPrice }}</div>
        <div>{{ orderInfo.discount }}</div>
        <div>{{ orderInfo.totalPrice }}</div>
      </div>
    </div>

    <!-- Order Actions -->

    <!-- waitForAccept -->
    <div
      v-if="orderInfo.orderStatus == 'waitForAccept'"
      class="actions dFlex gap-2"
    >
      <div class="text-center mt-5">
        <v-btn
          @click="acceptOrder(acceptOrder)"
          color="primary"
          class="pa-5 min-btn-w"
        >
          {{ $t("acceptOrder") }}
        </v-btn>
      </div>
      <div class="text-center mt-5">
        <v-btn
          @click="rejectOrder(rejectOrder)"
          color="red"
          dark
          class="pa-5 min-btn-w"
          >{{ $t("rejectOrder") }}
        </v-btn>
      </div>
    </div>

    <!-- startOrderProcessing -->
    <div
      v-if="orderInfo.orderStatus == 'startOrderProcessing'"
      class="actions dFlex gap-2"
    >
      <div class="text-center mt-5">
        <v-btn
          @click="orderConadtion(orderInfo.orderStatus)"
          color="primary"
          class="pa-5 min-btn-w"
          >{{ orderInfo.status }}
        </v-btn>
      </div>
    </div>
    <!-- confirmOrderProcessing -->
    <div
      v-if="orderInfo.orderStatus == 'confirmOrderProcessing'"
      class="actions dFlex gap-2"
    >
      <div class="text-center mt-5">
        <v-btn
          @click="orderConadtion(orderInfo.orderStatus)"
          color="primary"
          class="pa-5 min-btn-w"
        >
          {{ orderInfo.status }}
        </v-btn>
      </div>
    </div>
    <!-- startDeliveryOrder -->
    <div
      v-if="orderInfo.orderStatus == 'startDeliveryOrder'"
      class="actions dFlex gap-2"
    >
      <div class="text-center mt-5">
        <v-btn
          @click="orderConadtion(orderInfo.orderStatus)"
          color="primary"
          class="pa-5 min-btn-w"
        >
          >{{ orderInfo.status }}
        </v-btn>
      </div>
    </div>
    <!-- confirmDeliveryOrder -->
    <div
      v-if="orderInfo.orderStatus == 'confirmDeliveryOrder'"
      class="actions dFlex gap-2"
    >
      <div class="text-center mt-5">
        <v-btn
          @click="orderConadtion(orderInfo.orderStatus)"
          color="primary"
          class="pa-5 min-btn-w"
        >
          >{{ orderInfo.status }}
        </v-btn>
      </div>
    </div>
    <!-- finishOrder -->
    <!-- <div
      v-if="orderInfo.orderStatus == 'finishOrder'"
      class="actions dFlex gap-2"
    >
      <div class="text-center mt-5">
        <v-btn
          @click="orderConadtion(orderInfo.orderStatus)"
          color="primary"
          class="pa-5 min-btn-w"
          >{{ $t("finishOrder") }}
        </v-btn>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      BillButton: "primary",
      loadingPage: true,
      showBill: true,
      orderInfo: {
        orderStatus: null,
        orderNumber: null,
        orderDate: null,
        orderTime: null,
        paymentMethood: null,
        shippingBy: null,
        status: null,
        orderNote: null,
        orderPrice: null,
        deliveryPrice: null,
        discount: null,
        totalPrice: null,
      },

      // sender and resiver
      clintInfo: {
        user: {
          userName: null,
          phoneNo: null,
        },
        receiver: {
          userName: null,
          phoneNo: null,
          address: null,
        },
      },

      // bill
      bill: {
        invoicePdf: null,
      },
      // Tabel
      headers: [
        { text: this.$t("products"), value: "productInfo" },
        { text: this.$t("department"), value: "full_department" },
        { text: this.$t("features"), value: "details" },
        { text: this.$t("price"), alagin: "center", value: "price" },
        { text: this.$t("quantity"), value: "count" },
        { text: this.$t("productPrice"), value: "priceProduct" },
      ],
      items: [],
    };
  },

  computed: {
    orderId() {
      return this.$route.params.id;
    },
  },

  mounted() {
    this.getOrderDetails();
  },

  methods: {
    // Edit Gift Card
    getOrderDetails() {
      // Send Param With ?
      this.$axios
        .$get("orderDetails", {
          params: { orderId: this.orderId, userType: "store" },
        })
        .then((res) => {
          // Start Order Info
          this.orderInfo.orderStatus = res.data.order.orderStatus;
          this.orderInfo.orderStatusName = res.data.order.orderStatusName;
          this.orderInfo.orderNumber = res.data.order.orderNumber;
          this.orderInfo.orderDate = res.data.order.date;
          this.orderInfo.orderTime = res.data.order.time;
          this.orderInfo.paymentMethood = res.data.order.paymentMethod;
          this.orderInfo.shippingBy = res.data.order.delivery;
          this.orderInfo.status = res.data.order.orderStatusName;
          this.orderInfo.orderNote = res.data.order.notes;
          this.orderInfo.orderPrice = res.data.order.orderPrice;
          this.orderInfo.deliveryPrice = res.data.order.deliveryPrice;
          this.orderInfo.discount = res.data.order.discount;
          this.orderInfo.totalPrice = res.data.order.totalPrice;
          // Start Products Table
          this.items = res.data.order.products;
          // user data
          this.clintInfo.user.userName = res.data.order.user.userName;
          this.clintInfo.user.phoneNo = res.data.order.user.phoneNo;
          this.clintInfo.receiver.userName = res.data.order.receiver.userName;
          this.clintInfo.receiver.phoneNo = res.data.order.receiver.phoneNo;
          this.clintInfo.receiver.address = res.data.order.receiver.address;
          // bill
          this.bill.invoicePdf = res.data.order.invoicePdf;

          // Loading
          this.loadingPage = false;
        });
    },

    // order Actions
    acceptOrder() {
      this.$axios
        .$put("acceptRejectOrder", {
          orderId: this.orderId,
          orderStatus: "acceptOrder",
          userType: "store",
        })
        .then((res) => {
          // console.log(res.data.order.orderStatusName);
          this.$router.push(this.localePath(`/store/order`));
          this.$swal.fire({
            title: res.data.order.orderStatusName,
            timer: 1000,
            icon: "success",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
        });
    },
    rejectOrder() {
      this.$axios
        .$put("acceptRejectOrder", {
          orderId: this.orderId,
          orderStatus: "rejectOrder",
          userType: "store",
        })
        .then((res) => {
          // console.log(res.data.order.orderStatusName);
          this.$router.push(this.localePath(`/store/order`));
          this.$swal.fire({
            title: res.data.order.orderStatusName,
            timer: 1000,
            icon: "fail",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
        });
    },
    orderConadtion(orderStatus) {
      this.$axios
        .$put("changeOrderStatus", {
          orderId: this.orderId,
          orderStatus: orderStatus,
          userType: "store",
        })
        .then((res) => {
          console.log(res.data);
          this.orderInfo.orderStatus = res.data.order.orderStatus;

          // this.$router.push(this.localePath(`/store/order`));
          this.$swal.fire({
            title: res.data.order.orderStatusName,
            timer: 1000,
            icon: "fail",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.order-val {
  overflow-x: auto;
  .d-flex {
    flex-wrap: nowrap;
    min-width: 750px;
    div {
      flex: 1 1 70px;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
