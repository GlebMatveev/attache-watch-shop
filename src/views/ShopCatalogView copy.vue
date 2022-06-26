<script>
import { useSettingsStore } from "@/stores/settings";
import { HTTP } from "../main";

export default {
  setup() {
    const settingsStore = useSettingsStore();
    return { settingsStore };
  },
  data() {
    return {
      // originalProducts: "",
      // products: "",

      filters: {
        model: ["Automatic", "Chronograph", "24 HOUR"],
        case: ["Нержавеющая сталь", "Алюминий"],
        covering: ["Полированное", "Хромированное"],
        mechanism: ["Хронограф", "Автоматический, NH Швейцария"],
        waterproofing: ["100ATM (100 МЕТРОВ)", "5ATM (5 МЕТРОВ)", "нет"],
        watchband: ["Каучук", "Кожа"],
        price: ["20 000", "25 000", "30 000", "35 000"],
      },
      currentFilters: {
        model: "Модель",
        case: "Материал корпуса",
        covering: "Покрытие корпуса",
        mechanism: "Тип механизма",
        waterproofing: "Водозащита",
        watchband: "Ремень/браслет",
        price: "Цена",
      },

      titleFilters: {
        model: "Модель",
        case: "Материал корпуса",
        covering: "Покрытие корпуса",
        mechanism: "Тип механизма",
        waterproofing: "Водозащита",
        watchband: "Ремень/браслет",
        price: "Цена",
      },

      modelWords: ["модель", "модели", "моделей"],

      subcategories: "",
      products: "",
      productsByCategories: [],
    };
  },

  watch: {
    // someVariable: {
    //   handler() {
    //   },
    //   deep: true,
    // },

    "currentFilters.model": function () {
      if (this.currentFilters.model == this.titleFilters.model) {
        this.getProducts();
      } else {
        this.getProductsWithFilter();
      }
    },
    "currentFilters.case": function () {
      if (this.currentFilters.case == this.titleFilters.case) {
        this.getProducts();
      } else {
        this.getProductsWithFilter();
      }
    },
    "currentFilters.covering": function () {
      if (this.currentFilters.covering == this.titleFilters.covering) {
        this.getProducts();
      } else {
        this.getProductsWithFilter();
      }
    },
    "currentFilters.mechanism": function () {
      if (this.currentFilters.mechanism == this.titleFilters.mechanism) {
        this.getProducts();
      } else {
        this.getProductsWithFilter();
      }
    },
    "currentFilters.waterproofing": function () {
      if (
        this.currentFilters.waterproofing == this.titleFilters.waterproofing
      ) {
        this.getProducts();
      } else {
        this.getProductsWithFilter();
      }
    },
    "currentFilters.watchband": function () {
      if (this.currentFilters.watchband == this.titleFilters.watchband) {
        this.getProducts();
      } else {
        this.getProductsWithFilter();
      }
    },
    "currentFilters.price": function () {
      if (this.currentFilters.price == this.titleFilters.price) {
        this.getProducts();
      } else {
        this.getProductsWithFilter();
      }
    },
  },
  beforeMount() {
    this.initialize();
  },
  methods: {
    // test(filterCurrent, productsOriginal) {
    //   for (let key in this.products) {
    //     productsOriginal[key].products = productsOriginal[
    //       key
    //     ].products.filter((item) => {
    //       if (
    //         item.model == filterCurrent.model ||
    //         item.case == filterCurrent.case ||
    //         item.covering == filterCurrent.covering ||
    //         item.mechanism == filterCurrent.mechanism ||
    //         item.waterproofing == filterCurrent.waterproofing ||
    //         item.watchband == filterCurrent.watchband ||
    //         item.price == filterCurrent.price
    //       ) {
    //         return true;
    //       } else return false;
    //     });
    //   }
    // },

    // filterByFilters(filters, filterTitles) {
    //   for (let key in this.products) {
    //     this.products[key].products = this.products[key].products.filter(
    //       (item) => {
    //         if (filters.id == filterTitles.id) {
    //           this.getProducts();
    //           return false;
    //         } else if (filters.id != filterTitles.id && item.id == filters.id) {
    //           return true;
    //         }
    //       }
    //     );
    //   }
    // },

    initialize() {
      // this.getProducts();

      this.getSubcategories();

      this.getProducts();
    },

    getSubcategories() {
      HTTP.get()
        .then((response) => {
          this.subcategories = response.data.subcategories;

          this.filterSubcategoriesByCategoryName("Часы");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    filterSubcategoriesByCategoryName(categoryName) {
      this.subcategories = this.subcategories.filter((item) => {
        if (item.category == categoryName) {
          return true;
        } else {
          return false;
        }
      });
    },

    getProducts() {
      HTTP.get()
        .then((response) => {
          this.products = response.data.products;

          this.filterProductsBySubcategories();
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
          if (item.subcategory == this.subcategories[key].subcategory) {
            return true;
          } else {
            return false;
          }
        });

        this.productsByCategories[this.subcategories[key].subcategory] =
          tempFilteredProducts;

        tempFilteredProducts = "";
      }
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

    // getProducts() {
    //   HTTP.get()
    //     .then((response) => {
    //       this.originalProducts = response.data.subcategoriesWatch;
    //       this.products = response.data.subcategoriesWatch;
    //       this.temp = response.data.subcategoriesWatch;

    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    // getProductsWithFilter() {
    //   HTTP.get()
    //     .then((response) => {
    //       this.originalProducts = response.data.subcategoriesWatch;
    //       this.products = response.data.subcategoriesWatch;

    //       this.test(
    //         this.currentFilters,

    //         this.originalProducts
    //       );

    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  },
};
</script>

<template>
  <section class="minimalTop">
    <div class="container">
      <div class="minimalTop__name">
        <h1 class="minimalTop__heading">Коллекция</h1>
        <hr class="minimalTop__deco" />
      </div>
    </div>
    <hr />

    <!-- <br />
    <div>
      <b>products: </b><br />
      {{ products }}
    </div>-->

    <div class="container">
      <div class="filters">
        <div
          v-for="(x0, index0) in filters"
          :key="`${index0}-${x0}`"
          class="filters__select"
        >
          <select v-model="currentFilters[index0]" name="model">
            <option selected="selected">{{ titleFilters[index0] }}</option>
            <!-- <option
              v-for="(x1, index1) in filters[index1]"
              :key="`${index1}-${y}`"
            >
              {{ x1 }} {{ index1 }}
            </option> -->
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
  <section
    v-for="(x, index2) in subcategories"
    :key="`${index2}-${x}`"
    class="collection-block"
  >
    <div class="container">
      <div class="collection-block__wrap">
        <div class="collection-block__left">
          <h2 class="collection-block__heading">
            {{ subcategories[index2].subcategory }}
          </h2>
          <div class="collection-block__redline"></div>
        </div>
        <div class="collection-block__right">
          <span class="collection-block__text">
            <!-- {{ productsByCategories[subcategories[index2].subcategory].length }}
            {{
              declOfWord(
                productsByCategories[subcategories[index2].subcategory].length,
                modelWords
              )
            }} -->
          </span>
          <div class="collection-block__redline"></div>
        </div>
      </div>
    </div>

    <hr class="collection-block__border" />

    <div class="container">
      <div class="collection-block__grid">
        <RouterLink
          v-for="(x3, index3) in productsByCategories[
            subcategories[index2].subcategory
          ]"
          :key="`${index3}-${x3}`"
          :to="{
            name: 'detail',
            params: {
              id: productsByCategories[subcategories[index2].subcategory][
                index3
              ].id,
            },
          }"
          class="clock__link clock__link-bordered"
        >
          <div class="clock">
            <img
              class="clock__img"
              :src="
                productsByCategories[subcategories[index2].subcategory][index3]
                  .photoMain
              "
              alt="Watch"
            />
            <h2 class="clock__head">
              {{
                productsByCategories[subcategories[index2].subcategory][index3]
                  .subcategory
              }}
            </h2>
            <span class="clock__name">{{
              productsByCategories[subcategories[index2].subcategory][index3]
                .model
            }}</span>
            <hr class="clock__deco" />
            <span class="clock__art">{{
              productsByCategories[subcategories[index2].subcategory][index3]
                .articul
            }}</span>
            <div class="clock__price">
              <span class="clock__amount">{{
                productsByCategories[subcategories[index2].subcategory][index3]
                  .price
              }}</span>
              <span class="clock__currency">₽</span>
            </div>
            <hr class="clock__redline" />
          </div>
        </RouterLink>
      </div>
    </div>
    <hr class="collection-block__border" />
    <div class="showcase__button-wrapper">
      <RouterLink
        :to="{
          name: 'catalog-collection',
          params: {
            subcategory: subcategories[index2].subcategory,
          },
        }"
      >
        <button class="showcase__button">Посмотреть всю коллекцию</button>
      </RouterLink>
    </div>
    <div class="overview__expand-wrapper">
      <button class="overview__button">
        <img src="../assets/img/overview/red-triangle.svg" alt="" />
      </button>
    </div>
  </section>
  <hr class="overview__divider" />

  <hr class="overview__divider" />

  <div class="container">
    <div class="mainWatch__whitespace-block">
      <div class="mainWatch__whitespace"></div>
    </div>
  </div>
</template>

<style></style>
