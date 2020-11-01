import { 
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from "vue-router";

import Home from "@/views/Home.vue";
import User from "@/views/User.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/u/:username",
    name: "User",
    component: User,
    props: {
      username: '',
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
