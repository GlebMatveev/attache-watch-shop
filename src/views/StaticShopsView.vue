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

      shops: "",
      shopsLoaded: false,

      entities: [],
      entitiesLoaded: false,

      shopsSorted: [],
      shopsSortedLoaded: false,
    };
  },
  watch: {
    "settingsStore.langSelected": function () {
      this.initialize();
    },
    langDataLoaded() {
      if (
        this.langDataLoaded == true &&
        this.shopsLoaded == true &&
        this.entitiesLoaded == true &&
        this.shopsSortedLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    shopsLoaded() {
      if (
        this.langDataLoaded == true &&
        this.shopsLoaded == true &&
        this.entitiesLoaded == true &&
        this.shopsSortedLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    entitiesLoaded() {
      if (
        this.langDataLoaded == true &&
        this.shopsLoaded == true &&
        this.entitiesLoaded == true &&
        this.shopsSortedLoaded == true
      ) {
        this.settingsStore.allLoaded = false;
      }
    },
    shopsSortedLoaded() {
      if (
        this.langDataLoaded == true &&
        this.shopsLoaded == true &&
        this.entitiesLoaded == true &&
        this.shopsSortedLoaded == true
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
      this.shops = "";
      this.shopsLoaded = false;
      this.entities = [];
      this.entitiesLoaded = false;
      this.shopsSorted = [];
      this.shopsSortedLoaded = false;

      this.getLangData(this.settingsStore.langSelected, "shops");

      this.getAllShops();
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

    getAllShops() {
      this.axios
        .get(
          this.settingsStore.api + "/shops/" + this.settingsStore.langSelected
        )
        .then((response) => {
          this.shops = response.data;

          this.getEntitiesInShops();

          this.sortShopsByEntity();

          this.shopsLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getEntitiesInShops() {
      for (let key in this.shops) {
        if (
          !this.entities.includes(
            this.shops[key]["entity_" + this.settingsStore.langSelected]
          )
        ) {
          this.entities.push(
            this.shops[key]["entity_" + this.settingsStore.langSelected]
          );
        }
      }

      this.entitiesLoaded = true;
    },

    sortShopsByEntity() {
      let tempShops = this.shops;

      let tempFilteredShops = "";

      for (let key in this.entities) {
        tempFilteredShops = tempShops.filter((item) => {
          if (
            item["entity_" + this.settingsStore.langSelected] ==
            this.entities[key]
          ) {
            return true;
          } else {
            return false;
          }
        });
        this.shopsSorted[key] = tempFilteredShops;

        tempFilteredShops = "";
      }

      this.shopsSortedLoaded = true;
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

  <section class="shops">
    <div class="container">
      <div
        v-for="(entity, index0) in entities"
        :key="`${index0}-${entity}`"
        class="shops__block"
      >
        <div class="shops__flex">
          <img
            class="shops__img"
            src="../assets/img/shops/shop.png"
            alt="Shop"
          />
          <h3 class="shops__heading">{{ entity }}</h3>
          <hr class="shops__deco" />
        </div>
        <hr class="shops__divider" />
        <div class="shops__grid">
          <div class="shops__head">
            {{ langDataLoaded == true ? langData.page.tableCol1 : "" }}
          </div>
          <div class="shops__head">
            {{ langDataLoaded == true ? langData.page.tableCol2 : "" }}
          </div>
          <div class="shops__head">
            {{ langDataLoaded == true ? langData.page.tableCol3 : "" }}
          </div>
          <div class="shops__head">
            {{ langDataLoaded == true ? langData.page.tableCol4 : "" }}
          </div>
          <div class="shops__head">
            {{ langDataLoaded == true ? langData.page.tableCol5 : "" }}
          </div>
        </div>
        <hr class="shops__divider" />
        <div
          v-for="(shop, index1) in shopsSorted[index0]"
          :key="`${index1}-${shop}`"
          class="shops__grid"
        >
          <div class="shops__item">
            {{ shop["city_" + settingsStore.langSelected] }}
          </div>
          <div class="shops__item">
            {{ shop["shop_" + settingsStore.langSelected] }}
          </div>
          <div class="shops__item">
            {{ shop["address_" + settingsStore.langSelected] }}
          </div>
          <div class="shops__item">
            <a :href="'tel:' + shop['phone_' + settingsStore.langSelected]">{{
              shop["phone_" + settingsStore.langSelected]
            }}</a>
          </div>
          <div class="shops__item">
            {{ shop["hours_" + settingsStore.langSelected] }}
          </div>
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
