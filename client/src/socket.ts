import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SERVER_API_URL;

export const socket = io(URL, { autoConnect: false });
