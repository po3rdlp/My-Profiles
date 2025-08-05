<script setup lang="ts">
import CarrerView from "~/layouts/about/carrerView.vue";
import EducationView from "~/layouts/about/educationView.vue";
</script>

<template>
  <section id="index1" class="">
    <h1 class="label text-3xl text-gray-300">ABOUT ME</h1>
    <p class="break-words whitespace-normal w-full max-w-full">
      Hai, saya Leonard Petter Polandos. Saya memiliki latar belakang pendidikan
      S1 Informatika dari Universitas Klabat dan selama ini aktif di bidang
      Teknologi Informasi.
    </p>
    <p class="break-words whitespace-normal w-full max-w-full">
      Saya pernah bekerja sebagai IT Staff di RSUD Dr. Sam Ratulangi Tondano,
      dan juga sempat mengerjakan beberapa proyek freelance sebagai Web
      Developer untuk beberapa perusahaan dan rumah sakit. Selama ini saya biasa
      mengurus hal-hal seperti administrasi server, membuat sistem informasi
      untuk rumah sakit, bikin website pakai WordPress & WooCommerce, sampai
      membangun sistem POS dan integrasi data.
    </p>
    <p class="break-words whitespace-normal w-full max-w-full">
      Di rumah sakit tempat saya bekerja, saya sering menangani instalasi,
      perawatan, dan pemantauan sistem supaya semua perangkat dan jaringan tetap
      aman dan berjalan lancar. Saya juga sering bantu user kalau ada masalah
      teknis, dan kadang bikin aplikasi kecil-kecilan buat mendukung kegiatan
      kerja.
    </p>
    <p class="break-words whitespace-normal w-full max-w-full">
      Saya orangnya tekun, gampang beradaptasi, dan selalu semangat buat belajar
      hal baru. Selain kemampuan teknis, saya juga punya skill komunikasi, bisa
      kerja multitasking, dan cukup cepat dalam menganalisis masalah. Saya siap
      untuk terus berkembang dan berkontribusi di tempat kerja yang dinamis.
    </p>
  </section>
  <div>
    <div class="p-1">
      <label class="label">Experience :</label>
      <CarrerView />
    </div>
    <div class="p-1">
      <label class="label">Education :</label>
      <EducationView />
    </div>
  </div>
</template>
