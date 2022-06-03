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
      products: "",
      tempProducts: "",

      cart: [],
      cartSum: 0,

      showModal: false,
    };
  },
  mounted() {
    // this.getList();
    this.initialize();

    if (localStorage.cartItems) {
      this.cart = JSON.parse(localStorage.cartItems);
    }
  },
  methods: {
    initialize() {
      this.getProducts();
    },

    getProducts() {
      this.axios
        .get("../db.json")
        .then((response) => {
          this.tempProducts = response.data.products;

          this.products = this.tempProducts;

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
    },

    getProductCount() {},

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
  },
};
</script>

<template>
  <section class="minimalTop">
    <div class="container">
      <div class="minimalTop__name">
        <h1 class="minimalTop__heading" @click="deleteProduct(4)">Корзина</h1>
        <hr class="minimalTop__deco" />
      </div>
      <div class="minimalTop__container">
        <div class="redline-bold"></div>
      </div>
    </div>
  </section>

  <!-- <div>
    <b>products: </b><br />
    {{ products }}<br />
  </div> -->
  <!-- <div>
    <b>tempProducts: </b><br />
    {{ tempProducts }}<br />
  </div> -->
  <!-- <div>
    <b>cart: </b><br />
    {{ cart }}<br />
  </div> -->

  <section class="cart">
    <div class="container">
      <div class="cart-block">
        <div v-if="products != ''" class="cart__head">
          <div class="cart__firstCol cart__borderless cart__cell">МОДЕЛЬ</div>
          <div class="cart__secondCol cart__borderless cart__cell">
            НАИМЕНОВАНИЕ / ЦЕНА / КОЛИЧЕСТВО
          </div>
          <div class="cart__thirdCol cart__borderless cart__cell">
            ЗАКАЗ КОРЗИНЫ
          </div>
        </div>

        <div class="cart__container">
          <div
            v-for="(x, index) in products"
            :key="`${index}-${x}`"
            class="cart__line"
          >
            <div class="cart__firstCol cart__cell">
              <div class="cart__image-container">
                <img
                  class="cart__image"
                  :src="products[index].photoMain"
                  alt="Good"
                />
              </div>
              <!-- <img
                class="cart__image"
                :src="products[index].photoMain"
                alt="Good"
              /> -->
            </div>
            <div class="cart__secondCol cart__cell">
              <div class="cart__label">
                <h3 class="cart__name">{{ products[index].subcategory }}</h3>
                <span class="cart__type">{{ products[index].model }}</span>
                <hr />
                <h4 class="cart__size">
                  ДИАМЕТР КОПУСА {{ products[index].caseSize }}
                </h4>
                <span class="cart__number"
                  >АРТИКУЛ {{ products[index].articul }}</span
                >
                <hr />
                <span class="cart__case"
                  >ПОКРЫТИЕ {{ products[index].covering }}</span
                >
                <hr />
                <h3 class="cart__price">{{ products[index].price }} ₽</h3>
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
                  <button
                    class="cart__remove"
                    @click="deleteProduct(products[index].id)"
                  ></button>
                </div>
              </div>
            </div>
            <div
              v-if="index == 0"
              class="cart__thirdCol cart__borderless cart__cell"
            >
              <div class="cart__checkout">
                <span class="cart__sum">ПРЕДВАРИТЕЛЬНЫЙ ИТОГ ЗАКАЗА</span>
                <span class="cart__sum-amount">{{ cartSum }} ₽</span>
                <hr class="cart__deco" />
                <span class="cart__sum-big">ОБЩАЯ СТОИМОСТЬ ЗАКАЗА</span>
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
            <RouterLink to="/catalog" class="cart__link-decorated"
              >ДОБАВИТЬ ЕЩЕ ЧАСЫ</RouterLink
            >
          </div>
          <div class="cart__secondCol cart__cell">
            <RouterLink to="/accessories" class="cart__link-decorated"
              >КУПИТЬ ДОПОЛНИТЕЛЬНЫЕ БРАСЛЕТЫ ИЛИ ДРУГИЕ АКСЕССУАРЫ</RouterLink
            >
          </div>
          <div class="cart__thirdCol cart__cell"></div>
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
