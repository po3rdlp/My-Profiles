<template>
  <div class="h-screen p-4 bg-gray-900 text-white">
    <div v-if="data" class="mb-3">
      <div class="flex items-center gap-1 mb-4">
        <a href="/" class="hover:bg-blue-200 rounded-lg"
          ><Icon
            name="material-symbols:arrow-back-2"
            width="26"
            height="26"
          ></Icon
        ></a>

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
          >@po3rdlp</a
        >
      </div>
    </div>

    <div
      v-if="!data"
      class="flex flex-col justify-center items-center gap-4 py-44"
    >
      <span class="animate-pulse text-white text-lg"
        >Loading Contributions ....</span
      >
      <span class="flex justify-center loading loading-bars loading-xl"></span>
    </div>

    <div
      v-if="data"
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6"
    >
      <div
        class="p-4 bg-gray-800 text-white shadow-lg rounded-2xl flex flex-col items-center stats-card"
        style="animation-delay: 0.1s"
      >
        <span class="text-sm">Total</span>
        <span class="text-xl font-bold">
          {{
            data?.user?.contributionsCollection?.contributionCalendar
              ?.totalContributions ?? 0
          }}
        </span>
      </div>
      <div
        class="p-4 bg-gray-800 text-white shadow-lg rounded-2xl flex flex-col items-center stats-card"
        style="animation-delay: 0.2s"
      >
        <span class="text-sm">This Month</span>
        <span class="text-xl font-bold">{{ totalContributionsThisMonth }}</span>
      </div>
      <div
        class="p-4 bg-gray-800 text-white shadow-lg rounded-2xl flex flex-col items-center stats-card"
        style="animation-delay: 0.3s"
      >
        <span class="text-sm">Best Day</span>
        <span class="text-xl font-bold">{{
          bestDay?.contributionCount ?? 0
        }}</span>
      </div>
      <div
        class="p-4 bg-gray-800 text-white shadow-lg rounded-2xl flex flex-col items-center stats-card"
        style="animation-delay: 0.4s"
      >
        <span class="text-sm">Average</span>
        <span class="text-xl font-bold">{{
          Math.floor(averageContributions)
        }}</span>
      </div>
    </div>

    <!-- Contribution Calendar -->
    <div
      v-if="data"
      class="overflow-x-auto py-3 px-1 bg-gray-900 rounded-xl shadow-inner mb-4"
    >
      <!-- Month Labels -->
      <div class="flex mb-1 ml-7" :style="{ width: `${calendarWidth}px` }">
        <div
          v-for="(monthLabel, index) in optimizedMonthLabels"
          :key="index"
          class="text-xs text-gray-400 font-medium month-label"
          :style="{
            width: `${monthLabel.width}px`,
            textAlign: 'left',
            paddingLeft: '4px',
            animationDelay: `${index * 0.05}s`,
          }"
        >
          {{ monthLabel.name }}
        </div>
      </div>

      <div class="flex">
        <!-- Weekday Labels -->
        <div class="flex flex-col space-y-1 mr-1">
          <div
            v-for="(weekday, idx) in ['', 'Mon', '', 'Wed', '', 'Fri', '']"
            :key="idx"
            class="w-6 h-6 text-xs text-gray-400 flex items-center justify-center weekday-label"
            :style="{ animationDelay: `${idx * 0.05}s` }"
          >
            {{ weekday }}
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="flex space-x-1">
          <div
            v-for="(week, weekIndex) in data.user.contributionsCollection
              .contributionCalendar.weeks"
            :key="weekIndex"
            class="flex flex-col space-y-1"
          >
            <div
              v-for="(day, dayIndex) in week.contributionDays"
              :key="dayIndex"
              class="w-6 h-6 rounded-sm transition-all duration-150 hover:scale-125 cursor-pointer contribution-day"
              :class="[
                {
                  'bg-green-500': day.contributionCount >= 10,
                  'bg-green-400':
                    day.contributionCount >= 5 && day.contributionCount < 10,
                  'bg-green-300':
                    day.contributionCount > 0 && day.contributionCount < 5,
                  'bg-gray-700': day.contributionCount === 0,
                },
                `animation-type-${(weekIndex + dayIndex) % 6}`,
              ]"
              :style="{
                animationDelay: `${(weekIndex * 7 + dayIndex) * 0.01}s`,
              }"
              :title="
                day.date + ': ' + day.contributionCount + ' contributions'
              "
              @mouseenter="
                showContributionCount(day.contributionCount, day.date)
              "
              @mouseleave="hideContributionCount"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend and Hover Info -->
    <div v-if="data" class="flex justify-between items-center mt-2 text-sm">
      <div
        class="flex items-center gap-1 legend-item"
        style="animation-delay: 0.5s"
      >
        <span>Less</span>
        <div
          v-for="(datas, index) in color"
          :key="datas.hex"
          :style="{
            backgroundColor: datas.hex,
            animationDelay: `${0.6 + index * 0.1}s`,
          }"
          class="w-4 h-4 rounded-sm color-swatch"
        ></div>
        <span>More</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from "vue";
import { useRuntimeConfig } from "nuxt/app";
import { apiGit } from "~/services/api/api.config";
import getMonthName from "~/utils/date/dateMonth";

const config = useRuntimeConfig();
const userName = "po3rdlp";
const token = config.public.GH_TOKEN;

const now = new Date();
const currentMonth = now.toLocaleString("default", { month: "short" });
const currentYear = now.getFullYear();

const data = ref<any>(null);
const totalContributionsThisMonth = ref<number>(0);
const bestDay = ref<any>(null);
const averageContributions = ref<number>(0);
const weekContribution = ref<any>(null);
const color = ref<any[]>([]);

const hoveredDate = ref<string | null>(null);
const hoveredContributionCount = ref<number | null>(null);

// Compute calendar width
const calendarWidth = computed(() => {
  if (!data.value) return 0;
  const weeks =
    data.value.user.contributionsCollection.contributionCalendar.weeks;
  return weeks.length * 26;
});

// Compute optimized month labels
const optimizedMonthLabels = computed(() => {
  if (!data.value) return [];

  const weeks =
    data.value.user.contributionsCollection.contributionCalendar.weeks;
  const monthLabels: Array<{ name: string; width: number }> = [];

  let currentMonth = "";
  let monthStartIndex = 0;
  let monthWeekCount = 0;

  weeks.forEach((week: any, weekIndex: number) => {
    if (week.contributionDays.length > 0) {
      const firstDay = week.contributionDays[0];
      const month = new Date(firstDay.date).toLocaleString("default", {
        month: "short",
      });

      if (month !== currentMonth) {
        if (currentMonth !== "" && monthWeekCount > 0) {
          monthLabels.push({
            name: currentMonth,
            width: monthWeekCount * 26,
          });
        }

        currentMonth = month;
        monthStartIndex = weekIndex;
        monthWeekCount = 1;
      } else {
        monthWeekCount++;
      }
    }
  });

  if (currentMonth !== "" && monthWeekCount > 0) {
    monthLabels.push({
      name: currentMonth,
      width: monthWeekCount * 26,
    });
  }

  return monthLabels;
});

const getGitContribution = async () => {
  const headers = { Authorization: `Bearer ${token}` };
  const body = {
    query: `query {
      user(login: "${userName}") {
        name
        contributionsCollection {
          contributionCalendar {
            colors
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
                weekday
              }
              firstDay
            }
          }
        }
      }
    }`,
  };

  try {
    const response = await apiGit.post("graphql", body, { headers });
    data.value = response.data.data;
    weekContribution.value =
      data.value?.user?.contributionsCollection?.contributionCalendar?.weeks ??
      [];

    const colors =
      data.value?.user?.contributionsCollection?.contributionCalendar?.colors ??
      [];
    color.value = colors.map((hex: string) => ({ hex }));

    const currentYearContributions = weekContribution.value
      .flatMap((week: any) => week.contributionDays)
      .filter((day: any) => new Date(day.date).getFullYear() === currentYear);

    const currentMonthContributions = weekContribution.value
      .flatMap((week: any) => week.contributionDays)
      .filter((day: any) => getMonthName(day.date) === currentMonth);

    totalContributionsThisMonth.value = currentMonthContributions.reduce(
      (total: number, day: any) => total + day.contributionCount,
      0
    );

    bestDay.value = currentYearContributions.reduce((best: any, day: any) => {
      return day.contributionCount > (best?.contributionCount ?? 0)
        ? day
        : best;
    }, null);

    const daysInYear = new Date(currentYear, 11, 31).getDate();
    const thisYearTotalContributions = currentYearContributions.reduce(
      (total: number, day: any) => total + day.contributionCount,
      0
    );
    averageContributions.value = thisYearTotalContributions / daysInYear;

    // Trigger animation after data is loaded
    nextTick(() => {
      setTimeout(() => {
        const elements = document.querySelectorAll(
          ".stats-card, .contribution-day, .month-label, .weekday-label, .legend-item, .color-swatch"
        );
        elements.forEach((el) => {
          el.classList.add("animate-in");
        });
      }, 50);
    });
  } catch (err) {
    console.error("Failed to fetch GitHub contributions:", err);
  }
};

const showContributionCount = (count: number, date: string) => {
  hoveredContributionCount.value = count;
  hoveredDate.value = date;
};

const hideContributionCount = () => {
  hoveredContributionCount.value = null;
};

onMounted(() => getGitContribution());
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
