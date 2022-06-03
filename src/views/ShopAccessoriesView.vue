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
      products: "",

      cart: [],

      currentFilterSelect: "выбрать модель часов",
    };
  },
  computed: {
    itemId() {
      return +this.$route.params.id;
    },
  },
  beforeMount() {
    this.initialize();

    if (localStorage.cartItems) {
      this.cart = JSON.parse(localStorage.cartItems);
    }
  },
  methods: {
    initialize() {
      this.getProducts();
    },

    async getProducts() {
      await HTTP.get()
        .then((response) => {
          this.products = response.data.products;

          this.filterProductsByCategoryName("Аксессуары");

          console.log("this.products", this.products);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    filterProductsByCategoryName(categoryName) {
      this.products = this.products.filter((item) => {
        if (item.category == categoryName) {
          return true;
        } else {
          return false;
        }
      });
    },

    async filterProductsBySubcategory(subcategoryName) {
      await HTTP.get()
        .then((response) => {
          this.products = response.data.products;

          this.filterProductsByCategoryName("Аксессуары");

          this.products = this.products.filter((item) => {
            let isMatch = false;
            item.subcategories.forEach((element) => {
              if (element == subcategoryName) {
                isMatch = true;
              }
            });

            if (isMatch == true) {
              return true;
            } else {
              return false;
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addToCart(productId) {
      console.log("this.cart", this.cart);

      let isId = false;
      let cartCount = 0;
      for (let key in this.cart) {
        if (this.cart[key].id == productId) {
          isId = true;

          let count = +this.cart[key].count + 1;

          this.cart[key] = new Object({
            id: productId,
            count: count,
          });
        }
      }
      if (isId == false) {
        this.cart.push(
          new Object({
            id: productId,
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
    },
  },
};
</script>

<template>
  <section class="minimalTop">
    <div class="container">
      <div class="minimalTop__name">
        <h1 class="minimalTop__heading">Аксессуары</h1>
        <hr class="minimalTop__deco" />
      </div>
      <div class="accesories__filter">
        <div class="accesories__select">
          <select v-model="currentFilterSelect" name="model">
            <option selected="selected">
              выбрать модель <br />
              часов
            </option>
            <option value="FRIGATE">FRIGATE</option>
            <option value="MARINE">MARINE</option>
            <option value="MEGAPOLIS">MEGAPOLIS</option>
            <option value="SKY TRAFFIC">SKY TRAFFIC</option>
            <option value="SKY TRAFFIC II">SKY TRAFFIC II</option>
            <option value="SPECIALLINER">SPECIALLINER</option>
            <option value="PILOT">PILOT</option>
            <option value="DEEP SEA">DEEP SEA</option>
          </select>
        </div>
        <button
          class="accesories__button"
          @click="filterProductsBySubcategory(currentFilterSelect)"
        >
          ПОДОБРАТЬ РЕМЕШКИ/БРАСЛЕТЫ
        </button>
      </div>
      <div class="minimalTop__container">
        <div class="redline-bold"></div>
      </div>
    </div>
  </section>

  <section class="accesories">
    <div class="container">
      <div class="accesories__grid">
        <div
          v-for="(x0, index0) in products"
          :key="`${index0}-${x0}`"
          class="bling"
        >
          <div class="bling__label">
            <img
              class="bling__img"
              :src="products[index0].photoMain"
              alt="Band"
            />
            <h3 class="bling__name">{{ products[index0].model }}</h3>
            <span class="bling__text">{{ products[index0].description }}</span>
            <span class="bling__price">{{ products[index0].price }} ₽</span>
          </div>
          <button class="bling__button" @click="addToCart(products[index0].id)">
            ДОБАВИТЬ В КОРЗИНУ
          </button>
        </div>
        <!-- <div class="bling">
          <div class="bling__label">
            <img
              class="bling__img"
              src="../assets/img/accesories/brown.png"
              alt="Band"
            />
            <h3 class="bling__name">Коричневый</h3>
            <span class="bling__text"
              >ремешок из натуральной кожи “крокодил”</span
            >
            <span class="bling__price">3 000 ₽</span>
          </div>
          <button class="bling__button">ДОБАВИТЬ В КОРЗИНУ</button>
        </div>
        <div class="bling">
          <div class="bling__label">
            <img
              class="bling__img"
              src="../assets/img/accesories/beige.png"
              alt="Band"
            />
            <h3 class="bling__name">Бежевый</h3>
            <span class="bling__text"
              >ремешок из натуральной кожи “крокодил”</span
            >
            <span class="bling__price">3 000 ₽</span>
          </div>
          <button class="bling__button">ДОБАВИТЬ В КОРЗИНУ</button>
        </div>
        <div class="bling">
          <div class="bling__label">
            <img
              class="bling__img"
              src="../assets/img/accesories/blue.png"
              alt="Band"
            />
            <h3 class="bling__name">синий</h3>
            <span class="bling__text"
              >ремешок из натуральной кожи “крокодил”</span
            >
            <span class="bling__price">3 000 ₽</span>
          </div>
          <button class="bling__button">ДОБАВИТЬ В КОРЗИНУ</button>
        </div>
        <div class="bling">
          <div class="bling__label">
            <img
              class="bling__img"
              src="../assets/img/accesories/green.png"
              alt="Band"
            />
            <h3 class="bling__name">зеленый</h3>
            <span class="bling__text"
              >ремешок из натуральной кожи “крокодил”</span
            >
            <span class="bling__price">3 000 ₽</span>
          </div>
          <button class="bling__button">ДОБАВИТЬ В КОРЗИНУ</button>
        </div>
        <div class="bling">
          <div class="bling__label">
            <img
              class="bling__img"
              src="../assets/img/accesories/blue-bright.png"
              alt="Band"
            />
            <h3 class="bling__name">ЯРКО-СИНИЙ</h3>
            <span class="bling__text"
              >ремешок из натуральной кожи “крокодил”</span
            >
            <span class="bling__price">2 000 ₽</span>
          </div>
          <button class="bling__button">ДОБАВИТЬ В КОРЗИНУ</button>
        </div>
        <div class="bling">
          <div class="bling__label">
            <img
              class="bling__img"
              src="../assets/img/accesories/orange.png"
              alt="Band"
            />
            <h3 class="bling__name">оранжевый</h3>
            <span class="bling__text"
              >ремешок из натуральной кожи “крокодил”</span
            >
            <span class="bling__price">2 000 ₽</span>
          </div>
          <button class="bling__button">ДОБАВИТЬ В КОРЗИНУ</button>
        </div>
        <div class="bling">
          <div class="bling__label">
            <img
              class="bling__img"
              src="../assets/img/accesories/white.png"
              alt="Band"
            />
            <h3 class="bling__name">белый</h3>
            <span class="bling__text"
              >ремешок из натуральной кожи “крокодил”</span
            >
            <span class="bling__price">2 000 ₽</span>
          </div>
          <button class="bling__button">ДОБАВИТЬ В КОРЗИНУ</button>
        </div>
        <div class="bling">
          <div class="bling__label">
            <img
              class="bling__img"
              src="../assets/img/accesories/violet.png"
              alt="Band"
            />
            <h3 class="bling__name">фиолетовый</h3>
            <span class="bling__text"
              >ремешок из натуральной кожи “крокодил”</span
            >
            <span class="bling__price">2 000 ₽</span>
          </div>
          <button class="bling__button">ДОБАВИТЬ В КОРЗИНУ</button>
        </div>
        <div class="bling">
          <div class="bling__label">
            <img
              class="bling__img"
              src="../assets/img/accesories/red.png"
              alt="Band"
            />
            <h3 class="bling__name">красный</h3>
            <span class="bling__text"
              >ремешок из натуральной кожи “крокодил”</span
            >
            <span class="bling__price">2 000 ₽</span>
          </div>
          <button class="bling__button">ДОБАВИТЬ В КОРЗИНУ</button>
        </div> -->
      </div>
    </div>
  </section>

  <div class="container">
    <div class="whitespace__block">
      <div class="whitespace"></div>
    </div>
  </div>
</template>

<style></style>
