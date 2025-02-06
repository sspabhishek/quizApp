import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL; // Use backend URL

const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;
