import { createContext, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { FilesContext } from "../filesContext/filesContext";
import { UserContext } from "../userContext/userContext";

type SocketContext = {
    socket: Socket | null;
}

let initialState: SocketContext = {
    socket: null,
}

export const SocketContext = createContext(initialState);

export default function SocketContextProvider({ children }: { children: React.ReactNode }) {

    const { pin } = useContext(UserContext);
    const { uploadFile, updateProgress, deleteFileByID } = useContext(FilesContext);


    useEffect(() => {
        
        if(pin){
            initialState.socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, { path: "/socket", transports : ['websocket'] });
            initialState.socket.emit("join", { pin });

            initialState.socket.on("connect", () => {

                initialState.socket!.on("upload-progress", (data) => {
                    updateProgress!(data.file, data.id);

                })

                initialState.socket!.on("upload-complete", (data) => {
                    uploadFile!(data.file);
                })

                initialState.socket!.on("delete-file", (data) => {
                    deleteFileByID!(data.id)
                })
        
            })
        }
        
    }, [pin, initialState.socket])

    

    
    return (
        <SocketContext.Provider value={initialState}>
            {children}
        </SocketContext.Provider>)
}