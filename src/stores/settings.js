import { defineStore } from "pinia";

export const useSettingsStore = defineStore({
  id: "settings",
  state: () => ({
    apiPath: "db.json",
    cartCounter: "0",
  }),
});
