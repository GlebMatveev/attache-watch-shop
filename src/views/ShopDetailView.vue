<script>
import "vue3-carousel/dist/carousel.css";
import VueEasyLightbox from "vue-easy-lightbox";
import { useSettingsStore } from "@/stores/settings";

export default {
  name: "AppDetail",
  components: {
    VueEasyLightbox,
  },
  setup() {
    const settingsStore = useSettingsStore();
    return { settingsStore };
  },
  data() {
    return {
      product: "",
      tempProduct: "",
      subcategoryPILOT: "",
      products: "",

      imgs: "", // Img Url , string or Array of string
      visible: false,
      index: 0, // default: 0

      test: "",
      result: "",

      cart: [],

      cartArr: { id: "3", count: "20" },
    };
  },
  computed: {
    itemId() {
      return +this.$route.params.id;
    },
  },
  watch: {
    $route() {
      this.axios
        .get("../db.json")
        .then((response) => {
          this.tempProduct = response.data.products.filter((item) => {
            if (item.id == this.$route.params.id) {
              return true;
            } else {
              return false;
            }
          });

          this.product = this.tempProduct[0];

          // this.getProducts();

          this.axios
            .get("../db.json")
            .then((response) => {
              this.products = response.data.products;

              this.getProductsBySubcategory(this.product.subcategory);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });

      if (localStorage.cartItems) {
        this.cart = JSON.parse(localStorage.cartItems);
      }
    },
  },
  async created() {
    // this.getList();
    // this.initialize();

    await this.axios
      .get("../db.json")
      .then((response) => {
        this.tempProduct = response.data.products.filter((item) => {
          if (item.id == this.$route.params.id) {
            return true;
          } else {
            return false;
          }
        });

        this.product = this.tempProduct[0];

        // this.getProducts();

        this.axios
          .get("../db.json")
          .then((response) => {
            this.products = response.data.products;

            this.getProductsBySubcategory(this.product.subcategory);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    if (localStorage.cartItems) {
      this.cart = JSON.parse(localStorage.cartItems);
    }
  },

  methods: {
    initialize() {
      // this.getSubcategories();

      this.getProduct();

      this.getProducts();
    },

    addToCart() {
      // this.settingsStore.cartCounter = +this.settingsStore.cartCounter + 1;

      let isId = false;
      let cartCount = 0;
      for (let key in this.cart) {
        if (this.cart[key].id == this.product.id) {
          isId = true;

          let count = +this.cart[key].count + 1;

          this.cart[key] = new Object({
            id: this.product.id,
            count: count,
          });
        }
      }
      if (isId == false) {
        this.cart.push(
          new Object({
            id: this.product.id,
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

      // this.settingsStore.cartCounter = +this.settingsStore.cartCounter + 1;

      // let isId = false;
      // for (let key in this.cart) {
      //   if (this.cart[key].id == this.product.id) {
      //     isId = true;
      //     this.cart[key] = this.cartArr;
      //   }
      // }
      // if (isId == false) {
      //   this.cart.push(this.cartArr);
      // }

      // localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    getProduct() {
      this.axios
        .get("../db.json")
        .then((response) => {
          this.tempProduct = response.data.products.filter((item) => {
            if (item.id == this.$route.params.id) {
              return true;
            } else {
              return false;
            }
          });

          this.product = this.tempProduct[0];

          this.getProducts(this.product.subcategory);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getProducts(currentSubcategory) {
      this.axios
        .get("../db.json")
        .then((response) => {
          this.products = response.data.products;

          this.getProductsBySubcategory(currentSubcategory);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getProductsBySubcategory(currentSubcategory) {
      this.products = this.products.filter((item) => {
        if (item.subcategory == currentSubcategory) {
          return true;
        } else {
          return false;
        }
      });
    },

    showMultiple(n) {
      this.imgs = [];
      // this.imgs = [
      //   "`../` + `this.product.photoAdd1`",
      //   this.product.photoMain,
      //   "https://electroexpress.ru/img/watch-front.png",
      // ];
      this.imgs.push("../" + this.product.photoMain);
      this.imgs.push("../" + this.product.photoAdd1);
      this.imgs.push("../" + this.product.photoAdd2);
      this.imgs.push("../" + this.product.photoGalleryMd1);
      this.imgs.push("../" + this.product.photoGalleryMd2);

      this.index = n;
      this.show();
    },
    show() {
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
  },
};
</script>

<template>
  <section class="showWatch">
    <div class="showWatch__img-container">
      <img class="showWatch__img" :src="`../` + product.photoBack" alt="" />
    </div>
    <div class="container">
      <div class="showWatch__flex">
        <div class="showWatch__left">
          <h1 class="showWatch__heading">
            {{ product.subcategory }}
          </h1>
          <h3 class="showWatch__heading-small">{{ product.model }}</h3>
          <hr class="showWatch__line" />
          <span class="showWatch__text">{{ product.description }}</span>
          <span class="showWatch__text-bold">{{ product.articul }}</span>
          <hr class="showWatch__line-thin" />
          <div class="showWatch__minis">
            <div class="showWatch__mini" @click="showMultiple(1)">
              <img :src="`../` + product.photoAdd1" alt="Watch" />
            </div>
            <div class="showWatch__mini" @click="showMultiple(2)">
              <img :src="`../` + product.photoAdd2" alt="Watch" />
            </div>
          </div>
        </div>

        <div class="showWatch__center">
          <img
            :src="`../` + product.photoMain"
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

        <div class="showWatch__right">
          <div class="showWatch__grid">
            <div class="showWatch__cell"><span>механизм:</span></div>
            <div class="showWatch__cell">
              <span>{{ product.mechanism }}</span>
            </div>
            <div class="showWatch__cell"><span>Корпус:</span></div>
            <div class="showWatch__cell">
              <span>{{ product.case }}</span>
            </div>
            <div class="showWatch__cell"><span>Покрытие:</span></div>
            <div class="showWatch__cell">
              <span>{{ product.covering }}</span>
            </div>
            <div class="showWatch__cell"><span>стекло:</span></div>
            <div class="showWatch__cell">
              <span>{{ product.glass }}</span>
            </div>
            <div class="showWatch__cell"><span>ремень/браслет</span></div>
            <div class="showWatch__cell">
              <span>{{ product.watchband }}</span>
            </div>
            <div class="showWatch__cell"><span>водозащита:</span></div>
            <div class="showWatch__cell">
              <span>{{ product.waterproofing }}</span>
            </div>
            <div class="showWatch__cell"><span>Размер корпуса:</span></div>
            <div class="showWatch__cell">
              <span>{{ product.caseSize }}</span>
            </div>
            <div class="showWatch__cell"><span>размер ремешка:</span></div>
            <div class="showWatch__cell">
              <span>{{ product.watchbandSize }}</span>
            </div>
          </div>
          <hr class="showWatch__line" />
          <div class="showWatch__price">
            <h3 class="showWatch__amount">{{ product.price }}</h3>
            <h3 class="showWatch__currency">₽</h3>
          </div>
          <button class="showWatch__button" @click="addToCart()">
            КУПИТЬ ЭТИ ЧАСЫ
          </button>
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

  <section class="watchCard">
    <div class="container">
      <div class="watchCard__info">
        <img src="../assets/img/watch-card/logo-big.png" alt="logo" />
      </div>
      <div class="watchCard__grid">
        <div class="watchCard__cell watchCard__top">
          <img
            class="watchCard__cell-img"
            :src="`../` + product.photoGalleryBg"
            alt="watch"
          />
        </div>
        <div class="watchCard__cell watchCard__mid1">
          <img
            class="watchCard__cell-img"
            :src="`../` + product.photoGalleryMd1"
            alt="watch"
          />
          <div class="watchCard__label">
            <img
              src="../assets/img/watch-card/zoom.png"
              alt=""
              @click="showMultiple(3)"
            />
          </div>
        </div>
        <div class="watchCard__cell watchCard__mid2">
          <img
            class="watchCard__cell-img"
            :src="`../` + product.photoGalleryMd2"
            alt="watch"
          />
          <div class="watchCard__label">
            <img
              src="../assets/img/watch-card/zoom.png"
              alt=""
              @click="showMultiple(4)"
            />
          </div>
        </div>
        <a
          :href="product.socialLink"
          class="watchCard__cell watchCard__bottom1"
        >
          <img
            class="watchCard__cell-img"
            :src="`../` + product.photoGallerySm1"
            alt="watch"
          />
          <div class="watchCard__label">
            <img src="../assets/img/watch-card/vk-white.svg" alt="" />
          </div>
        </a>
        <a
          :href="product.socialLink"
          class="watchCard__cell watchCard__bottom2"
        >
          <div class="watchCard__instaLabel">
            <img src="../assets/img/watch-card/vk-white.svg" alt="instagram" />
            <span>следите за нами в</span>
            <h4>VK</h4>
          </div>
        </a>
        <a
          :href="product.socialLink"
          class="watchCard__cell watchCard__bottom3"
        >
          <img
            class="watchCard__cell-img"
            :src="`../` + product.photoGallerySm2"
            alt="watch"
          />
          <div class="watchCard__label">
            <img src="../assets/img/watch-card/vk-white.svg" alt="" />
          </div>
        </a>
      </div>
      <div class="watchCard__wrap">
        <div class="watchCard__block">
          <h4>Он-ЛАЙН ПОМОЩЬ ПРИ ПОКУПКЕ</h4>
          <span class="watchCard__block-text"
            >Напишите или позвоните нам и наши менеджеры помогут Вам:</span
          >
        </div>
        <div class="watchCard__block">
          <a class="watchCard__mail" href="mailto:on-lineshop@attache.ru"
            ><img src="../assets/img/warranty/mail.svg" alt="Mail" />&nbsp;<span
              >on-lineshop@attache.ru</span
            ></a
          >
          <a class="watchCard__phone" href="tel:+74956402502"
            ><img
              src="../assets/img/warranty/phone.svg"
              alt="Phone"
            />&nbsp;<span>+7(495) 640-25-02</span></a
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
            ВЫБРАТЬ СВОЙ {{ product.subcategory }}
          </h2>
          <hr class="showcase__decor" />
        </div>
        <div class="showcase__slider">
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
                  :src="`../` + products[index0].photoMain"
                  alt="Watch"
                />
                <h2 class="clock__head">{{ products[index0].subcategory }}</h2>
                <span class="clock__name">{{ products[index0].model }}</span>
                <hr class="clock__deco" />
                <span class="clock__art">{{ products[index0].articul }}</span>
                <div class="clock__price">
                  <span class="clock__amount">{{
                    products[index0].price
                  }}</span>
                  <span class="clock__currency">₽</span>
                </div>
                <hr class="clock__redline" />
              </div>
            </RouterLink>

            <!-- <a class="clock__link" href="#">
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
            </a>
            <a class="clock__link" href="#">
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
            </a>
            <a class="clock__link" href="#">
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
            </a> -->
          </div>
        </div>
        <div class="showcase__button-wrapper">
          <!-- <RouterLink
            :to="{
              name: 'catalog-collection',
              params: {
                subcategory: product.subcategory,
              },
            }"
          >
            <button class="showcase__button">Посмотреть все часы</button>
          </RouterLink> -->
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
