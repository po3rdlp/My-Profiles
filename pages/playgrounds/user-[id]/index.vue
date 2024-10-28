<template>
  <div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="isConnected">Connected as: {{ clientId }}</div>
  </div>
  <div>
    <NuxtLayout name="playgrounds-playground-chatting-chat-room" />
  </div>
</template>

<script setup lang="ts">
import initSocket from "~/utils/socket/socket";

const store = useMyStore();
const idClient = `${store.userData.userName}-${store.userData.id}`;

const { isConnected, clientId, errorMessage } = initSocket(
  store.authToken,
  idClient
);
</script>
