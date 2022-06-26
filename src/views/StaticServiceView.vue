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
    langDataLoaded() {
      if (this.langDataLoaded == true) {
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

      this.getLangData(this.settingsStore.langSelected, "service");
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
  <section class="minimalTop">
    <div class="container">
      <div class="minimalTop__name">
        <h1 class="minimalTop__heading">
          {{ langDataLoaded == true ? langData.page.title : "" }}
        </h1>
        <hr class="minimalTop__deco" />
        <h2 class="minimalTop__heading-mini">
          {{ langDataLoaded == true ? langData.page.subtitle : "" }}
        </h2>
      </div>
      <div class="minimalTop__container">
        <div class="redline-bold"></div>
      </div>
    </div>
  </section>

  <section class="service">
    <div class="container">
      <div class="service__block">
        <img
          class="service__img"
          src="../assets/img/service/watch.png"
          alt="Watch"
        />
        <h3 class="service__head">
          {{ langDataLoaded == true ? langData.page.titleAdd : "" }}
        </h3>
        <hr class="service__deco" />
        <span class="service__text">{{
          langDataLoaded == true ? langData.page.descriptionAdd : ""
        }}</span>
        <hr class="service__redline" />
        <h4 class="service__conditions">
          {{ langDataLoaded == true ? langData.page.termTitle : "" }}
        </h4>
        <div class="service__flex">
          <div class="service__item">
            <span class="service__number">1</span>
            <span class="service__condition">{{
              langDataLoaded == true ? langData.page.term1 : ""
            }}</span>
          </div>
          <div class="service__item">
            <span class="service__number">2</span>
            <span class="service__condition">{{
              langDataLoaded == true ? langData.page.term2 : ""
            }}</span>
          </div>
          <div class="service__item">
            <span class="service__number">3</span>
            <span class="service__condition">{{
              langDataLoaded == true ? langData.page.term3 : ""
            }}</span>
          </div>
        </div>
        <hr class="service__redline" />
        <h4 class="service__conditions">
          {{ langDataLoaded == true ? langData.page.warrantlyTitle : "" }}
        </h4>
        <img
          class="service__img"
          src="../assets/img/service/fileboard.png"
          alt="icon"
        />
        <span class="service__text">{{
          langDataLoaded == true ? langData.page.warrantly1 : ""
        }}</span>
        <img
          class="service__img"
          src="../assets/img/service/service.png"
          alt="icon"
        />
        <span class="service__text">{{
          langDataLoaded == true ? langData.page.warrantly2 : ""
        }}</span>
        <img
          class="service__img"
          src="../assets/img/service/stat.png"
          alt="icon"
        />
        <span class="service__text">{{
          langDataLoaded == true ? langData.page.warrantly3 : ""
        }}</span>
        <div class="service__redline-small"></div>
        <img
          class="service__img"
          src="../assets/img/service/star.png"
          alt="icon"
        />
        <h5 class="service__contact">
          {{ langDataLoaded == true ? langData.page.serviceTitle : "" }}
        </h5>
        <a class="service__mail" href="mailto:service@attache.com">{{
          langDataLoaded == true ? langData.page.serviceEmail : ""
        }}</a>
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
