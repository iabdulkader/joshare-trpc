import Files from "../../components/Files/Files";
import PinHolder from "../../components/PinHolder/PinHolder";

export default function Pin(){
    return(
        <div className="flex flex-col lg:flex-row mt-16">
            <div className="w-full max-w-[450px] h-full mx-auto my-3 lg:mt-6 lg:mb-20">
                <PinHolder />
                <Files />
            </div>
        </div>
    )
}