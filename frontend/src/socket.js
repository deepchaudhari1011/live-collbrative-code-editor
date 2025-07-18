import {io} from 'socket.io-client';

export const initSocket = async () => {

    const option = {

        'force new connection' : true, //this use to foece to create without room without other room impect
        transport : ['websocket'] ,
        reconnectionAttempts: 'infinity',
        timeout:10000,

    };
    return io('http://localhost:100',option);
}