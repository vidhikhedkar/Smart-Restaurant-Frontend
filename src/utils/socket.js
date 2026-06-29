import { io } from "socket.io-client";

const socket = io("http://localhost:8080"); // change to your backend URL

export default socket;