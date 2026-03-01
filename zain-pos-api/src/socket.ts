import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;

export const initSocket = (httpServer: HttpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CORS_ORIGIN || "*",
            methods: ["GET", "POST"]
        }
    });

    // Middleware for Auth
    io.use((socket, next) => {
        const token = socket.handshake.auth.token || socket.handshake.headers.token;
        if (!token) {
            return next(new Error("Authentication error: No token"));
        }

        try {
            const jwt = require('jsonwebtoken'); // Lazy load
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            (socket as any).userId = decoded.userId;
            next();
        } catch (err) {
            next(new Error("Authentication error: Invalid token"));
        }
    });

    io.on('connection', (socket) => {
        const userId = (socket as any).userId;
        console.log(`Client connected: ${socket.id} (User: ${userId})`);

        // Authenticated users automatically join their shop room
        // For now, assuming single shop or shopId derived from user/global
        // If client sends shopId in handshake query, use that, else default.
        const shopId = socket.handshake.query.shopId || 'default-shop';

        socket.join(`shop_${shopId}`);
        console.log(`Socket ${socket.id} joined shop_${shopId}`);

        // Optional runtime room switching from client.
        socket.on('join-shop', (nextShopId: string) => {
            const safeShopId = (nextShopId || 'default-shop').toString();
            // Leave previous shop rooms before joining the requested one.
            for (const room of socket.rooms) {
                if (room.startsWith('shop_')) {
                    socket.leave(room);
                }
            }
            socket.join(`shop_${safeShopId}`);
            console.log(`Socket ${socket.id} switched to shop_${safeShopId}`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};
