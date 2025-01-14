<template>
  <div class="absolute hero min-h-screen font-sora">
    <div class="hero-content text-center text-neutral-content grid">
      <div class="max-w-5xl animate__animated animate__backInDown">
        <h1
          class="h-6 md:h-14 lg:h-16 text-2xl md:text-4xl lg:text-6xl mb-3 md:mb-3 lg:mb-1"
        >
          Leonard Petter Polandos
        </h1>
        <div class="mb-5 p-2 max-w-3xl">
          <p class="mb-1 text-base md:text-sm lg:text-xl text-gray-100">
            Hello! I'm an experienced fullstack web developer, proficient in
            both front-end and back-end technologies. My focus is on crafting
            dynamic web applications that deliver seamless user experiences.
          </p>
        </div>
        <div class="flex justify-center gap-5">
          <a href="https://github.com/po3rdlp" target="_blank">
            <Icon name="mdi:github" size="34px" />
          </a>
          <a href="https://www.instagram.com/leonpolandos/" target="_blank">
            <Icon name="mdi:instagram" size="34px" />
          </a>
          <a href="https://www.facebook.com/Lpolandos/" target="_blank">
            <Icon name="ic:baseline-facebook" size="34px" />
          </a>
          <a href="https://twitter.com/po3rdlp" target="_blank">
            <Icon name="fa6-brands:square-x-twitter" size="34px" />
          </a>
        </div>
      </div>
      <div class="animate__animated animate__bounceInUp">
        <NuxtLink
          to="/dashboard"
          class="mb-5 text-lg font-bold btn btn-sm btn-ghost hover:bg-none mt-3"
        >
          See More Details.. ></NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
