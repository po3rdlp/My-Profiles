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
        class="p-4 bg-gray-800 text-white shadow-lg rounded-2xl flex flex-col items-center"
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
        class="p-4 bg-gray-800 text-white shadow-lg rounded-2xl flex flex-col items-center"
      >
        <span class="text-sm">This Month</span>
        <span class="text-xl font-bold">{{ totalContributionsThisMonth }}</span>
      </div>
      <div
        class="p-4 bg-gray-800 text-white shadow-lg rounded-2xl flex flex-col items-center"
      >
        <span class="text-sm">Best Day</span>
        <span class="text-xl font-bold">{{
          bestDay?.contributionCount ?? 0
        }}</span>
      </div>
      <div
        class="p-4 bg-gray-800 text-white shadow-lg rounded-2xl flex flex-col items-center"
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
          class="text-xs text-gray-400 font-medium"
          :style="{
            width: `${monthLabel.width}px`,
            textAlign: 'left',
            paddingLeft: '4px',
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
            class="w-6 h-6 text-xs text-gray-400 flex items-center justify-center"
          >
            {{ weekday }}
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="flex space-x-1">
          <div
            v-for="(week, index) in data.user.contributionsCollection
              .contributionCalendar.weeks"
            :key="index"
            class="flex flex-col space-y-1"
          >
            <div
              v-for="(day, idx) in week.contributionDays"
              :key="idx"
              class="w-6 h-6 rounded-sm transition-all duration-200 hover:scale-110 cursor-pointer"
              :class="{
                'bg-green-500': day.contributionCount >= 10,
                'bg-green-400':
                  day.contributionCount >= 5 && day.contributionCount < 10,
                'bg-green-300':
                  day.contributionCount > 0 && day.contributionCount < 5,
                'bg-gray-700': day.contributionCount === 0,
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
      <div class="flex items-center gap-1">
        <span>Less</span>
        <div
          v-for="datas in color"
          :key="datas.hex"
          :style="{ backgroundColor: datas.hex }"
          class="w-4 h-4 rounded-sm"
        ></div>
        <span>More</span>
      </div>
      <div
        v-if="hoveredContributionCount !== null"
        class="bg-gray-700 text-white px-2 py-1 rounded-lg shadow-md"
      >
        {{ hoveredContributionCount }} Contributions on {{ hoveredDate }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
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
  return weeks.length * 26; // 24px (w-6) + 2px (space-x-1)
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
        // Save previous month if exists
        if (currentMonth !== "" && monthWeekCount > 0) {
          monthLabels.push({
            name: currentMonth,
            width: monthWeekCount * 26, // 24px + 2px spacing
          });
        }

        // Start new month
        currentMonth = month;
        monthStartIndex = weekIndex;
        monthWeekCount = 1;
      } else {
        monthWeekCount++;
      }
    }
  });

  // Add the last month
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
