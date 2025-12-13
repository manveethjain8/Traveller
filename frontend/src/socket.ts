import {io, Socket} from "socket.io-client"

const URL = import.meta.env.VITE_BackendURL

export const socket: Socket = io(URL, {
    transports: ["websocket"],
    withCredentials: true
})