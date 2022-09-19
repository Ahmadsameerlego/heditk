<template>
  <div class="content-box shadow-0 pa-3">
    <div class="pa-3 text-end">
      <v-btn @click="deleteAllNotification" dark elevation="1" color="red">
        <!-- align-center -->
        <span
          class="siz-12 text--white d-flex"
          :to="localePath('/store/products/new-product')"
        >
          {{ $t("deleteAll") }}
        </span>
      </v-btn>
    </div>
    <v-sheet v-if="loadingPage" class="pa-3">
      <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
    </v-sheet>

    <div v-else>
      <v-card class="pa-3" color="danger" v-if="notifications.length == 0">
        {{ $t("noNotifcation") }}
      </v-card>
      <div
        class="notify-box pa-2 mb-4 d-flex justify-space-between"
        :key="notification.notificationId"
        v-for="notification in notifications"
      >
        <p>{{ notification.message }}</p>
        <p class="siz-12">{{ notification.timeAdd }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      disabled: false,
      loadingPage: true,
      notifications: "",
    };
  },
  mounted() {
    // Get category
    this.$axios.$get("notifications").then((res) => {
      this.notifications = res.data;
      this.loadingPage = false;
      console.log(this.notifications.length);
    });
  },

  methods: {
    deleteAllNotification() {
      this.$axios.$delete("deleteAllNotification").then((res) => {
        this.notifications = res.data;
        this.loadingPage = false;
      });
    },
  },
};
</script>

<style>
.notify-box {
  background-color: #fcfcfc;
  border: 1px solid rgb(227, 227, 227);
}
</style>
