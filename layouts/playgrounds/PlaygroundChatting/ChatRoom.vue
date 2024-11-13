<template>
  <div class="">
    <AtomsLabelComponent text="Chat Room" custom-class="font-bold" />
    <div class="flex items-center gap-2 w-full overflow-auto">
      <div v-for="user in users" :key="user.id" class="mt-2">
        <div class="grid avatar indicator relative">
          <div
            v-if="user.id !== currentUserId"
            :class="{
              'h-16 w-16 lg:w-16 lg:h-16 rounded-lg border border-green-500':
                choosenUserId === user.id,
              'h-16 w-16 lg:w-16 lg:h-16 rounded-lg': choosenUserId !== user.id,
            }"
          >
            <img
              v-on:click="chooseUser(user.id, user.userName)"
              alt="User Avatar"
              src="https://picsum.photos/seed/picsum/200/300"
            />
          </div>

          <!-- User name, only show for users other than the current user -->
          <p class="mt-2">
            {{ user.id !== currentUserId ? user.userName : null }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div>
    <UserRoom
      :user-id="choosenUserId ?? 0"
      :user-name="choosenUserName ?? 'N/A'"
    />
  </div>
</template>

<script setup lang="ts">
import initSocket from "~/utils/socket/socket";
import { apiSC } from "~/services/api/api.config";
import UserRoom from "./UserRoomChat/UserRoom.vue";

// Define the User type
interface User {
  id: number;
  userName: string;
  online: boolean;
}

// const inputMessage = ref<string>("");
// const userMessage = ref<string>("");
const store = useMyStore();
const users = ref<User[]>([]);
const isLoading = ref(false);
const idClient = `${store.userData.userName}-${store.userData.id}`;
const currentUserId = ref<number>(0);
const choosenUserId = ref<number | undefined>();
const choosenUserName = ref<string>("");

const { socket } = initSocket(store.authToken, idClient, undefined);

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

// socket.on("new-message", (data) => {
//   userMessage.value = data.message;
// });

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

const chooseUser = (userId: number, userName: string) => {
  choosenUserId.value = userId;
  choosenUserName.value = userName;
  console.log(userId);
  console.log(userName);
};

// const sendMessage = () => {
//   if (inputMessage.value.trim()) {
//     socket.emit("send-message", { content: inputMessage.value });
//     inputMessage.value = "";
//   }
// };

onMounted(() => {
  currentUserId.value = store.userData.id;
  getData();
});
</script>
