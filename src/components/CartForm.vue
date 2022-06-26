<script>
export default {
  props: {
    show: Boolean,
  },
  emits: ["close"],
  data() {
    return {
      formData: {
        name: "",
        phone: "",
        email: "",
        address: "",
        comment: "",
        order: [],
      },
      cart: "",
      products: "",
      cartSum: "",
    };
  },

  mounted() {
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
          this.tempProducts = response.data.allWatch;

          this.products = this.tempProducts;

          this.getCartProducts();
          this.getCartSum();
          this.getOrder();
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

    getOrder() {
      for (let key in this.products) {
        let tempObj = new Object();

        tempObj.Id = this.products[key].id;
        tempObj.Подкатегория = this.products[key].subcategory;
        tempObj.Модель = this.products[key].model;
        tempObj.Артикул = this.products[key].articul;
        tempObj.Цена = this.products[key].price;

        for (let keyAdd in this.cart) {
          if (this.cart[keyAdd].id == this.products[key].id) {
            tempObj.Количество = this.cart[keyAdd].count;
          }
        }
        this.formData.order.push(tempObj);
      }
    },

    deleteCart() {
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartCount");
    },
  },
};
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="mod-order__close" @click="$emit('close')">✕</div>
          <h2 class="mod-order__heading">ОФОРМЛЕНИЕ ЗАКАЗА</h2>
          <span class="mod-order__text"
            >ЗАПОЛНИТЕ ВСЕ ПОЛЯ ДАННЫЕ ДЛЯ СОЗДАНИЯ ЗАКАЗА</span
          >
          <div class="mod-order__form-block">
            <!-- <div>
              <b>cart: </b><br />
              {{ cart }}
            </div>
            <div>
              <b>products: </b><br />
              {{ products }}
            </div>
            <div>
              <b>cartSum: </b><br />
              {{ cartSum }}
            </div>
            <div>
              <b>formData.order: </b><br />
              {{ formData.order }}
            </div> -->
            <form method="POST" action="php/form.php">
              <input
                v-model="formData.name"
                class="mod-order__input"
                type="text"
                name="name"
                placeholder="Ваше имя"
                required=""
              />
              <input
                v-model="formData.phone"
                class="mod-order__input"
                type="tel"
                name="phone"
                placeholder="Мобильный телефон"
                required=""
              />
              <input
                v-model="formData.email"
                class="mod-order__input"
                type="email"
                name="email"
                placeholder="Электронная почта"
                required=""
              />
              <input
                v-model="formData.address"
                class="mod-order__input"
                type="text"
                name="address"
                placeholder="Адрес доставки"
                required=""
              />
              <textarea
                v-model="formData.comment"
                class="mod-order__input mod-order__textArea"
                name="comment"
                placeholder="Комментарий к заказу"
              ></textarea>
              <input type="hidden" name="cartSum" :value="cartSum" />
              <input
                type="hidden"
                name="cart"
                :value="JSON.stringify(formData.order)"
              />

              <button
                class="mod-order__button"
                type="submit"
                @click="deleteCart()"
              >
                Сделать заказ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media (max-width: 700px) {
  .modal-container {
    width: 500px;
  }
}

@media (max-width: 590px) {
  .modal-container {
    width: 400px;
  }

  .mod-order__text {
    font-size: 12px;
  }
}

@media (max-width: 490px) {
  .modal-container {
    width: 300px;
  }
}

@media (max-width: 375px) {
  .modal-container {
    width: 250px;
  }
}
</style>
