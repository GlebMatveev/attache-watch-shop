<script>
// import { RouterView } from "vue-router";

import { useSettingsStore } from "@/stores/settings";

import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";

export default {
  components: {
    MainHeader,
    MainFooter,
  },
  setup() {
    const settingsStore = useSettingsStore();
    return { settingsStore };
  },
};
</script>

<template>
  <div v-if="settingsStore.allLoaded" ref="loader" class="loader"></div>
  <MainHeader />
  <!-- <keep-alive> -->
  <RouterView />
  <!-- </keep-alive> -->
  <MainFooter />
</template>

<style>
@import url(@/assets/styles/style.css);

.loader {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.945);
  z-index: 999;
  background-image: url("/assets/img/loader.gif");
  background-repeat: no-repeat;
  background-position: 50%;
}
</style>
