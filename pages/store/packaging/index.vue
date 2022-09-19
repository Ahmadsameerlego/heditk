<template>
  <div class="page">
    <v-sheet v-if="loadingPage" class="pa-3">
      <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
    </v-sheet>
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
            <!--  -->
            <nuxt-link
              class="blok-a siz-12 align-center text--white d-flex"
              :to="localePath('/store/packaging/addPackage')"
            >
              <v-icon class="me-1" small> mdi-plus </v-icon>
              {{ $t("addNewpackage") }}
            </nuxt-link>
          </v-btn>
          <!--  -->
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
          class="shadow-0"
          :search="search"
          :headers="headers"
          :items="orderItems"
          :items-per-page="5"
          :footer-props="{
            showFirstLastPage: false,
            'items-per-page-text': '    ',
          }"
        >
          <template v-slot:[`item.giftCards`]="{ item }">
            <!--  -->
            <div class="d-flex justify-center gap-2 pa-2 ps-0">
              <v-img
                alt=""
                lazy-src="https://picsum.photos/id/11/10/6"
                class="cover tableImage rounded"
                :src="item.uploads"
              ></v-img>
            </div>
          </template>

          <template v-slot:[`item.warpId`]="{ item }">
            <div class="d-flex gap-2 justify-md-end">
              <v-btn
                color="primary"
                class="a-btn-w"
                @click="editItem(item.warpId)"
              >
                تعديل
              </v-btn>

              <v-btn
                color="red"
                class="a-btn-w"
                :id="item.warpId"
                dark
                @click="openDialog(item.warpId)"
              >
                حذف
              </v-btn>
            </div>
          </template>
        </v-data-table>

        <div v-show="orderItems.length == 0" class="noData">
          لا يوجد بيانات لعرضها
        </div>
        <v-dialog v-model="dialog" persistent max-width="400">
          <v-card class="dFlex-col">
            <v-card-title class="box-head">{{
              $t("do_you_want_to_delete")
            }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="a-btn-w"
                dark
                :id="id"
                @click="deletepackage(id)"
                color="red"
                >{{ $t("yes") }}</v-btn
              >
              <v-btn class="a-btn-w" color="primary" @click="dialog = false"
                >{{ $t("no") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      id: "",
      reset: false,
      departments: [],
      headers: [
        { text: this.$t("image"), value: "giftCards" },
        { text: this.$t("packageName"), value: "wrapName" },
        { text: this.$t("price"), value: "price" },
        { text: " ", value: "warpId" },
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
    return $axios.$get("wraps").then((res) => {
      return {
        orderItems: res.data,
        loadingPage: false,
        reset: false,
      };
    });
  },

  methods: {
    refrechAsyncData() {
      this.$nuxt.refresh();
      this.reset = true;
    },
    editItem(itemId) {
      this.$router.push(`packaging/${itemId}`);
    },

    openDialog(itemId) {
      this.id = itemId;
      this.dialog = true;
    },

    categoryId(categoryId) {
      this.$axios
        .$get("wraps", { params: { departmentId: categoryId } })
        .then((res) => {
          (this.orderItems = res.data), (this.loadingPage = false);
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
