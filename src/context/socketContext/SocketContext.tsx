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
    const { uploadFiles, uploadFile, updateProgress } = useContext(FilesContext);

    // console.log(pin);


    useEffect(() => {
        
        if(pin){
            initialState.socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, { path: "/socket" });
            initialState.socket.emit("join", { pin });

            initialState.socket.on("connect", () => {

                // console.log("Connected");
            initialState.socket!.on("upload-progress", (data) => {
                console.log(data);
                updateProgress!(data.file, data.id);

            })

            initialState.socket!.on("upload-complete", (data) => {
                console.log(data);
                uploadFile!(data.file);
            })


        
        })
        }
        
    }, [pin, initialState.socket])

    

    
    return (
        <SocketContext.Provider value={initialState}>
            {children}
        </SocketContext.Provider>)
}