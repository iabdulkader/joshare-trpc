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
    const { rawStateUpdate } = useContext(UserContext);
    const { mutate } = trpc.user.getUser.useMutation({
        onSuccess: (data) => {
            rawStateUpdate!({ payload: data?.user?.emailRemaining!, field: "emailRemaining" })
            rawStateUpdate!({ payload: data?.user?.timeExtRemaining!, field: "timeExtRemaining" })
            rawStateUpdate!({ payload: new Date(data?.user?.expire!), field: "expire" })
        }
    });
    
    
    useEffect(() => {
        let user = getUser();
        if(user === null) {
            router.push("/");
        }

        if(user !== null && user.pin){
            rawStateUpdate!({ payload: user.pin, field: "pin" });
            rawStateUpdate!({ payload: user.expire, field: "expire" });
            mutate({ pin: user.pin });
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