import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8001/api",
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const authAPI = {
  register: (data) => api.post("/auth/register/", data),
  login: (data) => api.post("/auth/login/", data),
  profile: () => api.get("/auth/profile/"),
  updateProfile: (data) => api.patch("/auth/profile/", data),
};
export const hotelsAPI = {
  list: (params) => api.get("/hotels/", { params }),
  detail: (id) => api.get(`/hotels/${id}/`),
  similar: (id) => api.get(`/hotels/${id}/similar/`),
  myHotels: () => api.get("/hotels/my/"),
  create: (data) => api.post("/hotels/", data),
  update: (id, d) => api.patch(`/hotels/${id}/`, d),
  delete: (id) => api.delete(`/hotels/${id}/`),
};
export const restaurantsAPI = {
  list: (params) => api.get("/restaurants/", { params }),
  detail: (id) => api.get(`/restaurants/${id}/`),
  similar: (id) => api.get(`/restaurants/${id}/similar/`),
  myList: () => api.get("/restaurants/my/"),
  create: (data) => api.post("/restaurants/", data),
  update: (id, d) => api.patch(`/restaurants/${id}/`, d),
  delete: (id) => api.delete(`/restaurants/${id}/`),
};
export const eventsAPI = {
  list: (params) => api.get("/events/", { params }),
  detail: (id) => api.get(`/events/${id}/`),
  similar: (id) => api.get(`/events/${id}/similar/`),
  myList: () => api.get("/events/my/"),
  create: (data) => api.post("/events/", data),
  update: (id, d) => api.patch(`/events/${id}/`, d),
  delete: (id) => api.delete(`/events/${id}/`),
};
export const bookingsAPI = {
  list: () => api.get("/bookings/"),
  create: (data) => api.post("/bookings/", data),
  cancel: (id) => api.post(`/bookings/${id}/cancel/`),
  checkAvailability: (params) => api.get("/bookings/availability/", { params }),
};
export const reviewsAPI = {
  list: (params) => api.get("/reviews/", { params }),
  create: (data) => api.post("/reviews/", data),
  delete: (id) => api.delete(`/reviews/${id}/`),
};
export const wishlistAPI = {
  list: () => api.get("/wishlist/"),
  toggle: (data) => api.post("/wishlist/toggle/", data),
  check: (params) => api.get("/wishlist/check/", { params }),
};
export const adminAPI = {
  users: () => api.get("/admin/users/"),
  changeRole: (id, role) => api.patch(`/admin/users/${id}/role/`, { role }),
};
export const searchAPI = (q) => api.get("/search/", { params: { q } });
export const statsAPI = () => api.get("/stats/");
export default api;
