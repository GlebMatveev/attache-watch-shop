<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";

export default {
  name: "SliderTop",
  components: {
    Carousel,
    Slide,
    Pagination,
  },

  data() {
    return {
      banners: [
        {
          class: "top__slide-1",
          title: "PILOT",
          subtitle: "Automatic",
          link: "/catalog/PILOT",
          logo: "assets/img/banners/pilot-logo.png",
        },
        {
          class: "top__slide-3",
          title: "PILOT",
          subtitle: "Chronograph",
          link: "/catalog/PILOT",
          logo: "../assets/img/banners/pilot-logo.png",
        },
        {
          class: "top__slide-2",
          title: "DEEP SEA",
          subtitle: "Automatic",
          link: "/catalog/DEEP SEA",
          logo: "../assets/img/banners/deep-sea-logo.png",
        },
      ],
    };
  },
};
</script>

<template>
  <Carousel :wrap-around="true" :autoplay="5000" :items-to-show="1">
    <Slide v-for="slide in banners" :key="slide">
      <section class="top">
        <div :class="slide.class">
          <div class="container top__flex">
            <div class="top__left">
              <img :src="slide.logo" alt="Pilot Logo" />
              <hr class="top__hr" />
              <h1 class="top__heading">{{ slide.title }}</h1>
              <span class="top__text">{{ slide.subtitle }}</span>
              <RouterLink class="top__link" :to="slide.link">
                <button class="top__button">
                  {{ langDataLoaded == true ? langData.banner.button : "" }}
                </button>
              </RouterLink>
              <pagination />
            </div>
          </div>
        </div>
      </section>
    </Slide>
  </Carousel>
</template>

<style></style>
