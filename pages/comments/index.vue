<template>
  <div>
    <div>
      <h1 class="text text-2xl font-bold capitalize">Comments</h1>
      <br />
      <div class="animate__animated animate__fadeInDown">
        <h1 class="flex">
          Leave whatever you like to say, suggestions, questions or anything!
        </h1>
      </div>
      <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
    <div class="w-auto h-[450px] overflow-auto p-2">
      <div
        v-for="comments in data"
        :key="comments.id"
        class="chat chat-start mb-3"
      >
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="anon" src="https://picsum.photos/id/237/200/300" />
          </div>
        </div>
        <div class="flex">
          <p class="mr-3 text-xl font-bold">{{ comments.author }}</p>
          <time class="text-sm opacity-50">{{
            DateString(comments.timestamp)
          }}</time>
        </div>
        <div class="w-auto chat-bubble-accent rounded-lg p-3">
          <p class="text-xl">{{ comments.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useNuxtApp } from "nuxt/app";
import { Database, ref as dbRef, onValue } from "firebase/database";
import { type Comments } from "../../interfaces/CommentInterface";
import DateString from "../../utils/time/time";

const data = ref<Comments[]>([]);
const { $dbFirebase } = useNuxtApp();

const loading = ref(true);
const error = ref<string | null>(null);

const fetchData = () => {
  const dbFirebase = $dbFirebase as Database;
  const dbReference = dbRef(dbFirebase, "/api/v1/data/comments/");

  onValue(
    dbReference,
    (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        const commentsArray = Object.keys(fetchedData).map((key) => ({
          id: key,
          ...fetchedData[key],
        }));
        data.value = commentsArray;
        console.log("data", data.value);
      } else {
        data.value = [];
        console.log(data.value);
      }
      loading.value = false;
    },
    (err) => {
      error.value = `Error: ${err.message}`;
      loading.value = false;
    }
  );
};

onMounted(() => {
  fetchData();
});
</script>
