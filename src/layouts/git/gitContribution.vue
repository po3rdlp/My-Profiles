<template>
  <div class="h-screen p-4 bg-gray-900 text-white">
    <!-- HEADER -->
    <div v-if="data" class="mb-3">
      <div class="flex items-center gap-1 mb-4">
        <a href="/" class="hover:bg-blue-200 rounded-lg">
          <Icon name="material-symbols:arrow-back-2" width="26" height="26" />
        </a>
        <Icon name="mdi:github" size="30" /> Contributions
      </div>

      <div
        class="flex justify-between mt-1 text-sm font-semibold text-gray-400"
      >
        <span>My Contributions from last year on Github</span>
        <a
          href="https://github.com/po3rdlp"
          target="_blank"
          class="hover:underline"
        >
          @po3rdlp
        </a>
      </div>
    </div>

    <!-- LOADING -->
    <div
      v-if="!data && !isError"
      class="flex flex-col justify-center items-center gap-4 py-44"
    >
      <span class="animate-pulse text-lg"> Loading Contributions .... </span>
      <span class="loading loading-bars loading-xl"></span>
    </div>

    <!-- ERROR -->
    <div
      v-if="isError"
      class="flex flex-col justify-center items-center gap-3 py-44 text-red-400"
    >
      <span class="text-2xl font-semibold">Error</span>
      <span class="text-sm text-center text-gray-400">
        Failed to load GitHub contributions, Try Again Later
      </span>
      <button
        class="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white"
        @click="getGitContribution"
      >
        Retry
      </button>

      <NuxtLink
        to="/"
        class="mt-2 px-4 py-2 bg-none rounded-lg text-white text-center"
      >
        Back
      </NuxtLink>
    </div>

    <!-- STATS -->
    <div v-if="data" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="stats-card">
        <span class="text-sm">Total</span>
        <span class="text-xl font-bold">
          {{
            data?.user?.contributionsCollection?.contributionCalendar
              ?.totalContributions ?? 0
          }}
        </span>
      </div>

      <div class="stats-card">
        <span class="text-sm">This Month</span>
        <span class="text-xl font-bold">
          {{ totalContributionsThisMonth }}
        </span>
      </div>

      <div class="stats-card">
        <span class="text-sm">Best Day</span>
        <span class="text-xl font-bold">
          {{ bestDay?.contributionCount ?? 0 }}
        </span>
      </div>

      <div class="stats-card">
        <span class="text-sm">Average</span>
        <span class="text-xl font-bold">
          {{ Math.floor(averageContributions) }}
        </span>
      </div>
    </div>

    <!-- CALENDAR -->
    <div
      v-if="data"
      class="overflow-x-auto py-3 px-1 bg-gray-900 rounded-xl shadow-inner"
    >
      <div class="flex">
        <div
          v-for="(week, wi) in data.user.contributionsCollection
            .contributionCalendar.weeks"
          :key="wi"
          class="flex flex-col space-y-1 mr-1"
        >
          <div
            v-for="(day, di) in week.contributionDays"
            :key="di"
            class="w-6 h-6 rounded-sm contribution-day"
            :class="{
              'bg-green-500': day.contributionCount >= 10,
              'bg-green-400':
                day.contributionCount >= 5 && day.contributionCount < 10,
              'bg-green-300':
                day.contributionCount > 0 && day.contributionCount < 5,
              'bg-gray-700': day.contributionCount === 0,
            }"
            :title="`${day.date} : ${day.contributionCount} contributions`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRuntimeConfig } from "nuxt/app";
import { apiGit } from "~/services/api/api.config";
import getMonthName from "~/utils/date/dateMonth";

const config = useRuntimeConfig();
const userName = "po3rdlp";
const token = config.public.GH_TOKEN;

const data = ref<any>(null);
const isError = ref(false);

const totalContributionsThisMonth = ref(0);
const bestDay = ref<any>(null);
const averageContributions = ref(0);
const weekContribution = ref<any[]>([]);

const now = new Date();
const currentMonth = now.toLocaleString("default", { month: "short" });
const currentYear = now.getFullYear();

const getGitContribution = async () => {
  isError.value = false;
  data.value = null;

  try {
    const response = await apiGit.post(
      "graphql",
      {
        query: `
          query {
            user(login: "${userName}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response?.data?.data) {
      throw new Error("Invalid response");
    }

    data.value = response.data.data;

    weekContribution.value =
      data.value.user.contributionsCollection.contributionCalendar.weeks;

    const allDays = weekContribution.value.flatMap(
      (week) => week.contributionDays
    );

    const currentYearDays = allDays.filter(
      (day) => new Date(day.date).getFullYear() === currentYear
    );

    const currentMonthDays = allDays.filter(
      (day) => getMonthName(day.date) === currentMonth
    );

    totalContributionsThisMonth.value = currentMonthDays.reduce(
      (a, b) => a + b.contributionCount,
      0
    );

    bestDay.value = currentYearDays.reduce(
      (best, day) =>
        day.contributionCount > (best?.contributionCount ?? 0) ? day : best,
      null
    );

    averageContributions.value =
      currentYearDays.reduce((a, b) => a + b.contributionCount, 0) / 365;
  } catch (err) {
    console.error("Failed:", err);
    isError.value = true;
  }
};

onMounted(getGitContribution);
</script>

<style scoped>
/* Base animation styles */
.stats-card,
.contribution-day,
.month-label,
.weekday-label,
.legend-item,
.color-swatch,
.hover-info {
  opacity: 0;
  animation-fill-mode: forwards;
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation-play-state: paused;
}

.animate-in {
  animation-play-state: running;
}

/* Stats cards animation */
.stats-card {
  animation-name: slideUpFade;
}

/* Month and weekday labels */
.month-label {
  animation-name: fadeInDown;
}

.weekday-label {
  animation-name: fadeInRight;
}

/* Legend items */
.legend-item {
  animation-name: fadeInUp;
}

.color-swatch {
  animation-name: bounceIn;
  display: inline-block;
}

.hover-info {
  animation-name: scaleIn;
}

/* Multiple animation types for contribution days */
.contribution-day.animation-type-0 {
  animation-name: zoomIn;
}

.contribution-day.animation-type-1 {
  animation-name: flipInX;
}

.contribution-day.animation-type-2 {
  animation-name: bounceIn;
}

.contribution-day.animation-type-3 {
  animation-name: rotateIn;
}

.contribution-day.animation-type-4 {
  animation-name: slideInUp;
}

.contribution-day.animation-type-5 {
  animation-name: pulseIn;
}

/* Animation Definitions */
@keyframes zoomIn {
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(-5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes flipInX {
  0% {
    opacity: 0;
    transform: perspective(400px) rotateX(90deg);
  }
  100% {
    opacity: 1;
    transform: perspective(400px) rotateX(0deg);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes rotateIn {
  0% {
    opacity: 0;
    transform: rotate(-180deg) scale(0.3);
  }
  100% {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
}

@keyframes slideInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseIn {
  0% {
    opacity: 0;
    transform: scale(0.1);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideUpFade {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Hover effects enhancement */
.contribution-day:hover {
  transform: scale(1.25);
  z-index: 10;
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Stats cards hover effect */
.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}
</style>
