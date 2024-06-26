<template>
  <div>
    <!-- LABEL MAYBE ? -->
    <div>
      <p class="flex gap-2 items-centerfont-semibold text-lg">
        <Icon name="mdi:github" size="30" /> Contributions
      </p>
    </div>
    <div class="flex justify-between mt-3">
      <p class="text text-sm font-semibold">
        My Contributions from last year on Github
      </p>
      <a
        href="https://github.com/po3rdlp"
        class="text-sm font-semibold text-center"
        target="_blank"
        >@po3rdlp</a
      >
    </div>
    <div class="p-1 lg:p-3">
      <!-- CARD -->
      <div
        v-if="data"
        class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-3 lg:gap-4 justify-center items-center mt-5"
      >
        <div
          class="w-full flex items-center md:w-48 lg:w-56 h-20 shadow-sm border border-neutral-700 rounded-2xl"
        >
          <div class="p-1 px-3">
            <label class="text-sm">Total</label>
            <p v-if="data" class=" ">
              {{
                data.user.contributionsCollection.contributionCalendar
                  .totalContributions
              }}
            </p>
          </div>
        </div>
        <div
          class="w-full flex items-center md:w-48 lg:w-56 h-20 shadow-sm border border-neutral-700 rounded-2xl"
        >
          <div class="p-1 px-3">
            <label class="text-sm">This Month</label>
            <p v-if="totalContributionsThisMonth" class="">
              {{ totalContributionsThisMonth }}
            </p>
          </div>
        </div>
        <div
          class="w-full flex items-center md:w-48 lg:w-56 h-20 shadow-sm border border-neutral-700 rounded-2xl"
        >
          <div class="p-1 px-3">
            <label class="text-sm">Best Day</label>
            <p v-if="bestDay" class="">
              {{ bestDay.contributionCount }}
            </p>
          </div>
        </div>
        <div
          class="w-full flex items-center md:w-48 lg:w-56 h-20 shadow-sm border border-neutral-700 rounded-2xl"
        >
          <div class="p-1 px-3">
            <label class="text-sm">Best Day</label>
            <p v-if="data" class="">
              {{ Math.floor(averageContributions) }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="skeleton w-full h-32 mt-3"></div>

      <!-- WEEKS CONTRIBUTION -->
      <div
        v-if="data"
        class="w-80 md:w-fit lg:w-fit overflow-y-auto mt-5 flex gap-1 animate__animated animate__fadeIn"
      >
        <div
          v-for="(week, index) in weekContribution"
          :key="week.firstDay"
          class="-space-y-2 relative z-0"
        >
          <div class="mt-5">
            <div v-if="showMonth(week, index)">
              <span class="absolute top-0 text-xs">
                {{ getMonthName(week.firstDay) }}
              </span>
            </div>
          </div>
          <div v-for="day in week.contributionDays" :key="day.date">
            <ul>
              <li
                :style="{ backgroundColor: day.color }"
                class="w-[13.9px] h-[13px] rounded-sm inline-block"
                @mouseenter="
                  showContributionCount(day.contributionCount, day.date)
                "
                @mouseleave="hideContributionCount()"
              ></li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else class="skeleton w-full h-32 mt-3"></div>
      <div v-if="data" class="flex items-center justify-between gap-1">
        <div class="flex items-center gap-1 rounded-lg">
          <p>Less</p>
          <div v-for="datas in color" :key="datas.hex">
            <div
              :style="{ backgroundColor: datas.hex }"
              class="w-3 h-3 rounded-sm"
            ></div>
          </div>
          <p>More</p>
        </div>
        <div
          v-if="hoveredContributionCount || hoveredContributionCount === 0"
          class="bg-gray-400 rounded-lg p-1"
        >
          <p class="text text-sm text-black">
            {{ hoveredContributionCount }} Contributions on {{ hoveredDate }}
          </p>
        </div>
      </div>
    </div>
    <!-- CARD -->
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "nuxt/app";
import { apiGit } from "~/services/api/api.config";
import getMonthName from "~/utils/date/dateMonth";

const config = useRuntimeConfig();
const userName = "po3rdlp";
const token = config.public.GH_TOKEN;

const now = new Date();
const currentMonth = now.toLocaleString("default", { month: "short" });
const currentYear = now.getFullYear();

const totalContributionsThisMonth = ref<number>(0);
const bestDay = ref<any>(null);
const averageContributions = ref<number>(0);
const data = ref<any>(null);
const weekContribution = ref<any>(null);
const color = ref<any[]>([]);

const hoveredDate = ref();
const hoveredContributionCount = ref(null);

const getGitContribution = async () => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

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
      response.data.data.user.contributionsCollection.contributionCalendar.weeks;
    const colors =
      response.data.data.user.contributionsCollection.contributionCalendar
        .colors;
    color.value = colors.map((color: any) => {
      return { hex: color };
    });
  } catch (err) {
    console.log(err);
  }

  const currentYearContributions = weekContribution.value
    .flatMap((week: any) => week.contributionDays)
    .filter((day: any) => {
      const year = new Date(day.date).getFullYear();
      return year === currentYear;
    });

  const currentMonthContributions = weekContribution.value
    .flatMap((week: any) => week.contributionDays)
    .filter((day: any) => {
      const month = getMonthName(day.date);
      return month === currentMonth;
    });

  let thisMonthTotalContributions = currentMonthContributions.reduce(
    (total: any, day: any) => total + day.contributionCount,
    0
  );
  const thisYearTotalContributions = currentYearContributions.reduce(
    (total: any, day: any) => total + day.contributionCount,
    0
  );

  totalContributionsThisMonth.value = thisMonthTotalContributions;

  //BestDay
  let bestContributionCount = 0;
  let bestContributionDay = null;

  for (const day of currentYearContributions) {
    if (day.contributionCount > bestContributionCount) {
      bestContributionCount = day.contributionCount;
      bestContributionDay = day;
    }
  }
  bestDay.value = bestContributionDay;

  //Average
  const daysInYear = new Date(currentYear, 11, 31).getDate();
  averageContributions.value = thisYearTotalContributions / daysInYear;
};

const showMonth = (week: any, index: any) => {
  if (index === 0) {
    return false;
  }

  if (weekContribution.value && weekContribution.value[index - 1]) {
    const currentMonth = getMonthName(week.firstDay);
    const previousMonth = getMonthName(
      weekContribution.value[index - 1].firstDay
    );
    return currentMonth !== previousMonth;
  } else {
    return false;
  }
};

const showContributionCount = (count: any, date: any) => {
  hoveredContributionCount.value = count;
  hoveredDate.value = date;
};

const hideContributionCount = () => {
  hoveredContributionCount.value = null;
};

onMounted(() => {
  getGitContribution();
});
</script>
~/services/api/api.config
