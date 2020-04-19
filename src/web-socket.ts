import io from 'socket.io-client';
import * as config from './config/config.json';

let socket: SocketIOClient.Socket;

export const initWebSocket = (events: Record<string, (data: any) => void>) => {
    socket = io(config.WEB_SOCKET_URL, { transports: ['websocket'] });
    socket.on('connect', () => {
        Object.keys(events).forEach(eventName => socket.on(eventName, events[eventName]));
    });
}

export const manageCartItem = (id: string, amount: number) => {
    if (socket) {
        socket.emit('manageProductInCart', { id, amount });
    } else {
        throw new Error('socket is not connected');
    }
}

export const emitCheckout = () => {
    if (socket) {
        socket.emit('checkout');
    } else {
        throw new Error('socket is not connected');
    }
}
