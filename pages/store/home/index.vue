<template>
  <div>
    <!-- Status Card -->
    <Transaction-status :cardData="cardData" />

    <client-only>
      <v-skeleton-loader
        v-if="loadingPage"
        class="mx-auto mt-3"
        type="card"
      ></v-skeleton-loader>
      <div v-else class="content-box border-b shadow-0 pa-3">
        <v-card class="shadow-0">
          <div class="d-flex-center justify-space-between mb-4">
            <p class="side-p">{{ $t("best_selling") }}</p>
            <div class="d-flex gap-2 align-center">
              <order-sort
                :reset="reset"
                @orderVal="orderVal"
                :ranking="ranking"
              />
              <v-btn color="primary pa-0 rest-btn" @click="refrechAsyncData()">
                <v-icon class="me-1"> mdi-restart </v-icon>
              </v-btn>
            </div>
          </div>
          <v-data-table
            mobile-breakpoint="0"
            :search="search"
            :headers="bestSellHeader"
            :items="bestSellitems"
            :items-per-page="5"
            :disable-sort="true"
            :footer-props="{
              showFirstLastPage: false,
              'items-per-page-text': '    ',
            }"
            class="shadow-0"
            item-key="id"
          >
          <!--  -->
            <template v-slot:[`item.product`]="{ item }">
              <div class="d-flex gap-2 pa-2 ps-0">
                <img
                  width="90px"
                  height="60px"
                  class="cover-top rounded border-b"
                  v-for="upload in item.uploads"
                  :key="upload"
                  :src="upload"
                />
                <div>
                  <p>{{ item.productName }}</p>
                  <div class="tx-gray">{{ item.description }}</div>
                </div>
              </div>
            </template>


            <!-- parts -->
            <template v-slot:[`item.parts`]="{ item }">
              <div class="d-flex gap-2 pa-2 ps-0">
                <p>{{ item.departmentName }}</p> , <p>{{ item.subDepartName }}</p>
              </div>
            </template>

            <!-- number available -->
            <template v-slot:[`item.avilables`]="{ item }">
              <div class="d-flex gap-2 pa-2 ps-0">
                <p>{{ item.count }}</p> 
              </div>
            </template>

            <!-- number of sells -->
            <template v-slot:[`item.count`]="{ item }">
              <div class="d-flex gap-2 pa-2 ps-0">
                <p>{{ item.countSell }}</p> 
              </div>
            </template>

            <!-- price -->
            <template v-slot:[`item.price`]="{ item }">
              <div class="d-flex gap-2 pa-2 ps-0">
                <p v-html="item.priceDisplay" style="display:flex; flex-direction: column; width: 50px;"></p> 
              </div>
            </template>




            <template v-slot:[`item.rate`]="{ item }">
              <rating :readonly="true" :ratingStore="item.rating" />
            </template>
          </v-data-table>
        </v-card>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  layout: "default",
  computed: {
    storeID() {
      return this.$store.state.storeId;
    },
  },
  data() {
    return {
      ranking: [],
      search: "",
      cardData: [],
      reset: false,
      notficationNum: null,
      storesID: null,
      bestSellHeader: [
        { text: this.$t("products"), value: "product" },
        { text: this.$t("parts"), value: "parts" },
        { text: this.$t("number_avilable"), value: "avilables" },
        { text: this.$t("number_of_sales"), value: "count" },
        { text: this.$t("price"), value: "price" },

        { text: this.$t("rate"), value: "rate" },
      ],
      bestSellitems: [],
      uploads :[],
    };
  },

  asyncData({ $axios }) {
    return $axios.$get("storeIndexUpdate").then((res) => {
      return {
        bestSellitems: res.data.products,

        // storesID: res.data.stores.storeId,
        cardData: res.data.steps,
        ranking: res.data.ranking,
        notficationNum: res.data.notifyCount,
        loadingPage: false,
        reset: false,
      };
      console.log(this.bestSellitems)

    });
  },
  methods: {
    refrechAsyncData() {
      this.$nuxt.refresh();
      this.reset = true;
    },
    orderVal(orderVal) {
      this.loadingPage = true;
      this.$axios
        .$get("storeIndex", { params: { filter: orderVal } })
        .then((res) => {
          (this.orderItems = res.data), (this.loadingPage = false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application .elevation-1 {
  box-shadow: none;
}
.cover-top {
  object-fit: cover;
  object-position: top;
}
</style>
