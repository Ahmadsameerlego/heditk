<template>
  <div class="status-card-container d-flex">
    <v-card
      v-for="step in cardData"
      :key="step.title"
      class="status-card shadow-0 d-flex align-center gap-2 mb-4 pa-5"
    >
      <v-icon small class="pa-2 rounded" :style="{ background: step.color }">
        mdi-file-document-outline
      </v-icon>
      <div class="siz-12">
        <div class="card-num font-weight-bold">{{ step.value }}</div>
        <div class="card-status">{{ step.title }}</div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {};
  },
  props: {
    cardData: [],
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.status-card-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  list-style: none;
  background-color: #f5f5f5;
  .status-card {
    flex: 1 1 163px;
    color: #222;
    // margin: 20px 0;
  }
}

.v-icon {
  color: #747475a0;
}
</style>
