import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/accessories",
      name: "accessories",
      component: () => import("../views/ShopAccessoriesView.vue"),
      meta: {
        breadcrumb: "АКСЕССУАРЫ",
      },
    },
    {
      path: "/catalog",
      name: "catalog",
      component: () => import("../views/ShopCatalogView.vue"),
      meta: {
        breadcrumb: {
          label: "КАТАЛОГ",
        },
      },
    },
    {
      path: "/catalog/:subcategory",
      name: "catalog-collection",
      component: () => import("../views/ShopCollectionView.vue"),
      meta: {
        breadcrumb: {
          label: " > КОЛЛЕКЦИЯ",
        },
      },
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: () => import("../views/ShopDetailView.vue"),
      meta: {
        breadcrumb: {
          label: "КАТАЛОГ",
          link: "/catalog",
        },
      },
    },
    {
      path: "/presentation",
      name: "presentation",
      component: () => import("../views/ShopPresentationView.vue"),
      meta: {
        breadcrumb: {
          label: "ЧАСЫ",
        },
      },
    },
    {
      path: "/brand",
      name: "brand",
      component: () => import("../views/StaticBrandView.vue"),
      meta: {
        breadcrumb: {
          label: "БРЕНД>",
        },
      },
    },
    {
      path: "/distributers",
      name: "distributers",
      component: () => import("../views/StaticDistributersView.vue"),
      meta: {
        breadcrumb: {
          label: "ДИСТРИБЬЮТЕРЫ",
        },
      },
    },
    {
      path: "/policy",
      name: "policy",
      component: () => import("../views/StaticPolicyView.vue"),
      meta: {
        breadcrumb: {
          label: "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ",
        },
      },
    },
    {
      path: "/service",
      name: "service",
      component: () => import("../views/StaticServiceView.vue"),
      meta: {
        breadcrumb: {
          label: "ГАРАНТИЯ",
        },
      },
    },
    {
      path: "/shops",
      name: "shops",
      component: () => import("../views/StaticShopsView.vue"),
      meta: {
        breadcrumb: {
          label: "ГДЕ КУПИТЬ",
        },
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/UserCartView.vue"),
      meta: {
        breadcrumb: {
          label: "КОРЗИНА",
        },
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/UserProfileView.vue"),
      meta: {
        breadcrumb: {
          label: "ПРОФИЛЬ",
        },
      },
    },
    {
      path: "/under-construction",
      name: "under-construction",
      component: () => import("../views/StaticUnderConstructionView.vue"),
      meta: {
        breadcrumb: {
          label: "СТРАНИЦА В РАЗРАБОТКЕ",
        },
      },
    },
    {
      path: "/order-success",
      name: "order-success",
      component: () => import("../views/StaticOrderSuccessView.vue"),
      meta: {
        breadcrumb: {
          label: "УСПЕШНЫЙ ЗАКАЗ",
        },
      },
    },
  ],
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
