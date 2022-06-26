<script>
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs.vue";
import { useSettingsStore } from "@/stores/settings";

export default {
  components: {
    HeaderBreadcrumbs,
  },
  setup() {
    const settingsStore = useSettingsStore();
    // settingsStore.$subscribe((mutation, state) => {
    //   console.log(mutation, state);
    // });
    return { settingsStore };
  },
  data() {
    return {
      langData: {},
      langDataLoaded: false,
      langSelected: "",

      isHome: false,
      isBanner: false,

      cartCount: 0,

      menuToggle: false,

      subcategories: "",
      subcategoriesLoaded: false,
      // products: "",
      // productsLoaded: false,

      // productsByCategories: [],
      // productsByCategoriesLoaded: false,

      isLoaded: false,

      test: "",

      menuListToggle: false,
      languageListToggle: false,
    };
  },
  watch: {
    $route() {
      this.$route.name == "home" ? (this.isHome = true) : (this.isHome = false);

      if (
        this.$route.name == "home" ||
        this.$route.name == "brand" ||
        this.$route.name == "history" ||
        this.$route.name == "catalog-collection" ||
        this.$route.name == "detail" ||
        this.$route.name == "news" ||
        this.$route.name == "news-detail" ||
        this.$route.name == "presentation" ||
        this.$route.name == "delivery" ||
        this.$route.name == "contacts" ||
        this.$route.name == "news-detail"
      ) {
        this.isBanner = true;
      } else {
        this.isBanner = false;
      }

      if (this.isHome == true || this.isBanner == true) {
        this.$refs.header.classList.add("header-down");
        this.$refs.header.classList.remove("header-up");
      } else if (this.isHome == false || this.isBanner == false) {
        this.$refs.header.classList.add("header-up");
        this.$refs.header.classList.remove("header-down");
      }
    },
    "settingsStore.langSelected": function () {
      this.getLangData(this.settingsStore.langSelected, "header");
    },
  },

  beforeMount() {
    this.initialize();

    if (localStorage.cartCount) {
      this.settingsStore.cartCounter = JSON.parse(localStorage.cartCount);
    }
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("mouseup", this.onMouseUp);
  },

  methods: {
    onMouseUp() {
      if (
        event.target.className != "header__collections-arrow" &&
        event.target.className != "header__collections-link"
      ) {
        this.menuListToggle = false;
        this.languageListToggle = false;
      }
    },
    onScroll() {
      let st = window.pageYOffset;

      if (this.isHome == true || this.isBanner == true) {
        if (st == 0) {
          this.$refs.header.classList.add("header-down");
          this.$refs.header.classList.remove("header-up");

          this.settingsStore.scrollUp = false;
          this.settingsStore.scrollDown = true;
        } else if (st > this.lastScrollTop) {
          this.$refs.header.classList.add("header-down");
          this.$refs.header.classList.remove("header-up");

          this.settingsStore.scrollUp = false;
          this.settingsStore.scrollDown = true;
        } else {
          this.$refs.header.classList.add("header-up");
          this.$refs.header.classList.remove("header-down");

          this.settingsStore.scrollUp = true;
          this.settingsStore.scrollDown = false;
        }
        this.lastScrollTop = st;
      } else if (this.isHome == false || this.isBanner == false) {
        if (st > this.lastScrollTop) {
          this.$refs.header.classList.add("header-down");
          this.$refs.header.classList.remove("header-up");

          this.settingsStore.scrollUp = false;
          this.settingsStore.scrollDown = true;
        } else {
          this.$refs.header.classList.add("header-up");
          this.$refs.header.classList.remove("header-down");

          this.settingsStore.scrollUp = true;
          this.settingsStore.scrollDown = false;
        }
        this.lastScrollTop = st;
      }
    },

    initialize() {
      this.getSubcategories();

      this.defineLanguage();
      this.getLangData(this.settingsStore.langSelected, "header");
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

    defineLanguage() {
      if (localStorage.lang) {
        this.settingsStore.langSelected = localStorage.lang;
      } else {
        localStorage.setItem("lang", this.settingsStore.langDefault.toString());
        this.settingsStore.langSelected = localStorage.lang;
      }
    },

    setLanguage(selectedLanguage) {
      localStorage.setItem("lang", selectedLanguage);
      this.settingsStore.langSelected = selectedLanguage;

      this.languageListToggle = false;

      // this.closeLanguageMenu();
      // this.closeLanguageMobileMenu();
    },

    closeLanguageMenu() {
      let elem = document.querySelector("#language-menu");
      elem.removeAttribute("open");
    },

    closeLanguageMobileMenu() {
      let elem = document.querySelector("#language-menu");
      elem.removeAttribute("open");
    },

    // closeMenuList() {
    //   let elem = document.querySelector("#menu-list");
    //   elem.removeAttribute("open");
    // },

    changeMenuListToggle() {
      this.menuListToggle == true
        ? (this.menuListToggle = false)
        : (this.menuListToggle = true);
    },

    changeLanguageListToggle() {
      this.languageListToggle == true
        ? (this.languageListToggle = false)
        : (this.languageListToggle = true);
    },

    // async getSubcategories() {
    //   await HTTP.get()
    //     .then((response) => {
    //       this.subcategories = response.data.subcategories;

    //       this.filterSubcategoriesByCategoryName("Часы");

    //       this.isLoaded = true;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    // filterSubcategoriesByCategoryName(categoryName) {
    //   this.subcategories = this.subcategories.filter((item) => {
    //     if (item.category == categoryName) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   });
    // },

    getSubcategories() {
      this.axios
        .get(this.settingsStore.api + "/subcategories-by-category/" + "1") // часы
        .then((response) => {
          this.subcategories = response.data;
          this.subcategoriesLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <header ref="header" class="header">
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
              <li class="header__item">
                <div class="header__collections-main">
                  <div class="header__collection-flex">
                    <RouterLink class="header__collections-parent" to="/catalog"
                      >{{ langDataLoaded == true ? langData.menu.watch : "" }}
                    </RouterLink>
                    <!-- <a> -->

                    <img
                      src="../assets/img/header/arrow-down.svg"
                      alt="Arrow"
                      class="header__collections-arrow"
                      @click="changeMenuListToggle()"
                    />
                    <!-- </a> -->
                  </div>
                  <div
                    v-if="subcategoriesLoaded && menuListToggle"
                    class="header__collections-container"
                  >
                    <ul class="header__collections-list">
                      <li
                        v-for="(item, index0) in subcategories"
                        :key="`${index0}-${item}`"
                        class="header__collections-item"
                      >
                        <RouterLink
                          class="header__collections-link"
                          :to="{
                            name: 'catalog-collection',
                            params: {
                              subcategory: item.title_eng,
                            },
                          }"
                          @click="menuListToggle = false"
                          >{{
                            item["title_" + settingsStore.langSelected]
                          }}</RouterLink
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- <div class="header__redline-special"></div> -->
              </li>

              <!-- <li class="header__item">
                <div id="menu-list" class="header__watch-details">
                  <RouterLink
                    to="/catalog"
                    class="header__details-link"
                    @click="menuListToggle = false"
                  >
                    {{ langDataLoaded == true ? langData.menu.watch : "" }}
                  </RouterLink>
                  <div
                    class="header__watch-summary"
                    @click="changeMenuListToggle()"
                  ></div>
                  <div
                    v-if="subcategoriesLoaded && menuListToggle"
                    class="header__watch-details-content"
                  >
                    <RouterLink
                      v-for="(item, index0) in subcategories"
                      :key="`${index0}-${item}`"
                      class="header__language"
                      :to="{
                        name: 'catalog-collection',
                        params: {
                          subcategory: item.title_eng,
                        },
                      }"
                    >
                      {{ item["title_" + settingsStore.langSelected] }}
                    </RouterLink>
                  </div>
                </div>
                <div class="header__redline-special"></div>
              </li> -->

              <!-- <li class="header__item">
                <RouterLink to="/accessories" class="header__link"
                  >Аксессуары
                </RouterLink>
              </li> -->
              <li class="header__item">
                <RouterLink to="/shops" class="header__link"
                  >{{ langDataLoaded == true ? langData.menu.shops : "" }}
                </RouterLink>
              </li>
              <li class="header__item">
                <RouterLink to="/service" class="header__link"
                  >{{ langDataLoaded == true ? langData.menu.service : "" }}
                </RouterLink>
              </li>
              <li class="header__item">
                <RouterLink to="/brand" class="header__link"
                  >{{ langDataLoaded == true ? langData.menu.brand : "" }}
                </RouterLink>
              </li>
              <li class="header__item">
                <RouterLink to="/history" class="header__link"
                  >{{ langDataLoaded == true ? langData.menu.history : "" }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <!-- Блок значков-ссылок -->
          <div class="header__right">
            <ul class="header__list">
              <li class="header__button header__details-block">
                <div class="header__collections-main">
                  <div class="header__collection-flex">
                    <a
                      class="header__collections-parent"
                      @click="changeLanguageListToggle()"
                      >{{ settingsStore.langSelected }}
                    </a>

                    <img
                      src="../assets/img/header/arrow-down.svg"
                      alt="Arrow"
                      class="header__collections-arrow"
                      @click="changeLanguageListToggle()"
                    />
                  </div>
                  <div
                    v-if="languageListToggle"
                    class="header__collections-container"
                  >
                    <ul class="header__collections-list">
                      <li class="header__collections-item">
                        <a
                          class="header__collections-link"
                          @click="setLanguage('eng')"
                          >English</a
                        >
                      </li>
                      <li class="header__collections-item">
                        <a
                          class="header__collections-link"
                          @click="setLanguage('rus')"
                          >Russian</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <!-- <li class="header__button header__details-block">
                <details id="language-menu" class="header__details">
                  <summary>{{ settingsStore.langSelected }}</summary>
                  <div class="header__details-content">
                    <a class="header__language" @click="setLanguage('eng')"
                      >English</a
                    >
                    <a class="header__language" @click="setLanguage('rus')"
                      >Russian</a
                    >
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
                <a href="mailto:info@attachewatches.com"
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
              >{{
                langDataLoaded == true ? langData.menu.watch : ""
              }}</RouterLink
            >
          </li>
          <!-- <li class="mobile-menu__item">
            <RouterLink
              to="/accessories"
              class="mobile-menu__link"
              @click="menuToggle = false"
              >Аксессуары</RouterLink
            >
          </li> -->
          <li class="mobile-menu__item">
            <RouterLink
              to="/shops"
              class="mobile-menu__link"
              @click="menuToggle = false"
              >{{
                langDataLoaded == true ? langData.menu.shops : ""
              }}</RouterLink
            >
          </li>
          <li class="mobile-menu__item">
            <RouterLink
              to="/brand"
              class="mobile-menu__link"
              @click="menuToggle = false"
              >{{
                langDataLoaded == true ? langData.menu.brand : ""
              }}</RouterLink
            >
          </li>

          <li class="mobile-menu__item">
            <RouterLink
              to="/service"
              class="mobile-menu__link"
              @click="menuToggle = false"
              >{{
                langDataLoaded == true ? langData.menu.service : ""
              }}</RouterLink
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
          <!-- <li class="mobile-menu__button">
            <RouterLink to="/" @click="menuToggle = false">
              <img
                class="mobile-menu__icons"
                src="../assets/img/header/search.svg"
                alt="Search"
            /></RouterLink>
          </li> -->
        </ul>
      </div>
      <details id="language-mobile-menu" class="mobile-menu__details">
        <summary>{{ settingsStore.langSelected }}</summary>
        <div class="mobile-menu__details-content">
          <a class="mobile-menu__language" @click="setLanguage('eng')"
            >English</a
          >
          <a class="mobile-menu__language" @click="setLanguage('rus')"
            >Russian</a
          >
        </div>
      </details>
    </div>

    <HeaderBreadcrumbs v-if="!isHome" />
  </header>
</template>
