<template>
  <select
    name="options"
    @change="selectChange($event, feature.title)"
    v-model="key"
    class="priceSelect w-100 mt-3"
    id=""
  >
    <option
      v-for="slectedFeature in feature.options"
      :key="slectedFeature.optionId"
      :value="slectedFeature.optionId"
      :id="slectedFeature.optionId"
    >
      {{ slectedFeature.name }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    feature: null,
  },
  data() {
    return {
      options: [],
      selectedVal: [],
      key: "",
    };
  },
  methods: {
    // onChange(event) {
    //   console.log(this.key);
    //   this.options.push(this.key);
    //   console.log(this.options.filter((el) => el.select));
    // },
    selectChange(event, title) {
      if (this.selectedVal.some((el) => el.title == title)) {
        this.selectedVal = this.selectedVal.filter((el) => el.title != title);
        this.selectedVal.push(event.target.value);
      } else {
        this.selectedVal.push(event.target.value);
      }
      console.log(this.selectedVal);
    },
  },
};
</script>

<style></style>
