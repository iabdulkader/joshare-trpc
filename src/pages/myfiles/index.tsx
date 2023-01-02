import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Files from "../../components/Files/Files";
import MetaHead from "../../components/Head/Head";
import PinHolder from "../../components/PinHolder/PinHolder";
import Ribbon from "../../components/Ribbon/Ribbon";
import UploadBox from "../../components/Upload/UploadBox";
import { UserContext } from "../../context/userContext/userContext";
import { getUser } from "../../utlis/token/token";
import { trpc } from "../../utlis/trpc/trpc";


export default function MyFiles(){
    trpc.home.isAlive.useQuery();
    const router = useRouter();
    const { updatePin, updateExpire } = useContext(UserContext);
    let user = getUser();

    useEffect(() => {
        if(user === null) {
            router.push("/");
        }

        if(user !== null && user.pin && updatePin && updateExpire){
            updatePin(user.pin);
            updateExpire(user.expire);
        }
        
    }, [])
    
    return(
        <>
            <MetaHead title="My Files | JoShare" />
            
            <div className="flex flex-col lg:flex-row mt-16">
                <div className="w-full max-w-[450px] h-full mx-auto my-3 lg:mt-6 lg:mb-20">
                    <PinHolder />
                    <Files />
                </div>


                <div className="w-full max-w-[450px] h-full mx-auto lg:my-6 lg:mb-20">
                <Ribbon />
                <UploadBox />
                </div>
            </div>
        </>       
    )
}