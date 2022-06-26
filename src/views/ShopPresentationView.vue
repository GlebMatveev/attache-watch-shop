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
      subcategories: "",
      products: "",
    };
  },
  mounted() {
    this.initialize();
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
  <section class="shopTop">
    <div class="container">
      <div class="shopTop__name">
        <h1 class="shopTop__heading">ЧАСЫ</h1>
        <hr class="shopTop__deco" />
      </div>
      <div class="shopTop__grid">
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
          <div class="clock clock-negative">
            <img
              class="clock__img"
              :src="products[index].photoMain"
              alt="Watch"
            />
            <h2 class="clock__head clock-negative__head">
              {{ products[index].subcategory }}
            </h2>
            <hr class="clock__deco clock-negative__deco" />
            <div class="clock__price">
              <span class="clock__amount clock-negative__amount">{{
                products[index].price
              }}</span>
              <span class="clock__currency clock-negative__currency">₽</span>
            </div>
            <hr class="clock__redline" />
          </div>
        </RouterLink>
        <!-- <RouterLink to="/detail" class="clock__link">
          <div class="clock clock-negative">
            <img
              class="clock__img"
              src="../assets/img/clock/watch-2.png"
              alt="Watch"
            />
            <h2 class="clock__head clock-negative__head">Pilot</h2>
            <hr class="clock__deco clock-negative__deco" />
            <div class="clock__price">
              <span class="clock__amount clock-negative__amount">25 000</span>
              <span class="clock__currency clock-negative__currency">₽</span>
            </div>
            <hr class="clock__redline" />
          </div>
        </RouterLink>
        <RouterLink to="/detail" class="clock__link">
          <div class="clock clock-negative">
            <img
              class="clock__img"
              src="../assets/img/clock/watch-3.png"
              alt="Watch"
            />
            <h2 class="clock__head clock-negative__head">Pilot</h2>
            <hr class="clock__deco clock-negative__deco" />
            <div class="clock__price">
              <span class="clock__amount clock-negative__amount">20 000</span>
              <span class="clock__currency clock-negative__currency">₽</span>
            </div>
            <hr class="clock__redline" />
          </div>
        </RouterLink>
        <RouterLink to="/detail" class="clock__link">
          <div class="clock clock-negative">
            <img
              class="clock__img"
              src="../assets/img/clock/watch-4.png"
              alt="Watch"
            />
            <h2 class="clock__head clock-negative__head">Pilot</h2>
            <hr class="clock__deco clock-negative__deco" />
            <div class="clock__price">
              <span class="clock__amount clock-negative__amount">25 000</span>
              <span class="clock__currency clock-negative__currency">₽</span>
            </div>
            <hr class="clock__redline" />
          </div>
        </RouterLink> -->
      </div>
    </div>
  </section>

  <div class="departments__button-wrapper">
    <RouterLink to="/catalog">
      <button class="departments__button">Посмотреть все часы</button>
    </RouterLink>
  </div>

  <section class="departments">
    <div class="container">
      <div class="departments__wrap">
        <RouterLink to="/accessories" class="departments__link">
          <div class="departments__label">
            <h2 class="departments__heading">Аксессуары</h2>
            <hr class="departments__deco" />
            <h3 class="departments__h3">Аксессуары</h3>
          </div>
        </RouterLink>
        <RouterLink to="/catalog" class="departments__link">
          <div class="departments__label">
            <h2 class="departments__heading">Купить</h2>
            <hr class="departments__deco" />
            <span class="departments__text">
              официально на нашем сайте сейчас
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="presentation">
    <div class="presentation__block">
      <h1 class="presentation__heading">DEEP SEA</h1>
      <h3 class="presentation__text">Премьера часов</h3>
      <RouterLink to="/catalog/DEEP SEA" class="presentation__link">
        ПОСМОТРЕТЬ премьеру
      </RouterLink>
    </div>
  </section>

  <div class="container">
    <div class="shop__whitespace-block">
      <div class="shop__whitespace"></div>
    </div>
  </div>
</template>

<style></style>
