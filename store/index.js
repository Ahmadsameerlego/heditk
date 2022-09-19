export default {
  namespaced: true,

  state: {
    // Strat About Store
    phoneNo: null,
    activationCode: null,
    ShowSideBar: false,
    storeId: null,
    deviceId: null,
    rating: null,
    image: null,
    name: null,
    productId: null,
    latitude: null,
    longitude: null,
    address: null,
    productId: null,
    // End About Store
    items: [],
    store: {
      token: "",
      active: null,
      address: "",
    },
  },
  /*------------------  Update Date in state ------------------- */

  mutations: {
    // Page brodcimb
    addPageLinks(state, items) {
      state.items = items;
    },

    //Satrt Toggel SideBar
    updateSideBar(state) {
      state.ShowSideBar = !state.ShowSideBar;
    },
    SideBarClosen(state) {
      state.ShowSideBar = false;
    },
    SideBarOpen(state) {
      state.ShowSideBar = true;
    },
    loadingOff(state) {
      state.loading = false;
    },
    productId(productId) {
      state.productId = productId;
    },
    //Login
    deviceId(state, deviceId) {
      state.deviceId = deviceId;
    },
    //phoneNo
    phoneNo(state, phoneNo) {
      state.phoneNo = phoneNo;
    },
    //storeId
    storeId(state, storeId) {
      state.storeId = storeId;
    },
    //activationCode
    activationCode(state, activationCode) {
      state.activationCode = activationCode;
    },
    //rating
    rating(state, rating) {
      state.rating = parseInt(rating);
    },
    //image For store
    image(state, image) {
      state.image = image;
    },
    //store name
    name(state, name) {
      state.name = name;
    },
    // latitude longitude
    latitude(state, latitude) {
      state.latitude = parseFloat(latitude);
    },
    longitude(state, longitude) {
      state.longitude = parseFloat(longitude);
    },
    address(state, address) {
      state.address = address;
    },
  },
  /*------------------  Write Logic ------------------- */

  actions: {
    // Start Page Content
    pageLinksAction({ commit }, to) {
      var pageLinks = [
        {
          // text: "Home",
          text: this.$i18n.t("home"),
          href: this.localePath("/store/home"),
          disabled: true,
        },
      ];

      console.log(to);
      if (
        $nuxt.$route.path !== "/store/home" &&
        $nuxt.$route.path !== "/en/store/home" &&
        $nuxt.$route.path !== "/en/store/home/" &&
        $nuxt.$route.path !== "/store/home/"
      ) {
        pageLinks.push({
          text: to,
          disabled: true,
          href: $nuxt.$route.path,
        });
      }

      console.log(pageLinks);

      commit("addPageLinks", pageLinks);
    },
    // Start Side Bar
    ToggelSideBar({ commit }) {
      commit("updateSideBar");
    },
    CloseSideBar({ commit }) {
      commit("SideBarClosen");
    },
    OpenSideBar({ commit }) {
      commit("SideBarOpen");
    },
    phoneNo({ commit }, phoneNo) {
      commit("phoneNo", phoneNo);
    },
    activationCode({ commit }, activationCode) {
      commit("activationCode", activationCode);
    },
    storeId({ commit }) {
      commit("storeId", localStorage.getItem("storeId"));
    },
    rating({ commit }) {
      commit("rating", localStorage.getItem("rating"));
    },
    image({ commit }) {
      commit("image", localStorage.getItem("image"));
    },
    name({ commit }) {
      commit("name", localStorage.getItem("name"));
    },
    productId({ commit }, productId) {
      commit("productId", productId);
    },

    // latitude: null,
    // longitude: null,
    latitude({ commit }, latitude) {
      commit("latitude", latitude);
    },
    longitude({ commit }, longitude) {
      commit("longitude", longitude);
    },
    address({ commit }, address) {
      commit("address", address);
    },
  },
};
