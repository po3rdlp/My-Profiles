<template>
  <div class="mt-4 md:mt-8 animate__animated animate__fadeIn">
    <div class="grid gap-4 md:gap-8">
      <div
        v-for="job in jobs"
        :key="job.name"
        class="bg-gradient-to-br from-[#a2b1c8] to-[#54667d] rounded-xl p-4 md:p-6 opacity-85 shadow-lg md:shadow-2xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 border border-black"
      >
        <!-- Header -->
        <div
          class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 md:mb-6"
        >
          <img
            :src="job.logo"
            :alt="job.name"
            class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain rounded-lg bg-white p-1 sm:p-2 shadow-sm border border-[#e5e7eb] self-center sm:self-auto"
          />
          <div class="text-center sm:text-left">
            <h2 class="text-lg sm:text-xl font-bold text-[#1f2937]">
              {{ job.name }}
            </h2>
            <div
              class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1"
            >
              <p class="text-xs sm:text-sm text-[#2563eb] font-medium">
                {{ job.role }}
              </p>
              <span
                class="text-xs text-[#4b5563] bg-[#f3f4f6] px-2 py-1 rounded-full self-center sm:self-auto"
              >
                {{ job.duration }}
              </span>
            </div>
          </div>
        </div>

        <!-- Highlights -->
        <div class="space-y-3 md:space-y-5">
          <div v-for="(roleGroup, groupIndex) in job.do" :key="groupIndex">
            <h3
              class="font-bold text-[#1f2937] mb-2 md:mb-4 pb-1 md:pb-2 border-b border-[#e5e7eb] text-sm md:text-base"
            >
              {{ roleGroup.title }}
            </h3>
            <div class="space-y-2 md:space-y-4">
              <div
                v-for="(role, roleIndex) in roleGroup.roles"
                :key="roleIndex"
                class="p-2 sm:p-3 md:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-[#3b82f6] hover:bg-[#f5f7fa]"
              >
                <h4
                  class="font-semibold text-[#1f2937] mb-1 md:mb-2 flex items-center gap-2 text-sm md:text-base"
                >
                  {{ role.title }}
                </h4>
                <ul class="space-y-1 md:space-y-2 pl-1">
                  <li
                    v-for="(item, itemIndex) in role.items"
                    :key="itemIndex"
                    class="flex items-start gap-2 text-xs sm:text-sm text-[#4b5563]"
                  >
                    <span class="text-[#3b82f6]">•</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
    name: "RSUD Dr. Sam Ratulangi Tondano",
    role: "IT Specialist • Manado",
    duration: "Feb 2023 - Present",
    logo: logoSamrat,
    do: [
      {
        title: "IT Infrastructure & Development",
        roles: [
          {
            title: "Server Administration",
            items: [
              "Managed hospital server infrastructure with 99.9% uptime",
              "Implemented security protocols for HIPAA-compliant data protection",
              "Automated backup systems for critical patient data",
            ],
          },
          {
            title: "Software Development",
            items: [
              "Led full-stack development of Hospital Information System (SIMRS)",
              "Built responsive web portals for staff and patients",
              "Integrated lab equipment APIs for real-time data sync",
            ],
          },
          {
            title: "IT Support Leadership",
            items: [
              "Directed helpdesk team supporting 300+ hospital devices",
              "Reduced ticket resolution time by 40% through process optimization",
              "Conducted staff training on EHR system usage",
            ],
          },
        ],
      },
    ],
  },
  {
    name: "RSIA Kirana Manado",
    role: "Web Developer • Contract",
    duration: "Jun - Sep 2023",
    logo: logoKirana,
    do: [
      {
        title: "Healthcare Technology Solutions",
        roles: [
          {
            title: "Web Development",
            items: [
              "Designed and deployed hospital website with appointment system",
              "Optimized site performance achieving 95+ PageSpeed score",
              "Implemented ADA-compliant accessible design",
            ],
          },
          {
            title: "System Integration",
            items: [
              "Developed API bridges between SIMRS and third-party services",
              "Migrated legacy patient records to modern database",
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Hasil Karya Sentra Pangan",
    role: "E-Commerce Developer • Contract",
    duration: "Aug - Dec 2023",
    logo: logoHksp,
    do: [
      {
        title: "Digital Transformation",
        roles: [
          {
            title: "E-Commerce Platform",
            items: [
              "Built WooCommerce site with custom payment gateways",
              "Increased conversion rate by 25% through UX improvements",
              "Implemented inventory management automation",
            ],
          },
          {
            title: "POS System Development",
            items: [
              "Created custom POS with barcode scanning functionality",
              "Reduced checkout time by 30% for retail operations",
              "Developed real-time sales analytics dashboard",
            ],
          },
        ],
      },
    ],
  },
];
</script>
