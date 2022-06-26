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

      this.getLangData(this.settingsStore.langSelected, "contacts");
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
  <section class="mailUs-top">
    <div class="container">
      <div class="mailUs-top__label">
        <h1 class="mailUs-top__heading">
          {{ langDataLoaded == true ? langData.page.title : "" }}
        </h1>
      </div>
    </div>
  </section>

  <section class="mailUs">
    <div class="container">
      <div class="mailUs__flex">
        <div class="mailUs__image-container">
          <img
            class="mailUs__icon"
            src="../assets/img/mailUs/pin.png"
            alt="Icon"
          />
          <img
            class="mailUs__icon"
            src="../assets/img/mailUs/call.png"
            alt="Icon"
          />
          <img
            class="mailUs__icon"
            src="../assets/img/mailUs/email.png"
            alt="Icon"
          />
        </div>
        <div class="redline-bold"></div>
        <h4 class="mailUs__heading">
          {{ langDataLoaded == true ? langData.page.subtitle : "" }}
        </h4>
        <form class="mailUs__form" action="#">
          <div class="mailUs__grid">
            <input
              id="name"
              class="mailUs__input"
              type="text"
              name="Name"
              :placeholder="
                langDataLoaded == true ? langData.page.placeholderName : ''
              "
            />
            <input
              id="lastname"
              class="mailUs__input"
              type="text"
              name="LastName"
              :placeholder="
                langDataLoaded == true ? langData.page.placeholderFamily : ''
              "
            />
            <input
              id="email"
              class="mailUs__input"
              type="email"
              name="Email"
              :placeholder="
                langDataLoaded == true ? langData.page.placeholderEmail : ''
              "
            />
            <input
              id="phone"
              class="mailUs__input"
              type="tel"
              name="Phone"
              :placeholder="
                langDataLoaded == true ? langData.page.placeholderPhone : ''
              "
            />
            <input
              id="country"
              class="mailUs__input"
              type="text"
              name="Country"
              :placeholder="
                langDataLoaded == true ? langData.page.placeholderCountry : ''
              "
            />
            <input
              id="city"
              class="mailUs__input"
              type="text"
              name="City"
              :placeholder="
                langDataLoaded == true ? langData.page.placeholderCity : ''
              "
            />
            <textarea
              id="message"
              class="mailUs__input-big"
              name="Message"
              :placeholder="
                langDataLoaded == true ? langData.page.placeholderText : ''
              "
            ></textarea>
            <div class="mailUs__checks">
              <div class="mailUs__check">
                <input id="data" type="checkbox" name="Data" />
                <label class="mailUs__label" for="data">{{
                  langDataLoaded == true ? langData.page.agreement1 : ""
                }}</label>
              </div>
              <div class="mailUs__check">
                <input id="subscribe" type="checkbox" name="Subscribe" />
                <label class="mailUs__label" for="subscribe">{{
                  langDataLoaded == true ? langData.page.agreement2 : ""
                }}</label>
              </div>
              <div class="mailUs__check">
                <input id="promo" type="checkbox" name="Promo" />
                <label class="mailUs__label" for="promo">{{
                  langDataLoaded == true ? langData.page.agreement3 : ""
                }}</label>
              </div>
            </div>
          </div>

          <hr class="mailUs__deco" />
          <div class="mailUs__submits">
            <div class="mailUs__captcha">
              <img src="../assets/img/mailUs/capcha.png" alt="" />
            </div>
            <button class="mailUs__sendButton" type="submit">
              {{ langDataLoaded == true ? langData.page.button : "" }}
            </button>
          </div>
          <hr class="mailUs__deco" />
        </form>
        <div class="mailUs__contacts">
          <p class="mailUs__contacts-text">
            {{ langDataLoaded == true ? langData.page.contactsTitle : "" }}
          </p>
          <p class="mailUs__contacts-small">
            {{ langDataLoaded == true ? langData.page.address : "" }}
          </p>
          <a
            class="mailUs__contacts-text"
            :href="'tel:' + (langDataLoaded == true ? langData.page.phone : '')"
            >{{ langDataLoaded == true ? langData.page.phone : "" }}</a
          >
          <a
            class="mailUs__contacts-text"
            :href="
              'mailto:' + (langDataLoaded == true ? langData.page.email : '')
            "
            >{{ langDataLoaded == true ? langData.page.email : "" }}</a
          >
        </div>
        <hr class="mailUs__deco" />
        <hr class="mailUs__deco" />
      </div>
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
