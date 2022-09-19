<template>
  <div class="page">
    <v-skeleton-loader
      v-if="loadingPage"
      type="actions, list-item-three-line,card-heading"
    ></v-skeleton-loader>
    <div
      v-else
      class="packaging-page main-table-contant mt-4 content-box border-b shadow-0"
    >
      <client-only>
        <!--  -->
        <v-card
          class="top-table align-center border--bottom gap-2 shadow-0 pa-1 d-flex flex-column flex-sm-row flex-wrap justify-space-between w-100 mb-1"
        >
          <v-btn color="primary">
            <!-- align-center -->
            <nuxt-link
              class="siz-12 text--white d-flex"
              :to="localePath('/store/products/new-product')"
            >
              <v-icon class="me-1" small> mdi-plus </v-icon>
              {{ $t("addNewProduct") }}
            </nuxt-link>
          </v-btn>
          <div class="d-flex justify-center gap-2 mb-1 flex-wrap">
            <div class="search-tabel">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                :label="$t('search_what_you_want')"
                single-line
                hide-details
              ></v-text-field>
            </div>
            <category-sort
              :reset="reset"
              @categoryId="categoryId"
              :departments="departments"
            />
            <v-btn color="primary pa-0 rest-btn" @click="refrechAsyncData()">
              <v-icon class="me-1"> mdi-restart </v-icon>
            </v-btn>
          </div>
        </v-card>

        <v-data-table
          mobile-breakpoint="0"
          class="shadow-0 product-table"
          :search="search"
          :headers="headers"
          :items="orderItems"
          :items-per-page="5"
          :footer-props="{
            showFirstLastPage: false,
            'items-per-page-text': '    ',
          }"
          @click:row="(item) => routeDetails(item)"
        >
          <template v-slot:[`item.uploads`]="{ item }">
            <div class="d-flex gap-1 pa-2 ps-0">
              <v-img
                alt=""
                lazy-src="https://picsum.photos/id/11/10/6"
                class="cover tableImage rounded"
                :src="item.uploads[0]"
              ></v-img>

              <div class="siz-12">
                <p class="m-0">{{ item.productName }}</p>
                <div class="tx-gray">{{ item.description }}</div>
              </div>
            </div>
          </template>
          <template v-slot:[`item.full_department`]="{ item }">
            {{ item.departmentName }}, {{ item.subDepartName }}
          </template>
          <template v-slot:[`item.rating`]="{ item }">
            <rating :readonly="true" :ratingStore="item.rating" />
          </template>
        </v-data-table>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      loading: false,
      disabled: false,
      loadingPage: true,
      search: "",
      reset: false,
      departments: [],
      headers: [
        { text: this.$t("products"), value: "uploads" },
        { text: this.$t("department"), value: "full_department" },
        { text: this.$t("count"), value: "count" },
        { text: this.$t("price"), value: "price" },
        { text: this.$t("rate"), value: "rating" },
      ],
      orderItems: [],
    };
  },

  mounted() {
    // console.log(this.$i18n.locale);
    this.$axios.setHeader("lang", "this.$i18n.locale");
    this.hanelLang();

    // Get category
    this.$axios.$get("categories").then((res) => {
      this.departments = res.data;
    });
  },

  asyncData({ $axios }) {
    return $axios.$get("products").then((res) => {
      return {
        orderItems: res.data,
        loadingPage: false,
        reset: false,
      };
    });
  },

  methods: {
    routeDetails(item) {
      // this.$router.push((`products/details/${item.productId}`));
      this.$router.push(
        this.localePath(`/store/products/details/${item.productId}`)
      );
      // this.$router.push(
      //   this.localePath(`/store/products/details/${item.productId}`)
      // );
    },

    refrechAsyncData() {
      this.$nuxt.refresh();
      this.reset = true;
    },

    categoryId(categoryId) {
      this.$axios
        .$get("wraps", { params: { departmentId: categoryId } })
        .then((res) => {
          this.orderItems = res.data;
        });
      console.log(categoryId);
    },

    deletepackage(itemId) {
      this.loading = true;
      this.disabled = true;
      this.$axios
        .$delete(`deleteWrap`, { data: { wrapId: itemId } })
        .then(({ data }) => {
          this.orderItems = this.orderItems.filter(
            (Targetcard) => Targetcard.warpId !== itemId
          );
          this.$swal.fire({
            title: this.$t("successfullyDeleted"),
            timer: 1000,
            icon: "success",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
          this.dialog = false;
          this.loading = false;
          this.disabled = false;
        })
        .catch((errors) => {
          // console.log(errors);
          this.$swal.fire({
            title: this.$t("deleteFail"),
            timer: 1000,
            icon: "error",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
          });
        });
    },
    hanelLang() {
      this.$axios.onRequest((config) => {
        config.headers["lang"] = this.$i18n.locale;
        return config;
      });
    },
  },
};
</script>

<style lang="scss">
.v-responsive {
  flex: 0 0 auto !important;
}
.product-table {
  .v-responsive__sizer {
    display: none;
  }
}
.border--bottom {
  padding-bottom: 15px !important;
  border-bottom: 1px solid #f5f5f5a9 !important;
}

.app-container[dir="ltr"] {
}

.text--white {
  color: #fff !important;
}
</style>
