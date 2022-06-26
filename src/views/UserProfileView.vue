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
      this.getLangData(this.settingsStore.langSelected, "profile");
    },
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.getLangData(this.settingsStore.langSelected, "profile");
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

  <section>
    <div class="container">
      <div class="order">
        <div class="order__head">
          <div class="order__num">
            <span class="order__id"
              >{{
                langDataLoaded == true ? langData.page.tableOrder : ""
              }}
              №4</span
            >
            <span class="order__date">11 МАЯ 2022, 21:48</span>
          </div>
          <div class="order__sum">
            <span class="order__money">82 500 ₽</span>
            <span class="order__status">{{
              langDataLoaded == true ? langData.page.tableCreated : ""
            }}</span>
          </div>
        </div>
        <ul class="order__items">
          <li class="order__item">
            <div class="order__name">Frigate</div>
            <div class="order__price">1 × 27 500 ₽</div>
          </li>
          <li class="order__item">
            <div class="order__name">Frigate</div>
            <div class="order__price">1 × 27 500 ₽</div>
          </li>
          <li class="order__item">
            <div class="order__name">Frigate</div>
            <div class="order__price">1 × 27 500 ₽</div>
          </li>
        </ul>
        <hr class="order__deco" />
        <div class="order__details">
          <div>
            <span class="order__adress"
              >{{ langDataLoaded == true ? langData.page.tableAddress : "" }}
            </span>
            <span class="order__adress-text">Lorem ipsum dolor, 37</span>
          </div>
          <div>
            <span class="order__comment"
              >{{ langDataLoaded == true ? langData.page.tableComment : "" }}
            </span>
            <span class="order__comment-text"
              >Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </span>
          </div>
        </div>
        <hr class="order__deco" />
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
