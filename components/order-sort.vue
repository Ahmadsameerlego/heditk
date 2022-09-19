<template>
  <div class="text-center sort-dropdown">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="sortBtn btn-reset align-center" v-bind="attrs" v-on="on">
          <v-btn color="primary" class="sort-shape btn-reset">
            <v-icon sm>mdi-swap-vertical </v-icon>
            <span>{{ $t("sort_as") }} </span>
          </v-btn>
          <div class="orderingStatus pe-1 text-center">
            {{ currentOption }}
          </div>
        </v-btn>
      </template>
      <v-list class="pa-2">
        <!-- bestsell Filter -->
        <v-btn
          class="dropdown-btn sort-btns d-block"
          :value="item.val"
          v-for="(item, index) in ranking"
          :key="index"
          @click="chooseCategorie(item.val, item.key)"
        >
          <span> {{ item.val }} </span>
        </v-btn>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  props: {
    ranking: null,
    reset: null,
  },
  watch: {
    reset() {
      this.currentOption = this.$t("all");
    },
  },

  data() {
    return {
      alert: false,
      currentOption: this.$t("all"),
    };
  },
  mounted() {
    // console.log("Ssssssssssss", this.ranking);
  },
  methods: {
    chooseCategorie(categoryName, orderVal) {
      console.log(orderVal, categoryName);
      if (this.currentOption !== categoryName) {
        this.currentOption = categoryName;
        this.$emit("orderVal", orderVal);
      }
    },
  },
};
</script>
