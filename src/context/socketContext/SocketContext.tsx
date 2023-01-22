import { createContext, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { FilesContext } from "../filesContext/filesContext";
import { UserContext } from "../userContext/userContext";

type SocketContext = {
    socket: Socket | null;
}

let socketState: SocketContext = {
    socket: null,
}

export const SocketContext = createContext(socketState);

export default function SocketContextProvider({ children }: { children: React.ReactNode }) {

    const { pin } = useContext(UserContext);
    const { uploadFile, updateProgress, deleteFileByID } = useContext(FilesContext);


    useEffect(() => {
        
        if(pin){
            socketState.socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, { path: "/socket", transports : ['websocket'] });
            socketState.socket.emit("join", { pin });

            socketState.socket.on("connect", () => {

                socketState.socket!.on("upload-progress", (data) => {
                    updateProgress!(data.file, data.id);

                })

                socketState.socket!.on("upload-complete", (data) => {
                    uploadFile!(data.file);
                })

                socketState.socket!.on("delete-file", (data) => {
                    deleteFileByID!(data.id)
                })
        
            })

            return () => {
                socketState.socket!.disconnect();
            }
        }
        
    }, [pin, socketState.socket])

    

    
    return (
        <SocketContext.Provider value={socketState}>
            {children}
        </SocketContext.Provider>)
}