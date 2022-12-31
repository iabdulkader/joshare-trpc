import { useContext, useEffect } from "react";
import Files from "../../components/Files/Files";
import PinHolder from "../../components/PinHolder/PinHolder";
import Ribbon from "../../components/Ribbon/Ribbon";
import UploadBox from "../../components/Upload/UploadBox";
import { UserContext } from "../../context/userContext/userContext";
import { getUser } from "../../utlis/token";


export default function MyFiles(){

    const { updatePin, updateExpire } = useContext(UserContext);

    useEffect(() => {
        let user = getUser();

        if(user !== null && user.pin && updatePin && updateExpire){
            updatePin(user.pin);
            updateExpire(user.expire);
        }
        
    }, [])
    
    return(
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
    )
}