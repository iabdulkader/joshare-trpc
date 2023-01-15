import { useContext } from "react";
import { FilesContext } from "../../context/filesContext/filesContext";
import ProgressBar from "./ProgressBar";

export default function ProgressBars() {
    const { pendingFiles } = useContext(FilesContext);

    return (
        <div className="w-full lg:h-[calc(100vh-30rem)] lg:overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-900 scrollbar-track-transparent scrollbar-thumb-rounded-lg scrollbar-thin px-4 mb-24 lg:mb-4">
            {pendingFiles && Object.keys(pendingFiles).map((key) => (
                <ProgressBar key={key} file={pendingFiles[key]} />
            ))}

        </div>
    );
}