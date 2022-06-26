<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";

import rellax from "rellax";
import { useSettingsStore } from "@/stores/settings";
import SliderNews from "@/components/SliderNews.vue";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    SliderNews,
  },
  setup() {
    const settingsStore = useSettingsStore();
    return { settingsStore, modules: [Pagination] };
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

      productsByCountLoaded: false,

      banners: [
        {
          class: "top__slide-1",
          title: "PILOT",
          subtitle: "Automatic",
          link: "/catalog/PILOT",
          logo: "assets/img/banners/pilot-logo.png",
        },
        {
          class: "top__slide-3",
          title: "PILOT",
          subtitle: "Chronograph",
          link: "/catalog/PILOT",
          logo: "../assets/img/banners/pilot-logo.png",
        },
        {
          class: "top__slide-2",
          title: "DEEP SEA",
          subtitle: "Automatic",
          link: "/catalog/DEEP SEA",
          logo: "../assets/img/banners/deep-sea-logo.png",
        },
      ],

      rellax: {
        speed: 7,
      },
    };
  },
  watch: {
    "settingsStore.langSelected": function () {
      this.initialize();
    },

    langDataLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productsLoaded == true &&
        this.subcategoriesLoaded == true &&
        this.productsBySubcategoriesLoaded == true &&
        this.productsByCountLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    productsLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productsLoaded == true &&
        this.subcategoriesLoaded == true &&
        this.productsBySubcategoriesLoaded == true &&
        this.productsByCountLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    subcategoriesLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productsLoaded == true &&
        this.subcategoriesLoaded == true &&
        this.productsBySubcategoriesLoaded == true &&
        this.productsByCountLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    productsBySubcategoriesLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productsLoaded == true &&
        this.subcategoriesLoaded == true &&
        this.productsBySubcategoriesLoaded == true &&
        this.productsByCountLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    productsByCountLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productsLoaded == true &&
        this.subcategoriesLoaded == true &&
        this.productsBySubcategoriesLoaded == true &&
        this.productsByCountLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
  },
  mounted() {
    this.initialize();

    rellax(this.$refs.someEl);
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
      this.productsByCountLoaded = false;

      this.getSubcategories();

      this.getLangData(this.settingsStore.langSelected, "home");
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

          this.getProducts();
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

          this.filterProductsBySubcategories();

          // this.filterProductsByOneInSubcategory();

          this.filterProductsByCount();
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

    filterProductsByCount() {
      let counter = 0;
      this.products = this.products.filter(() => {
        counter++;
        if (counter <= 4) {
          return true;
        } else {
          return false;
        }
      });

      this.productsByCountLoaded = true;
    },

    filterProductsByOneInSubcategory() {
      let tempArr = [];
      this.products = this.products.filter((item) => {
        if (!tempArr.includes(item.subcategory_rus)) {
          tempArr.push(item.subcategory_rus);
          return true;
        } else {
          return false;
        }
      });
    },

    numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
};
</script>

<template>
  <!-- Основной баннер -->
  <!-- <SliderTop></SliderTop> -->
  <Carousel :wrap-around="true" :autoplay="5000" :items-to-show="1">
    <Slide v-for="slide in banners" :key="slide">
      <section class="top">
        <div :class="slide.class">
          <div class="container top__flex">
            <div class="top__left">
              <img :src="slide.logo" alt="Pilot Logo" />
              <hr class="top__hr" />
              <h1 class="top__heading">{{ slide.title }}</h1>
              <span class="top__text">{{ slide.subtitle }}</span>
              <RouterLink class="top__link" :to="slide.link">
                <button class="top__button">
                  {{ langDataLoaded == true ? langData.banner.button : "" }}
                </button>
              </RouterLink>
              <pagination />
            </div>
          </div>
        </div>
      </section>
    </Slide>
  </Carousel>

  <!-- Витрина -->
  <section class="showcase showcase__colored showcase__margin">
    <div class="container">
      <div class="showcase__block showcase__block-lifted">
        <div class="showcase__head">
          <h2 class="showcase__heading">
            {{ langDataLoaded == true ? langData.showcase.title : "" }}
          </h2>
          <hr class="showcase__decor" />
        </div>
        <div class="showcase__slider">
          <div class="showcase__slide">
            <RouterLink
              v-for="(product, index) in products"
              :key="`${index}-${product}`"
              :to="{
                name: 'detail',
                params: {
                  id: product.id,
                },
              }"
              class="clock__link"
            >
              <div class="clock">
                <img class="clock__img" :src="product.photo_main" alt="Watch" />
                <h2 class="clock__head">
                  {{ product["subcategory_" + settingsStore.langSelected] }}
                </h2>
                <span class="clock__name">{{
                  product["title_" + settingsStore.langSelected]
                }}</span>
                <hr class="clock__deco" />
                <span class="clock__art">{{ product.articul }}</span>
                <div class="clock__price">
                  <span class="clock__amount">{{
                    numberWithSpaces(+product.price)
                  }}</span>
                  <span class="clock__currency">₽</span>
                </div>
                <hr class="clock__redline" />
              </div>
            </RouterLink>

            <!-- <RouterLink to="/detail" class="clock__link">
              <div class="clock">
                <img
                  class="clock__img"
                  src="../assets/img/clock/watch-2.png"
                  alt="Watch"
                />
                <h2 class="clock__head">Pilot</h2>
                <span class="clock__name">AUTOMATIC</span>
                <hr class="clock__deco" />
                <span class="clock__art">AРТ 2420.350.1</span>
                <div class="clock__price">
                  <span class="clock__amount">25 000</span>
                  <span class="clock__currency">₽</span>
                </div>
                <hr class="clock__redline" />
              </div>
            </RouterLink>

            <RouterLink to="/detail" class="clock__link">
              <div class="clock">
                <img
                  class="clock__img"
                  src="../assets/img/clock/watch-3.png"
                  alt="Watch"
                />
                <h2 class="clock__head">Pilot</h2>
                <span class="clock__name">24 Hour</span>
                <hr class="clock__deco" />
                <span class="clock__art">AРТ 2420.350.1</span>
                <div class="clock__price">
                  <span class="clock__amount">20 000</span>
                  <span class="clock__currency">₽</span>
                </div>
                <hr class="clock__redline" />
              </div>
            </RouterLink>

            <RouterLink to="/detail" class="clock__link">
              <div class="clock">
                <img
                  class="clock__img"
                  src="../assets/img/clock/watch-4.png"
                  alt="Watch"
                />
                <h2 class="clock__head">Pilot</h2>
                <span class="clock__name">AUTOMATIC</span>
                <hr class="clock__deco" />
                <span class="clock__art">AРТ 2420.350.1</span>
                <div class="clock__price">
                  <span class="clock__amount">25 000</span>
                  <span class="clock__currency">₽</span>
                </div>
                <hr class="clock__redline" />
              </div>
            </RouterLink> -->
          </div>
        </div>

        <div class="showcase__button-wrapper">
          <!-- <RouterLink to="/catalog"> -->
          <RouterLink to="/catalog" class="showcase__button">{{
            langDataLoaded == true ? langData.showcase.button : ""
          }}</RouterLink>
          <!-- </RouterLink> -->
        </div>
      </div>
    </div>
  </section>

  <section class="new-collection">
    <div class="new-collection__back"></div>

    <div class="new-collection__bubbles rellax" data-rellax-speed="7"></div>

    <div class="new-collection__watch">
      <div class="new-collection__block">
        <h1>{{ langDataLoaded == true ? langData.parallax.title : "" }}</h1>
        <span>{{
          langDataLoaded == true ? langData.parallax.subtitle : ""
        }}</span>
        <RouterLink to="/catalog/DEEP%20SEA"
          ><button class="new-collection__button">
            {{ langDataLoaded == true ? langData.parallax.button : "" }}
          </button>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Блок различных действий -->
  <section class="options">
    <div class="container">
      <div class="options__grid">
        <div class="options__item">
          <img
            class="options__img"
            src="../assets/img/options/buy-watch.png"
            alt="Buy watch"
          />
          <div class="options__label">
            <div class="options__text-block">
              <h2 class="options__heading">
                {{ langDataLoaded == true ? langData.options.title1 : "" }}
              </h2>
              <p class="options__text">
                {{ langDataLoaded == true ? langData.options.subtitle1 : "" }}
              </p>
              <RouterLink to="/catalog">
                <button class="options__button">
                  {{ langDataLoaded == true ? langData.options.button1 : "" }}
                </button>
              </RouterLink>
            </div>
            <div class="options__whitespace"></div>
          </div>
        </div>
        <div class="options__item">
          <img
            class="options__img"
            src="../assets/img/options/find-shops.png"
            alt="Shops"
          />
          <div class="options__label">
            <div class="options__text-block">
              <h2 class="options__heading">
                {{ langDataLoaded == true ? langData.options.title2 : "" }}
              </h2>
              <p class="options__text">
                {{ langDataLoaded == true ? langData.options.subtitle2 : "" }}
              </p>
              <RouterLink to="/shops">
                <button class="options__button">
                  {{ langDataLoaded == true ? langData.options.button2 : "" }}
                </button>
              </RouterLink>
            </div>
            <div class="options__whitespace"></div>
          </div>
        </div>
        <div class="options__item">
          <img
            class="options__img"
            src="../assets/img/options/become-partner.png"
            alt="Become a partner"
          />
          <div class="options__label">
            <div class="options__text-block">
              <h2 class="options__heading">
                {{ langDataLoaded == true ? langData.options.title3 : "" }}
              </h2>
              <p class="options__text">
                {{ langDataLoaded == true ? langData.options.subtitle3 : "" }}
              </p>
              <RouterLink to="/distributers">
                <button class="options__button">
                  {{ langDataLoaded == true ? langData.options.button3 : "" }}
                </button>
              </RouterLink>
            </div>
            <div class="options__whitespace"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Гарантия -->
  <section class="warranty">
    <div class="warranty__container">
      <div class="warranty__flex">
        <h2>{{ langDataLoaded == true ? langData.service.title : "" }}</h2>
        <hr />
        <p class="warranty__p-bright">
          {{ langDataLoaded == true ? langData.service.subtitle1 : "" }}
        </p>
        <p class="warranty__p-dark">
          {{ langDataLoaded == true ? langData.service.subtitle2 : "" }}
        </p>
        <RouterLink to="/service">
          <button class="warranty__button">
            {{ langDataLoaded == true ? langData.service.button : "" }}
          </button>
        </RouterLink>
        <div class="warranty__wrap">
          <a class="warranty__link" href="mailto:service@attache.ru">
            <img src="../assets/img/warranty/mail.svg" alt="Mail" />&nbsp;<span>
              {{ langDataLoaded == true ? langData.service.email : "" }}
            </span>
          </a>
          <a class="warranty__link" href="tel:+74956402502">
            <img
              src="../assets/img/warranty/phone.svg"
              alt="Phone"
            />&nbsp;<span>{{
              langDataLoaded == true ? langData.service.phone : ""
            }}</span></a
          >
        </div>
      </div>
    </div>
  </section>

  <SliderNews></SliderNews>

  <!-- Новости -->
</template>

<style>
.carousel {
  top: -105px;
}

.carousel__pagination {
  width: 100%;
  justify-content: space-between;
}
.carousel__pagination-item {
  width: 100%;
  margin-right: 5px;
}

.carousel__pagination-item:last-child {
  margin-right: 0;
}
.carousel__pagination-button {
  margin: 0;
  margin-top: 35px;
  width: 100%;
  height: 3px;
  background-color: rgb(133, 133, 133);
}
.carousel__pagination-button--active {
  background-color: #ffffff;
}
</style>
