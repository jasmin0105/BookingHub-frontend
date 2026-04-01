<template>
  <div class="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-6">
    <div class="text-center max-w-lg">
      <!-- Big 404 -->
      <div class="relative mb-8">
        <div
          class="text-[180px] font-black leading-none select-none"
          style="
            background: linear-gradient(
              135deg,
              rgba(201, 168, 76, 0.15),
              rgba(201, 168, 76, 0.05)
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          "
        >
          404
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="w-24 h-24 rounded-2xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] flex items-center justify-center"
          >
            <svg
              class="w-12 h-12 text-[#C9A84C]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <h1 class="text-3xl font-black text-white mb-4">Page Not Found</h1>
      <p class="text-gray-500 text-base leading-relaxed mb-10">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on track.
      </p>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <RouterLink
          to="/"
          class="px-8 py-4 btn-gold rounded-xl font-bold shine flex items-center justify-center gap-2"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Go Home
        </RouterLink>
        <RouterLink
          to="/search"
          class="px-8 py-4 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search
        </RouterLink>
      </div>

      <div class="mt-12 flex justify-center gap-6">
        <RouterLink
          to="/hotels"
          class="flex flex-col items-center gap-2 text-gray-600 hover:text-[#C9A84C] transition-all group"
        >
          <div
            class="w-10 h-10 rounded-xl border border-white/5 group-hover:border-[rgba(201,168,76,0.3)] flex items-center justify-center transition-all"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <span class="text-xs">Hotels</span>
        </RouterLink>
        <RouterLink
          to="/restaurants"
          class="flex flex-col items-center gap-2 text-gray-600 hover:text-[#C9A84C] transition-all group"
        >
          <div
            class="w-10 h-10 rounded-xl border border-white/5 group-hover:border-[rgba(201,168,76,0.3)] flex items-center justify-center transition-all"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <span class="text-xs">Restaurants</span>
        </RouterLink>
        <RouterLink
          to="/events"
          class="flex flex-col items-center gap-2 text-gray-600 hover:text-[#C9A84C] transition-all group"
        >
          <div
            class="w-10 h-10 rounded-xl border border-white/5 group-hover:border-[rgba(201,168,76,0.3)] flex items-center justify-center transition-all"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span class="text-xs">Events</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup></script>
