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

      this.getLangData(this.settingsStore.langSelected, "brand");
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
  <!-- eslint-disable vue/no-v-html -->
  <section class="brand__top">
    <div class="container">
      <div class="brand__label">
        <h1 class="brand__heading">
          {{ langDataLoaded == true ? langData.page.title : "" }}
        </h1>
        <h2 class="brand__subheading">
          {{ langDataLoaded == true ? langData.page.subtitle : "" }}
        </h2>
        <p class="brand__text">
          {{ langDataLoaded == true ? langData.page.description : "" }}
        </p>
      </div>
    </div>
  </section>

  <section class="team">
    <div class="container">
      <div class="team__flex">
        <div class="redline-bold"></div>
        <hr class="team__deco" />
        <img
          class="story__top"
          src="../assets/img/brand/new-watches.png"
          alt="History"
        />
        <hr class="team__deco-bottom" />
        <p
          class="team__text"
          v-html="langDataLoaded == true ? langData.page.text : ''"
        ></p>
      </div>
    </div>
  </section>

  <section class="story">
    <div class="container">
      <div class="story__flex">
        <h2 class="story__year">
          {{ langDataLoaded == true ? langData.page.year1 : "" }}
        </h2>
        <h4 class="story__name">
          {{ langDataLoaded == true ? langData.page.title1 : "" }}
        </h4>
        <div class="story__images">
          <img
            class="story__img"
            src="../assets/img/brand/pilot-1.png"
            alt="Pilot"
          />
          <img
            class="story__img"
            src="../assets/img/brand/pilot-2.png"
            alt="Pilot"
          />
        </div>
        <div class="redline-bold"></div>
        <p
          class="story__text"
          v-html="langDataLoaded == true ? langData.page.description1 : ''"
        ></p>
        <hr class="story__deco" />
      </div>

      <div class="story__flex">
        <h2 class="story__year">
          {{ langDataLoaded == true ? langData.page.year2 : "" }}
        </h2>
        <h4 class="story__name">
          {{ langDataLoaded == true ? langData.page.title2 : "" }}
        </h4>
        <div class="story__images">
          <img
            class="story__img"
            src="../assets/img/brand/kirovskie-1.png"
            alt="Kirovskie"
          />
          <img
            class="story__img"
            src="../assets/img/brand/kirovskie-2.png"
            alt="Kirovskie"
          />
        </div>
        <div class="redline-bold"></div>
        <p
          class="story__text"
          v-html="langDataLoaded == true ? langData.page.description2 : ''"
        ></p>
        <hr class="story__deco" />
      </div>

      <div class="story__flex">
        <h2 class="story__year">
          {{ langDataLoaded == true ? langData.page.year3 : "" }}
        </h2>
        <h4 class="story__name">
          {{ langDataLoaded == true ? langData.page.title3 : "" }}
        </h4>
        <div class="story__images">
          <img
            class="story__img"
            src="../assets/img/brand/automatic-1.png"
            alt="Automatic"
          />
          <img
            class="story__img"
            src="../assets/img/brand/automatic-2.png"
            alt="Automatic"
          />
        </div>
        <div class="redline-bold"></div>
        <p
          class="story__text"
          v-html="langDataLoaded == true ? langData.page.description3 : ''"
        ></p>
        <hr class="story__deco" />
      </div>

      <div class="story__flex">
        <h2 class="story__year">
          {{ langDataLoaded == true ? langData.page.year4 : "" }}
        </h2>
        <h4 class="story__name">
          {{ langDataLoaded == true ? langData.page.title4 : "" }}
        </h4>
        <div class="story__images">
          <img
            class="story__img"
            src="../assets/img/brand/chronograph-1.png"
            alt="Chronograph"
          />
          <img
            class="story__img"
            src="../assets/img/brand/chronograph-2.png"
            alt="Chronograph"
          />
        </div>
        <div class="redline-bold"></div>
        <p
          class="story__text"
          v-html="langDataLoaded == true ? langData.page.description4 : ''"
        ></p>
        <hr class="story__deco" />
      </div>

      <div class="story__flex">
        <h2 class="story__year">
          {{ langDataLoaded == true ? langData.page.year5 : "" }}
        </h2>
        <h4 class="story__name">
          {{ langDataLoaded == true ? langData.page.title5 : "" }}
        </h4>
        <div class="story__images">
          <img
            class="story__img"
            src="../assets/img/brand/deepsea-1.png"
            alt="Deepsea"
          />
          <img
            class="story__img"
            src="../assets/img/brand/deepsea-2.png"
            alt="Deepsea"
          />
        </div>
        <div class="redline-bold"></div>
        <p
          class="story__text"
          v-html="langDataLoaded == true ? langData.page.description5 : ''"
        ></p>
        <hr class="story__deco" />
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
