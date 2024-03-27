<template>
  <div>
    <div>
      <h1 class="text text-2xl font-bold capitalize">Contact</h1>
      <br />
      <div class="animate__animated animate__fadeInDown">
        <h1 class="flex">
          Feel free to get in touch and let's have a discussion about how we can
          work together.
        </h1>
      </div>
      <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
    <div class="mt-5">
      <label class="text text-lg font-bold capitalize"
        >Find Me on Social Media</label
      >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mt-3 gap-5">
        <button
          class="btn btn-md rounded-lg bg-[#4EB067] hover:bg-[#4EB067] hover:scale-105 duration-400"
        >
          <Icon name="mdi:email-outline" size="30" /> Email
        </button>
        <button
          class="btn btn-md rounded-lg bg-[#0077B5] hover:bg-[#0077B5] hover:scale-105 duration-400"
        >
          <Icon name="mdi:linkedin" size="30" /> Linkedin
        </button>
        <button
          class="btn btn-md rounded-lg bg-[#9F64B6] hover:bg-[#9F64B6] hover:scale-105 duration-400"
        >
          <Icon name="mdi:instagram" size="30" /> Instagram
        </button>
        <button
          class="btn btn-md rounded-lg bg-[#1DA1F2] hover:bg-[#1DA1F2] hover:scale-105 duration-400"
        >
          <Icon name="mdi:twitter" size="30" /> Email
        </button>
        <button
          class="btn btn-md rounded-lg bg-[#79817D] hover:bg-[#79817D] hover:scale-105 duration-400"
        >
          <Icon name="mdi:github" size="30" /> Github
        </button>
      </div>
    </div>
    <br />
    <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
    <ContactMessageMe />
  </div>
</template>
