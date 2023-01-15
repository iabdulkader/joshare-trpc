
import { useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function useSocket() {
    const socketRef = useRef<Socket>();

    socketRef.current = io(`${process.env.NEXT_PUBLIC_FILES_SERVER}`, {
        transports: ["websocket"], 
    });


    return { socket: socketRef.current };
}