<script>
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

import { useSettingsStore } from "@/stores/settings";

// import swiper module styles
import "swiper/css";
import "swiper/css/pagination";
// more module style...

export default {
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
    };
  },
  watch: {
    "settingsStore.langSelected": function () {
      this.initialize();
    },
    langDataLoaded() {
      if (this.langDataLoaded == true && this.newsLoaded == true) {
        this.settingsStore.allLoaded = false;
      }
    },
    newsLoaded() {
      if (this.langDataLoaded == true && this.newsLoaded == true) {
        this.settingsStore.allLoaded = false;
      }
    },
    $route() {
      // this.$route.meta.breadcrumb.label = "hello";
    },
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.settingsStore.allLoaded = true;

      this.langData = {};
      this.langDataLoaded = false;
      this.news = "";
      this.newsLoaded = false;

      this.getLangData(this.settingsStore.langSelected, "news-detail");

      this.getNewsById();
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

    getNewsById() {
      this.axios
        .get(this.settingsStore.api + "/news-item/" + this.$route.params.id)
        .then((response) => {
          this.news = response.data;

          this.newsLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <!-- <div class="underHeader"></div> -->

  <section class="named-top">
    <img
      class="named-top__image"
      :src="newsLoaded == true ? news[0]['photo_banner'] : ''"
      alt="Name"
    />
  </section>

  <section class="singleNews">
    <div class="container">
      <div class="singleNews__block">
        <div class="redline-bold"></div>
        <img
          class="singleNews__mainPic"
          :src="newsLoaded == true ? news[0]['photo_detail'] : ''"
          alt="News"
        />
        <h3 class="singleNews__heading">
          {{
            newsLoaded == true
              ? news[0]["title_" + settingsStore.langSelected]
              : ""
          }}
        </h3>
        <hr class="singleNews__deco" />
        <div
          class="singleNews__column"
          v-html="
            newsLoaded == true
              ? news[0]['text_full_' + settingsStore.langSelected]
              : ''
          "
        ></div>
        <hr class="singleNews__deco-wide" />
        <h3 class="singleNews__heading-bottom">
          {{
            newsLoaded == true
              ? news[0]["gallery_title_" + settingsStore.langSelected]
              : ""
          }}
        </h3>
        <hr class="singleNews__deco-wide" />
        <div class="newsGallery">
          <swiper
            :modules="modules"
            :pagination="{ clickable: true }"
            :space-between="40"
            :slides-per-view="2"
            :breakpoints="{
              768: {
                slidesPerView: 2,
                // spaceBetween: 40,
              },
              320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                // spaceBetween: 40,
              },
            }"
          >
            <swiper-slide
              v-for="(slide, index0) in 4"
              :key="`${index0}-${slide}`"
            >
              <div class="newsGallery__slide">
                <div class="newsGallery__img-container">
                  <img
                    class="newsGallery__image"
                    :src="
                      newsLoaded == true
                        ? news[0]['photo_gallery_' + (index0 + 1)]
                        : ''
                    "
                    alt="Pic"
                  />
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <hr class="singleNews__deco-wide" />
        <RouterLink class="singleNews__button" to="/news">{{
          langDataLoaded == true ? langData.page.button : ""
        }}</RouterLink>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="whitespace__block">
      <div class="whitespace"></div>
    </div>
  </div>
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
