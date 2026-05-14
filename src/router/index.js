import { createRouter, createWebHistory } from "vue-router";
import BusinessDashboard from '../views/BusinessDashboard.vue'
import TourDetailView from "../views/TourDetailView.vue"
import ToursView from "../views/ToursView.vue"
import HomeView from "../views/HomeView.vue";
import HotelsView from "../views/HotelsView.vue";
import RestaurantsView from "../views/RestaurantsView.vue";
import EventsView from "../views/EventsView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProfileView from "../views/ProfileView.vue";
import AboutView from "../views/AboutView.vue";
import DetailView from "../views/DetailView.vue";
import SearchView from "../views/SearchView.vue";
import WishlistView from "../views/WishlistView.vue";
import MapView from "../views/MapView.vue";
import CompareView from "../views/CompareView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: "/", component: HomeView },
    { path: "/tours", component: ToursView },
    { path: "/tours/:id", component: TourDetailView },
    { path: "/ai-assistant", component: () => import("../views/AIAssistantView.vue") },
    { path: "/nomad", component: () => import("../views/NomadView.vue") },
    { path: "/hotels", component: HotelsView },
    { path: "/restaurants", component: RestaurantsView },
    { path: "/events", component: EventsView },
    { path: "/login", component: LoginView },
    { path: "/register", component: RegisterView },
    { path: "/dashboard", component: BusinessDashboard },
    { path: "/profile", component: ProfileView, meta: { requiresAuth: true } },
    {
      path: "/wishlist",
      component: WishlistView,
      meta: { requiresAuth: true },
    },
    { path: "/about", component: AboutView },
    { path: "/search", component: SearchView },
    { path: "/map", component: MapView },
    { path: "/compare", component: CompareView },
    { path: "/detail/:type/:id", component: DetailView },
    { path: "/:pathMatch(.*)*", component: NotFoundView },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) next("/login");
  else next();
});

export default router;
