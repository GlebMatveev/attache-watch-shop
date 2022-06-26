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

      this.getLangData(this.settingsStore.langSelected, "delivery");
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
  <section class="payments-top">
    <div class="container">
      <div class="payments-top__label">
        <h1 class="payments-top__heading">
          {{ langDataLoaded == true ? langData.page.titleMain : "" }}
        </h1>
      </div>
    </div>
  </section>

  <section class="warnings">
    <div class="container">
      <div class="warnings__flex">
        <img
          class="warnings__icon"
          src="../assets/img/payments/fileboard.png"
          alt="Icon"
        />
        <div class="redline-bold"></div>
        <div class="warnings__sign">
          <div class="warnings__sign-small">
            <img
              class="warnings__image"
              src="../assets/img/payments/attention.png"
              alt="Warning"
            />
          </div>
          <div class="warnings__sign-big">
            <p class="warnings__text-important">
              {{ langDataLoaded == true ? langData.page.disclaimer1 : "" }}
            </p>
          </div>
        </div>
        <p class="warnings__text">
          {{ langDataLoaded == true ? langData.page.disclaimer2 : "" }}
        </p>
        <p class="warnings__text-bold">
          {{ langDataLoaded == true ? langData.page.text1 : "" }}
        </p>
        <p class="warnings__text-big">
          {{ langDataLoaded == true ? langData.page.text2 : "" }}
        </p>
        <div class="warnings__redSign">
          <p class="warnings__redSign-text">
            {{ langDataLoaded == true ? langData.page.warning : "" }}
          </p>
          <img
            class="warnings__redSign-image"
            src="../assets/img/payments/call.png"
            alt="Icon"
          />
        </div>
        <p class="warnings__text">
          {{ langDataLoaded == true ? langData.page.text3 : "" }}
        </p>
        <p class="warnings__text-bold warnings__text-bold-margin">
          {{ langDataLoaded == true ? langData.page.text4 : "" }}
        </p>
      </div>
      <hr class="warnings__deco" />
    </div>
  </section>

  <section class="payment">
    <div class="container">
      <div class="warnings__flex">
        <h2 class="payment__header">
          {{ langDataLoaded == true ? langData.page.listTitle : "" }}
        </h2>
        <img
          class="payment__icon"
          src="../assets/img/payments/money.png"
          alt="icon"
        />
        <p class="payment__text-big">
          {{ langDataLoaded == true ? langData.page.listSubtitle : "" }}
        </p>
        <ol
          class="payment__list"
          v-html="langDataLoaded == true ? langData.page.listItems : ''"
        ></ol>
        <h5 class="payment__header-mini">
          {{ langDataLoaded == true ? langData.page.cardTitle : "" }}
        </h5>
        <p class="payment__text-small">
          {{ langDataLoaded == true ? langData.page.cardText : "" }}
        </p>
        <div class="payment__flex">
          <div class="payment__img-container">
            <img
              class="payment__image"
              src="../assets/img/payments/visa.png"
              alt="Logo"
            />
          </div>
          <div class="payment__img-container">
            <img
              class="payment__image"
              src="../assets/img/payments/mastercard.png"
              alt="Logo"
            />
          </div>
          <div class="payment__img-container">
            <img
              class="payment__image"
              src="../assets/img/payments/mir.png"
              alt="Logo"
            />
          </div>
          <div class="payment__img-container">
            <img
              class="payment__image"
              src="../assets/img/payments/uniteller.png"
              alt="Logo"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="safety">
    <div class="container">
      <div class="warnings__flex">
        <h5 class="safety__header">
          {{ langDataLoaded == true ? langData.page.securityTitle : "" }}
        </h5>
        <img
          class="safety__icon"
          src="../assets/img/payments/medal.png"
          alt="Icon"
        />
        <p class="safety__text">
          {{ langDataLoaded == true ? langData.page.securityText : "" }}
        </p>
        <p class="safety__text-bold">
          {{ langDataLoaded == true ? langData.page.paymentTitle : "" }}
        </p>
      </div>
      <hr class="warnings__deco" />
    </div>
  </section>

  <section class="payInfo">
    <div class="container">
      <div class="payInfo__flex">
        <div class="payInfo__left">
          <h4 class="payInfo__header">
            {{ langDataLoaded == true ? langData.page.paymentSubtitle1 : "" }}
          </h4>
          <img
            class="payInfo__image"
            src="../assets/img/payments/fileboard-small.png"
            alt="icon"
          />
          <p
            class="payInfo__adress"
            v-html="langDataLoaded == true ? langData.page.paymentText1 : ''"
          ></p>
        </div>
        <div class="payInfo__right">
          <h4 class="payInfo__header">
            {{ langDataLoaded == true ? langData.page.paymentSubtitle2 : "" }}
          </h4>
          <img
            class="payInfo__image"
            src="../assets/img/payments/truck.png"
            alt="icon"
          />
          <p
            class="payInfo__delivery"
            v-html="langDataLoaded == true ? langData.page.paymentText2 : ''"
          ></p>
        </div>
      </div>
      <hr class="warnings__deco" />
    </div>
  </section>

  <div class="payInfo__special-container">
    <div class="redline-bold"></div>
  </div>

  <div class="container">
    <div class="whitespace__block">
      <div class="whitespace"></div>
    </div>
  </div>
</template>
