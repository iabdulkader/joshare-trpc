import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import UploadFiles from "../../components/Button/UploadFiles";
import Files from "../../components/Files/Files";
import MetaHead from "../../components/Head/Head";
import PinHolder from "../../components/PinHolder/PinHolder";
import { FilesContext } from "../../context/filesContext/filesContext";
import { UserContext } from "../../context/userContext/userContext";
import { getUser } from "../../utlis/token/token";
import { trpc } from "../../utlis/trpc/trpc";

export default function Pin(){
    const router = useRouter();
    const { rawStateUpdate } = useContext(UserContext);
    const { uploadFiles } = useContext(FilesContext);

    const { pin } = router.query;
    const user = getUser();

    const { mutate} = trpc.user.getUser.useMutation({
        onSuccess: (data) => {
            if(data?.user){
                rawStateUpdate!({ payload: new Date(data?.user?.expire), field: "expire" })
                uploadFiles!(data?.user?.files!)
            }
        },
        onError: (error) => {
            router.push("/");
        }
    })

    
    if(pin && user && user?.pin === pin){
            router.push("/myfiles");
        }
    
    if(pin && (pin?.length < 8 || pin.length > 8 || isNaN(pin as any))){
        router.push("/");
    }

    useEffect(() => {}, [pin])
    
    
    useEffect(() => { 
        if (pin) {
            rawStateUpdate!({ payload: pin as string, field: "pin" });
            mutate({ pin: pin as string })
        };

        return () => uploadFiles!(null);
    }, [pin])
    
    
    return(
        <>
            <MetaHead title="Files | JoShare" />
            <div className="flex flex-col lg:flex-row mt-16">
                <div className="w-full max-w-[450px] h-full mx-auto my-3 mb-20 lg:mt-6">
                    <PinHolder />
                    <Files auth={false} />
                </div>
            </div>
        </>
    )
}