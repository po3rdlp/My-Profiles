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
    <div class="flex justify-end">
      <button class="btn btn-primary btn-md rounded-lg">Send</button>
    </div>
  </div>
  <!-- <div v-for="messages in data" :key="messages.id">
    <p><strong>Author:</strong> {{ messages.author }}</p>
    <p><strong>Content:</strong> {{ messages.content }}</p>
    <p><strong>TimeStamp:</strong> {{ messages.timestamp }}</p>
  </div> -->
</template>

<script setup lang="ts">
// import { ref, onMounted } from "vue";
// import { useNuxtApp } from "#app";
// import { Database, ref as dbRef, onValue } from "firebase/database";
// import { type Message } from "~/interfaces/CommentInterface";

// const data = ref<Message[]>([]);
// const { $dbFirebase } = useNuxtApp();

// const loading = ref(true);
// const error = ref<string | null>(null);

// const fetchData = () => {
//   const dbFirebase = $dbFirebase as Database;
//   const dbReference = dbRef(dbFirebase, "/api/v1/data/comments");

//   onValue(
//     dbReference,
//     (snapshot) => {
//       const fetchedData = snapshot.val();
//       if (Array.isArray(fetchedData)) {
//         data.value = fetchedData;
//       } else {
//         data.value = [];
//       }
//       loading.value = false;
//     },
//     (err) => {
//       error.value = `Error: ${err.message}`;
//       loading.value = false;
//     }
//   );
// };

// onMounted(() => {
//   fetchData();
// });
</script>
