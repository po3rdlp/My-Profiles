import { io } from "socket.io-client";
import { ref } from 'vue';

const isConnected = ref(false);
const clientId = ref('');
const errorMessage = ref('');

const initSocket = (token: any, idClient: any) => {
  const socket = io("https://petterl.xyz/simple-connect/", {
    query: { token, clientId: idClient },
  });

  socket.on("connect", () => {
    isConnected.value = true;
    console.log("Connected to WebSocket server");
  });

  socket.on("client-id", (data) => {
    clientId.value = data.clientId;
    console.log("Received client ID:", data.clientId);
  });

  socket.on("online-status", (data) => {
    console.log("status online?", data);
  });

  socket.on("error", (error) => {
    errorMessage.value = error.message;
    console.error("Socket error:", error.message);
  });

  socket.on("disconnect", () => {
    isConnected.value = false;
    console.log("Disconnected from WebSocket server");
  });

  return { socket, isConnected, clientId, errorMessage };
};

export default initSocket;
