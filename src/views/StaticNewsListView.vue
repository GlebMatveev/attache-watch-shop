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

      news: "",
      newsLoaded: false,

      newsSimple: "",
      newsSimpleLoaded: false,

      newsSocial: "",
      newsSocialLoaded: false,
    };
  },
  watch: {
    "settingsStore.langSelected": function () {
      this.initialize();
    },
    langDataLoaded() {
      if (
        this.langDataLoaded == true &&
        this.newsLoaded == true &&
        this.newsSimpleLoaded == true &&
        this.newsSocialLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    newsLoaded() {
      if (
        this.langDataLoaded == true &&
        this.newsLoaded == true &&
        this.newsSimpleLoaded == true &&
        this.newsSocialLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    newsSimpleLoaded() {
      if (
        this.langDataLoaded == true &&
        this.newsLoaded == true &&
        this.newsSimpleLoaded == true &&
        this.newsSocialLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    newsSocialLoaded() {
      if (
        this.langDataLoaded == true &&
        this.newsLoaded == true &&
        this.newsSimpleLoaded == true &&
        this.newsSocialLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
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
      this.newsSimple = "";
      this.newsSimpleLoaded = false;
      this.newsSocial = "";
      this.newsSocialLoaded = false;

      this.getLangData(this.settingsStore.langSelected, "news");

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

      this.newsSimpleLoaded = true;
    },

    filterBySocialNews() {
      this.newsSocial = this.news.filter((item) => {
        if (item.social == "1") {
          return true;
        } else {
          return false;
        }
      });

      this.newsSocialLoaded = true;
    },
  },
};
</script>

<template>
  <section class="imageTop">
    <div class="container">
      <div class="imageTop__name">
        <h1 class="imageTop__heading">
          {{ langDataLoaded == true ? langData.page.title : "" }}
        </h1>
        <div class="redline-bold"></div>
      </div>
    </div>
  </section>
  <section class="newsPage">
    <div class="container">
      <div class="newsPage__grid">
        <div
          v-for="(item, index0) in newsSimple"
          :key="`${index0}-${item}`"
          class="newsPage__item"
        >
          <img
            class="newsPage__image"
            :src="newsSimple[index0]['photo_add']"
            alt="News"
          />

          <div class="newsPage__fade">
            <div class="newsPage__label">
              <h3 class="newsPage__bigText">
                {{
                  newsSimple[index0]["title_add_" + settingsStore.langSelected]
                }}
              </h3>
              <p class="newsPage__text">
                {{
                  newsSimple[index0][
                    "subtitle_add_" + settingsStore.langSelected
                  ]
                }}
              </p>
              <RouterLink
                class="newsPage__link"
                :to="{
                  name: 'news-detail',
                  params: {
                    id: newsSimple[index0].id,
                  },
                }"
                >{{
                  langDataLoaded == true ? langData.page.button : ""
                }}</RouterLink
              >
            </div>
          </div>
        </div>

        <div class="newsPage__item">
          <img
            class="newsPage__image"
            src="../assets/img/newsPage/news-blank.png"
            alt="News"
          />
          <div class="newsPage__fade-special">
            <div class="newsPage__label">
              <p class="newsPage__text">
                {{ langDataLoaded == true ? langData.page.blockSubtitle : "" }}
              </p>
              <h3 class="newsPage__bigText">
                {{ langDataLoaded == true ? langData.page.blockTitle : "" }}
              </h3>
              <a
                class="newsPage__link"
                :href="langDataLoaded == true ? langData.page.blockLink : ''"
                >{{
                  langDataLoaded == true ? langData.page.blockButton : ""
                }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="newsBottom">
    <div class="container">
      <div class="newsBottom__block">
        <div class="redline-bold"></div>
        <h2 class="newsBottom__heading">
          {{ langDataLoaded == true ? langData.page.socialTitle : "" }}
        </h2>
        <div class="newsBottom__flex">
          <a
            class="newsBottom__item"
            :href="langDataLoaded == true ? langData.page.socialLink1 : ''"
            target="blank"
          >
            <div class="newsBottom__img-container">
              <img
                class="newsBottom__image"
                :src="langDataLoaded == true ? langData.page.socialImg1 : ''"
                :alt="
                  langDataLoaded == true ? langData.page.socialSubtitle1 : ''
                "
              />
            </div>
            <hr class="newsBottom__deco" />
            <p class="newsBottom__text">
              {{ langDataLoaded == true ? langData.page.socialSubtitle1 : "" }}
            </p>
          </a>
          <a
            class="newsBottom__item"
            :href="langDataLoaded == true ? langData.page.socialLink2 : ''"
            target="blank"
          >
            <div class="newsBottom__img-container">
              <img
                class="newsBottom__image"
                :src="langDataLoaded == true ? langData.page.socialImg2 : ''"
                :alt="
                  langDataLoaded == true ? langData.page.socialSubtitle2 : ''
                "
              />
            </div>
            <hr class="newsBottom__deco" />
            <p class="newsBottom__text">
              {{ langDataLoaded == true ? langData.page.socialSubtitle2 : "" }}
            </p>
          </a>
          <a
            class="newsBottom__item"
            :href="langDataLoaded == true ? langData.page.socialLink3 : ''"
            target="blank"
          >
            <div class="newsBottom__img-container">
              <img
                class="newsBottom__image"
                :src="langDataLoaded == true ? langData.page.socialImg3 : ''"
                :alt="
                  langDataLoaded == true ? langData.page.socialSubtitle3 : ''
                "
              />
            </div>
            <hr class="newsBottom__deco" />
            <p class="newsBottom__text">
              {{ langDataLoaded == true ? langData.page.socialSubtitle3 : "" }}
            </p>
          </a>
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
