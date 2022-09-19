<template>
  <div class="text-center sort-dropdown">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="sortBtn btn-reset align-center" v-bind="attrs" v-on="on">
          <v-btn color="primary" class="sort-shape btn-reset">
            <v-icon sm>mdi-swap-vertical </v-icon>
            <span>{{ $t("categories") }} </span>
          </v-btn>
          <div class="orderingStatus pe-1 text-center">
            {{ currentOption }}
          </div>
        </v-btn>
      </template>
      <v-list class="pa-2">
        <!-- category Filter -->
        <v-btn
          class="dropdown-btn sort-btns d-block"
          :value="item.departmentName"
          v-for="(item, index) in departments"
          :key="index"
          @click="chooseCategorie(item.departmentName, item.departmentId)"
        >
          <span> {{ item.departmentName }} </span>
        </v-btn>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  props: {
    departments: null,
    reset: null,
  },
  watch: {
    reset() {
      this.currentOption = this.$t("all");
    },
  },

  data() {
    return {
      currentOption: this.$t("all"),
    };
  },
  mounted() {
    // console.log("Ssssssssssss", this.departments);
  },
  methods: {
    chooseCategorie(categoryName, categoryId) {
      console.log(categoryId, categoryName);
      if (this.currentOption !== categoryName) {
        this.currentOption = categoryName;
        this.$emit("categoryId", categoryId);
      }
    },
  },
};
</script>

<style lang="scss">
.sort-dropdown {
  .sortBtn {
    border: 1px solid #ccc;
    padding: 2px 1px;
    display: flex;
    gap: 5px;
    justify-content: space-between;
    min-width: 200px !important;
    font-size: 11px;
    height: 40px !important;
    flex-wrap: nowrap;
    button {
      height: 40px !important;
    }
    .orderingStatus {
      display: block;
      width: 50%;
    }
    .sort-shape {
      height: 40px !important;
      width: 50%;
      display: flex;
      justify-content: flex-start;
      padding: 0 5px;
      font-size: 11px;
      font-weight: normal;
    }
  }
}

.sort-btns {
  min-width: 100% !important;
  margin: 5px 0;
}
</style>
