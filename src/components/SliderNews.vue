/* eslint-disable vue/no-v-html */
<script>
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

import { useSettingsStore } from "@/stores/settings";

// import swiper module styles
import "swiper/css";
import "swiper/css/pagination";
// more module style...

export default {
  name: "AppSlider",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const settingsStore = useSettingsStore();
    return {
      settingsStore,
      modules: [Pagination],
    };
  },
  data() {
    return {
      langData: {},
      langDataLoaded: false,

      news: "",
      newsLoaded: false,

      newsSimple: "",
      newsSocial: "",
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
      this.langData = {};
      this.langDataLoaded = false;
      this.news = "";
      this.newsLoaded = false;
      this.newsSimple = "";
      this.newsSocial = "";

      this.getLangData(this.settingsStore.langSelected, "home");

      this.getAllNews();
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

    getAllNews() {
      this.axios
        .get(
          this.settingsStore.api + "/news/" + this.settingsStore.langSelected
        )
        .then((response) => {
          this.news = response.data;

          this.newsLoaded = true;

          this.filterBySimpleNews();
          this.filterBySocialNews();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    filterBySimpleNews() {
      this.newsSimple = this.news.filter((item) => {
        if (item.social == "0") {
          return true;
        } else {
          return false;
        }
      });
    },

    filterBySocialNews() {
      this.newsSocial = this.news.filter((item) => {
        if (item.social == "1") {
          return true;
        } else {
          return false;
        }
      });
    },

    calcNewsPairCount(newsSimple, newsSocial) {
      return Math.max(
        Object.keys(newsSimple).length,
        Object.keys(newsSocial).length
      );
    },
  },
};
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <section class="news">
    <div class="container">
      <div class="news__block">
        <h2 class="news__heading">
          {{ langDataLoaded == true ? langData.news.title : "" }}
        </h2>
        <hr class="news__line" />
      </div>
      <swiper
        :modules="modules"
        :pagination="{ clickable: true }"
        :breakpoints="{
          320: {
            spaceBetween: 10,
          },
        }"
      >
        <swiper-slide
          v-for="(slide, index0) in calcNewsPairCount(newsSimple, newsSocial)"
          :key="`${index0}-${slide}`"
        >
          <div class="news__flex">
            <RouterLink
              v-if="index0 < Object.keys(newsSimple).length"
              class="news__parent-link"
              :to="{
                name: 'news-detail',
                params: {
                  id: newsSimple[index0].id,
                },
              }"
            >
              <div class="news__item">
                <img
                  class="news__img"
                  :src="newsSimple[index0]['photo_main']"
                  :alt="
                    newsSimple[index0]['title_' + settingsStore.langSelected]
                  "
                />
                <h2 class="news__title">
                  {{
                    newsSimple[index0]["title_" + settingsStore.langSelected]
                  }}
                </h2>
                <p
                  class="news__text"
                  v-html="
                    newsSimple[index0][
                      'text_preview_' + settingsStore.langSelected
                    ]
                  "
                ></p>
                <a class="news__link" href="#"
                  >{{ langDataLoaded == true ? langData.news.button : "" }}
                  <hr class="news__redline" />
                </a>
              </div>
            </RouterLink>
            <a
              v-if="index0 < Object.keys(newsSocial).length"
              class="news__parent-link"
              :href="
                newsSocial[index0]['social_link_' + settingsStore.langSelected]
              "
              target="blank"
            >
              <div class="news__item">
                <img
                  class="news__label"
                  :src="langDataLoaded == true ? langData.news.socialIcon : ''"
                  :alt="langDataLoaded == true ? langData.news.socialAlt : ''"
                />
                <img
                  class="news__img"
                  :src="newsSocial[index0]['photo_main']"
                  :alt="
                    newsSocial[index0]['title_' + settingsStore.langSelected]
                  "
                />
                <h2 class="news__title">
                  {{
                    newsSocial[index0]["title_" + settingsStore.langSelected]
                  }}
                </h2>
                <p
                  class="news__text"
                  v-html="
                    newsSocial[index0][
                      'text_preview_' + settingsStore.langSelected
                    ]
                  "
                ></p>
                <a class="news__link"
                  >{{ langDataLoaded == true ? langData.news.button : "" }}
                  <hr class="news__redline" />
                </a>
              </div>
            </a>
          </div>
        </swiper-slide>
      </swiper>
      <div class="whitespace__block whitespace__block-spaced">
        <div class="whitespace whitespace-spaced"></div>
      </div>
      <!-- <div class="news__bottom"></div> -->
    </div>
  </section>
</template>

<style scoped>
.swiper ::v-deep(.swiper-wrapper) {
  padding-bottom: 20px;
}
.swiper ::v-deep(.swiper-pagination-bullet) {
  width: 105px;
  height: 3px;
  border-radius: 0;
}
.swiper ::v-deep(.swiper-pagination-bullet-active) {
  background-color: #ec002b;
}

@media (max-width: 425px) {
  .swiper ::v-deep(.swiper-wrapper) {
    padding-bottom: 50px;
  }
  .swiper ::v-deep(.swiper-pagination-bullet) {
    width: 70px;
  }
}
</style>
