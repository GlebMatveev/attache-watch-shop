<script>
import { useSettingsStore } from "@/stores/settings";
import CartForm from "@/components/CartForm.vue";

export default {
  components: {
    CartForm,
  },
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

      cart: [],

      cartSum: 0,
      cartSumLoaded: false,

      cartProductsLoaded: false,

      showModal: false,

      screenWidth: "",
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
        this.cartProductsLoaded == true &&
        this.cartSumLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    productsLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productsLoaded == true &&
        this.cartProductsLoaded == true &&
        this.cartSumLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    cartProductsLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productsLoaded == true &&
        this.cartProductsLoaded == true &&
        this.cartSumLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    cartSumLoaded() {
      if (
        this.langDataLoaded == true &&
        this.productsLoaded == true &&
        this.cartProductsLoaded == true &&
        this.cartSumLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
  },
  created() {
    window.addEventListener("resize", this.updateScreenWidth);
  },
  mounted() {
    this.initialize();

    if (localStorage.cartItems) {
      this.cart = JSON.parse(localStorage.cartItems);
    }

    this.updateScreenWidth();
  },
  methods: {
    initialize() {
      this.settingsStore.allLoaded = true;

      this.langData = {};
      this.langDataLoaded = false;
      this.products = "";
      this.productsLoaded = false;
      this.cartProductsLoaded = false;
      this.cartSumLoaded = false;

      this.getProducts();

      this.getLangData(this.settingsStore.langSelected, "cart");
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

          this.getCartProducts();
          this.getCartSum();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCartProducts() {
      this.products = this.products.filter((item) => {
        let isId = false;

        for (let key in this.cart) {
          let x = item.id;
          let y = this.cart[key].id;

          if (+x == +y) {
            isId = true;
            break;
          } else {
            isId = false;
          }
        }

        if (isId == true) return true;
      });

      this.cartProductsLoaded = true;
    },

    getCartSum() {
      this.cartSum = 0;
      for (let key in this.products) {
        for (let secondKey in this.cart) {
          if (this.cart[secondKey].id == this.products[key].id) {
            let tempSum =
              +this.products[key].price * +this.cart[secondKey].count;
            this.cartSum = this.cartSum + tempSum;
          }
        }
      }

      this.cartSumLoaded = true;
    },

    deleteProduct(deletedId) {
      this.cart = this.cart.filter((item) => {
        if (item.id != deletedId) {
          return true;
        } else {
          return false;
        }
      });

      localStorage.setItem("cartItems", JSON.stringify(this.cart));

      this.getProducts();

      let cartCount = 0;
      for (let key in this.cart) {
        cartCount = cartCount + this.cart[key].count;
      }
      localStorage.setItem("cartCount", cartCount);
      this.settingsStore.cartCounter = cartCount;
    },

    getProductCount(productId) {
      for (let key in this.cart) {
        if (this.cart[key].id == productId) {
          return this.cart[key].count;
        }
      }
    },

    setProductCount(value, productId) {
      for (let key in this.cart) {
        if (this.cart[key].id == productId) {
          this.cart[key].count = +value;
          localStorage.setItem("cartItems", JSON.stringify(this.cart));
        }
      }

      this.getCartSum();

      let cartCount = 0;
      for (let key in this.cart) {
        cartCount = cartCount + this.cart[key].count;
      }
      localStorage.setItem("cartCount", cartCount);
      this.settingsStore.cartCounter = cartCount;
    },

    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
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
        <h1 class="minimalTop__heading" @click="deleteProduct(4)">
          {{ langDataLoaded == true ? langData.page.title : "" }}
        </h1>
        <hr class="minimalTop__deco" />
      </div>
      <div class="minimalTop__container">
        <div class="redline-bold"></div>
      </div>
    </div>
  </section>

  <section class="cart">
    <div class="container">
      <div class="cart-block">
        <div v-if="products != ''" class="cart__head">
          <div class="cart__firstCol cart__borderless cart__cell">
            {{ langDataLoaded == true ? langData.page.tableCol1 : "" }}
          </div>
          <div class="cart__secondCol cart__borderless cart__cell">
            {{ langDataLoaded == true ? langData.page.tableCol2 : "" }}
          </div>
          <div class="cart__thirdCol cart__borderless cart__cell">
            {{ langDataLoaded == true ? langData.page.tableCol3 : "" }}
          </div>
        </div>

        <div class="cart__container">
          <div
            v-for="(product, index) in products"
            :key="`${index}-${product}`"
            class="cart__line"
          >
            <div class="cart__firstCol cart__cell">
              <div class="cart__image-container">
                <img
                  class="cart__image"
                  :src="productsLoaded == true ? product.photo_main : ''"
                  alt="Good"
                />
              </div>
            </div>
            <div class="cart__secondCol cart__cell">
              <div class="cart__label">
                <h3 class="cart__name">
                  {{
                    productsLoaded == true
                      ? product["subcategory_" + settingsStore.langSelected]
                      : ""
                  }}
                </h3>
                <span class="cart__type">{{
                  productsLoaded == true
                    ? product["title_" + settingsStore.langSelected]
                    : ""
                }}</span>
                <hr />
                <h4 class="cart__size">
                  {{
                    productsLoaded == true
                      ? product["subtitle_" + settingsStore.langSelected]
                      : ""
                  }}
                </h4>
                <span class="cart__number">{{
                  productsLoaded == true ? product["articul"] : ""
                }}</span>
                <hr />
                <h3 class="cart__price">
                  {{
                    productsLoaded == true
                      ? numberWithSpaces(+product["price"])
                      : ""
                  }}
                  ₽
                </h3>
                <hr />
                <div class="cart__quantity">
                  <span class="cart__amount">{{
                    langDataLoaded == true ? langData.page.tableCount : ""
                  }}</span>
                  <input
                    ref="input"
                    class="cart__input"
                    type="text"
                    name="count"
                    :value="
                      getProductCount(productsLoaded == true ? product.id : '')
                    "
                    @input="
                      setProductCount(
                        $event.target.value,
                        productsLoaded == true ? product.id : ''
                      )
                    "
                  />

                  <button
                    class="cart__remove"
                    @click="
                      deleteProduct(productsLoaded == true ? product.id : '')
                    "
                  ></button>
                </div>
              </div>
            </div>
            <div
              v-if="index == 0"
              class="cart__thirdCol cart__borderless cart__cell"
            >
              <div class="cart__checkout">
                <span class="cart__sum">{{
                  langDataLoaded == true ? langData.page.orderSubtitle1 : ""
                }}</span>
                <span class="cart__sum-amount"
                  >{{ numberWithSpaces(+cartSum) }} ₽</span
                >
                <hr class="cart__deco" />
                <span class="cart__sum-big">{{
                  langDataLoaded == true ? langData.page.orderSubtitle2 : ""
                }}</span>
                <span class="cart__sum-big-amount"
                  >{{ numberWithSpaces(+cartSum) }} ₽</span
                >
                <button
                  id="show-modal"
                  class="cart__button"
                  @click="showModal = true"
                >
                  {{ langDataLoaded == true ? langData.page.orderButton : "" }}
                </button>

                <Teleport to="body">
                  <!-- use the modal component, pass in the prop -->
                  <CartForm :show="showModal" @close="showModal = false">
                    <template #header>
                      <h3>custom header</h3>
                    </template>
                  </CartForm>
                </Teleport>
              </div>
            </div>
          </div>

          <!-- <div class="cart__line">
            <div class="cart__firstCol cart__cell">
              <img
                class="cart__image"
                src="../assets/img/cart/watch-3.png"
                alt="Good"
              />
            </div>
            <div class="cart__secondCol cart__cell">
              <div class="cart__label">
                <h3 class="cart__name">FRIGATE</h3>
                <span class="cart__type">ХРОНОГРАФ</span>
                <hr />
                <h4 class="cart__size">ДИАМЕТР КОПУСА 42 ММ</h4>
                <span class="cart__number">АРТИКУЛ 01/001/01</span>
                <hr />
                <span class="cart__case">ПОЛИРОВАННОЕ/ХРОМИРОВАННОЕ</span>
                <hr />
                <h3 class="cart__price">27 500 ₽</h3>
                <hr />
                <div class="cart__quantity">
                  <span class="cart__amount">количество</span>
                  <input
                    class="cart__input"
                    type="text"
                    name="count"
                    maxlength="1"
                    data-idx="0"
                    value="1"
                  />
                  <button class="cart__remove"></button>
                </div>
              </div>
            </div>
            <div class="cart__thirdCol cart__cell"></div>
          </div> -->
        </div>

        <div v-if="products != ''" class="cart__bottom">
          <div class="cart__firstCol cart__cell">
            <RouterLink to="/catalog" class="cart__link-decorated">{{
              langDataLoaded == true ? langData.page.tableButton1 : ""
            }}</RouterLink>
          </div>
          <div class="cart__secondCol cart__cell">
            <!-- <RouterLink to="/accessories" class="cart__link-decorated"
              >{{ langDataLoaded == true ? langData.page.tableButton2 : "" }}</RouterLink
            > -->
          </div>
          <div class="cart__thirdCol cart__cell"></div>
        </div>

        <div v-if="screenWidth <= 650" class="cart__borderless cart__cell">
          <div class="cart__checkout">
            <span class="cart__sum">{{
              langDataLoaded == true ? langData.page.orderSubtitle1 : ""
            }}</span>
            <span class="cart__sum-amount">{{ cartSum }} ₽</span>
            <hr class="cart__deco" />
            <span class="cart__sum-big">{{
              langDataLoaded == true ? langData.page.orderSubtitle2 : ""
            }}</span>
            <span class="cart__sum-big-amount">{{ cartSum }} ₽</span>
            <button
              id="show-modal"
              class="cart__button"
              @click="showModal = true"
            >
              СДЕЛАТЬ ЗАКАЗ
            </button>

            <Teleport to="body">
              <!-- use the modal component, pass in the prop -->
              <CartForm :show="showModal" @close="showModal = false">
                <template #header>
                  <h3>custom header</h3>
                </template>
              </CartForm>
            </Teleport>
          </div>
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

<style></style>
