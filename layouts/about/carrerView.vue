<template>
  <div class="mt-4 animate__animated animate__fadeInDown">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(job, index) in jobs"
        :key="index"
        class="flex items-center rounded-xl shadow-lg p-4 space-x-4"
      >
        <figure class="flex-shrink-0">
          <img
            :src="job.logo"
            :alt="job.name"
            class="w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 object-contain"
          />
        </figure>
        <div>
          <h2 class="text-lg font-semibold">
            {{ job.name }}
          </h2>
          <span class="text-sm">{{ job.role }}</span>
          <p class="text-xs">
            {{ job.duration }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const jobs = [
  {
    name: "RSUD SAMRAT TONDANO",
    role: "Works • Manado",
    duration: "Februari 2023 - Now",
    logo: "../../assets/img/samrat_logo.png",
  },
  {
    name: "RSIA KIRANA MANADO",
    role: "Freelance • Manado",
    duration: "3 Months (June - Sept) 2023",
    logo: "../../assets/img/kirana_logo.png",
  },
  {
    name: "HASIL KARYA SENTRA PANGAN",
    role: "Freelance • Manado",
    duration: "3 Months (Aug - Dec) 2023",
    logo: "../../assets/img/hksp_logo.png",
  },
];
</script>

<style scoped>
/* Tambahan styling opsional */
</style>
