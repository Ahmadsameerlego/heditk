<template>
  <div class="upload-image-conatiner">
    <v-file-input
      v-model="image"
      class="input-file"
      outlined
      dense
      @change="onFileChange"
      :name="name"
      @click:clear="removeImage()"
    />
    <v-container class="mt-n8">
      <img v-if="imageUrl" class="ms-6" :src="imageUrl" alt="" />
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  props: {
    currentImage: null,
    name: null,
  },

  data() {
    return {
      image: undefined,
      imageUrl: "",
    };
  },

  watch: {
    currentImage(newVal) {
      this.imageUrl = newVal;
    },
  },

  methods: {
    createImage(file) {
      const reader = new FileReader();
      this.imageUrl = "";
      this.imageUrl = URL.createObjectURL(file);
      this.$emit("UploadedImageSrc", this.imageUrl);
      reader.readAsDataURL(file);
    },
    onFileChange(file) {
      if (!file) {
        return;
      }
      this.createImage(file);
    },
    removeImage() {
      this.imageUrl = "";
    },
  },
};
</script>
<style scoped lang="scss">
fieldset:focus-visible,
.v-input__slot:focus-visible,
fieldset,
.v-input__slot,
v-input__control,
v-input__control:focus-visible {
  border: 0px dashed crimson;
  border-radius: 3px;
  outline: none;
  border: 0px !important;
}

.v-input__append-outer,
.v-input__prepend-outer {
  margin-inline-start: 95% !important;
}
.upload-image-conatiner {
  .input-file {
    background: #f5f5f5;
    height: 40px;
    margin-top: 5px;
  }
  img {
    margin-top: 30px;
    width: 90px;
    height: 80px;
    object-fit: contain;
  }
}

fieldset {
  outline: none !important;
}
</style>
