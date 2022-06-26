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

      this.getLangData(this.settingsStore.langSelected, "history");
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
  <section class="factory__top">
    <div class="container">
      <div class="factory__label">
        <h1 class="factory__heading">
          {{ langDataLoaded == true ? langData.page.title : "" }}
        </h1>
        <p class="factory__text">
          {{ langDataLoaded == true ? langData.page.subtitle : "" }}
        </p>
      </div>
    </div>
  </section>

  <section class="factory-body">
    <div class="container">
      <div class="factory-body__superflex">
        <div class="redline-bold"></div>
        <p
          class="factory-body__text"
          v-html="langDataLoaded == true ? langData.page.description1 : ''"
        ></p>
        <div class="factory-body__img-container">
          <img
            class="factory-body__image-full"
            src="../assets/img/factory/factory-workers.png"
            alt="Foto"
          />
        </div>
        <p
          class="factory-body__text"
          v-html="langDataLoaded == true ? langData.page.description2 : ''"
        ></p>
        <div class="factory-body__img-container">
          <img
            class="factory-body__image"
            src="../assets/img/factory/vostok-1.png"
            alt="Foto"
          />
          <img
            class="factory-body__image"
            src="../assets/img/factory/vostok-2.png"
            alt="Foto"
          />
        </div>
        <p
          class="factory-body__text"
          v-html="langDataLoaded == true ? langData.page.description3 : ''"
        ></p>
        <hr class="factory-body__deco" />
        <div class="redline-bold"></div>
        <h4
          class="factory-body__underheading"
          v-html="langDataLoaded == true ? langData.page.description4 : ''"
        ></h4>
        <div class="factory-body__img-container">
          <img
            class="factory-body__image"
            src="../assets/img/factory/vostok-3.png"
            alt="Foto"
          />
          <img
            class="factory-body__image"
            src="../assets/img/factory/vostok-4.png"
            alt="Foto"
          />
        </div>
        <p
          class="factory-body__text"
          v-html="langDataLoaded == true ? langData.page.description5 : ''"
        ></p>
        <p
          class="factory-body__text"
          v-html="langDataLoaded == true ? langData.page.description6 : ''"
        ></p>
        <p
          class="factory-body__text"
          v-html="langDataLoaded == true ? langData.page.description7 : ''"
        ></p>
        <hr class="factory-body__deco" />
        <div class="factory-body__img-container-special">
          <img
            class="factory-body__image-special"
            src="../assets/img/factory/attache-old.png"
            alt="Logo"
          />
        </div>
        <div class="redline-bold factory-body__redline66"></div>
        <p
          class="factory-body__text"
          v-html="langDataLoaded == true ? langData.page.description8 : ''"
        ></p>
        <div class="factory-body__img-container">
          <img
            class="factory-body__image"
            src="../assets/img/factory/attache-1.png"
            alt="Foto"
          />
          <img
            class="factory-body__image"
            src="../assets/img/factory/attache-2.png"
            alt="Foto"
          />
        </div>
        <p
          class="factory-body__text"
          v-html="langDataLoaded == true ? langData.page.description9 : ''"
        ></p>
        <p
          class="factory-body__text"
          v-html="langDataLoaded == true ? langData.page.description10 : ''"
        ></p>
        <div class="redline-bold factory-body__redline104"></div>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="whitespace__block">
      <div class="whitespace"></div>
    </div>
  </div>
</template>
