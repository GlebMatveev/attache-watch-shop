<script>
// import { HTTP } from "../main";
import { useSettingsStore } from "@/stores/settings";

export default {
  setup() {
    const settingsStore = useSettingsStore();
    return { settingsStore };
  },
  data() {
    return {
      langData: {},
      langDataLoaded: false,

      products: "",
      productsLoaded: false,

      productsBySubcategoryLoaded: false,

      models: [],
      modelsLoaded: false,

      productsByModels: [],
      productsByModelsLoaded: false,

      modelWords: ["модель", "модели", "моделей"],
    };
  },

  computed: {
    currentSubcategoryRoute() {
      return this.$route.params.subcategory;
    },
  },
  watch: {
    "settingsStore.langSelected": function () {
      this.initialize();
    },
    $route() {
      this.initialize();
    },

    langDataLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoryLoaded == true &&
        this.modelsLoaded == true &&
        this.productsByModelsLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    productsLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoryLoaded == true &&
        this.modelsLoaded == true &&
        this.productsByModelsLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    productsBySubcategoryLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoryLoaded == true &&
        this.modelsLoaded == true &&
        this.productsByModelsLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    modelsLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoryLoaded == true &&
        this.modelsLoaded == true &&
        this.productsByModelsLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    productsByModelsLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoryLoaded == true &&
        this.modelsLoaded == true &&
        this.productsByModelsLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
  },
  beforeMount() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.settingsStore.allLoaded = true;

      this.langData = {};
      this.langDataLoaded = false;
      this.products = "";
      this.productsLoaded = false;
      this.productsBySubcategoryLoaded = false;
      this.models = [];
      this.modelsLoaded = false;
      this.productsByModels = [];
      this.productsByModelsLoaded = false;

      this.getProducts();

      this.getLangData(this.settingsStore.langSelected, "collection");
    },

    getLangData(currentLanguage, currentComponent) {
      this.axios
        // get file path from Pinia
        .get(this.settingsStore.langFile[currentLanguage])
        .then((response) => {
          for (let key1 in response.data[currentComponent]) {
            Object.keys(response.data[currentComponent][key1]).forEach(
              (key2) => {
                Object.keys(response.data[currentComponent][key1]).forEach(
                  (key3) => {
                    this.langData[key2] =
                      response.data[currentComponent][key1][key3];
                  }
                );
              }
            );
          }

          this.langDataLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getProducts() {
      this.axios
        .get(this.settingsStore.api + "/products")
        .then((response) => {
          this.products = response.data;
          this.productsLoaded = true;

          this.filterProductsBySubcategory(this.$route.params.subcategory);

          this.getModelsBySubcategory();

          this.filterProductsByModels();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    filterProductsBySubcategory(categoryName) {
      this.products = this.products.filter((item) => {
        if (
          item["subcategory_" + this.settingsStore.langSelected] == categoryName
        ) {
          return true;
        } else {
          return false;
        }
      });

      this.productsBySubcategoryLoaded = true;
    },

    getModelsBySubcategory() {
      for (let key in this.products) {
        if (
          !this.models.includes(
            this.products[key]["title_" + this.settingsStore.langSelected]
          )
        ) {
          this.models.push(
            this.products[key]["title_" + this.settingsStore.langSelected]
          );
        }
      }

      this.modelsLoaded = true;
    },

    filterProductsByModels() {
      let tempProducts = this.products;

      let tempFilteredProducts = "";

      for (let key in this.models) {
        tempFilteredProducts = tempProducts.filter((item) => {
          if (item.title_rus == this.models[key]) {
            return true;
          } else {
            return false;
          }
        });
        this.productsByModels[key] = tempFilteredProducts;

        tempFilteredProducts = "";
      }

      this.productsByModelsLoaded = true;
    },

    // word declension function
    declOfWord(n, titles) {
      return titles[
        n % 10 == 1 && n % 100 != 11
          ? 0
          : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
          ? 1
          : 2
      ];
    },

    // Цены по разрядам
    numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
};
</script>

<template>
  <section class="collection-top">
    <img
      class="collection-top__img"
      src="../assets/img/collection-pilot/top-img.png"
      alt="Watch"
    />
    <div class="collection-top__name">
      <h1 class="collection-top__heading">
        {{ $route.params.subcategory }}
      </h1>
      <hr class="collection-top__deco" />
      <div class="collection-top__redline"></div>
      <hr class="collection-top__border" />
    </div>
  </section>

  <section
    v-for="(x0, index0) in productsByModels"
    :key="`${index0}-${x0}`"
    class="collection-block"
  >
    <div class="container">
      <div class="collection-block__wrap">
        <div class="collection-block__left">
          <h2 class="collection-block__heading">{{ models[index0] }}</h2>
          <div class="collection-block__redline"></div>
        </div>
        <div class="collection-block__right">
          <span class="collection-block__text">
            {{ productsByModels[index0].length }}
            {{
              declOfWord(
                productsByModelsLoaded == true
                  ? productsByModels[index0].length
                  : "",
                langDataLoaded == true ? langData.page.declension : ""
              )
            }}</span
          >
          <div class="collection-block__redline"></div>
        </div>
      </div>
    </div>
    <hr class="collection-block__border" />
    <div class="container">
      <div class="collection-block__grid">
        <RouterLink
          v-for="(x1, index1) in productsByModels[index0]"
          :key="`${index1}-${x1}`"
          :to="{
            name: 'detail',
            params: {
              id:
                productsByModelsLoaded == true
                  ? productsByModels[index0][index1].id
                  : '',
            },
          }"
          class="clock__link clock__link-bordered"
        >
          <div class="clock">
            <img
              class="clock__img"
              :src="
                productsByModelsLoaded == true
                  ? productsByModels[index0][index1].photo_main
                  : ''
              "
              alt="Watch"
            />
            <h2 class="clock__head">
              {{
                productsByModelsLoaded == true
                  ? productsByModels[index0][index1][
                      "subcategory_" + settingsStore.langSelected
                    ]
                  : ""
              }}
            </h2>
            <span class="clock__name">{{
              productsByModelsLoaded == true
                ? productsByModels[index0][index1][
                    "title_" + settingsStore.langSelected
                  ]
                : ""
            }}</span>
            <hr class="clock__deco" />
            <span class="clock__art">{{
              productsByModelsLoaded == true
                ? productsByModels[index0][index1].articul
                : ""
            }}</span>
            <div class="clock__price">
              <span class="clock__amount">{{
                numberWithSpaces(+productsByModels[index0][index1].price)
              }}</span>
              <span class="clock__currency">₽</span>
            </div>
            <hr class="clock__redline" />
          </div>
        </RouterLink>
      </div>
    </div>
    <hr class="collection-block__border" />
  </section>

  <div class="container">
    <div class="collection-block__button-wrapper">
      <RouterLink to="/catalog">
        <button class="collection-block__button">
          {{ langDataLoaded == true ? langData.page.button : "" }}
        </button>
      </RouterLink>

      <!-- <div class="collection-block__bottom"></div> -->
    </div>
  </div>
  <div class="container">
    <div class="whitespace__block">
      <div class="whitespace"></div>
    </div>
  </div>
</template>

<style></style>
