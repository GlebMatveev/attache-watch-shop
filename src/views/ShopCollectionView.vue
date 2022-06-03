<script>
// import { HTTP } from "../main";

export default {
  data() {
    return {
      products: "",
      models: [],
      productsByModels: [],

      modelWords: ["модель", "модели", "моделей"],
    };
  },

  computed: {
    currentSubcategoryRoute() {
      return this.$route.params.subcategory;
    },
  },
  beforeMount() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.getProducts();
    },

    getSubcategories() {
      this.axios
        .get("../db.json")
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
      this.axios
        .get("../db.json")
        .then((response) => {
          this.products = response.data.products;

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
        if (item.subcategory == categoryName) {
          return true;
        } else {
          return false;
        }
      });
    },

    getModelsBySubcategory() {
      for (let key in this.products) {
        if (!this.models.includes(this.products[key].model)) {
          this.models.push(this.products[key].model);
        }
      }
    },

    filterProductsByModels() {
      let tempProducts = this.products;

      let tempFilteredProducts = "";

      for (let key in this.models) {
        tempFilteredProducts = tempProducts.filter((item) => {
          if (item.model == this.models[key]) {
            return true;
          } else {
            return false;
          }
        });
        this.productsByModels[key] = tempFilteredProducts;

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
  },
};
</script>

<template>
  <!-- <div>
    <b>products: </b><br />
    {{ products }}
  </div> -->
  s
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
  <!-- <div>
    <b>products: </b><br />
    {{ products }}
  </div>
  <div>
    <b>models: </b><br />
    {{ models }}
  </div>
  <div>
    <b>productsByModels: </b><br />
    {{ productsByModels }}
  </div> -->

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
            {{ declOfWord(productsByModels[index0].length, modelWords) }}</span
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
              id: productsByModels[index0][index1].id,
            },
          }"
          class="clock__link clock__link-bordered"
        >
          <div class="clock">
            <img
              class="clock__img"
              :src="`../` + productsByModels[index0][index1].photoMain"
              alt="Watch"
            />
            <h2 class="clock__head">
              {{ productsByModels[index0][index1].subcategory }}
            </h2>
            <span class="clock__name">{{
              productsByModels[index0][index1].model
            }}</span>
            <hr class="clock__deco" />
            <span class="clock__art">{{
              productsByModels[index0][index1].articul
            }}</span>
            <div class="clock__price">
              <span class="clock__amount">{{
                productsByModels[index0][index1].price
              }}</span>
              <span class="clock__currency">₽</span>
            </div>
            <hr class="clock__redline" />
          </div>
        </RouterLink>
        <!-- <RouterLink to="/detail/2" class="clock__link clock__link-bordered">
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
        <RouterLink to="/detail/3" class="clock__link clock__link-bordered">
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
        <RouterLink to="/detail/4" class="clock__link clock__link-bordered">
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
    <hr class="collection-block__border" />
  </section>

  <!-- <section class="collection-block">
    <div class="container">
      <div class="collection-block__wrap">
        <div class="collection-block__left">
          <h2 class="collection-block__heading">AUTOMATIC 45mm</h2>
          <div class="collection-block__redline"></div>
        </div>
        <div class="collection-block__right">
          <span class="collection-block__text">7 модели</span>
          <div class="collection-block__redline"></div>
        </div>
      </div>
    </div>
    <hr class="collection-block__border" />
    <div class="container">
      <div class="collection-block__grid">
        <RouterLink to="/detail/1" class="clock__link clock__link-bordered">
          <div class="clock">
            <img
              class="clock__img"
              src="../assets/img/clock/watch-1.png"
              alt="Watch"
            />
            <h2 class="clock__head">Pilot</h2>
            <span class="clock__name">chronograph</span>
            <hr class="clock__deco" />
            <span class="clock__art">AРТ 2420.350.1</span>
            <div class="clock__price">
              <span class="clock__amount">30 000</span>
              <span class="clock__currency">₽</span>
            </div>
            <hr class="clock__redline" />
          </div>
        </RouterLink>
        <RouterLink to="/detail/2" class="clock__link clock__link-bordered">
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
        <RouterLink to="/detail/3" class="clock__link clock__link-bordered">
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
        <RouterLink to="/detail/4" class="clock__link clock__link-bordered">
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
        </RouterLink>
        <RouterLink to="/detail/16" class="clock__link clock__link-bordered">
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
        <RouterLink to="/detail/17" class="clock__link clock__link-bordered">
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
        <RouterLink to="/detail/18" class="clock__link clock__link-bordered">
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
        </RouterLink>
      </div>
    </div>
    <hr class="collection-block__border" />
  </section>

  <section class="collection-block">
    <div class="container">
      <div class="collection-block__wrap">
        <div class="collection-block__left">
          <h2 class="collection-block__heading">24 GMT 45mm</h2>
          <div class="collection-block__redline"></div>
        </div>
        <div class="collection-block__right">
          <span class="collection-block__text">4 модели</span>
          <div class="collection-block__redline"></div>
        </div>
      </div>
    </div>
    <hr class="collection-block__border" />
    <div class="container">
      <div class="collection-block__grid">
        <RouterLink to="/detail/1" class="clock__link clock__link-bordered">
          <div class="clock">
            <img
              class="clock__img"
              src="../assets/img/clock/watch-1.png"
              alt="Watch"
            />
            <h2 class="clock__head">Pilot</h2>
            <span class="clock__name">chronograph</span>
            <hr class="clock__deco" />
            <span class="clock__art">AРТ 2420.350.1</span>
            <div class="clock__price">
              <span class="clock__amount">30 000</span>
              <span class="clock__currency">₽</span>
            </div>
            <hr class="clock__redline" />
          </div>
        </RouterLink>
        <RouterLink to="/detail/2" class="clock__link clock__link-bordered">
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
        <RouterLink to="/detail/3" class="clock__link clock__link-bordered">
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
        <RouterLink to="/detail/4" class="clock__link clock__link-bordered">
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
        </RouterLink>
      </div>
    </div>
    <hr class="collection-block__border" />
  </section> -->

  <div class="container">
    <div class="collection-block__button-wrapper">
      <RouterLink to="/catalog">
        <button class="collection-block__button">Посмотреть все часы</button>
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
