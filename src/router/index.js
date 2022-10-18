import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes.ts";

const router = createRouter({
  routes,
  history: createWebHistory(),
  linkActiveClass: "father-current"
});

export default router;