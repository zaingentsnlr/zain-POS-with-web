
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const socket = io(API_URL, {
    autoConnect: true,
    reconnection: true,
});

socket.on('connect', () => {
    console.log('socket connected:', socket.id);
});

socket.on('disconnect', () => {
    console.log('socket disconnected');
});

// Debug
socket.on('sale:created', (data) => {
    console.log('Real-time Sale Event Received:', data);
});
