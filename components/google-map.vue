<template>
  <div>
    <div class="pt-4 pb-2">
      <div class="form-group">
        <input
          v-model="place"
          disabled
          type="text"
          class="form-control w-100 mb-3"
        />
      </div>
      <div class="form-group">
        <client-only>
          <GmapAutocomplete
            :value="searchText"
            class="form-control"
            @place_changed="setPlace"
          >
          </GmapAutocomplete>
        </client-only>
      </div>
    </div>
    <div class="map-container">
      <client-only>
        <GmapMap
          @click="updateLocation"
          :center="location"
          :zoom="8"
          map-type-id="terrain"
          :options="{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            disableDefaultUi: false,
          }"
          class="w-100 h-100"
        >
          <GmapMarker
            :position="location"
            draggable
            @dragend="updateLocation"
            @click="updateLocation"
          />
        </GmapMap>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapComponent",

  computed: {
    Mapaddress() {
      return this.$store.state.address;
    },
    latitude() {
      return this.$store.state.latitude;
    },
    longitude() {
      return this.$store.state.longitude;
    },
  },
  data() {
    return {
      place: this.$store.state.address,
      searchText: null,
      location: {
        lat: this.$store.state.latitude,
        lng: this.$store.state.longitude,
      },
    };
  },
  methods: {
    updateLocation(context) {
      console.log(context);
      let lat = context.latLng.lat();
      let lng = context.latLng.lng();
      // this.searchText = null;
      this.collectAddressDetails(lat, lng);
    },
    async collectAddressDetails(lat, lng) {
      const APIKey =
        process.env.MAP_API_KEY || "AIzaSyBYYsHfLvLMjJVwKp3jm2fw9jNo_JKfvik";
      try {
        const axios = this.$axios.create();
        delete axios.defaults.headers.common["Authorization"];
        let googleURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${APIKey}`;
        let externalAPI = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=ar`;
        const address = await axios
          .get(externalAPI)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          });
        const fullAddress = `${address.countryName} ,${address.principalSubdivision} ,${address.locality}`;
        console.log({ address });
        this.location = { lat, lng };
        this.place = fullAddress;

        // console.log(lat);
        // console.log(lng);
        // console.log(this.place);

        this.$store.dispatch("longitude", lng);
        this.$store.dispatch("latitude", lat);
        this.$store.dispatch("address", this.place);
      } catch (err) {
        console.error(err);
      }
    },
    setPlace(context) {
      console.log(context);

      let lat = context.geometry.location.lat();
      let lng = context.geometry.location.lng();
      this.collectAddressDetails(lat, lng);
    },
  },
};
</script>

<style scoped>
.map-container {
  height: 400px;
}
</style>
