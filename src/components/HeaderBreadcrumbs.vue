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

      isBanner: false,

      breadcrumb: "",
      breadcrumbLoaded: false,
    };
  },
  watch: {
    "$route.path"() {},
    $route() {
      this.initialize();

      this.setBreadcrumbs();

      if (
        this.$route.name == "home" ||
        this.$route.name == "brand" ||
        this.$route.name == "history" ||
        this.$route.name == "catalog-collection" ||
        this.$route.name == "detail" ||
        this.$route.name == "news" ||
        this.$route.name == "news-detail" ||
        this.$route.name == "presentation" ||
        this.$route.name == "delivery" ||
        this.$route.name == "contacts" ||
        this.$route.name == "news-detail"
      ) {
        this.isBanner = true;
      } else {
        this.isBanner = false;
      }

      if (this.isBanner == true) {
        this.$refs.breadcrumbs.classList.add("breadcrumbs-down");
        this.$refs.breadcrumbs.classList.remove("breadcrumbs-up");
      } else if (this.isBanner == false) {
        this.$refs.breadcrumbs.classList.add("breadcrumbs-up");
        this.$refs.breadcrumbs.classList.remove("breadcrumbs-down");
      }
    },

    "settingsStore.scrollUp"() {
      if (this.settingsStore.scrollUp == true) {
        this.$refs.breadcrumbs.classList.add("breadcrumbs-up");
        this.$refs.breadcrumbs.classList.remove("breadcrumbs-down");
      } else {
        this.$refs.breadcrumbs.classList.add("breadcrumbs-down");
        this.$refs.breadcrumbs.classList.remove("breadcrumbs-up");
      }
    },
    "settingsStore.scrollDown"() {
      if (this.settingsStore.scrollDown == true) {
        this.$refs.breadcrumbs.classList.add("breadcrumbs-down");
        this.$refs.breadcrumbs.classList.remove("breadcrumbs-up");
      } else {
        this.$refs.breadcrumbs.classList.add("breadcrumbs-up");
        this.$refs.breadcrumbs.classList.remove("breadcrumbs-down");
      }
    },

    "settingsStore.langSelected": function () {
      this.initialize();

      this.setBreadcrumbs();
    },

    langDataLoaded() {
      if (this.langDataLoaded == true) {
        this.settingsStore.allLoaded = false;
      }
    },
  },

  mounted() {
    this.initialize();

    // this.setBreadcrumbs();
  },

  updated() {
    // this.initialize();
    // this.setBreadcrumbs();
  },

  methods: {
    initialize() {
      this.settingsStore.allLoaded = true;

      this.langData = {};
      this.langDataLoaded = false;

      this.getLangData(this.settingsStore.langSelected, "breadcrumbs");
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

    setBreadcrumbs() {
      if (this.$route.name == "home") {
        console.log("home");
      } else if (this.$route.name == "detail") {
        console.log("detail");
      } else if (this.$route.name == "news-detail") {
        console.log("news-detail");
      } else if (this.$route.name == "catalog-collection") {
        console.log("catalog-collection");
      } else {
        console.log("all");
        this.breadcrumb =
          this.$route.meta.breadcrumb[
            "label_" + this.settingsStore.langSelected
          ];
      }

      this.breadcrumbLoaded = true;
    },
  },
};
</script>

<template>
  <div ref="breadcrumbs" class="crumbs">
    <div class="container">
      <ul class="crumbs__list">
        <li class="crumbs__item">
          <!-- <RouterLink to="/" class="crumbs__link-bold">
            {{ langDataLoaded == true ? langData.page.home : "" }}
            
          </RouterLink> -->
        </li>
        <!-- <li class="crumbs__item">ИСТОРИЯ</li> -->
        <li class="crumbs__item">
          <!-- {{ breadcrumbLoaded == true ? breadcrumb : "" }} -->
          <!-- <RouterLink to="/catalog" class="crumbs__link" href="index.html">
            Каталог
       
          </RouterLink> -->
          <!-- <AmBreadcrumbs>
            <template #crumb="{ crumb }">
              <RouterLink class="crumbs__link" :to="crumb.link">
                {{ crumb.label }}
              </RouterLink>
            </template>
          </AmBreadcrumbs> -->
        </li>
        <!-- <li class="crumbs__item">
          <a class="crumbs__link" href="index.html">РЕМЕШКИ/БРАСЛЕТЫ</a>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<style>
.am-breadcrumbs {
  margin: 0 !important;
}
</style>
