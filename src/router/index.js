import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ShopDetailView from "../views/ShopDetailView.vue";
import StaticPageNotFound from "../views/StaticPageNotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        breadcrumb: {
          label_rus: "ГЛАВНАЯ >",
          label_eng: "HOME >",
        },
      },
    },
    {
      path: "/accessories",
      name: "accessories",
      component: () => import("../views/ShopAccessoriesView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "АКСЕССУАРЫ",
          label_eng: "ACCESSORIES",
        },
      },
    },
    {
      path: "/catalog",
      name: "catalog",
      component: () => import("../views/ShopCatalogView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "КОЛЛЕКЦИЯ",
          label_eng: "COLLECTION",
        },
      },
    },
    {
      path: "/catalog/:subcategory",
      name: "catalog-collection",
      component: () => import("../views/ShopCollectionView.vue"),
      // meta: {
      //   breadcrumb: {
      //     label: "КОЛЛЕКЦИЯ >",
      //     link: "/catalog",
      //   },
      // },
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: ShopDetailView,
      // meta: {
      //   breadcrumb: {
      //     label: "КАТАЛОГ >",
      //     link: "/catalog",
      //   },
      //   // meta: {
      //   //   breadcrumb: false, // If crumb has falsy value, it would be skipped
      //   // },
      // },
    },
    {
      path: "/presentation",
      name: "presentation",
      component: () => import("../views/ShopPresentationView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "ЧАСЫ",
          label_eng: "WHATCHES",
        },
      },
    },
    {
      path: "/brand",
      name: "brand",
      component: () => import("../views/StaticBrandView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "О НАС",
          label_eng: "ABOUT US",
        },
      },
    },
    {
      path: "/distributers",
      name: "distributers",
      component: () => import("../views/StaticDistributersView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "ДИСТРИБЬЮТЕРЫ",
          label_eng: "DISTRIBUTERS",
        },
      },
    },
    {
      path: "/policy",
      name: "policy",
      component: () => import("../views/StaticPolicyView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ",
          label_eng: "PRIVACY POLICY",
        },
      },
    },
    {
      path: "/service",
      name: "service",
      component: () => import("../views/StaticServiceView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "ГАРАНТИЯ И СЕРВИС",
          label_eng: "GUARANTEE AND SERVICE",
        },
      },
    },
    {
      path: "/shops",
      name: "shops",
      component: () => import("../views/StaticShopsView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "ГДЕ КУПИТЬ",
          label_eng: "WHERE TO BUY",
        },
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/UserCartView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "КОРЗИНА",
          label_eng: "CART",
        },
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/UserProfileView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "ПРОФИЛЬ",
          label_eng: "PROFILE",
        },
      },
    },
    {
      path: "/under-construction",
      name: "under-construction",
      component: () => import("../views/StaticUnderConstructionView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "СТРАНИЦА В РАЗРАБОТКЕ",
          label_eng: "PAGE UNDER CONSTRUCTION",
        },
      },
    },
    {
      path: "/order-success",
      name: "order-success",
      component: () => import("../views/StaticOrderSuccessView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "УСПЕШНЫЙ ЗАКАЗ",
          label_eng: "SUCCESSFUL ORDER",
        },
      },
    },
    {
      path: "/news",
      name: "news",
      component: () => import("../views/StaticNewsListView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "НОВОСТИ",
          label_eng: "NEWS",
        },
      },
    },
    {
      path: "/news/:id",
      name: "news-detail",
      component: () => import("../views/StaticNewsDetailView.vue"),
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../views/StaticHistoryView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "ИСТОРИЯ",
          label_eng: "HISTORY",
        },
      },
    },
    {
      path: "/contacts",
      name: "contacts",
      component: () => import("../views/StaticContactsView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "КОНТАКТЫ",
          label_eng: "CONTACTS",
        },
      },
    },
    {
      path: "/delivery",
      name: "delivery",
      component: () => import("../views/StaticDeliveryView.vue"),
      meta: {
        breadcrumb: {
          label_rus: "ОПЛАТА И ДОСТАВКА",
          label_eng: "PAYMENT AND DELIVERY",
        },
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: StaticPageNotFound,
    },
  ],
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },

  // scrollBehavior: (savedPosition) => {
  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  //   return { x: 0, y: 0 };
  // },
});

// router.beforeEach(() => {
//   setTimeout(function () {
//     console.log("test");
//   }, 5000);
// });

// router.beforeEach((to, from, next) => {
//   if (to.name !== "home") {
//     setTimeout(function () {
//       console.log("test");
//     }, 5000);
//   } else next();
// });

export default router;
