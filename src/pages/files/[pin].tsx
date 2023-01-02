import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Files from "../../components/Files/Files";
import MetaHead from "../../components/Head/Head";
import PinHolder from "../../components/PinHolder/PinHolder";
import { UserContext } from "../../context/userContext/userContext";
import { trpc } from "../../utlis/trpc/trpc";

export default function Pin(){
    const router = useRouter();
    const { updatePin, updateExpire } = useContext(UserContext);
    const { pin } = router.query;

    const { mutate} = trpc.user.getUser.useMutation({
        onSuccess: (data) => {
            if(data?.user){
                if(updateExpire){
                    updateExpire(new Date(data?.user?.expire))
                }
            }
        },
        onError: (error) => {
            router.push("/");
        }
    })

    if(pin && (pin?.length < 8 || pin.length > 8 || isNaN(pin as any))){
        router.push("/");
    }
    
    
    
    useEffect(() => {
        if (pin && updatePin) {
            updatePin(pin as string);
            mutate({ pin: pin as string })
        };
    }, [pin])
    
    
    return(
        <>
            <MetaHead title="Files | JoShare" />
            <div className="flex flex-col lg:flex-row mt-16">
                <div className="w-full max-w-[450px] h-full mx-auto my-3 lg:mt-6 lg:mb-20">
                    <PinHolder />
                    <Files />
                </div>
            </div>
        </>
    )
}