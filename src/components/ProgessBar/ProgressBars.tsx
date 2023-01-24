import { useContext } from "react";
import { FilesContext } from "../../context/filesContext/filesContext";
import ProgressBar from "./ProgressBar";

export default function ProgressBars() {
    const { files } = useContext(FilesContext);

    return (
        <div className="w-full lg:h-[calc(100vh-30rem)] lg:overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-900 scrollbar-track-transparent scrollbar-thumb-rounded-lg scrollbar-thin mb-24 lg:mb-4 px-4">

            <div className="bg-secondaryBg-light dark:bg-secondaryBg-dark rounded-lg">

                {files && Object.keys(files).map((key) => {
                    if('progress' in files[key]){
                    return <ProgressBar key={key} file={files[key]} />
                    }
                })}

            </div>
            

        </div>
    );
}