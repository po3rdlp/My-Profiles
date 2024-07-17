<template>
  <p>Hello World Input</p>
  <div class="mt-5">
    <div class="grid gap-5 grid-cols-1">
      <div class="flex gap-3">
        <input
          v-model="name"
          type="text"
          class="input input-primary w-96 rounded-xl border-gray-800"
          placeholder="Name*"
        />
        <button class="btn rounded-lg" @click="sendMessage">Send</button>
      </div>
      <div>
        <textarea
          v-model="message"
          class="input rounded-xl border-slate-800 w-full h-40"
          placeholder="Message*"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const sendMessage = () => {
  if (name.value && message.value) {
    const db = getDatabase();
    const commentsRef = dbRef(db, "/api/v1/data/comments");
    const newCommentRef = push(commentsRef);

    const postData = {
      author: name.value,
      content: message.value,
      timestamp: serverTimestamp(),
    };

    const updates = {};
    updates[`/api/v1/data/comments/${newCommentRef.key}`] = postData;

    set(newCommentRef, postData)
      .then(() => {
        console.log("Message sent successfully!");
        name.value = "";
        message.value = "";
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  } else {
    console.warn("Name and message are required!");
  }
};
</script>
