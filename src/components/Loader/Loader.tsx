import { FallingLines } from "react-loader-spinner";

export default function Loader() {
    return (
       <div className="h-full w-full min-h-[calc(100vh-10rem)] my-auto flex justify-center items-center">
            <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            />
       </div>
    );
}