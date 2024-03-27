<template>
  <div class="mt-3">
    <label class="label"> Or Send Me A Message !!</label>
    <div class="grid gap-5 grid-cols-1">
      <div class="grid grid-cols-2 gap-5">
        <input
          type="text"
          class="input input-primary rounded-xl border-gray-800"
          placeholder="Name*"
        />
        <input
          type="email"
          class="input input-primary rounded-xl border-gray-800"
          placeholder="Email*"
        />
      </div>
      <div>
        <textarea
          class="input rounded-xl border-slate-800 w-full h-40"
          placeholder="Message*"
        ></textarea>
      </div>
    </div>
  </div>
</template>
