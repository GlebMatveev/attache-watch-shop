<script>
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

      subcategories: "",
      subcategoriesLoaded: false,

      productsBySubcategories: [],
      productsBySubcategoriesLoaded: false,

      properties: [],
      propertiesLoaded: false,

      filters: [],
      filtersLoaded: false,

      filtersSelected: [],

      originalProducts: "",

      modelWords: ["модель", "модели", "моделей"],

      // titleFilters: {
      //   model: "Модель",
      //   case: "Материал корпуса",
      //   covering: "Покрытие корпуса",
      //   mechanism: "Тип механизма",
      //   waterproofing: "Водозащита",
      //   watchband: "Ремень/браслет",
      //   price: "Цена",
      // },

      // filters: {
      //   model: ["Automatic", "Chronograph", "24 HOUR"],
      //   case: ["Нержавеющая сталь", "Алюминий"],
      //   covering: ["Полированное", "Хромированное"],
      //   mechanism: ["Хронограф", "Автоматический"],
      //   waterproofing: ["100ATM (100 МЕТРОВ)", "5ATM (5 МЕТРОВ)", "нет"],
      //   watchband: ["Каучук", "Кожа"],
      //   price: ["20 000", "25 000", "30 000", "35 000"],
      // },
      // filtersTitles: {
      //   model: "Модель",
      //   case: "Материал корпуса",
      //   covering: "Покрытие корпуса",
      //   mechanism: "Тип механизма",
      //   waterproofing: "Водозащита",
      //   watchband: "Ремень/браслет",
      //   price: "Цена",
      // },
      // currentFilters: {
      //   model: "Модель",
      //   case: "Материал корпуса",
      //   covering: "Покрытие корпуса",
      //   mechanism: "Тип механизма",
      //   waterproofing: "Водозащита",
      //   watchband: "Ремень/браслет",
      //   price: "Цена",
      // },
    };
  },

  watch: {
    "settingsStore.langSelected": function () {
      this.initialize();
    },
    langDataLoaded() {
      if (
        this.langDataLoaded == true &&
        this.subcategoriesLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoriesLoaded == true &&
        this.propertiesLoaded == true &&
        this.filtersLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    subcategoriesLoaded() {
      if (
        this.langDataLoaded == true &&
        this.subcategoriesLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoriesLoaded == true &&
        this.propertiesLoaded == true &&
        this.filtersLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    productsLoaded() {
      if (
        this.langDataLoaded == true &&
        this.subcategoriesLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoriesLoaded == true &&
        this.propertiesLoaded == true &&
        this.filtersLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    productsBySubcategoriesLoaded() {
      if (
        this.langDataLoaded == true &&
        this.subcategoriesLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoriesLoaded == true &&
        this.propertiesLoaded == true &&
        this.filtersLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    propertiesLoaded() {
      if (
        this.langDataLoaded == true &&
        this.subcategoriesLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoriesLoaded == true &&
        this.propertiesLoaded == true &&
        this.filtersLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    filtersLoaded() {
      if (
        this.langDataLoaded == true &&
        this.subcategoriesLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoriesLoaded == true &&
        this.propertiesLoaded == true &&
        this.filtersLoaded == true
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
      this.subcategories = "";
      this.subcategoriesLoaded = false;
      this.productsBySubcategories = [];
      this.productsBySubcategoriesLoaded = false;
      this.properties = "";
      this.propertiesLoaded = false;
      this.filtersLoaded = false;

      this.getSubcategories();

      this.getLangData(this.settingsStore.langSelected, "catalog");
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

    getSubcategories() {
      this.axios
        .get(this.settingsStore.api + "/subcategories-by-category/" + "1") // часы
        .then((response) => {
          this.subcategories = response.data;
          this.subcategoriesLoaded = true;

          this.getAllProperties();
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

          this.originalProducts = Object.assign(
            this.originalProducts,
            this.products
          );

          this.filterProductsBySubcategories();

          this.getValuesByProperties();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    filterProductsBySubcategories() {
      let tempProducts = this.products;

      let tempFilteredProducts = "";

      for (let key in this.subcategories) {
        tempFilteredProducts = tempProducts.filter((item) => {
          if (
            item["subcategory_" + this.settingsStore.langSelected] ==
            this.subcategories[key]["title_" + this.settingsStore.langSelected]
          ) {
            return true;
          } else {
            return false;
          }
        });

        this.productsBySubcategories[
          this.subcategories[key]["subcategory_id"]
        ] = tempFilteredProducts;

        tempFilteredProducts = "";
      }

      this.productsBySubcategoriesLoaded = true;
    },

    getAllProperties() {
      this.axios
        .get(this.settingsStore.api + "/properties")
        .then((response) => {
          this.properties = response.data;

          this.propertiesLoaded = true;

          this.getProducts();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getValuesByProperties() {
      for (let keyMain in this.properties) {
        this.filters[this.properties[keyMain].id] = [];

        // filters headers initialization
        this.filtersSelected[this.properties[keyMain].id] =
          this.properties[keyMain]["title_" + this.settingsStore.langSelected];

        for (let key in this.products) {
          if (
            !this.filters[this.properties[keyMain].id].includes(
              this.products[key][
                this.properties[keyMain].id +
                  "_" +
                  this.settingsStore.langSelected
              ]
            )
          ) {
            this.filters[this.properties[keyMain].id].push(
              this.products[key][
                this.properties[keyMain].id +
                  "_" +
                  this.settingsStore.langSelected
              ]
            );
          }
        }
      }

      this.filtersLoaded = true;
    },

    filterProducts() {
      this.products = Object.assign(this.products, this.originalProducts);

      for (let keyMain in this.properties) {
        this.products = this.products.filter((item) => {
          if (
            this.filtersSelected[this.properties[keyMain].id] ==
            this.properties[keyMain]["title_" + this.settingsStore.langSelected]
          ) {
            return true;
          } else if (
            item[
              this.properties[keyMain].id +
                "_" +
                this.settingsStore.langSelected
            ] == this.filtersSelected[this.properties[keyMain].id]
          ) {
            return true;
          } else {
            return false;
          }
        });
      }

      this.filterProductsBySubcategories();
    },

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
  <section class="minimalTop">
    <div class="container">
      <div class="minimalTop__name">
        <h1 class="minimalTop__heading">
          {{ langDataLoaded == true ? langData.page.title : "" }}
        </h1>
        <hr class="minimalTop__deco" />
      </div>
    </div>
    <hr />

    <div v-if="filtersLoaded" class="container">
      <div class="filters">
        <div
          v-for="(property, index0) in properties"
          :key="`${index0}-${property}`"
          class="filters__select"
        >
          <select
            v-model="filtersSelected[property.id]"
            @change="filterProducts()"
          >
            <option selected="selected">
              {{ property["title_" + settingsStore.langSelected] }}
            </option>
            <option
              v-for="(value, index1) in filters[property.id]"
              :key="`${index1}-${value}`"
            >
              {{ value }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <hr />
    <div class="overview__container">
      <div class="redline-bold"></div>
    </div>
  </section>

  <!--  -->
  <!-- <section
    v-for="(subcategory, index2) in subcategories"
    :key="`${index2}-${subcategory}`"
    class="collection-block"
  >
    <div
      v-if="
        productsBySubcategoriesLoaded
          ? productsBySubcategories[subcategory.subcategory_id].length > 0
          : ''
      "
      class="container"
    > -->
  <section
    v-for="(subcategory, index2) in subcategories"
    :key="`${index2}-${subcategory}`"
    class="collection-block"
  >
    <div
      v-if="
        productsBySubcategoriesLoaded
          ? productsBySubcategories[subcategory.subcategory_id].length > 0
          : ''
      "
      class="container"
    >
      <div class="collection-block__wrap">
        <div class="collection-block__left">
          <h2 class="collection-block__heading">
            {{
              subcategoriesLoaded == true
                ? subcategory["title_" + settingsStore.langSelected]
                : ""
            }}
          </h2>
          <div class="collection-block__redline"></div>
        </div>
        <div class="collection-block__right">
          <span class="collection-block__text">
            {{
              productsBySubcategoriesLoaded
                ? productsBySubcategories[subcategory.subcategory_id].length
                : ""
            }}
            {{
              productsBySubcategoriesLoaded
                ? declOfWord(
                    productsBySubcategories[subcategory.subcategory_id].length,
                    langDataLoaded == true ? langData.page.declension : ""
                  )
                : ""
            }}
          </span>
          <div class="collection-block__redline"></div>
        </div>
      </div>
    </div>

    <hr class="collection-block__border" />

    <div class="container">
      <div class="collection-block__grid">
        <RouterLink
          v-for="(product, index3) in productsBySubcategories[
            subcategory.subcategory_id
          ]"
          :key="`${index3}-${product}`"
          class="clock__link clock__link-bordered"
          :to="{
            name: 'detail',
            params: {
              id: productsBySubcategoriesLoaded == true ? product.id : '',
            },
          }"
        >
          <div class="clock">
            <img
              class="clock__img"
              :src="
                productsBySubcategoriesLoaded == true ? product.photo_main : ''
              "
              alt="Watch"
            />
            <h2 class="clock__head">
              {{
                productsBySubcategoriesLoaded == true
                  ? product["subcategory_" + settingsStore.langSelected]
                  : ""
              }}
            </h2>
            <span class="clock__name">{{
              productsBySubcategoriesLoaded == true
                ? product["title_" + settingsStore.langSelected]
                : ""
            }}</span>
            <hr class="clock__deco" />
            <span class="clock__art">{{
              productsBySubcategoriesLoaded == true ? product["articul"] : ""
            }}</span>
            <div class="clock__price">
              <span class="clock__amount"
                >{{
                  productsBySubcategoriesLoaded == true
                    ? numberWithSpaces(+product["price"])
                    : ""
                }}
              </span>
              <span class="clock__currency">₽</span>
            </div>
            <hr class="clock__redline" />
          </div>
        </RouterLink>
      </div>
    </div>
    <hr class="collection-block__border" />
    <div
      v-if="
        productsBySubcategoriesLoaded
          ? productsBySubcategories[subcategory.subcategory_id].length > 0
          : ''
      "
      class="showcase__button-wrapper"
    >
      <RouterLink
        :to="{
          name: 'catalog-collection',
          params: {
            subcategory:
              subcategoriesLoaded == true ? subcategory.title_eng : '',
          },
        }"
      >
        <button class="showcase__button">
          {{ langDataLoaded == true ? langData.page.button : "" }}
        </button>
      </RouterLink>
    </div>
    <div
      v-if="
        productsBySubcategoriesLoaded
          ? productsBySubcategories[subcategory.subcategory_id].length > 0
          : ''
      "
      class="overview__expand-wrapper"
    >
      <button class="overview__button">
        <img src="../assets/img/overview/red-triangle.svg" alt="" />
      </button>
    </div>
  </section>
  <!-- <hr class="overview__divider" /> -->

  <hr class="overview__divider" />

  <div class="container">
    <div class="mainWatch__whitespace-block">
      <div class="mainWatch__whitespace"></div>
    </div>
  </div>
</template>

<style></style>
