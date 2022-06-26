import { defineStore } from "pinia";

export const useSettingsStore = defineStore({
  id: "settings",
  state: () => ({
    apiPath: "db.json",
    api: "https://electroexpress.ru/api",
    cartCounter: "0",
    langFile: {
      rus: "../lang/rus.json",
      eng: "../lang/eng.json",
    },

    langDefault: "rus",
    langSelected: "",

    scrollUp: false,
    scrollDown: false,

    allLoaded: false,
  }),
});
