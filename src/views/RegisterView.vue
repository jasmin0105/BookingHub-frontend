<template>
  <div class="min-h-screen bg-[#07070C] flex items-center justify-center px-4">
    <!-- Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        style="
          position: absolute;
          top: -20%;
          left: -10%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(201, 168, 76, 0.08),
            transparent 70%
          );
          filter: blur(60px);
        "
      ></div>
      <div
        style="
          position: absolute;
          bottom: -10%;
          right: -10%;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(201, 168, 76, 0.05),
            transparent 70%
          );
          filter: blur(60px);
        "
      ></div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-flex items-center gap-2 mb-6">
          <span
            style="
              font-family: 'Playfair Display', serif;
              font-size: 1.5rem;
              font-weight: 900;
              color: #fff;
            "
          >
            Booking<span style="color: #c9a84c">Hub</span>
          </span>
        </RouterLink>
        <h1 class="text-2xl font-black text-white mb-2">Create Account</h1>
        <p class="text-gray-500 text-sm">Join BookingHub today</p>
      </div>

      <!-- Card -->
      <div class="register-card">
        <!-- Role selector -->
        <div class="mb-6">
          <label class="field-label">I am a...</label>
          <div class="role-grid">
            <button
              v-for="r in roles"
              :key="r.value"
              type="button"
              @click="form.role = r.value"
              :class="[
                'role-btn',
                form.role === r.value ? 'role-btn-active' : '',
              ]"
            >
              <span class="role-icon">{{ r.icon }}</span>
              <span class="role-name">{{ r.label }}</span>
              <span class="role-desc">{{ r.desc }}</span>
            </button>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister">
          <div class="field-group">
            <label class="field-label">Username</label>
            <input
              v-model="form.username"
              class="field-input"
              placeholder="your_username"
              required
            />
          </div>

          <div class="field-group">
            <label class="field-label">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="field-input"
              placeholder="you@email.com"
              required
            />
          </div>

          <div class="field-group">
            <label class="field-label"
              >Phone <span class="text-gray-600">(optional)</span></label
            >
            <input
              v-model="form.phone"
              class="field-input"
              placeholder="+996 xxx xxx xxx"
            />
          </div>

          <div class="field-group">
            <label class="field-label">Password</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPass ? 'text' : 'password'"
                class="field-input pr-12"
                placeholder="min 6 characters"
                required
              />
              <button
                type="button"
                @click="showPass = !showPass"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {{ showPass ? "🙈" : "👁" }}
              </button>
            </div>
          </div>

          <!-- Error -->
          <div v-if="error" class="error-box">{{ error }}</div>

          <!-- Submit -->
          <button type="submit" :disabled="loading" class="submit-btn">
            <span v-if="loading" class="loading-dots">Creating account</span>
            <span v-else>Create Account →</span>
          </button>
        </form>

        <p class="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <RouterLink
            to="/login"
            class="text-[#C9A84C] hover:underline font-semibold"
            >Sign in</RouterLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { authAPI } from "../api";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  username: "",
  email: "",
  password: "",
  phone: "",
  role: "user",
});
const loading = ref(false);
const error = ref("");
const showPass = ref(false);

const roles = [
  {
    value: "user",
    icon: "👤",
    label: "Guest",
    desc: "Book hotels & restaurants",
  },
  {
    value: "business_owner",
    icon: "🏨",
    label: "Business Owner",
    desc: "List your property",
  },
];

const handleRegister = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await authAPI.register(form.value);
    localStorage.setItem("token", res.data.token);
    authStore.user = res.data.user;
    authStore.token = res.data.token;
    router.push("/");
  } catch (e) {
    const d = e.response?.data;
    error.value =
      typeof d === "object"
        ? Object.values(d).flat().join(" ")
        : "Registration failed";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=DM+Sans:wght@400;500;600;700&display=swap");

.register-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 36px;
  backdrop-filter: blur(20px);
}

/* ROLE GRID */
.role-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 8px;
}
.role-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 12px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.02);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}
.role-btn:hover {
  border-color: rgba(201, 168, 76, 0.3);
  background: rgba(201, 168, 76, 0.05);
}
.role-btn-active {
  border-color: rgba(201, 168, 76, 0.5) !important;
  background: rgba(201, 168, 76, 0.1) !important;
}
.role-icon {
  font-size: 1.5rem;
}
.role-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  font-family: "DM Sans", sans-serif;
}
.role-desc {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
  font-family: "DM Sans", sans-serif;
}

/* FIELDS */
.field-group {
  margin-bottom: 16px;
}
.field-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 6px;
  font-family: "DM Sans", sans-serif;
}
.field-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 16px;
  color: #fff;
  font-size: 0.9rem;
  font-family: "DM Sans", sans-serif;
  outline: none;
  transition: border-color 0.2s;
}
.field-input:focus {
  border-color: rgba(201, 168, 76, 0.4);
}
.field-input::placeholder {
  color: rgba(255, 255, 255, 0.2);
}

/* ERROR */
.error-box {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 10px;
  padding: 10px 14px;
  color: #fca5a5;
  font-size: 0.8rem;
  margin-bottom: 16px;
  font-family: "DM Sans", sans-serif;
}

/* SUBMIT */
.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #c9a84c, #e8c96d);
  color: #000;
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  transition: opacity 0.2s;
  margin-top: 8px;
}
.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
}
.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.loading-dots::after {
  content: "...";
  animation: dots 1s infinite;
}
@keyframes dots {
  0%,
  100% {
    content: "...";
  }
  33% {
    content: ".";
  }
  66% {
    content: "..";
  }
}
</style>
