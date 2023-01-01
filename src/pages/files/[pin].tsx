import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Files from "../../components/Files/Files";
import PinHolder from "../../components/PinHolder/PinHolder";
import { UserContext } from "../../context/userContext/userContext";

export default function Pin(){
    const router = useRouter();
    const { updatePin } = useContext(UserContext);
    const { pin } = router.query;

    useEffect(() => {
        console.log(isNaN(parseFloat(pin as string)))
        if(pin && (pin?.length < 8 || pin.length > 8 || isNaN(pin as any))){
            router.push("/");
        }
        if (pin && updatePin) {
            updatePin(pin as string);
        };
    }, [pin])
    
    

    
    

    return(
        <div className="flex flex-col lg:flex-row mt-16">
            <div className="w-full max-w-[450px] h-full mx-auto my-3 lg:mt-6 lg:mb-20">
                <PinHolder />
                <Files />
            </div>
        </div>
    )
}