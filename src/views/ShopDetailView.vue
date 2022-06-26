<script>
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

// import swiper module styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// more module style...

import "vue3-carousel/dist/carousel.css";
import VueEasyLightbox from "vue-easy-lightbox";
import { useSettingsStore } from "@/stores/settings";

export default {
  name: "AppDetailProduct",
  components: {
    VueEasyLightbox,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const settingsStore = useSettingsStore();
    return {
      settingsStore,
      modules: [Pagination, Navigation],
    };
  },
  data() {
    return {
      langData: {},
      langDataLoaded: false,

      product: [],
      productLoaded: false,

      products: [],
      productsLoaded: false,

      productsBySubcategoryLoaded: false,

      properties: [],
      propertiesLoaded: false,

      cart: [],

      imgs: "", // Img Url , string or Array of string
      visible: false,
      index: 0, // default: 0
    };
  },
  computed: {
    itemId() {
      return +this.$route.params.id;
    },
  },
  watch: {
    $route() {
      this.initialize();
    },
    "settingsStore.langSelected": function () {
      this.initialize();
    },

    langDataLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoryLoaded == true &&
        this.propertiesLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    productLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoryLoaded == true &&
        this.propertiesLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    productsLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoryLoaded == true &&
        this.propertiesLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    productsBySubcategoryLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoryLoaded == true &&
        this.propertiesLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    propertiesLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productLoaded == true &&
        this.productsLoaded == true &&
        this.productsBySubcategoryLoaded == true &&
        this.propertiesLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
  },
  mounted() {
    this.initialize();
  },

  beforeUpdate() {
    this.settingsStore.allLoaded = true;
  },

  updated() {
    this.settingsStore.allLoaded = false;
  },

  methods: {
    initialize() {
      this.settingsStore.allLoaded = true;

      this.langData = {};
      this.langDataLoaded = false;
      this.product = "";
      this.productLoaded = false;
      this.products = "";
      this.productsLoaded = false;
      this.productsBySubcategoryLoaded = false;
      this.properties = "";
      this.propertiesLoaded = false;

      this.getLangData(this.settingsStore.langSelected, "detail");

      this.getAllProperties();
      this.getProduct();

      if (localStorage.cartItems) {
        this.cart = JSON.parse(localStorage.cartItems);
      }
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

    getProduct() {
      this.axios
        .get(this.settingsStore.api + "/products-item/" + this.$route.params.id)
        .then((response) => {
          this.product = response.data;
          this.productLoaded = true;

          this.getProducts(
            this.product[0]["subcategory_" + this.settingsStore.langSelected]
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getProducts(currentSubcategory) {
      this.axios
        .get(this.settingsStore.api + "/products")
        .then((response) => {
          this.products = response.data;
          this.productsLoaded = true;

          this.getProductsBySubcategory(currentSubcategory);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getProductsBySubcategory(currentSubcategory) {
      this.products = this.products.filter((item) => {
        if (
          item["subcategory_" + this.settingsStore.langSelected] ==
          currentSubcategory
        ) {
          return true;
        } else {
          return false;
        }
      });

      this.productsBySubcategoryLoaded = true;
    },

    getAllProperties() {
      this.axios
        .get(this.settingsStore.api + "/properties")
        .then((response) => {
          this.properties = response.data;

          this.propertiesLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addToCart() {
      let isId = false;
      let cartCount = 0;
      for (let key in this.cart) {
        if (this.cart[key].id == this.product[0].id) {
          isId = true;

          let count = +this.cart[key].count + 1;

          this.cart[key] = new Object({
            id: this.product[0].id,
            count: count,
          });
        }
      }
      if (isId == false) {
        this.cart.push(
          new Object({
            id: this.product[0].id,
            count: 1,
          })
        );
      }

      for (let key in this.cart) {
        cartCount = cartCount + this.cart[key].count;
      }

      localStorage.setItem("cartItems", JSON.stringify(this.cart));
      localStorage.setItem("cartCount", cartCount);
      this.settingsStore.cartCounter = cartCount;

      this.$notify({
        text:
          this.langDataLoaded == true
            ? this.langData.page.addToCartMessage
            : "",
      });
    },

    // ZOOM для фотографий
    showMultiple(n) {
      this.imgs = [];
      this.imgs.push(this.product[0]["photo_main"]);
      this.imgs.push(this.product[0]["photo_add_1"]);
      this.imgs.push(this.product[0]["photo_add_2"]);
      this.imgs.push(this.product[0]["photo_gallery_bg"]);
      this.imgs.push(this.product[0]["photo_gallery_md_1"]);
      this.imgs.push(this.product[0]["photo_gallery_md_2"]);
      this.imgs.push(this.product[0]["photo_gallery_sm_1"]);
      this.imgs.push(this.product[0]["photo_gallery_sm_2"]);

      this.index = n;
      this.show();
    },
    show() {
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },

    // Цены по разрядам
    numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
};
</script>

<template>
  <section class="showWatch">
    <div class="showWatch__img-container">
      <img
        class="showWatch__img"
        :src="productLoaded == true ? product[0]['photo_back'] : ''"
        alt=""
      />
    </div>

    <div class="container">
      <div class="showWatch__flex">
        <div class="showWatch__left">
          <h1 class="showWatch__heading">
            {{
              productLoaded == true
                ? product[0]["subcategory_" + settingsStore.langSelected]
                : ""
            }}
          </h1>
          <h3 class="showWatch__heading-small">
            {{
              productLoaded == true
                ? product[0]["title_" + settingsStore.langSelected]
                : ""
            }}
          </h3>
          <hr class="showWatch__line" />
          <span class="showWatch__text">{{
            productLoaded == true
              ? product[0]["subtitle_" + settingsStore.langSelected]
              : ""
          }}</span>
          <span class="showWatch__text-bold">{{
            productLoaded == true ? product[0]["articul"] : ""
          }}</span>
          <hr class="showWatch__line-thin" />
          <div class="showWatch__minis">
            <div class="showWatch__mini" @click="showMultiple(1)">
              <img
                class="showWatch__miniature"
                :src="productLoaded == true ? product[0]['photo_add_1'] : ''"
                alt="Watch"
              />
            </div>
            <div class="showWatch__mini" @click="showMultiple(2)">
              <img
                class="showWatch__miniature"
                :src="productLoaded == true ? product[0]['photo_add_2'] : ''"
                alt="Watch"
              />
            </div>
          </div>
        </div>

        <div class="showWatch__center">
          <img
            :src="productLoaded == true ? product[0]['photo_main'] : ''"
            alt="Watch"
            @click="showMultiple(0)"
          />
          <div class="showWatch__controls">
            <button class="showWatch__control" @click="showMultiple(0)">
              <img src="../assets/img/watch-card/arrow-left.png" alt="" />
            </button>
            <button class="showWatch__control" @click="showMultiple(0)">
              <img src="../assets/img/watch-card/zoom.png" alt="" />&nbsp;ZOOM
            </button>
            <button class="showWatch__control" @click="showMultiple(0)">
              <img src="../assets/img/watch-card/arrow-right.png" alt="" />
            </button>
          </div>
        </div>
        <vue-easy-lightbox
          esc-disabled
          move-disabled
          :visible="visible"
          :imgs="imgs"
          :index="index"
          @hide="handleHide"
        ></vue-easy-lightbox>

        <div v-if="propertiesLoaded" class="showWatch__right">
          <div
            v-for="(property, indexProp) in properties"
            :key="indexProp"
            class="showWatch__grid"
          >
            <div class="showWatch__cell">
              <span>{{ property["title_" + settingsStore.langSelected] }}</span>
            </div>
            <div class="showWatch__cell">
              <span>
                {{
                  productLoaded == true
                    ? product[0][property.id + "_" + settingsStore.langSelected]
                    : ""
                }}
              </span>
            </div>
          </div>
          <hr class="showWatch__line" />
          <div class="showWatch__price">
            <h3 class="showWatch__amount">
              {{
                productLoaded == true
                  ? numberWithSpaces(+product[0]["price"])
                  : ""
              }}
            </h3>
            <h3 class="showWatch__currency">₽</h3>
          </div>
          <button class="showWatch__button" @click="addToCart()">
            {{ langDataLoaded == true ? langData.page.cartButton : "" }}
          </button>
          <notifications classes="my-notification" position="bottom center" />
          <hr class="showWatch__line-thin" />
          <div class="showWatch__links">
            <!-- <button class="showWatch__control">
              <img src="../assets/img/watch-card/connection.png" alt="link" />
            </button>
            <button class="showWatch__control">
              <img src="../assets/img/watch-card/love.png" alt="like" />
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </section>

  <section v-if="productLoaded" class="watchCard">
    <div class="container">
      <div class="watchCard__info">
        <img src="../assets/img/watch-card/logo-big.png" alt="logo" />
      </div>
      <div class="watchCard__grid">
        <div class="watchCard__cell watchCard__top">
          <img
            class="watchCard__cell-img"
            :src="productLoaded == true ? product[0]['photo_gallery_bg'] : ''"
            alt="watch"
            @click="showMultiple(3)"
          />
        </div>

        <div class="watchCard__cell watchCard__mid1">
          <img
            class="watchCard__cell-img"
            :src="productLoaded == true ? product[0]['photo_gallery_md_1'] : ''"
            alt="watch"
            @click="showMultiple(4)"
          />
          <div class="watchCard__label">
            <img
              src="../assets/img/watch-card/zoom.png"
              alt=""
              @click="showMultiple(4)"
            />
          </div>
        </div>
        <div class="watchCard__cell watchCard__mid2">
          <img
            class="watchCard__cell-img"
            loading="lazy"
            :src="productLoaded == true ? product[0]['photo_gallery_md_2'] : ''"
            alt="watch"
            @click="showMultiple(5)"
          />
          <div class="watchCard__label">
            <img
              src="../assets/img/watch-card/zoom.png"
              alt=""
              @click="showMultiple(5)"
            />
          </div>
        </div>
        <a class="watchCard__cell watchCard__bottom1">
          <img
            class="watchCard__cell-img"
            :src="productLoaded == true ? product[0]['photo_gallery_sm_1'] : ''"
            alt="watch"
            @click="showMultiple(6)"
          />
          <div class="watchCard__label">
            <img
              src="../assets/img/watch-card/zoom.png"
              alt=""
              @click="showMultiple(6)"
            />
          </div>
        </a>
        <a
          :href="langDataLoaded == true ? langData.page.socialLink : ''"
          class="watchCard__cell watchCard__bottom2"
        >
          <div class="watchCard__instaLabel">
            <img
              :src="langDataLoaded == true ? langData.page.socialIconBg : ''"
              :alt="langDataLoaded == true ? langData.page.socialIconBgAlt : ''"
            />
            <span>{{
              langDataLoaded == true ? langData.page.socialText : ""
            }}</span>
            <h4>
              {{ langDataLoaded == true ? langData.page.socialTextAdd : "" }}
            </h4>
          </div>
        </a>
        <a class="watchCard__cell watchCard__bottom3">
          <img
            class="watchCard__cell-img"
            :src="productLoaded == true ? product[0]['photo_gallery_sm_2'] : ''"
            alt="watch"
            @click="showMultiple(7)"
          />
          <div class="watchCard__label">
            <a
              :href="
                productLoaded == true
                  ? product[0]['social_link_' + settingsStore.langSelected]
                  : ''
              "
            >
              <img
                :src="langDataLoaded == true ? langData.page.socialIconSm : ''"
                :alt="
                  langDataLoaded == true ? langData.page.socialIconSmAlt : ''
                "
              />
            </a>
          </div>
        </a>
      </div>
      <div class="watchCard__wrap">
        <div class="watchCard__block">
          <h4>{{ langDataLoaded == true ? langData.page.onlineTitle : "" }}</h4>
          <span class="watchCard__block-text">{{
            langDataLoaded == true ? langData.page.onlineSubitle : ""
          }}</span>
        </div>
        <div class="watchCard__block">
          <a class="watchCard__mail" href="mailto:on-lineshop@attache.ru"
            ><img src="../assets/img/warranty/mail.svg" alt="Mail" />&nbsp;<span
              >{{ langDataLoaded == true ? langData.page.email : "" }}</span
            ></a
          >
          <a class="watchCard__phone" href="tel:+74956402502"
            ><img
              src="../assets/img/warranty/phone.svg"
              alt="Phone"
            />&nbsp;<span>{{
              langDataLoaded == true ? langData.page.phone : ""
            }}</span></a
          >
        </div>
      </div>
    </div>
  </section>

  <section class="showcase">
    <div class="container">
      <div class="showcase__block">
        <div class="showcase__head">
          <h2 class="showcase__heading">
            {{ langDataLoaded == true ? langData.page.titleWatch : "" }}
            {{
              productLoaded == true
                ? product[0]["subcategory_" + settingsStore.langSelected]
                : ""
            }}
          </h2>
          <hr class="showcase__decor" />
        </div>
        <!-- :pagination="{ clickable: true, dynamicBullets: true }" -->
        <swiper
          :modules="modules"
          :pagination="{ clickable: true }"
          :space-between="40"
          :slides-per-group="4"
          :slides-per-view="4"
          class="showcase__slider"
          :navigation="true"
          :breakpoints="{
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            460: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 0,
            },
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 40,
            },
          }"
        >
          <swiper-slide
            v-for="(x0, index0) in products"
            :key="`${index0}-${x0}`"
            class="test__wrapper"
          >
            <div class="showcase__slide">
              <RouterLink
                class="clock__link"
                :to="{
                  name: 'detail',
                  params: {
                    id: products[index0].id,
                  },
                }"
              >
                <div class="clock">
                  <img
                    class="clock__img"
                    :src="
                      productsLoaded == true
                        ? products[index0]['photo_main']
                        : ''
                    "
                    alt="Watch"
                  />
                  <h2 class="clock__head">
                    {{
                      productsLoaded == true
                        ? products[index0][
                            "subcategory_" + settingsStore.langSelected
                          ]
                        : ""
                    }}
                  </h2>
                  <span class="clock__name">{{
                    productsLoaded == true
                      ? products[index0]["title_" + settingsStore.langSelected]
                      : ""
                  }}</span>
                  <hr class="clock__deco" />
                  <span class="clock__art">{{
                    productsLoaded == true ? products[index0]["articul"] : ""
                  }}</span>
                  <div class="clock__price">
                    <span class="clock__amount">{{
                      productsLoaded == true
                        ? numberWithSpaces(+products[index0].price)
                        : ""
                    }}</span>
                    <span class="clock__currency">₽</span>
                  </div>
                  <hr class="clock__redline" />
                </div>
              </RouterLink>
            </div>
          </swiper-slide>
        </swiper>

        <!-- <div class="showcase__slider">
          <div class="showcase__slide">
            <RouterLink
              v-for="(x0, index0) in products"
              :key="`${index0}-${x0}`"
              class="clock__link"
              :to="{
                name: 'detail',
                params: {
                  id: products[index0].id,
                },
              }"
            >
              <div class="clock">
                <img
                  class="clock__img"
                  :src="
                    productsLoaded == true ? products[index0]['photo_main'] : ''
                  "
                  alt="Watch"
                />
                <h2 class="clock__head">
                  {{
                    productsLoaded == true
                      ? products[index0][
                          "subcategory_" + settingsStore.langSelected
                        ]
                      : ""
                  }}
                </h2>
                <span class="clock__name">{{
                  productsLoaded == true
                    ? products[index0]["title_" + settingsStore.langSelected]
                    : ""
                }}</span>
                <hr class="clock__deco" />
                <span class="clock__art">{{
                  productsLoaded == true ? products[index0]["articul"] : ""
                }}</span>
                <div class="clock__price">
                  <span class="clock__amount">{{
                    productsLoaded == true
                      ? numberWithSpaces(+products[index0].price)
                      : ""
                  }}</span>
                  <span class="clock__currency">₽</span>
                </div>
                <hr class="clock__redline" />
              </div>
            </RouterLink>
          </div>
        </div> -->

        <!-- <div class="showcase__button-wrapper">
          <RouterLink
            :to="{
              name: 'catalog-collection',
              params: {
                subcategory:
                  productsLoaded == true
                    ? products[index0][
                        'subcategory_' + settingsStore.langSelected
                      ]
                    : '',
              },
            }"
          >
            <button class="showcase__button">Посмотреть все часы</button>
          </RouterLink>
        </div> -->

        <div class="showcase__button-wrapper">
          <RouterLink to="/catalog">
            <button class="showcase__button">
              {{ langDataLoaded == true ? langData.page.button : "" }}
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="whitespace__block">
      <div class="whitespace"></div>
    </div>
  </div>
</template>

<style>
.carousel__slide {
  width: 0;
}
</style>

<style scoped>
.vue-notification-group ::v-deep(.my-notification) {
  color: #fff;
  font-family: Acrom;
  font-size: 15px;
  line-height: 29px;
  font-weight: 400;
  text-transform: uppercase;
  background: #ec002b;
  border-left: 10px solid #850018;
  margin: 0 5px 5px;
  padding: 10px;
}
.swiper ::v-deep(.swiper-wrapper) {
  padding-bottom: 20px;
}
.swiper ::v-deep(.swiper-pagination-bullet) {
  width: 105px;
  height: 3px;
  border-radius: 0;
}
.swiper ::v-deep(.swiper-pagination-bullet-active) {
  background-color: #ec002b;
}

.swiper ::v-deep(.swiper-button-disabled) {
  color: #cccccc;
}

.swiper ::v-deep(.swiper-button-prev) {
  color: #ec002b;
}

.swiper ::v-deep(.swiper-button-next) {
  color: #ec002b;
}

@media (min-width: 768px) {
  .swiper ::v-deep(.swiper-button-prev) {
    display: none;
  }

  .swiper ::v-deep(.swiper-button-next) {
    display: none;
  }
}

@media (max-width: 767px) {
  .swiper ::v-deep(.swiper-wrapper) {
    padding-bottom: 50px;
  }
  .swiper ::v-deep(.swiper-pagination) {
    display: none;
  }

  .showcase__slide {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 460px) {
  .showcase__slide {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 425px) {
  .swiper ::v-deep(.swiper-wrapper) {
    padding-bottom: 50px;
  }
  .swiper ::v-deep(.swiper-pagination) {
    display: none;
  }
}
</style>
