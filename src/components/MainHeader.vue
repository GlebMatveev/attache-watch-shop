<script>
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs.vue";
import { useSettingsStore } from "@/stores/settings";
import { HTTP } from "../main";

export default {
  components: {
    HeaderBreadcrumbs,
  },
  setup() {
    const settingsStore = useSettingsStore();
    return { settingsStore };
  },
  data() {
    return {
      isHome: false,

      cartCount: 0,

      menuToggle: false,

      subcategories: "",

      isLoaded: false,
    };
  },
  watch: {
    $route() {
      this.$route.name == "home" ? (this.isHome = true) : (this.isHome = false);
    },
  },

  async beforeMount() {
    this.initialize();

    if (localStorage.cartCount) {
      this.settingsStore.cartCounter = JSON.parse(localStorage.cartCount);
    }
  },

  methods: {
    initialize() {
      this.getSubcategories();
    },

    async getSubcategories() {
      await HTTP.get()
        .then((response) => {
          this.subcategories = response.data.subcategories;

          this.filterSubcategoriesByCategoryName("Часы");

          this.isLoaded = true;
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

    closeMenuList() {
      let elem = document.querySelector("#menu-list");
      elem.removeAttribute("open");
    },
  },
};
</script>

<template>
  <header class="header">
    <div class="header__top">
      <div class="container">
        <!-- Блок, в котором флексом разнесены лого,навигация и значки -->
        <div class="header__flex">
          <!-- Блок с лого -->
          <div class="header__left">
            <RouterLink to="/">
              <img src="../assets/img/header/header-logo.png" alt="Logo" />
            </RouterLink>
          </div>

          <!-- Блок навигации -->
          <div class="header__center">
            <ul class="header__list">
              <!-- <li class="header__item">
                <RouterLink to="/presentation" class="header__link"
                  >Часы
                </RouterLink>
              </li> -->
              <li class="header__item">
                <details id="menu-list" class="header__watch-details">
                  <summary>
                    <RouterLink
                      to="/presentation"
                      class="header__details-link"
                      @click="closeMenuList()"
                    >
                      Часы
                    </RouterLink>
                  </summary>
                  <div v-if="isLoaded" class="header__watch-details-content">
                    <RouterLink
                      v-for="(x0, index0) in subcategories"
                      :key="`${index0}-${x0}`"
                      class="header__language"
                      :to="{
                        name: 'catalog-collection',
                        params: {
                          subcategory: subcategories[index0].subcategory,
                        },
                      }"
                      @click="closeMenuList()"
                    >
                      {{ subcategories[index0].subcategory }}
                    </RouterLink>
                  </div>
                </details>
                <!-- <div class="header__redline-special"></div> -->
              </li>
              <li class="header__item">
                <RouterLink to="/accessories" class="header__link"
                  >Аксессуары
                </RouterLink>
              </li>
              <li class="header__item">
                <RouterLink to="/brand" class="header__link">Бренд </RouterLink>
              </li>
              <li class="header__item">
                <RouterLink to="/shops" class="header__link"
                  >Где купить
                </RouterLink>
              </li>
              <li class="header__item">
                <RouterLink to="/service" class="header__link"
                  >Гарантия
                </RouterLink>
              </li>
            </ul>
          </div>

          <!-- Блок значков-ссылок -->
          <div class="header__right">
            <ul class="header__list">
              <!-- <li class="header__button header__details-block">
                <details class="header__details">
                  <summary>ENG</summary>
                  <div class="header__details-content">
                    <a class="header__language">English</a>
                    <a class="header__language">Russian</a>
                  </div>
                </details>
              </li> -->
              <li class="header__button">
                <RouterLink to="/profile"
                  ><img src="../assets/img/header/profile.svg" alt="User"
                /></RouterLink>
              </li>
              <li class="header__button">
                <RouterLink to="/cart"
                  ><img
                    src="../assets/img/header/shopping-bag.svg"
                    alt="Shopping Cart"
                  />
                  <div class="header__amount">
                    {{
                      settingsStore.cartCounter == 0
                        ? ""
                        : settingsStore.cartCounter
                    }}
                  </div></RouterLink
                >
              </li>
              <li class="header__button header__button-hide">
                <a href=""
                  ><img src="../assets/img/header/email.svg" alt="Mail"
                /></a>
              </li>
              <!-- <li class="header__button">
                <a href=""
                  ><img src="../assets/img/header/search.svg" alt="Search"
                /></a>
              </li> -->
              <li class="header__button">
                <div class="mobile-menu__burger">
                  <button class="mobile-menu__icon" @click="menuToggle = true">
                    <img
                      class="mobile-menu__icon"
                      src="../assets/img/header/burger.svg"
                      alt="Icon"
                    />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="mobile-menu" :class="{ 'mobile-menu__visible': menuToggle }">
      <div class="mobile-menu__top">
        <a href="index.html">
          <img
            class="mobile-menu__logo"
            src="../assets/img/header/header-logo.png"
            alt="Logo"
          />
        </a>
        <button class="mobile-menu__close" @click="menuToggle = false">
          <img src="../assets/img/header/close.png" alt="Icon" />
        </button>
      </div>

      <div class="mobile-menu__container">
        <ul class="mobile-menu__list">
          <li class="mobile-menu__item">
            <RouterLink
              to="/presentation"
              class="mobile-menu__link"
              @click="menuToggle = false"
              >Часы</RouterLink
            >
          </li>
          <li class="mobile-menu__item">
            <RouterLink
              to="/accessories"
              class="mobile-menu__link"
              @click="menuToggle = false"
              >Аксессуары</RouterLink
            >
          </li>
          <li class="mobile-menu__item">
            <RouterLink
              to="/brand"
              class="mobile-menu__link"
              @click="menuToggle = false"
              >Бренд</RouterLink
            >
          </li>
          <li class="mobile-menu__item">
            <RouterLink
              to="/shops"
              class="mobile-menu__link"
              @click="menuToggle = false"
              >Где купить</RouterLink
            >
          </li>
          <li class="mobile-menu__item">
            <RouterLink
              to="/service"
              class="mobile-menu__link"
              @click="menuToggle = false"
              >Гарантия</RouterLink
            >
          </li>
        </ul>
        <ul class="mobile-menu__links">
          <li class="mobile-menu__button">
            <RouterLink to="/profile" @click="menuToggle = false">
              <img
                class="mobile-menu__icons"
                src="../assets/img/header/profile.svg"
                alt="User"
            /></RouterLink>
          </li>
          <li class="mobile-menu__button">
            <RouterLink to="/cart" @click="menuToggle = false">
              <img
                class="mobile-menu__icons"
                src="../assets/img/header/shopping-bag.svg"
                alt="Shopping Cart"
            /></RouterLink>
          </li>
          <li class="mobile-menu__button">
            <RouterLink to="/" @click="menuToggle = false">
              <img
                class="mobile-menu__icons"
                src="../assets/img/header/email.svg"
                alt="Mail"
            /></RouterLink>
          </li>
          <li class="mobile-menu__button">
            <RouterLink to="/" @click="menuToggle = false">
              <img
                class="mobile-menu__icons"
                src="../assets/img/header/search.svg"
                alt="Search"
            /></RouterLink>
          </li>
        </ul>
      </div>
      <details class="mobile-menu__details">
        <summary>ENG</summary>
        <div class="mobile-menu__details-content">
          <a class="mobile-menu__language" href="">English</a>
          <a class="mobile-menu__language" href="">Russian</a>
        </div>
      </details>
    </div>

    <HeaderBreadcrumbs v-if="!isHome" />
  </header>
</template>
