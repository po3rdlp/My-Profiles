<template>
  <div class="mt-5">
    <div class="grid gap-4 grid-cols-1">
      <div class="flex gap-3">
        <input
          v-model="name"
          type="text"
          class="input input-primary w-96 rounded-xl border-gray-800"
          placeholder="Name*"
        />
      </div>
      <div>
        <textarea
          v-model="message"
          class="input rounded-xl border-slate-800 w-full h-24"
          placeholder="Message*"
        ></textarea>
        <div class="flex justify-end">
          <button class="btn rounded-lg" @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  getDatabase,
  ref as dbRef,
  push,
  set,
  serverTimestamp,
} from "firebase/database";

const name = ref("");
const message = ref("");

const sendMessage = async () => {
  if (message.value) {
    if (!name.value) {
      name.value = `Anonymous${Math.floor(Math.random() * 10000)}`;
    }

    const forbiddenNames = ["Leonard Petter"];
    const isAllCaps = name.value === name.value.toUpperCase();

    if (forbiddenNames.includes(name.value) || isAllCaps) {
      window.alert("Mohon memilih nama lain");
      return;
    }

    const db = getDatabase();
    const commentsRef = dbRef(db, "/api/v1/data/comments");
    const newCommentRef = push(commentsRef);

    const postData = {
      author: name.value,
      content: message.value,
      timestamp: serverTimestamp(),
    };

    try {
      await set(newCommentRef, postData);
      console.log("Message sent successfully!");
      name.value = "";
      message.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  } else {
    window.alert("MOHON MEMASUKAN PESAN!!!");
  }
};
</script>
