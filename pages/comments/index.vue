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
      <div>
        <CommentsInputComments />
      </div>
      <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
    <div
      class="w-auto h-[450px] overflow-auto p-0 md:p-2 lg:p-3"
      v-if="!loading"
    >
      <div
        v-for="comments in data"
        :key="comments.id"
        class="chat chat-start mb-3"
      >
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="anon" src="../../assets/img/unknown.png" />
          </div>
        </div>
        <div class="grid md:flex lg:flex gap-1 md:gap-0 lg:gap-0">
          <p class="mr-1 text-sm md:text-lg lg:text-lg font-bold">
            {{ comments.author }}
          </p>
          <p
            v-if="comments.author === 'Leonard Petter'"
            class="mr-1 text-blue-500 text-xs"
          >
            (Author)
          </p>
          <time class="text-xs opacity-50">{{
            DateString(comments.timestamp)
          }}</time>
        </div>
        <div class="w-auto rounded-lg p-3 shadow-lg">
          <p class="text-xs md:text-lg lg:text-xl">{{ comments.content }}</p>
        </div>
      </div>
    </div>
    <div v-else class="flex w-full flex-col gap-4">
      <div class="flex items-center gap-4">
        <div class="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div class="flex flex-col gap-4">
          <div class="skeleton h-4 w-20"></div>
          <div class="skeleton h-4 w-28"></div>
        </div>
      </div>
      <div class="skeleton h-32 w-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useNuxtApp } from "nuxt/app";
import { Database, ref as dbRef, onValue } from "firebase/database";
import { type Comments } from "../../interfaces/CommentInterface";
import DateString from "../../utils/time/time";

const store = useMyStore();

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

useHead({
  title: "Comments - Leonard",
});
</script>
