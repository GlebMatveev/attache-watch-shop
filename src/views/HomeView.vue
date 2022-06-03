<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import rellax from "rellax";
import { useSettingsStore } from "@/stores/settings";
import { HTTP } from "../main";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  setup() {
    const settingsStore = useSettingsStore();
    return { settingsStore };
  },
  data() {
    return {
      // banners: {
      //   // banner1: "top__slide-1",
      //   // banner2: "top__slide-2",
      //   // banner3: "top__slide-3",
      //   bannerClasses: ["top__slide-1", "top__slide-2", "top__slide-3"],
      //   bannerTitles: ["PILOT", "PILOT", "DEEP SEA"],
      //   bannerSubtitles: ["Automatic", "Chronograph", "Automatic"],
      // },

      subcategories: "",
      products: "",

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
  mounted() {
    this.initialize();

    rellax(this.$refs.someEl);
  },
  methods: {
    initialize() {
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

          this.filterProductsByOneInSubcategory();

          this.filterProductsByCount();
        })
        .catch((error) => {
          console.log(error);
        });
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
    },

    filterProductsByOneInSubcategory() {
      let tempArr = [];
      this.products = this.products.filter((item) => {
        if (!tempArr.includes(item.subcategory)) {
          tempArr.push(item.subcategory);
          return true;
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<template>
  <!-- Основной баннер -->
  <carousel :wrap-around="true" :autoplay="5000" :items-to-show="1">
    <slide v-for="slide in banners" :key="slide">
      <section class="top">
        <div :class="slide.class">
          <div class="container top__flex">
            <div class="top__left">
              <img :src="slide.logo" alt="Pilot Logo" />
              <hr class="top__hr" />
              <h1 class="top__heading">{{ slide.title }}</h1>
              <span class="top__text">{{ slide.subtitle }}</span>
              <RouterLink :to="slide.link">
                <button class="top__button">Посмотреть эти часы</button>
              </RouterLink>
              <pagination />
            </div>
          </div>
        </div>
      </section>
    </slide>
  </carousel>

  <!-- Витрина -->
  <section class="showcase showcase__colored">
    <div class="container">
      <div class="showcase__block showcase__block-lifted">
        <div class="showcase__head">
          <h2 class="showcase__heading">Часы</h2>
          <hr class="showcase__decor" />
        </div>
        <div class="showcase__slider">
          <div class="showcase__slide">
            <RouterLink
              v-for="(x, index) in products"
              :key="`${index}-${x}`"
              :to="{
                name: 'detail',
                params: {
                  id: products[index].id,
                },
              }"
              class="clock__link"
            >
              <div class="clock">
                <img
                  class="clock__img"
                  :src="products[index].photoMain"
                  alt="Watch"
                />
                <h2 class="clock__head">{{ products[index].subcategory }}</h2>
                <span class="clock__name">{{ products[index].model }}</span>
                <hr class="clock__deco" />
                <span class="clock__art">{{ products[index].articul }}</span>
                <div class="clock__price">
                  <span class="clock__amount">{{ products[index].price }}</span>
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
          <RouterLink to="/catalog">
            <button class="showcase__button">Посмотреть все часы</button>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <section class="new-collection">
    <div class="new-collection__back"></div>

    <div class="new-collection__bubbles rellax" data-rellax-speed="7"></div>

    <div class="new-collection__watch">
      <div class="new-collection__block">
        <h1>Deep Sea</h1>
        <span>COLLECTION</span>
        <RouterLink to="/under-construction"
          ><button class="new-collection__button">ПОСМОТРЕТЬ ПРЕМЬЕРУ</button>
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
              <h2 class="options__heading">Купить Часы</h2>
              <p class="options__text">Сейчас на сайте</p>
              <RouterLink to="/catalog">
                <button class="options__button">Посетить магазин</button>
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
              <h2 class="options__heading">Где купить</h2>
              <p class="options__text">Найти ближайший магазин</p>
              <RouterLink to="/shops">
                <button class="options__button">Найти магазин</button>
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
              <h2 class="options__heading">Дистрибьютор</h2>
              <p class="options__text">Стать официальным партнером</p>
              <RouterLink to="/distributers">
                <button class="options__button">Наши контакты</button>
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
        <h2>ГАРАНТИЯ И СЕРВИС</h2>
        <hr />
        <p class="warranty__p-bright">
          Узнайте больше о гарантийном и постгарантийном обслуживании,
        </p>
        <p class="warranty__p-dark">узнать о точках сервисного обслуживания</p>
        <RouterLink to="/service">
          <button class="warranty__button">УЗНАТЬ ПОДРОБНЕЕ</button>
        </RouterLink>
        <div class="warranty__wrap">
          <a class="warranty__link" href="mailto:service@attache.ru">
            <img src="../assets/img/warranty/mail.svg" alt="Mail" />&nbsp;<span>
              service@attache.ru
            </span>
          </a>
          <a class="warranty__link" href="tel:+74956402502">
            <img
              src="../assets/img/warranty/phone.svg"
              alt="Phone"
            />&nbsp;<span>+7(495) 640-25-02</span></a
          >
        </div>
      </div>
    </div>
  </section>

  <!-- Новости -->
  <section class="news">
    <div class="container">
      <div class="news__block">
        <h2 class="news__heading">НОВОСТИ</h2>
        <hr class="news__line" />
        <div class="news__flex">
          <RouterLink class="news__parent-link" to="under-construction">
            <div class="news__item">
              <img
                class="news__img"
                src="../assets/img/news/news-1.png"
                alt="Opening"
              />
              <h2 class="news__title">ОТКРЫТИЕ ОФИЦИАЛЬНОГО САЙТА</h2>
              <p class="news__text">
                Открытие нового официального сайта ATTACHEWATCHES 20.10.2021
                новый фирменный бутик, где Вы сможете подобрать для себя любые
                часы из коллекций ATTACHE...
              </p>
              <a class="news__link" href="#"
                >Узнать подробнее
                <hr class="news__redline" />
              </a>
            </div>
          </RouterLink>
          <RouterLink class="news__parent-link" to="under-construction">
            <div class="news__item">
              <img
                class="news__img"
                src="../assets/img/news/news-2.png"
                alt="New collection"
              />
              <h2 class="news__title">ATTACHE COLLECTIONS</h2>
              <p class="news__text">Мы запускаем линейку ATTACHE</p>
              <a class="news__link" href="#"
                >Узнать подробнее
                <hr class="news__redline" />
              </a>
            </div>
          </RouterLink>
        </div>
        <div class="news__bottom"></div>
      </div>
    </div>
  </section>
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
