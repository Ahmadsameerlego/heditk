<template>
  <div class="page">
    <v-sheet v-if="loadingPage" class="pa-3">
      <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
    </v-sheet>
    <div
      v-else
      class="giftText-page main-table-contant mt-4 content-box border-b shadow-0"
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
              :to="localePath('/store/giftText/addGiftText')"
            >
              <v-icon class="me-1" small> mdi-plus </v-icon>
              {{ $t("addNewGiftText") }}
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
          <template v-slot:[`item.textId`]="{ item }">
            <div class="d-flex gap-2 justify-md-end">
              <v-btn
                color="primary"
                class="a-btn-w"
                @click="editItem(item.textId)"
              >
                تعديل
              </v-btn>

              <v-btn
                color="red"
                class="a-btn-w"
                :id="item.textId"
                dark
                @click="openDialog(item.textId)"
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
                @click="deleteText(id)"
                color="red"
                :disabled="disabled"
                :loading="loading"
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
      headers: [
        { text: this.$t("GiftText"), value: "text" },
        { text: " ", value: "textId" },
      ],
      orderItems: [],
    };
  },

  mounted() {
    // console.log(this.$i18n.locale);
    this.$axios.setHeader("lang", "this.$i18n.locale");
    this.hanelLang();
  },
  asyncData({ $axios }) {
    return $axios.$get("texts").then((res) => {
      return {
        orderItems: res.data,
        loadingPage: false,
      };
    });
  },

  methods: {
    editItem(itemId) {
      this.$router.push(`giftText/${itemId}`);
    },

    openDialog(itemId) {
      this.id = itemId;
      this.dialog = true;
    },

    deleteText(itemId) {
      this.loading = true;
      this.disabled = true;
      this.$axios
        .$delete(`deleteText`, { data: { textId: itemId } })
        .then(({ data }) => {
          this.orderItems = this.orderItems.filter(
            (Targetcard) => Targetcard.textId !== itemId
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

/*
main-table-contant >> as class for table container in 
 -- gitCard
 -- package

*/
.main-table-contant {
  .v-responsive {
    flex: inherit;
    overflow: hidden;
  }
  .v-responsive__sizer {
    padding: 0 !important;
    overflow: hidden;
  }
  .v-image__image--cover,
  .v-responsive__content {
    width: 90px !important;
    height: 60px !important;
    border: 1px solid #1b7ab186;
    padding: 0 !important;
    flex: unset;
    overflow: hidden;
  }

  tr {
    cursor: pointer;
    &:hover {
      color: rgb(27, 122, 177);
    }
  }

  td,
  tr th {
    position: relative;
    text-align: center !important;
  }
  .top-table {
    box-shadow: 1px 1px 1px #ccc;
    max-width: 100%;
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
  .main-table-contant {
    td {
      &:last-child::before {
        right: 10px;
        left: auto;
        transform: rotate(180deg);
      }
    }
  }
}

.text--white {
  color: #fff !important;
}
</style>
