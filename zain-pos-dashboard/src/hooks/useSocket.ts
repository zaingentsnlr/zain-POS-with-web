import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';

export function useSocket(shopId: string = 'main') {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastSale, setLastSale] = useState<any>(null);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            console.log('Socket connected, joining shop:', shopId);
            socket.emit('join-shop', shopId);
        }

        function onDisconnect() {
            setIsConnected(false);
            console.log('Socket disconnected');
        }

        function onNewSale(sale: any) {
            console.log('Realtime Sale Recieved:', sale);
            setLastSale(sale);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('new-sale', onNewSale);

        // If already connected when this hook mounts
        if (socket.connected) {
            onConnect();
        }

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('new-sale', onNewSale);
        };
    }, [shopId]);

    return { socket, isConnected, lastSale };
}
