<template>
  <div class="p-3" v-if="props.userId === 0">
    <p class="text-center text-sm lg:text-3xl animate animate-pulse">
      PILIH USER TERLEBIH DAHULU
    </p>
  </div>
  <div v-else class="p-2 mt-2 w-full h-full flex flex-col border rounded-2xl">
    <!-- Header chat -->
    <p class="mb-1 p-2">
      Your Chat With <span class="underline">{{ props.userName }}</span>
    </p>

    <!-- Chat messages container -->
    <div class="grid p-3 h-96 overflow-auto">
      <div>
        <div
          v-for="(chat, index) in sortedChats"
          :key="chat.id"
          :class="
            chat.sender.userName === props.userName
              ? 'chat chat-end mb-2'
              : 'chat chat-start mb-2'
          "
        >
          <div>
            <label
              v-if="
                index === 0 ||
                sortedChats[index - 1].sender.userName !== chat.sender.userName
              "
              class="text-sm lg:text-lg"
            >
              {{ chat.sender.userName }}
            </label>
            <div class="chat-bubble p-1 rounded-lg">
              <p class="text-sm lg:text-lg break-words">{{ chat.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message input and send button -->
    <div class="p-2 flex gap-3 items-center">
      <input
        class="input input-md border rounded-2xl w-full"
        placeholder="Type a message"
        v-model="messageInput"
      />
      <button class="btn btn-md border rounded-2xl" @click="sendMessage">
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import initSocket from "~/utils/socket/socket"; // Import your initSocket function
import { apiSC } from "~/services/api/api.config";

interface Sender {
  userName: string;
}

interface Chat {
  id: string;
  sender: Sender;
  message: string;
  userName: string;
  timestamp: string; // assuming 'timestamp' is in ISO string format
}

const receivedChats = ref<Chat[]>([]);
const senderChats = ref<Chat[]>([]);
const messageInput = ref<string>("");
const store = useMyStore();
const idClient = `${store.userData.userName}-${store.userData.id}`;

const { socket } = initSocket(store.authToken, idClient);

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

// Fetch received chats
const getChatDataReceived = async () => {
  try {
    const responseReceived = await apiSC.get(
      `dev/v1/chats/received/${props.userId}`
    );
    const reverseData = responseReceived.data;
    receivedChats.value = reverseData.reverse();
    console.log("Received Data", reverseData);
  } catch (err) {
    console.log("Failed to fetch received chats");
  }
};

// Fetch sent chats
const getChatDataSent = async () => {
  try {
    const responseSender = await apiSC.get(`dev/v1/chats/sent/${props.userId}`);
    senderChats.value = responseSender.data;
    console.log("Sent Data", responseSender.data);
  } catch (err) {
    console.log("Failed to fetch sent chats");
  }
};

// Watch for changes in userId and reload chat data
watch(
  () => props.userId,
  async (newUserId, oldUserId) => {
    if (newUserId !== oldUserId) {
      await getChatDataReceived();
      await getChatDataSent();
    }
  },
  { immediate: true } // Ensure this runs on mount as well
);

// Computed property to merge and sort chats by timestamp
const sortedChats = computed(() => {
  // Combine both received and sent chats into a single array
  const allChats = [...receivedChats.value, ...senderChats.value];

  // Sort chats based on timestamp (ascending order)
  return allChats.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
});

// Listen for new messages via socket
onMounted(() => {
  socket.on("new-message", (data: any) => {
    console.log("Received new message:", data);

    // Update receivedChats or senderChats based on the message
    const newChat: Chat = {
      id: data.timestamp, // Use timestamp or a unique ID
      sender: { userName: data.userName },
      message: data.message,
      userName: data.userName,
      timestamp: data.timestamp,
    };

    // Update the chat list dynamically
    receivedChats.value.push(newChat);
  });
});

// Cleanup socket connection
onBeforeUnmount(() => {
  if (socket) {
    socket.disconnect();
  }
});

// Send a message to the server
const sendMessage = () => {
  if (messageInput.value.trim()) {
    const messageData = {
      content: messageInput.value,
      receiverId: props.userId, // Assuming the receiver is the current user
    };

    // Emit the message to the server
    socket.emit("user-sending-message", messageData);

    // Optionally clear input after sending
    messageInput.value = "";
  }
};
</script>
