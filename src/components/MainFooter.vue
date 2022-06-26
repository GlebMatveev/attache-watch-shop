<script>
import { useSettingsStore } from "@/stores/settings";

export default {
  setup() {
    const settingsStore = useSettingsStore();
    return { settingsStore };
  },
  data() {
    return {
      langData: {},
      langDataLoaded: false,
    };
  },
  watch: {
    "settingsStore.langSelected": function () {
      this.initialize();
    },
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.getLangData(this.settingsStore.langSelected, "footer");
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
  },
};
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__flex">
        <!-- Текстовые ссылки -->
        <div class="footer__nav">
          <ul class="footer__list">
            <li class="footer__item">
              <RouterLink to="/news" class="footer__link">{{
                langDataLoaded == true ? langData.menu.news : ""
              }}</RouterLink>
            </li>
            <!-- <li class="footer__item">
              <RouterLink to="/under-construction" class="footer__link">{{
                langDataLoaded == true ? langData.menu.vacancies : ""
              }}</RouterLink>
            </li> -->
            <li class="footer__item">
              <RouterLink to="/shops" class="footer__link">
                {{ langDataLoaded == true ? langData.menu.shops : "" }}
              </RouterLink>
            </li>
            <li class="footer__item">
              <RouterLink to="/distributers" class="footer__link">
                {{ langDataLoaded == true ? langData.menu.distributers : "" }}
              </RouterLink>
            </li>
            <li class="footer__item">
              <RouterLink to="/service" class="footer__link">
                {{ langDataLoaded == true ? langData.menu.service : "" }}
              </RouterLink>
            </li>
            <li class="footer__item">
              <RouterLink to="/delivery" class="footer__link">{{
                langDataLoaded == true ? langData.menu.delivery : ""
              }}</RouterLink>
            </li>
            <li class="footer__item">
              <RouterLink to="/contacts" class="footer__link">{{
                langDataLoaded == true ? langData.menu.contacts : ""
              }}</RouterLink>
            </li>
          </ul>
        </div>
        <!-- Ссылки на соцсети -->
        <div class="footer__social">
          <ul class="footer__list-social">
            <li class="footer__item-social">
              <a
                :href="
                  langDataLoaded == true ? langData.social.socialLink1 : ''
                "
              >
                <img
                  :src="
                    langDataLoaded == true ? langData.social.socialIcon1 : ''
                  "
                  :alt="
                    langDataLoaded == true ? langData.social.socialAlt1 : ''
                  "
                />
              </a>
            </li>
            <li class="footer__item-social">
              <a href="#"
                ><img src="../assets/img/footer/facebook.png" alt="Facebook"
              /></a>
            </li>
            <li class="footer__item-social">
              <a href="#"
                ><img src="../assets/img/footer/youtube.png" alt="Youtube"
              /></a>
            </li>
            <li class="footer__item-social">
              <a href="#"
                ><img src="../assets/img/footer/twitter.png" alt="Twitter"
              /></a>
            </li>
            <li class="footer__item-social">
              <a href="#"
                ><img src="../assets/img/footer/linkedin.png" alt="LinkedIn"
              /></a>
            </li>
            <li class="footer__item-social">
              <a href="#"
                ><img
                  src="../assets/img/footer/google-plus.png"
                  alt="Google-Plus"
              /></a>
            </li>
            <li class="footer__item-social">
              <a href="#"
                ><img src="../assets/img/footer/behance.png" alt="Behance"
              /></a>
            </li>
            <li class="footer__item-social">
              <a href="#"
                ><img src="../assets/img/footer/pinterest.png" alt="Pinterest"
              /></a>
            </li>
          </ul>
        </div>
        <!-- Красное лого -->
        <div class="footer__logo">
          <img src="../assets/img/footer/footer-logo.png" alt="Logo" />
        </div>
        <!-- Красная полоска -->
        <hr />
        <!-- Копирайт -->
        <div class="footer__copyright">
          © {{ new Date().getFullYear() }}
          {{ langDataLoaded == true ? langData.menu.copyright : "" }}
        </div>
      </div>
    </div>
  </footer>
</template>
