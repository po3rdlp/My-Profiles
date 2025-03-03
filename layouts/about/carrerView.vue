<template>
  <div class="mt-4 animate__animated animate__fadeInDown">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="job in jobs"
        :key="job.name"
        class="flex flex-col items-center text-center p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <!-- Logo -->
        <figure class="w-full flex justify-center">
          <img
            :src="job.logo"
            :alt="job.name"
            class="max-w-[80px] md:max-w-[120px] object-contain"
          />
        </figure>

        <!-- Info -->
        <div class="mt-3">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ job.name }}
          </h2>
          <span class="text-sm text-gray-500 block">{{ job.role }}</span>
          <p class="text-xs text-gray-400">{{ job.duration }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import logoSamrat from "@/assets/img/samrat_logo.png";
import logoKirana from "@/assets/img/kirana_logo.png";
import logoHksp from "@/assets/img/hksp_logo.png";

const jobs = [
  {
    name: "RSUD SAMRAT TONDANO",
    role: "Works • Manado",
    duration: "Februari 2023 - 2025 (Now)",
    logo: logoSamrat,
  },
  {
    name: "RSIA KIRANA MANADO",
    role: "Freelance • Manado",
    duration: "3 Months (June - Sept) 2023",
    logo: logoKirana,
  },
  {
    name: "HASIL KARYA SENTRA PANGAN",
    role: "Freelance • Manado",
    duration: "3 Months (Aug - Dec) 2023",
    logo: logoHksp,
  },
];
</script>
