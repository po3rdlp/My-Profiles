<template>
  <div class="">
    <AtomsLabelComponent text="Chat Room" custom-class="font-bold" />
    <div class="flex items-center gap-5 w-full overflow-auto">
      <div v-for="user in users" :key="user.id" class="mt-2">
        <div class="grid avatar indicator relative">
          <!-- Green indicator, positioned absolutely -->
          <div
            v-if="user.online"
            class="w-5 h-5 bg-green-400 rounded-full absolute top-0 right-0 transform"
          ></div>
          <div
            v-else
            class="w-5 h-5 bg-red-500 rounded-full absolute top-0 right-0 transform"
          ></div>

          <!-- Avatar image -->
          <div class="h-20 w-20 lg:w-20 lg:h-20 rounded-lg">
            <img
              alt="User Avatar"
              src="https://picsum.photos/seed/picsum/200/300"
            />
          </div>

          <!-- User name -->
          <p class="mt-2">{{ user.userName }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="p-2 flex gap-3">
    <input
      v-model="inputMessage"
      class="input input-lg border rounded-2xl w-full"
      placeholder="input"
    />
    <button class="btn btn-lg border rounded-2xl" v-on:click="sendMessage()">
      Send
    </button>
  </div>
  <div>
    <p>{{ userMessage ? userMessage : "Tidak ada pesan" }}</p>
  </div>
</template>

<script setup lang="ts">
import initSocket from "~/utils/socket/socket";
import { apiSC } from "~/services/api/api.config";

// Define the User type
interface User {
  id: number;
  userName: string;
  online: boolean;
}

const inputMessage = ref<string>("");
const userMessage = ref<string>("");
const store = useMyStore();
const users = ref<User[]>([]);
const isLoading = ref(false);
const idClient = `${store.userData.userName}-${store.userData.id}`;

const { socket } = initSocket(store.authToken, idClient);

const updateUsersStatus = (userId: number, onlineStatus: boolean) => {
  const userIndex = users.value.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users.value[userIndex].online = onlineStatus;
  } else {
    users.value.push({
      id: userId,
      userName: `User${userId}`,
      online: onlineStatus,
    });
  }
};

socket.on("user-online-status", (data) => {
  updateUsersStatus(data.userId, data.online);
});

socket.on("new-message", (data) => {
  userMessage.value = data;
});

const getData = async () => {
  isLoading.value = true;
  try {
    const response = await apiSC.get("/dev/v1/users");
    users.value = response.data.user.map(
      (user: { id: number; userName: string }) => ({
        ...user,
        online: false,
      })
    );
  } catch (err: any) {
    console.log(err.response.data);
    if (err.response.data.statusCode === 401) {
      console.log(
        `Login dahulu, Error Response: ${err.response.data.statusCode} ${err.response.data.error}`
      );
    }
  } finally {
    isLoading.value = false;
  }
};

const sendMessage = () => {
  if (inputMessage.value.trim()) {
    socket.emit("send-message", { content: inputMessage.value });
    inputMessage.value = "";
  }
};

onMounted(() => {
  getData();
});
</script>
