<template>
  <div class="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
    <!-- Hero -->
    <section class="px-6 py-20 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div
          class="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[rgba(201,168,76,0.1)] to-transparent"
        ></div>
        <div
          class="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[rgba(201,168,76,0.05)] to-transparent"
        ></div>
      </div>
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <p
          class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-5"
        >
          About the Project
        </p>
        <h1
          class="text-6xl md:text-7xl font-black text-white mb-8 leading-tight"
        >
          BookingHub —<br />
          <span
            style="
              background: linear-gradient(135deg, #c9a84c, #e8c96d);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            "
          >
            Unified Booking Platform
          </span>
        </h1>
        <p class="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
          A diploma project developed at Ala-Too International University,
          designed to solve the fragmentation problem in the hospitality and
          entertainment booking industry.
        </p>
      </div>
    </section>

    <!-- Problem Statement -->
    <section class="px-6 py-16 bg-[#111118]">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p
              class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4"
            >
              Problem
            </p>
            <h2 class="text-4xl font-black text-white mb-6">
              What Problem Does BookingHub Solve?
            </h2>
            <p class="text-gray-400 leading-relaxed mb-5 text-sm">
              Today, users who want to plan a trip or a night out are forced to
              use multiple separate platforms — one for hotels, another for
              restaurants, and yet another for events. This creates friction,
              wastes time, and leads to a poor user experience.
            </p>
            <p class="text-gray-400 leading-relaxed text-sm">
              Businesses, on the other hand, struggle with visibility — small
              hotels and local restaurants have no unified platform to present
              their services to potential customers. The market is fragmented,
              and there is no single trusted platform that covers all
              hospitality needs in one place.
            </p>
          </div>
          <div class="space-y-4">
            <div
              v-for="problem in problems"
              :key="problem.title"
              class="bg-[#0A0A0F] border border-white/5 rounded-2xl p-5 flex gap-4 hover:border-[rgba(201,168,76,0.2)] transition-all"
            >
              <div
                class="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0"
              >
                <svg
                  class="w-5 h-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    :d="problem.icon"
                  />
                </svg>
              </div>
              <div>
                <h4 class="text-white font-semibold text-sm mb-1">
                  {{ problem.title }}
                </h4>
                <p class="text-gray-500 text-xs leading-relaxed">
                  {{ problem.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Solution -->
    <section class="px-6 py-16 bg-[#0A0A0F]">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14">
          <p
            class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Solution
          </p>
          <h2 class="text-4xl font-black text-white mb-4">
            How BookingHub Solves It
          </h2>
          <p class="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            BookingHub is a single unified platform that aggregates hotels,
            restaurants, and events — giving users one place to discover,
            compare, and book any experience.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="solution in solutions"
            :key="solution.title"
            class="bg-[#111118] border border-white/5 rounded-2xl p-7 hover:border-[rgba(201,168,76,0.25)] transition-all group"
          >
            <div
              class="w-12 h-12 rounded-xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] flex items-center justify-center mb-5 group-hover:bg-[rgba(201,168,76,0.12)] transition-all"
            >
              <svg
                class="w-6 h-6 text-[#C9A84C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  :d="solution.icon"
                />
              </svg>
            </div>
            <h3 class="text-white font-bold text-lg mb-3">
              {{ solution.title }}
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              {{ solution.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="px-6 py-16 bg-[#111118]">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14">
          <p
            class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Functionality
          </p>
          <h2 class="text-4xl font-black text-white">Key Features</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-[#0A0A0F] border border-white/5 rounded-2xl p-6 flex gap-4 hover:border-[rgba(201,168,76,0.2)] transition-all group"
          >
            <div
              class="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-5 h-5 text-[#C9A84C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  :d="feature.icon"
                />
              </svg>
            </div>
            <div>
              <h4 class="text-white font-bold mb-1">{{ feature.title }}</h4>
              <p class="text-gray-500 text-sm leading-relaxed">
                {{ feature.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="px-6 py-16 bg-[#0A0A0F]">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14">
          <p
            class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Architecture
          </p>
          <h2 class="text-4xl font-black text-white mb-4">Technology Stack</h2>
          <p class="text-gray-500 text-sm max-w-lg mx-auto">
            The system is built on a modern full-stack architecture with a REST
            API backend and a reactive single-page application frontend.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <!-- Backend -->
          <div class="bg-[#111118] border border-white/5 rounded-2xl p-8">
            <div class="flex items-center gap-3 mb-6">
              <div
                class="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-[#C9A84C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-white font-black text-lg">Backend</h3>
                <p class="text-gray-600 text-xs">Server-side & API</p>
              </div>
            </div>
            <div class="space-y-3">
              <div
                v-for="tech in backendStack"
                :key="tech.name"
                class="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              >
                <div class="flex items-center gap-3">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span class="text-white text-sm font-medium">{{
                    tech.name
                  }}</span>
                </div>
                <span class="text-gray-600 text-xs">{{ tech.desc }}</span>
              </div>
            </div>
          </div>

          <!-- Frontend -->
          <div class="bg-[#111118] border border-white/5 rounded-2xl p-8">
            <div class="flex items-center gap-3 mb-6">
              <div
                class="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-[#C9A84C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-white font-black text-lg">Frontend</h3>
                <p class="text-gray-600 text-xs">Client-side & UI</p>
              </div>
            </div>
            <div class="space-y-3">
              <div
                v-for="tech in frontendStack"
                :key="tech.name"
                class="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              >
                <div class="flex items-center gap-3">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span class="text-white text-sm font-medium">{{
                    tech.name
                  }}</span>
                </div>
                <span class="text-gray-600 text-xs">{{ tech.desc }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Architecture diagram -->
        <div class="bg-[#111118] border border-white/5 rounded-2xl p-8">
          <h3 class="text-white font-black text-lg mb-6 text-center">
            System Architecture
          </h3>
          <div class="flex items-center justify-center gap-4 flex-wrap">
            <div class="text-center">
              <div
                class="w-20 h-20 rounded-2xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] flex flex-col items-center justify-center mb-3"
              >
                <svg
                  class="w-8 h-8 text-[#C9A84C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <p class="text-white text-xs font-semibold">User</p>
              <p class="text-gray-600 text-xs">Browser</p>
            </div>
            <div class="flex flex-col items-center gap-1">
              <div class="w-16 h-px bg-[rgba(201,168,76,0.4)]"></div>
              <p class="text-gray-600 text-xs">HTTPS</p>
            </div>
            <div class="text-center">
              <div
                class="w-20 h-20 rounded-2xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] flex flex-col items-center justify-center mb-3"
              >
                <svg
                  class="w-8 h-8 text-[#C9A84C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p class="text-white text-xs font-semibold">Vue.js 3</p>
              <p class="text-gray-600 text-xs">Frontend SPA</p>
            </div>
            <div class="flex flex-col items-center gap-1">
              <div class="w-16 h-px bg-[rgba(201,168,76,0.4)]"></div>
              <p class="text-gray-600 text-xs">REST API</p>
            </div>
            <div class="text-center">
              <div
                class="w-20 h-20 rounded-2xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] flex flex-col items-center justify-center mb-3"
              >
                <svg
                  class="w-8 h-8 text-[#C9A84C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
                  />
                </svg>
              </div>
              <p class="text-white text-xs font-semibold">Django DRF</p>
              <p class="text-gray-600 text-xs">Backend API</p>
            </div>
            <div class="flex flex-col items-center gap-1">
              <div class="w-16 h-px bg-[rgba(201,168,76,0.4)]"></div>
              <p class="text-gray-600 text-xs">ORM</p>
            </div>
            <div class="text-center">
              <div
                class="w-20 h-20 rounded-2xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] flex flex-col items-center justify-center mb-3"
              >
                <svg
                  class="w-8 h-8 text-[#C9A84C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
              <p class="text-white text-xs font-semibold">
                SQLite / PostgreSQL
              </p>
              <p class="text-gray-600 text-xs">Database</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Author -->
    <section class="px-6 py-16 bg-[#111118]">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14">
          <p
            class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Developer
          </p>
          <h2 class="text-4xl font-black text-white">About the Author</h2>
        </div>
        <div
          class="max-w-2xl mx-auto bg-[#0A0A0F] border border-[rgba(201,168,76,0.15)] rounded-2xl p-10 relative overflow-hidden"
        >
          <div
            class="absolute top-0 left-0 right-0 h-px"
            style="
              background: linear-gradient(
                90deg,
                transparent,
                rgba(201, 168, 76, 0.6),
                transparent
              );
            "
          ></div>
          <div class="flex gap-8 items-start flex-wrap md:flex-nowrap">
            <div
              class="w-20 h-20 rounded-2xl btn-gold flex items-center justify-center text-3xl font-black flex-shrink-0 shadow-xl shadow-[rgba(201,168,76,0.2)]"
            >
              Y
            </div>
            <div>
              <h3 class="text-white font-black text-2xl mb-1">
                Yusupova Zhasmin
              </h3>
              <p class="text-[#C9A84C] text-sm font-semibold mb-4">
                Full-Stack Developer · COM-22
              </p>
              <div class="space-y-2 mb-6">
                <div class="flex items-center gap-3 text-gray-400 text-sm">
                  <svg
                    class="w-4 h-4 text-[#C9A84C] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                  Ala-Too International University, Bishkek
                </div>
                <div class="flex items-center gap-3 text-gray-400 text-sm">
                  <svg
                    class="w-4 h-4 text-[#C9A84C] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Diploma Project — Information Systems, 2025
                </div>
                <div class="flex items-center gap-3 text-gray-400 text-sm">
                  <svg
                    class="w-4 h-4 text-[#C9A84C] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  Django REST Framework · Vue.js 3 · PostgreSQL
                </div>
              </div>
              <p class="text-gray-500 text-sm leading-relaxed">
                This project was developed as a diploma work to demonstrate
                proficiency in full-stack web development, REST API design,
                database architecture, and modern frontend frameworks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Goals -->
    <section class="px-6 py-16 bg-[#0A0A0F]">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14">
          <p
            class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Objectives
          </p>
          <h2 class="text-4xl font-black text-white">Project Goals</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(goal, i) in goals"
            :key="i"
            class="bg-[#111118] border border-white/5 rounded-2xl p-7 hover:border-[rgba(201,168,76,0.2)] transition-all"
          >
            <div
              class="text-[rgba(201,168,76,0.2)] text-5xl font-black mb-4 font-mono"
            >
              {{ String(i + 1).padStart(2, "0") }}
            </div>
            <h3 class="text-white font-bold text-lg mb-3">{{ goal.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ goal.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const problems = [
  {
    title: "Fragmented User Experience",
    desc: "Users must visit 3–5 different websites to plan a single trip — hotels, restaurants, and events are all separate.",
    icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  },
  {
    title: "No Centralized Management",
    desc: "Businesses lack a single platform to manage listings, availability, and customer bookings in one dashboard.",
    icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "Lack of Transparency",
    desc: "Without reviews and ratings in one place, users cannot make informed decisions when choosing a service.",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  {
    title: "Time-Consuming Booking Process",
    desc: "Manual booking via phone calls or scattered web forms is inefficient and error-prone for both users and businesses.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const solutions = [
  {
    title: "Unified Platform",
    desc: "One platform for hotels, restaurants, and events. Users can discover, compare, and book any service without switching between applications.",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    title: "Real-Time Booking",
    desc: "Instant reservation system connected directly to a REST API backend — bookings are processed in real time and stored in a persistent database.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Reviews & Ratings",
    desc: "Authenticated users can leave reviews and star ratings for any property or event, ensuring transparency and trust in the platform.",
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
];

const features = [
  {
    title: "JWT Authentication",
    desc: "Secure user registration and login using JSON Web Tokens with protected routes and session persistence.",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  },
  {
    title: "Hotel Booking System",
    desc: "Users can browse hotels, filter by city and price, view detailed information, and make reservations with check-in/check-out dates.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Restaurant Reservations",
    desc: "Find restaurants by cuisine and location, check opening hours, and reserve a table directly through the platform.",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Event Ticketing",
    desc: "Browse upcoming events, check available seats, and purchase tickets with full booking confirmation.",
    icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z",
  },
  {
    title: "User Profile & History",
    desc: "Personal dashboard showing all past and upcoming bookings with status tracking and the ability to cancel pending reservations.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    title: "Advanced Search & Filters",
    desc: "Filter listings by price, rating, city, and category. Sort results by various criteria to find the most relevant options quickly.",
    icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
  },
  {
    title: "Review System",
    desc: "Authenticated users can submit star ratings (1–5) and written reviews for any hotel, restaurant, or event they have visited.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    title: "Django Admin Panel",
    desc: "Full-featured admin interface for managing all listings, users, bookings, and reviews without writing additional code.",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
];

const backendStack = [
  { name: "Django 6.0", desc: "Web Framework" },
  { name: "Django REST Framework", desc: "API Layer" },
  { name: "Simple JWT", desc: "Authentication" },
  { name: "SQLite / PostgreSQL", desc: "Database" },
  { name: "Django CORS Headers", desc: "Cross-Origin Requests" },
];

const frontendStack = [
  { name: "Vue.js 3", desc: "UI Framework" },
  { name: "Vue Router 4", desc: "Client-side Routing" },
  { name: "Pinia", desc: "State Management" },
  { name: "Axios", desc: "HTTP Client" },
  { name: "Tailwind CSS", desc: "Styling" },
  { name: "Vite", desc: "Build Tool" },
];

const goals = [
  {
    title: "Practical System Development",
    desc: "Design and implement a fully functional web application with real backend infrastructure, database integration, and secure API endpoints.",
  },
  {
    title: "Solving a Real-World Problem",
    desc: "Address the fragmentation of hospitality services by creating a platform that unifies hotels, restaurants, and events under one interface.",
  },
  {
    title: "Demonstrating Full-Stack Skills",
    desc: "Demonstrate competency in both backend (Django, REST API, authentication) and frontend (Vue.js, state management, responsive design) development.",
  },
];
</script>
