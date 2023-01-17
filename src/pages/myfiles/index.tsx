import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef } from "react";
import Files from "../../components/Files/Files";
import MetaHead from "../../components/Head/Head";
import PinHolder from "../../components/PinHolder/PinHolder";
import Ribbon from "../../components/Ribbon/Ribbon";
import UploadBox from "../../components/Upload/UploadBox";
import { FilesContext } from "../../context/filesContext/filesContext";
import { UserContext } from "../../context/userContext/userContext";
import { getUser, removeUser } from "../../utlis/token/token";
import { trpc } from "../../utlis/trpc/trpc";

import { io, Socket } from "socket.io-client";
import ProgressBars from "../../components/ProgessBar/ProgressBars";



export default function MyFiles(){
    trpc.home.isAlive.useQuery();

    const socketRef = useRef<Socket>();
    const router = useRouter();
    const { uploadFiles, uploadFile, updateProgress } = useContext(FilesContext);
    const { rawStateUpdate, pin } = useContext(UserContext);

    let user = useMemo(() => getUser(), []);

    const { mutate } = trpc.user.getUser.useMutation({
        onSuccess: (data) => {
            rawStateUpdate!({ payload: data?.user?.emailRemaining!, field: "emailRemaining" })
            rawStateUpdate!({ payload: data?.user?.timeExtRemaining!, field: "timeExtRemaining" })
            rawStateUpdate!({ payload: new Date(data?.user?.expire!), field: "expire" })
    

            uploadFiles!(data?.user?.files!);
        }, 
        onError: () => {
            removeUser();
            router.push("/");
        }
    });

    useEffect(() => {
        socketRef.current = io(`${process.env.NEXT_PUBLIC_WS_URL}`, { path: "/socket", transports: ["websocket"] });
        // socketRef.current = io('http://localhost:8000');

        socketRef.current.emit("join", { pin: user?.pin });

        socketRef.current.on("upload-progress", (data: any) => {
            updateProgress!(data.file, data.id)
        })

        socketRef.current.on("upload-complete", (data: any) => {
            uploadFile!(data.file)
        })
    }, [user])
    
    
    useEffect(() => {

        if(user === null) {
            router.push("/");
        }

        if(user !== null && user.pin){
            rawStateUpdate!({ payload: user.pin, field: "pin" });
            rawStateUpdate!({ payload: user.expire, field: "expire" });
            mutate({ pin: user.pin });
        }

        return () => uploadFiles!(null);
    }, [])
    
    return(
        <>
            <MetaHead title="My Files | JoShare" />
            
            <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-8 mt-16">
                <div className="w-full max-w-[450px] h-full my-3 mx-auto lg:mx-0 lg:mt-6 lg:mb-20">
                    <PinHolder />
                    <Files />
                </div>


                <div className="w-full max-w-[450px] h-full mx-auto lg:mx-0 lg:my-6 lg:mb-20">
                    <Ribbon />
                    <UploadBox socket={socketRef} />

                    <ProgressBars />
                    
                </div>

                
            </div>
        </>       
    )
}