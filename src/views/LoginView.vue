<template>
  <div class="min-h-screen bg-[#0A0A0F] flex">
    <!-- Left: Branding -->
    <div
      class="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12"
      style="
        background: linear-gradient(
          135deg,
          #0a0a0f 0%,
          #111118 50%,
          #1a1410 100%
        );
      "
    >
      <div class="absolute inset-0 pointer-events-none">
        <div
          class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style="
            background: radial-gradient(circle, #c9a84c, transparent);
            filter: blur(60px);
          "
        ></div>
        <div
          class="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
          style="
            background: radial-gradient(circle, #c9a84c, transparent);
            filter: blur(40px);
          "
        ></div>
        <!-- Grid lines -->
        <div
          class="absolute inset-0"
          style="
            background-image: linear-gradient(
                rgba(201, 168, 76, 0.03) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(201, 168, 76, 0.03) 1px,
                transparent 1px
              );
            background-size: 60px 60px;
          "
        ></div>
      </div>

      <RouterLink to="/" class="flex items-center gap-3 relative z-10">
        <div
          class="w-10 h-10 rounded-xl btn-gold flex items-center justify-center font-black shadow-lg shadow-[rgba(201,168,76,0.4)]"
        >
          B
        </div>
        <span class="font-black text-white text-xl">BookingHub</span>
      </RouterLink>

      <div class="relative z-10">
        <h2 class="text-5xl font-black text-white mb-6 leading-tight">
          Welcome<br />back to<br />
          <span
            style="
              background: linear-gradient(135deg, #c9a84c, #e8c96d);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            "
            >your world</span
          >
        </h2>
        <p class="text-gray-500 text-base leading-relaxed mb-10 max-w-sm">
          Sign in to access your bookings, manage reservations, and discover new
          experiences.
        </p>
        <div class="flex flex-col gap-4">
          <div
            v-for="feat in features"
            :key="feat.text"
            class="flex items-center gap-3"
          >
            <div
              class="w-8 h-8 rounded-lg bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-4 h-4 text-[#C9A84C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="feat.icon"
                />
              </svg>
            </div>
            <span class="text-gray-400 text-sm">{{ feat.text }}</span>
          </div>
        </div>
      </div>

      <p class="text-gray-700 text-xs relative z-10">
        © 2025 BookingHub · Diploma Project · Ala-Too International University
      </p>
    </div>

    <!-- Right: Form -->
    <div
      class="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative"
    >
      <div class="absolute top-6 left-6 lg:hidden">
        <RouterLink to="/" class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-lg btn-gold flex items-center justify-center font-black text-sm"
          >
            B
          </div>
          <span class="font-black text-white">BookingHub</span>
        </RouterLink>
      </div>

      <div class="w-full max-w-md">
        <div class="mb-10">
          <h1 class="text-4xl font-black text-white mb-2">Sign In</h1>
          <p class="text-gray-500 text-sm">
            Enter your credentials to access your account
          </p>
        </div>

        <div
          v-if="error"
          class="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm mb-6 flex items-center gap-2"
        >
          <svg
            class="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ error }}
        </div>

        <div class="space-y-4">
          <div>
            <label
              class="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2"
              >Email Address</label
            >
            <div class="relative">
              <svg
                class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                @keyup.enter="submit"
                class="w-full bg-[#111118] border border-white/10 text-white rounded-xl pl-11 pr-4 py-4 text-sm focus:border-[#C9A84C] focus:outline-none transition-colors placeholder-gray-600"
              />
            </div>
          </div>

          <div>
            <label
              class="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2"
              >Password</label
            >
            <div class="relative">
              <svg
                class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                v-model="form.password"
                :type="showPass ? 'text' : 'password'"
                placeholder="••••••••"
                @keyup.enter="submit"
                class="w-full bg-[#111118] border border-white/10 text-white rounded-xl pl-11 pr-12 py-4 text-sm focus:border-[#C9A84C] focus:outline-none transition-colors placeholder-gray-600"
              />
              <button
                @click="showPass = !showPass"
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="!showPass"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            @click="submit"
            :disabled="loading"
            class="w-full py-4 btn-gold rounded-xl font-bold text-base shine disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            <svg
              v-if="loading"
              class="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {{ loading ? "Signing in..." : "Sign In" }}
          </button>
        </div>

        <div class="mt-8 pt-8 border-t border-white/5 text-center">
          <p class="text-gray-500 text-sm">
            Don't have an account?
            <RouterLink
              to="/register"
              class="text-[#C9A84C] font-semibold hover:underline ml-1"
              >Create account</RouterLink
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const form = ref({ email: "", password: "" });
const loading = ref(false);
const error = ref("");
const showPass = ref(false);

const features = [
  {
    text: "Manage all your bookings in one place",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    text: "Instant hotel, restaurant & event reservations",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    text: "Leave reviews and read honest ratings",
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
];

const submit = async () => {
  if (!form.value.email || !form.value.password) {
    error.value = "Please fill in all fields";
    return;
  }
  loading.value = true;
  error.value = "";
  try {
    await authStore.login(form.value.email, form.value.password);
    router.push("/");
  } catch {
    error.value = "Invalid email or password. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
