import io from 'socket.io-client';

let socket: SocketIOClient.Socket;

export const initWebSocket = (url: string, events: Record<string, (data: any) => void>) => {
    socket = io(url, { transports: ['websocket'] });
    socket.on('connect', () => {
        socket.on('productChanges', events['productChanges']);
        socket.on('checkout', events['checkout']);
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
        socket.emit('checkout', );
    } else {
        throw new Error('socket is not connected');
    }
}
