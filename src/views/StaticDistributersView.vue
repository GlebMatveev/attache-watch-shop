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

      distributors: "",
      distributorsLoaded: false,
    };
  },
  watch: {
    "settingsStore.langSelected": function () {
      this.initialize();
    },
    langDataLoaded() {
      if (this.langDataLoaded == true && this.distributorsLoaded == true) {
        this.settingsStore.allLoaded = false;
      }
    },
    distributorsLoaded() {
      if (this.langDataLoaded == true && this.distributorsLoaded == true) {
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
      this.distributors = "";
      this.distributorsLoaded = false;

      this.getLangData(this.settingsStore.langSelected, "distributers");

      this.getAllDistributors();
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

    getAllDistributors() {
      this.axios
        .get(
          this.settingsStore.api +
            "/distributors/" +
            this.settingsStore.langSelected
        )
        .then((response) => {
          this.distributors = response.data;

          this.distributorsLoaded = true;
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

  <section class="distributers">
    <div class="container">
      <div class="distributers__top">
        <img
          class="distributers__marker"
          src="../assets/img/distributers/marker.png"
          alt="Marker"
        />
        <h3 class="distributers__heading">
          {{ langDataLoaded == true ? langData.page.titleAdd : "" }}
        </h3>
      </div>
      <div v-if="distributorsLoaded" class="distributers__grid">
        <div
          v-for="distributor in distributors"
          :key="distributor.id"
          class="distributers__item"
        >
          <h4 class="distributers__name">
            {{ distributor["country_" + settingsStore.langSelected] }}-{{
              distributor["city_" + settingsStore.langSelected]
            }}
          </h4>
          <hr class="distributers__deco" />
          <span class="distributers__adress">{{
            distributor["address_" + settingsStore.langSelected]
          }}</span>
          <a
            class="distributers__phone"
            :href="'tel:' + distributor['phone_' + settingsStore.langSelected]"
            >{{ distributor["phone_" + settingsStore.langSelected] }}</a
          >
        </div>
      </div>
      <div class="distributers__bottom">
        <div class="redline-bold"></div>
        <img
          class="distributers__person"
          src="../assets/img/distributers/user.png"
          alt="Person"
        />
        <h5 class="distributers__invitation">
          {{ langDataLoaded == true ? langData.page.subtitleAdd : "" }}
        </h5>
        <a class="distributers__button" href="mailto:partner@attache.com">{{
          langDataLoaded == true ? langData.page.partnerEmail : ""
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
