<template>
  <div class="min-h-screen bg-[#07070C] py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- HEADER -->
      <div class="profile-header scroll-fade">
        <div class="profile-avatar">{{ avatarLetter }}</div>
        <div class="profile-info">
          <div class="profile-name">{{ user?.username }}</div>
          <div class="profile-email">{{ user?.email }}</div>
          <div :class="['role-badge', `role-${user?.role}`]">
            {{ roleIcon }} {{ user?.role_display || user?.role }}
          </div>
        </div>
        <div class="profile-stats">
          <div class="profile-stat">
            <div class="profile-stat-val">{{ bookings.length }}</div>
            <div class="profile-stat-lbl">Bookings</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-val">{{ activeBookings }}</div>
            <div class="profile-stat-lbl">Active</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-val" style="color: #c9a84c">
              ${{ totalSpent }}
            </div>
            <div class="profile-stat-lbl">Spent</div>
          </div>
        </div>
      </div>

      <!-- TABS -->
      <div class="profile-tabs scroll-fade">
        <button
          v-for="t in tabs"
          :key="t.key"
          @click="activeTab = t.key"
          :class="[
            'profile-tab',
            activeTab === t.key ? 'profile-tab-active' : '',
          ]"
        >
          {{ t.icon }} {{ t.label }}
        </button>
      </div>

      <!-- ── TAB: BOOKINGS ── -->
      <div v-if="activeTab === 'bookings'" class="scroll-fade">
        <div class="tab-filter-row">
          <button
            v-for="f in ['all', 'confirmed', 'pending', 'cancelled']"
            :key="f"
            @click="bookingFilter = f"
            :class="[
              'filter-btn',
              bookingFilter === f ? 'filter-btn-active' : '',
            ]"
          >
            {{ f }}
          </button>
        </div>

        <div v-if="filteredBookings.length === 0" class="empty-state">
          No bookings yet —
          <RouterLink to="/" class="text-[#C9A84C]">explore →</RouterLink>
        </div>

        <div v-for="b in filteredBookings" :key="b.id" class="booking-row">
          <div :class="['booking-type-icon', `btype-${b.booking_type}`]">
            {{ { hotel: "🏨", restaurant: "🍽", event: "🎭" }[b.booking_type] }}
          </div>
          <div class="booking-row-info">
            <div class="booking-row-name">
              {{ b.hotel_name || b.rest_name || b.event_name || `#${b.id}` }}
            </div>
            <div class="booking-row-meta">
              <span v-if="b.check_in"
                >{{ b.check_in }} → {{ b.check_out }}</span
              >
              <span>{{ b.guests }} guest{{ b.guests > 1 ? "s" : "" }}</span>
              <span style="color: #c9a84c; font-weight: 700"
                >${{ b.total_price }}</span
              >
            </div>
          </div>
          <div class="booking-row-right">
            <span :class="['status-badge', `status-${b.status}`]">{{ b.status }}</span>
            <button v-if="b.status === 'pending'" @click="openPayment(b)" class="pay-now-btn">Pay Now</button>
            <PDFReceipt :booking="b" :userName="user?.username || 'Guest'"/>
            <button
              v-if="b.status !== 'cancelled'"
              @click="cancelBooking(b.id)"
              class="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- ── TAB: CHART ── -->
      <div v-if="activeTab === 'chart'" class="scroll-fade">
        <div class="chart-card">
          <div class="chart-title">Booking Activity — Last 6 Months</div>
          <div class="chart-bars">
            <div v-for="m in chartData" :key="m.label" class="chart-bar-col">
              <div class="chart-bar-wrap">
                <div class="chart-bar-fill" :style="`height:${m.pct}%`"></div>
              </div>
              <div class="chart-bar-val">{{ m.count }}</div>
              <div class="chart-bar-label">{{ m.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── TAB: QUICK LINKS ── -->
      <div v-if="activeTab === 'links'" class="quick-links-grid scroll-fade">
        <RouterLink to="/hotels" class="quick-link-card"
          >🏨<span>Browse Hotels</span></RouterLink
        >
        <RouterLink to="/wishlist" class="quick-link-card"
          >❤️<span>My Wishlist</span></RouterLink
        >
        <RouterLink to="/map" class="quick-link-card"
          >🗺<span>Map View</span></RouterLink
        >
        <RouterLink to="/compare" class="quick-link-card"
          >⚖️<span>Compare</span></RouterLink
        >
        <RouterLink
          v-if="isBusinessOwner"
          to="/dashboard"
          class="quick-link-card highlight"
          >📊<span>Dashboard</span></RouterLink
        >
        <RouterLink
          v-if="isBusinessOwner"
          to="/my-listings"
          class="quick-link-card highlight"
          >🏢<span>My Listings</span></RouterLink
        >
      </div>

      <!-- ── TAB: ADMIN ── -->
      <div v-if="activeTab === 'admin' && isAdmin" class="scroll-fade">
        <div class="admin-section">
          <div class="admin-section-title">👥 All Users</div>
          <div v-if="loadingUsers" class="loading-text">Loading...</div>
          <div v-else>
            <div class="admin-search">
              <input
                v-model="userSearch"
                class="admin-search-input"
                placeholder="Search by email or username..."
              />
            </div>
            <div v-for="u in filteredUsers" :key="u.id" class="admin-user-row">
              <div class="admin-user-avatar">
                {{ u.username[0].toUpperCase() }}
              </div>
              <div class="admin-user-info">
                <div class="admin-user-name">{{ u.username }}</div>
                <div class="admin-user-email">{{ u.email }}</div>
              </div>
              <div class="admin-user-meta">
                <span class="text-xs text-gray-500">{{
                  formatDate(u.date_joined)
                }}</span>
              </div>
              <select
                :value="u.role"
                @change="changeRole(u.id, $event.target.value)"
                :class="['role-select', `role-select-${u.role}`]"
              >
                <option value="user">User</option>
                <option value="business_owner">Business Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PaymentModal :show="showPayment" :booking="payingBooking" @close="showPayment=false" @success="loadBookings"/>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { bookingsAPI, adminAPI } from "../api";
import PDFReceipt from "../components/PDFReceipt.vue";
import PaymentModal from "../components/PaymentModal.vue";

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const bookings = ref([]);
const bookingFilter = ref("all");
const activeTab = ref("bookings");
const allUsers = ref([]);
const loadingUsers = ref(false);
const userSearch = ref("");

const isAdmin = computed(
  () => user.value?.role === "admin" || user.value?.is_staff
);
const isBusinessOwner = computed(() => user.value?.role === "business_owner");

const avatarLetter = computed(() =>
  (user.value?.username || "U")[0].toUpperCase()
);

const roleIcon = computed(() => {
  const icons = { admin: "👑", business_owner: "🏨", user: "👤" };
  return icons[user.value?.role] || "👤";
});

const tabs = computed(() => {
  const t = [
    { key: "bookings", icon: "📋", label: "Bookings" },
    { key: "chart", icon: "📊", label: "Activity" },
    { key: "links", icon: "🔗", label: "Quick Links" },
  ];
  if (isAdmin.value) t.push({ key: "admin", icon: "👑", label: "Admin" });
  return t;
});

const activeBookings = computed(
  () => bookings.value.filter((b) => b.status === "confirmed").length
);
const totalSpent = computed(() =>
  bookings.value
    .reduce((s, b) => s + parseFloat(b.total_price || 0), 0)
    .toFixed(0)
);
const filteredBookings = computed(() =>
  bookingFilter.value === "all"
    ? bookings.value
    : bookings.value.filter((b) => b.status === bookingFilter.value)
);
const filteredUsers = computed(() =>
  allUsers.value.filter(
    (u) =>
      u.username.toLowerCase().includes(userSearch.value.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.value.toLowerCase())
  )
);

// Chart — последние 6 месяцев
const chartData = computed(() => {
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const label = d.toLocaleString("en", { month: "short" });
    const count = bookings.value.filter((b) => {
      const bd = new Date(b.created_at);
      return (
        bd.getMonth() === d.getMonth() && bd.getFullYear() === d.getFullYear()
      );
    }).length;
    months.push({ label, count });
  }
  const max = Math.max(...months.map((m) => m.count), 1);
  return months.map((m) => ({ ...m, pct: Math.max(4, (m.count / max) * 100) }));
});

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

const loadBookings = async () => {
  try {
    const res = await bookingsAPI.list();
    bookings.value = Array.isArray(res.data)
      ? res.data
      : res.data?.results || [];
  } catch (e) {
    console.error(e);
  }
};

const loadUsers = async () => {
  if (!isAdmin.value) return;
  loadingUsers.value = true;
  try {
    const res = await adminAPI.users();
    allUsers.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    loadingUsers.value = false;
  }
};

const payingBooking = ref(null)
const showPayment = ref(false)
const openPayment = (b) => { payingBooking.value = b; showPayment.value = true }

const cancelBooking = async (id) => {
  try {
    await bookingsAPI.cancel(id);
    await loadBookings();
  } catch (e) {
    console.error(e);
  }
};

const changeRole = async (userId, role) => {
  try {
    await adminAPI.changeRole(userId, role);
    await loadUsers();
  } catch (e) {
    alert("Failed to change role");
  }
};

onMounted(async () => {
  await Promise.all([loadBookings(), loadUsers()]);
  setTimeout(() => {
    document
      .querySelectorAll(".scroll-fade")
      .forEach((el) => el.classList.add("visible"));
  }, 100);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap");

/* HEADER */
.profile-header {
  display: flex;
  align-items: center;
  gap: 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 28px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.profile-avatar {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  background: linear-gradient(135deg, #c9a84c, #e8c96d);
  color: #000;
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.profile-info {
  flex: 1;
  min-width: 0;
}
.profile-name {
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 2px;
}
.profile-email {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.35);
  font-family: "DM Sans", sans-serif;
  margin-bottom: 8px;
}
.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: "DM Sans", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.role-user {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.5);
}
.role-business_owner {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}
.role-admin {
  background: rgba(201, 168, 76, 0.1);
  border: 1px solid rgba(201, 168, 76, 0.25);
  color: #c9a84c;
}
.profile-stats {
  display: flex;
  gap: 24px;
}
.profile-stat {
  text-align: center;
}
.profile-stat-val {
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
}
.profile-stat-lbl {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.3);
  font-family: "DM Sans", sans-serif;
}

/* TABS */
.profile-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.profile-tab {
  padding: 10px 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  transition: all 0.2s;
}
.profile-tab:hover {
  border-color: rgba(201, 168, 76, 0.2);
  color: rgba(255, 255, 255, 0.7);
}
.profile-tab-active {
  background: rgba(201, 168, 76, 0.1);
  border-color: rgba(201, 168, 76, 0.3);
  color: #c9a84c;
}

/* BOOKING ROWS */
.tab-filter-row {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
}
.filter-btn {
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: transparent;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  text-transform: capitalize;
  transition: all 0.2s;
}
.filter-btn-active {
  background: rgba(201, 168, 76, 0.1);
  border-color: rgba(201, 168, 76, 0.3);
  color: #c9a84c;
}
.empty-state {
  text-align: center;
  padding: 60px;
  color: rgba(255, 255, 255, 0.2);
  font-family: "DM Sans", sans-serif;
}
.booking-row {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 10px;
}
.booking-type-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}
.btype-hotel {
  background: rgba(59, 130, 246, 0.1);
}
.btype-restaurant {
  background: rgba(249, 115, 22, 0.1);
}
.btype-event {
  background: rgba(168, 85, 247, 0.1);
}
.booking-row-info {
  flex: 1;
  min-width: 0;
}
.booking-row-name {
  font-family: "Playfair Display", serif;
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.booking-row-meta {
  display: flex;
  gap: 12px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  font-family: "DM Sans", sans-serif;
  flex-wrap: wrap;
}
.booking-row-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}
.status-badge {
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  font-family: "DM Sans", sans-serif;
  text-transform: capitalize;
}
.status-confirmed {
  background: rgba(34, 197, 94, 0.1);
  color: #86efac;
  border: 1px solid rgba(34, 197, 94, 0.2);
}
.status-pending {
  background: rgba(234, 179, 8, 0.1);
  color: #fde68a;
  border: 1px solid rgba(234, 179, 8, 0.2);
}
.status-cancelled {
  background: rgba(239, 68, 68, 0.1);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.pay-now-btn { font-size:10px;color:#C9A84C;background:rgba(201,168,76,0.1);border:0.5px solid rgba(201,168,76,0.25);padding:3px 8px;border-radius:6px;cursor:pointer; }
.cancel-btn {
  font-size: 0.7rem;
  color: rgba(239, 68, 68, 0.6);
  background: none;
  border: none;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  transition: color 0.2s;
}
.cancel-btn:hover {
  color: #ef4444;
}

/* CHART */
.chart-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 28px;
}
.chart-title {
  font-family: "Playfair Display", serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 28px;
}
.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 140px;
}
.chart-bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.chart-bar-wrap {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
}
.chart-bar-fill {
  width: 100%;
  border-radius: 6px 6px 0 0;
  background: linear-gradient(180deg, #e8c96d, #c9a84c);
  min-height: 4px;
  transition: height 0.5s ease;
}
.chart-bar-val {
  font-size: 0.75rem;
  font-weight: 700;
  color: #c9a84c;
  margin-top: 6px;
  font-family: "DM Sans", sans-serif;
}
.chart-bar-label {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.25);
  font-family: "DM Sans", sans-serif;
  letter-spacing: 0.05em;
}

/* QUICK LINKS */
.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.quick-link-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  font-family: "DM Sans", sans-serif;
  font-weight: 600;
  transition: all 0.2s;
}
.quick-link-card:hover {
  border-color: rgba(201, 168, 76, 0.3);
  color: #c9a84c;
  background: rgba(201, 168, 76, 0.06);
  transform: translateY(-2px);
}
.quick-link-card.highlight {
  border-color: rgba(201, 168, 76, 0.2);
  background: rgba(201, 168, 76, 0.05);
  color: #c9a84c;
}

/* ADMIN */
.admin-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 24px;
}
.admin-section-title {
  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
}
.admin-search {
  margin-bottom: 16px;
}
.admin-search-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 10px 14px;
  color: #fff;
  font-size: 0.85rem;
  font-family: "DM Sans", sans-serif;
  outline: none;
}
.admin-user-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.02);
}
.admin-user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(201, 168, 76, 0.1);
  color: #c9a84c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.admin-user-info {
  flex: 1;
  min-width: 0;
}
.admin-user-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  font-family: "DM Sans", sans-serif;
}
.admin-user-email {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  font-family: "DM Sans", sans-serif;
}
.admin-user-meta {
  flex-shrink: 0;
}
.role-select {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 0.75rem;
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
  outline: none;
}
.role-select-admin {
  border-color: rgba(201, 168, 76, 0.3);
  color: #c9a84c;
}
.role-select-business_owner {
  border-color: rgba(59, 130, 246, 0.3);
  color: #93c5fd;
}
.loading-text {
  color: rgba(255, 255, 255, 0.3);
  font-family: "DM Sans", sans-serif;
  padding: 20px;
  text-align: center;
}

/* SCROLL FADE */
.scroll-fade {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s, transform 0.6s;
}
.scroll-fade.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
