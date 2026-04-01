import { defineStore } from "pinia";
import api from "../api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      const res = await api.post("/auth/login/", { email, password });
      this.token = res.data.access;
      this.user = { email };
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("user", JSON.stringify({ email }));
    },
    async register(username, email, password) {
      await api.post("/auth/register/", { username, email, password });
      await this.login(email, password);
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
