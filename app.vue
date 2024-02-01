<template>
  <div class="grid md:grid lg:flex justify-center">
    <div>
      <div class="hidden lg:block">
        <SideBar />
      </div>
      <div class="lg:hidden">
        <NavBar />
      </div>
    </div>
    <div class="p-2 font-sora text-white w-screen md:w-screen lg:w-[1300px]">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>
