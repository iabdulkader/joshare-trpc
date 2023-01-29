import { createContext, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import {  useFilesContext } from "../filesContext/filesContext";
import { useUserContext } from "../userContext/userContext";

type SocketContext = {
    socket: Socket | null;
}

let socketState: SocketContext = {
    socket: io(`${process.env.NEXT_PUBLIC_WS_URL}`, { path: "/socket", transports : ['websocket'] }),
} as SocketContext;

export const SocketContext = createContext(socketState);

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export default function SocketContextProvider({ children }: { children: React.ReactNode }) {
 
    const { pin } = useUserContext();
    const { uploadFile, updateProgress, deleteFileByID, removeFilesFromPending } = useFilesContext();
    
    
    useEffect(() => {
        let socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, { path: "/socket", transports : ['websocket'] })

        if(pin) {
            socket!.emit("join", { pin });
        }
        socket.on("upload-progress", (data) => {
            updateProgress!(data.file, data.id);
        })

        socket.on("upload-complete", (data) => {
            uploadFile!(data.file);
        })

        socket.on("cancel-upload", (data) => {
            deleteFileByID!(data.id)
            removeFilesFromPending!(data.id)
        })
        
        socket.on("delete-file", (data) => {
            deleteFileByID!(data.id)
        })


        return () => {
                if(socket){
                    socket.off("connect");
                    socket.off("upload-progress");
                    socket.off("upload-complete");
                    socket.off("delete-file");
                }
        }
        
    }, [pin])

    

    
    return (
        <SocketContext.Provider value={socketState}>
            {children}
        </SocketContext.Provider>)
}