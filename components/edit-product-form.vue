<template>
  <form
    class="product-form-container"
    ref="form"
    @submit.prevent="handleSubmit"
  >
    <!-- Shared Inputs -->
    <v-row>
      <!-- name -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.name_ar"
          name="name_ar"
          :rules="nameRules"
          :label="$t('productNameAr')"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.name_en"
          name="name_en"
          :rules="nameRules"
          :label="$t('productNameEn')"
          required
        ></v-text-field>
      </v-col>
      <!-- department -->
      <v-col cols="12" md="12">
        <input
          type="text"
          hidden
          required
          v-model="form.departmentId"
          name="departmentId" />
        <v-select
          v-on:change="selectedDepartmentID(categories.departmentId)"
          :items="allCategories"
          v-model="categories"
          item-text="departmentName"
          :rules="[(v) => !!v || 'Item is required']"
          :label="$t('mainSectionName')"
          required
          return-object
        ></v-select
      ></v-col>

      
      <!-- Subdepartment -->
      <v-col cols="12" md="6">
        <input
          type="text"
          hidden
          v-model="form.subDepartId"
          name="subDepartId" />
        <v-select
          v-on:change="selectedSubDepartmentID(subDepart.subDepartId)"
          v-model="subDepart"
          :items="allsubDeparts"
          item-text="name"
          :rules="[(v) => !!v || 'Item is required']"
          :label="$t('subSectionName')"
          required
          return-object
        ></v-select
      ></v-col>

      <!-- internal depatment -->
      <v-col cols="12" md="6">
        <input
          type="text"
          hidden
          v-model="form.internalId"
          name="internalId" />
        <v-select
          v-on:change="selectInternalId(internalDepart.internalId)"
          v-model="internalDepart"
          :items="allInternal"
          item-text="name"
          :rules="[(v) => !!v || 'Item is required']"
          :label="$t('internalSection')"
          required
          return-object
        ></v-select
      ></v-col>
      <!-- wraps -->
      <v-col cols="12" md="6" class="mt-4">
        <v-select
          v-on:change="selectedwrapIds(multipleWrap)"
          v-model="multipleWrap"
          :items="allWraps"
          item-text="wrapName"
          :rules="[(v) => !!v || 'Item is required']"
          :label="$t('packaging')"
          required
          multiple
          chips
          return-object
          persistent-hint
          small-chips
          auto-select-first
        ></v-select>
      </v-col>
      <!-- Upload Images -->
      <v-col cols="12" md="6" class="mt-7">
        <label for="" class="mb-3">{{ this.$t("product_images") }}</label>
        <div class="uploadFileImages">
          <input
            id="file-upload"
            type="file"
            name="uploads"
            multiple
            ref="inputFile"
            @change="uploadImage"
          />
          <div style="text-align: end" class="pa-2">
            <v-icon class="mt-1">mdi-file-upload-outline</v-icon>
          </div>
        </div>

        <div class="current-images" v-if="currentImages.length > 0">
          <label for="" class="mt-4 d-block">
            {{ this.$t("current_product_images") }}
          </label>
          <div class="preview-product-images mt-2">
            <div v-for="(image, key) in currentImages" :key="key">
              <div class="image-holder">
                <img alt="" :src="image" />
                <button
                  type="button"
                  @click.prevent="removeCurrentImage(image, key)"
                >
                  x
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="added-images mt-3" v-if="productImages.length > 0">
          <label for="" class="mt-4 d-block">
            {{ this.$t("new_product_images") }}
          </label>
          <div class="preview-product-images mt-2">
            <div v-for="(image, key) in productImages" :key="key">
              <div class="image-holder">
                <img v-bind:ref="'image'" alt="" src="" />
                <button
                  type="button"
                  @click="removeImage(image, key, image.name)"
                >
                  x
                </button>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <!-- discrption -->
      <v-col cols="12" class="">
        <v-textarea
          required
          :rules="[(v) => !!v || 'Item is required']"
          v-model="productdescriptionAr"
          name="description_ar"
          :label="$t('productdescriptionAr')"
        ></v-textarea>
      </v-col>
      <v-col cols="12" class="">
        <v-textarea
          required
          :rules="[(v) => !!v || 'Item is required']"
          v-model="productdescriptionEn"
          name="description_en"
          :label="$t('productdescriptionEn')"
        ></v-textarea>
      </v-col>
      <!-- price -->
      <v-col class="mt-md-n10 pa-md-6" cols="12" md="6">
        <v-text-field
          v-model="form.price"
          name="price"
          :rules="nameRules"
          :label="$t('price')"
          type="number"
          required
        ></v-text-field>
      </v-col>
      <!-- price after discount -->
      <v-col class="mt-md-n10 pa-md-6" cols="12" md="6">
        <v-text-field
          v-model="form.discountPrice"
          name="discountPrice"
          :rules="nameRules"
          :label="$t('priceAfterDiscount')"
          type="number"
        ></v-text-field>
      </v-col>
      <!-- count -->
      <v-col class="mt-md-n10 pa-md-6" cols="12" md="6">
        <v-text-field
          v-model="form.count"
          name="count"
          :rules="nameRules"
          :label="$t('count')"
          type="number"
        ></v-text-field>
      </v-col>
      <!-- product type -->
      <input type="text" hidden name="type" v-model="productType" />
      <v-col cols="12" md="6">
        <label for="">{{ $t("productdType") }}</label>
        <v-radio-group
          class="d-flex mt-n1"
          v-model="productType"
          :rules="[(v) => !!v || 'Item is required']"
          v-on:change="ProductType()"
        >
          <v-radio
            :label="$t('simple')"
            class="w-50 siz-12 mt-3"
            color="primary"
            value="simple"
          ></v-radio>
          <v-radio
            :label="$t('multiple')"
            class="w-50 siz-12 mt-3"
            color="primary"
            value="multiple"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <input type="text" hidden name="productId" v-model="productId" />
    <div class="dFlex">
      <v-btn
        :disabled="disabled"
        :loading="loading"
        color="primary"
        class="submit-button"
        type="submit"
      >
        {{ $t("edit") }}
      </v-btn>
    </div>
  </form>
</template>

<script>
export default {
  middleware: ["auth"],

  data() {
    return {
      sharedInputs: true,
      multipleProudct: false,
      avilableSubmit: false,
      disabled: false,
      loading: false,
      currentImages: [],
      productType: "",
      multipleWrap: [],
      multipleOptions: [],
      nameRules: [(v) => !!v || this.$t("reqFiled")],

      //department
      // all department >> select Items
      allCategories: null,
      
      // all department >> select Items name and id to print it
      categories: {
        departmentId: "",
        departmentName: "",
      },

      allInternal : [] ,

      //SubDepartment
      // all SubDepartment >> select Items
      allsubDeparts: null,
      // all SubDepartment >> select Items name and id to print it
      subDepart: {
        subDepartId: "",
        name: "",
      },
      internalDepart: {
        internalId: "",
        name: "",
      },

      // wraps
      allWraps: null,
      wraps: {
        warpId: "",
        wrapName: "",
      },

      //features
      allfeatures: null,
      features: {
        featureId: "",
        featureName: "",
        options: "",
      },

      //options
      alloptionsData: [],
      alloptions: null,
      options: {
        optionId: "",
        featureOptionName: "",
      },

      form: {
        name_ar: "",
        name_ar: "",
        description_ar: "",
        description_en: "",
        departmentId: "",
        price: "",
        discountPrice: "",
        count: "",
        type: "",
        features: "",
        uploads: "",
        wrapIds: [],
        deleteUploads: [],
        subDepartId: null,
        internalId : null
      },

      savedIdFature: [],
      lastSelect: "",
      productNameAr: "",
      productNameEn: "",
      productdescriptionEn: "",
      productdescriptionAr: "",
      mainSectionVal: null,
      packagingVal: null,
      myFiles: [],
      uploads: null,
      productImages: [],
      imgsName: [],
    };
  },

  computed: {
    productId() {
      return this.$route.params.id;
    },
  },

  beforeMount(){
    this.selectedSubDepartmentID()
    this.ProductDetails();
  },

  mounted() {
    // Get Product Details

    // this.selectedSubDepartmentID();
    setTimeout(() => console.log("kkkk", this.categories.departmentName), 2000);
    console.log("kkkk", this.categories.departmentName);

    // Get category
    this.$axios.$get("categories").then((res) => {
      this.allCategories = res.data;
    });


    // get warps
    this.$axios.$get("wraps").then((res) => {
      this.allWraps = res.data;
    });


  },

  methods: {
    // Get Product Details
    ProductDetails() {
      // Send Param With ?
      this.$axios
        .$get("storeProductDetails", { params: { productId: this.productId } })
        .then((data) => {
          let productDetails = data.data.product;
          this.currentImages = productDetails.uploads;
          // name
          this.form.name_ar = productDetails.name_ar;
          this.form.name_en = productDetails.name_en;
          // discartion
          this.productdescriptionAr = productDetails.description_ar;
          this.productdescriptionEn = productDetails.description_en;
          // department
          // this.categories.departmentName = productDetails.departmentName;
          this.categories.departmentId = productDetails.departmentId;

          this.categories = {
            departmentName: productDetails.departmentName,
            departmentId: productDetails.departmentId,
          };
          this.selectedDepartmentID(
            productDetails.departmentId,
            productDetails.departmentName
          );


          this.selectedSubDepartmentID (
            productDetails.subDepartId
          )
          // supdepartment
          this.subDepart.name = productDetails.subDepartName;
          this.subDepart.subDepartId = productDetails.subDepartId;
          this.form.subDepartId = productDetails.subDepartId;

          // this.selectInternalId(
          //   productDetails.internals.internalId,
          //   productDetails.internals.name,
          // )
          // internal depatment
          // this.internalDepart.name = productDetails.internals.name;

          // this.internalDepart.internalId = internals.internals.internalId;
          // this.form.internalId = productDetails.internals.internalId;


          this.internalDepart.name = productDetails.internals[0].name
          this.internalDepart.internalId = productDetails.internals[0].internalId
          console.log(this.internalDepart)

          

          console.log(productDetails.internalName)
          // wraps
          this.selectedwrapIds(productDetails.wraps);
          for (let i = 0; i < productDetails.wraps.length; i++) {
            this.multipleWrap.push(productDetails.wraps[i]);
          }
          // price
          this.form.price = productDetails.price;
          this.form.count = productDetails.count;
          this.form.discountPrice = productDetails.discountPrice;
          // product Type
          this.productType = productDetails.type;
        });
    },

    async handleSubmit() {
      if (this.form.wrapIds.length != 0) {
        const formData = new FormData(this.$refs.form);
        this.loading = true;
        this.disabled = true;
        formData.append("wrapIds", JSON.stringify(this.form.wrapIds));
        formData.append(
          "deleteUploads",
          JSON.stringify(this.form.deleteUploads)
        );

        await this.$axios
          .$post("editProduct", formData)
          .then((data) => {
            if (this.productType == "simple") {
              this.$router.push(
                this.localePath(`/store/products/details/${this.productId}`)
              );
            } else {
              localStorage.setItem("productId", this.productId);
              this.$router.push(
                `/store/products/productOptions/${this.productId}`
              );
            }
            this.$refs.form.reset();
            // location.reload();
            this.loading = false;
            this.disabled = false;
            this.subDepart.name = "";
            this.subDepart.name = "";

            this.$swal.fire({
              title: data.message,
              timer: 1000,
              icon: "success",
              allowOutsideClick: false,
              showConfirmButton: false,
              showCancelButton: false,
            });
          })
          .catch((e) => {
            console.log("error", e);
            this.loading = false;
            this.disabled = false;
            this.$swal.fire({
              title: data.message,
              timer: 1000,
              icon: "success",
              allowOutsideClick: false,
              showConfirmButton: false,
              showCancelButton: false,
            });
          });
      }
    },

    ProductType() {
      console.log(this.productType);
      if (this.productType == "simple") {
        this.multipleProudct = false;
        this.avilableSubmit = true;
      } else {
        this.sharedInputs = false;
        this.multipleProudct = true;
        this.avilableSubmit = true;
      }
    },

    uploadImage(e) {
      this.imgsName = [];
      let selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.productImages.push(selectedFiles[i]);
        this.imgsName.push(selectedFiles[i].name);
      }
      this.form.uploads = this.productImages;
      console.log(this.productImages);
      console.log(this.form.uploads);
      this.applyImage(e);
    },
    removeImage(image, index, name) {
      let input = this.$refs.inputFile;
      let files = new DataTransfer();
      for (let i = 0; i < input.files.length; i++) {
        if (input.files[i].name == name) {
          continue;
        }
        files.items.add(input.files[i]);
      }
      input.files = files.files;
      this.productImages.splice(index, 1);
      this.applyImage();

      //this.$refs.image[index].src = "" // You are hidding the 3rd one that is now in index 1.
    },
    applyImage(e) {
      for (let i = 0; i < this.productImages.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.image[i].src = reader.result;
        };
        reader.readAsDataURL(this.productImages[i]);
      }
    },
    // delete from current images
    removeCurrentImage(src, index) {
      this.currentImages.splice(index, 1);
      this.form.deleteUploads.push(src);
    },

    // selected categoriey and pass subCategoriey
    selectedDepartmentID(returnedDepartmentId) {
      this.allsubDeparts = [];
      this.categories.departmentName;

      this.form.departmentId = returnedDepartmentId;
      this.getSubDepart(returnedDepartmentId);
      // get allfeatures
      this.$axios
        .$get("features", { params: { departmentId: returnedDepartmentId } })
        .then((res) => {
          this.allfeatures = res.data;
          this.alloptionsData = res.data;
          console.log(res.data);
        });
    },

    // selected selectedSubDepartmentID
    selectedSubDepartmentID(returnedSubDepartmentId) {
      this.allInternal = [];
      this.subDepart.name;
      this.form.subDepartId = returnedSubDepartmentId;
      this.getInternalDepart(returnedSubDepartmentId)
    },

    // select selected internal department id 
    selectInternalId ( returnedInternalId ){
      this.form.internalId = returnedInternalId;
    },
    
    // selected optionId
    selectedOptions(optionsID, featureID, index) {
      let optionIdArray = [];
      let featureIDArray = [];
      for (let i = 0; i < optionsID.length; i++) {
        optionIdArray.push(optionsID[i]["optionId"]);
        featureIDArray.push(featureID);
      }

      console.log("Options ID", optionIdArray);
      console.log("Features ID", featureIDArray);
    },

    // selected wraping
    selectedwrapIds(ids) {
      let idsArray = [];
      for (let i = 0; i < ids.length; i++) {
        idsArray.push(ids[i]["warpId"]);
      }
      this.form.wrapIds = idsArray;
    },

    getSubDepart(mainDep) {
      this.loadingPage = true;
      this.$axios
        .$get("subCategories", { params: { departmentId: mainDep } })
        .then((res) => {
          if (res.data.subDeparts.length !== 0) {
            this.allsubDeparts = res.data.subDeparts;
          } else {
            this.$swal.fire({
              title: this.$t("chooseOtherSection_nosubDepartment"),
              timer: 3000,
              icon: "error",
              allowOutsideClick: false,
              showConfirmButton: false,
              showCancelButton: false,
            });
          }
        });
    },
    
    getInternalDepart(interDep){
      this.loadingPage = true;
        // Get intenal department
        this.$axios.$get("internals" ,{ params : {subDepartId : interDep}}).then( (res)=>{
          if( res.data !== 0 ){
            this.allInternal = res.data ;
            console.log(this.allInternal)
          }else{
            this.$swal.fire({
              title: this.$t("chooseOtherSection_nosubDepartment"),
              timer: 3000,
              icon: "error",
              allowOutsideClick: false, 
              showConfirmButton: false,
              showCancelButton: false,
            });
          }
          
      } )
    }
  },
};
</script>
