import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "../pages/LandingPage.vue";
import WpaExplorer from "../pages/WpaExplorer.vue";
import IpgExplorer from "../pages/IpgExplorer.vue";
import CartsExplorer from "../pages/CartsExplorer.vue";
import MerchantApiExplorer from "../pages/MerchantApiExplorer.vue";
import IppExplorer from "../pages/IppExplorer.vue";
import IssuingApiExplorer from "../pages/IssuingApiExplorer.vue";

const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingPage,
  },
  {
    path: "/wpa",
    name: "wpa",
    component: WpaExplorer,
  },
  {
    path: "/ipg",
    name: "ipg",
    component: IpgExplorer,
    props: (route) => ({
      initialActiveId: route.query.section || "ipg-overview",
    }),
  },
  {
    path: "/carts",
    name: "carts",
    component: CartsExplorer,
    props: (route) => ({
      initialActiveId: route.query.section || "carts-overview",
    }),
  },
  {
    path: "/merchant-api",
    name: "merchant-api",
    component: MerchantApiExplorer,
    props: (route) => ({
      initialActiveId: route.query.section || "merchant-overview",
    }),
  },
  {
    path: "/ipp",
    name: "ipp",
    component: IppExplorer,
    props: (route) => ({
      initialActiveId: route.query.section || "ipp-overview",
    }),
  },
  {
    path: "/issuing-api",
    name: "issuing-api",
    component: IssuingApiExplorer,
    props: (route) => ({
      initialActiveId: route.query.section || "issuing-overview",
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;