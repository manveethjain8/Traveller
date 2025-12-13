import { Server as SocketIOServer } from "socket.io"
import type{Server as HttpServer} from "http"
import type { Application } from "express"

export const setupSocket = (server: HttpServer, app: Application) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    // Make io available inside routes via req.app.get("io")
    (app as any).set("io", io)

    io.on("connection", (socket) => {
        console.log("Client Connected: ", socket.id)

            socket.on("disconnet", () => {
            console.log("Client Disconnected: ", socket.id)
        })
    })
    
    return io

}