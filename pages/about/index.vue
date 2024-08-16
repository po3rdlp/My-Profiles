<template>
  <div>
    <div>
      <h1 class="text text-2xl font-bold capitalize">About</h1>
      <br />
      <div class="animate__animated animate__fadeInDown">
        <h1 class="flex">
          This is short story of me, not important but seem better than nothing.
        </h1>
      </div>
      <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
    <div class="text-md grid mb-3">
      <h1>
        Leonard Petter,Im a tech enthusiast who's led projects as a server admin
        and project leader at Rsud Dr.Sam Ratulangi Tondano. My skill is on
        front-end development, with a focus on TypeScript, JavaScript, and Dart.
        Always hungry for growth, I'm on a quest for new skills and innovations
        in the tech realm.
      </h1>
    </div>
    <div>
      <LayoutsAboutSkillsView />
    </div>
    <div>
      <label class="label">Experience</label>
      <LayoutsAboutCarrerView />
    </div>
    <div>
      <label class="label">Education</label>
      <LayoutsAboutEducationView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#imports";

useHead({
  title: "About - Leonard",
});
</script>
