<template>
  <section class="py-5 bg-base-100 text-gray-200" id="projects">
    <h1 class="label text-3xl text-gray-300 mb-3">PROJECTS</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      <!-- SIMRS -->
      <div
        class="bg-base-200 rounded-lg shadow-md p-6 hover:scale-105 transition-transform"
      >
        <h3 class="text-xl font-semibold mb-2">
          SIMRS – Hospital Information System
        </h3>
        <p class="text-sm text-gray-400">
          Full-stack internal application for hospital operations. Includes
          modules for patient management, billing, and lab integration. Deployed
          on secure intranet network.
        </p>
      </div>

      <!-- POS System -->
      <div
        class="bg-base-200 rounded-lg shadow-md p-6 hover:scale-105 transition-transform"
      >
        <h3 class="text-xl font-semibold mb-2">POS System Development</h3>
        <p class="text-sm text-gray-400">
          Developed an enterprise-grade POS with supplier management, invoicing,
          batch tracking, and analytics dashboard. Designed for efficient
          procurement and finance operations.
        </p>
      </div>

      <!-- E-Commerce Platform -->
      <div
        class="bg-base-200 rounded-lg shadow-md p-6 hover:scale-105 transition-transform"
      >
        <h3 class="text-xl font-semibold mb-2">E-Commerce Platform</h3>
        <p class="text-sm text-gray-400">
          Built WooCommerce site with custom payment gateways, improved UX for
          higher conversion, and implemented inventory management automation.
        </p>
      </div>
    </div>
  </section>

  <!-- ========================= -->
  <!-- PROJECT 2: Timeline Style -->
  <!-- ========================= -->
  <section class="py-16 bg-base-200 text-gray-100">
    <h2 class="text-3xl font-bold text-center mb-12">Project Timeline</h2>

    <div class="space-y-10 px-8 max-w-3xl mx-auto">
      <!-- 2023 — E-Commerce Platform -->
      <div class="relative pl-0">
        <div class="w-3 h-3 bg-blue-400 rounded-full mb-3 shadow"></div>
        <h3 class="text-lg font-semibold">2023 — E-Commerce Platform</h3>
        <p class="text-sm text-gray-400">
          Built WooCommerce site with custom payment gateways, enhanced UX for
          better conversion rates, and implemented inventory automation system.
        </p>
      </div>

      <!-- 2024 — SIMRS Internal Application -->
      <div class="relative pl-0">
        <div class="w-3 h-3 bg-green-400 rounded-full mb-3 shadow"></div>
        <h3 class="text-lg font-semibold">
          2023-2024 — SIMRS Internal Application
        </h3>
        <p class="text-sm text-gray-400">
          Developed a secure hospital information system for internal use,
          integrating patient data, billing, and laboratory modules with
          automated backup and audit logging.
        </p>
      </div>

      <div class="relative pl-0">
        <div class="w-3 h-3 bg-yellow-400 rounded-full mb-3 shadow"></div>
        <h3 class="text-lg font-semibold">2025 — POS System Development</h3>
        <p class="text-sm text-gray-400">
          Built a comprehensive POS and inventory management platform with
          supplier and payment modules, automated financial workflows, and
          real-time analytics dashboard.
        </p>
      </div>
    </div>
  </section>

  <section class="py-8 bg-base-100 text-center text-gray-400 text-sm">
    <p>Other internal or experimental projects are available upon request.</p>
  </section>
</template>
