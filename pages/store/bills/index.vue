<template>
  <div>
    <v-skeleton-loader
      v-if="loadingPage"
      class="mx-auto mt-3"
      type="card"
    ></v-skeleton-loader>
    <div v-else class="order-page mt-4 content-box border-b shadow-0">
      <client-only>
        <v-data-table
          class="text-center shadow-0"
          mobile-breakpoint="0"
          :headers="headers"
          :items="orderItems"
          :items-per-page="5"
          :footer-props="{
            showFirstLastPage: false,
            'items-per-page-text': '',
          }"
        >
          <template v-slot:[`item.invoicePdf`]="{ item }">
            <div class="d-flex gap-2 justify-md-end">
              <v-btn color="primary" class="a-btn-w">
                <a
                  :href="item.invoicePdf"
                  target="_blank"
                  class="tx-white"
                  dark
                >
                  {{ $t("Bill") }}
                </a>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  name: "DataTableActions",
  data() {
    return {
      search: "",
      ranking: [],
      orderStatus: null,
      orderWaitForAccept: null,
      orderProcessing: null,
      orderFinish: null,
      returnOrder: null,
      selectedState: null,
      active_el: null,
      loadingPage: true,
      headers: [
        {
          text: this.$t("orderNumber"),
          value: "orderNumber",
        },
        { text: this.$t("name_of_sender_request"), value: "user.userName" },
        { text: this.$t("orderDate"), value: "date" },
        { text: this.$t("orderTime"), value: "time" },
        { text: this.$t("orderPrice"), value: "totalPrice" },
        { text: this.$t("ShowBill"), value: "invoicePdf" },
      ],
      orderItems: [],
    };
  },

  mounted() {
    this.invoices();
  },

  methods: {
    invoices() {
      this.loadingPage = true;
      this.$axios.$get("invoices").then((res) => {
        (this.orderItems = res.data), (this.loadingPage = false);
      });
    },

    // ----------------------------------
    orderVal(orderVal) {
      this.$axios
        .$get("ordersStore", {
          params: { filter: orderVal, orderStatus: this.selectedState },
        })
        .then((res) => {
          this.orderItems = res.data.orders;
          this.loadingPage = false;
        });
    },
  },
};
</script>

<style lang="scss">
.border--bottom {
  padding-bottom: 15px !important;
  border-bottom: 1px solid #f5f5f5a9 !important;
}
.orders-type-conatiner {
  min-width: 70 0px;
  width: 100%;
  overflow-x: auto;
  padding: 5px 10px;
  .type-order {
    font-size: 14px;
    color: #737373;
    border-bottom: 2.5px solid transparent;
    transition: all 0.2s ease-in;
    padding-bottom: 3px;
    cursor: pointer;

    &.active,
    &:hover {
      color: #000;
      border-bottom: 2.5px solid #000;
    }
    .num {
      background: #f5f5f5;
      display: inline-block;
      padding: 2px 7px;
      margin: 0 3px;
      font-size: 12px;
      border-radius: 8px;
    }
  }
}
.order-page {
  .v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    text-align: center;
  }

  tr {
    cursor: pointer;
    &:hover {
      color: rgb(27, 122, 177);
    }
  }

  td {
    position: relative;
    // cursor: pointer;
    &:hover {
      &:last-child {
        color: rgb(27, 122, 177);
        &::before {
          color: rgb(27, 122, 177);
          cursor: pointer;
        }
      }
    }
    &:last-child::before {
      position: absolute;
      left: 10px;
      content: "\F0141";
      display: inline-block;
      font: normal normal normal 24px/1 "Material Design Icons";
      font-size: inherit;
      text-rendering: auto;
      line-height: inherit;
    }
  }
  .top-table {
    box-shadow: 1px 1px 1px #ccc;
    .v-text-field input {
      line-height: 27px;
      padding-bottom: 0px !important;
    }
    .v-input {
      max-width: 40%;
      background-color: #f5f5f5;
      padding: 0 !important;
      padding-inline-start: 6px !important;
      margin: 0;
      border-radius: 3px !important;
    }
    .v-input__icon {
      .v-icon {
        border-end-end-radius: 3px !important;
        border-start-end-radius: 3px !important;
        padding: 5px;
        background-color: rgb(27, 122, 177) !important;
        color: #fff !important;
        font-size: 19px;
        width: 104%;
      }
    }
    .v-text-field > .v-input__control > .v-input__slot:before {
      display: none;
    }
  }
}

.app-container[dir="ltr"] {
  .order-page {
    td {
      &:last-child::before {
        right: 10px;
        left: auto;
        transform: rotate(180deg);
      }
    }
  }
}
</style>