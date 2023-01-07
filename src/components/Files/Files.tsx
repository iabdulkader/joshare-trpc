import { useContext } from "react";
import { FallingLines } from "react-loader-spinner";
import { FilesContext } from "../../context/filesContext/filesContext";
import File from "./File";

export default function Files(){
    const { files } = useContext(FilesContext);
    return(
        <div className="my-5 lg:h-[calc(100vh-17rem)] min-h-[200px] w-full flex flex-col px-4 lg:overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-900 scrollbar-track-transparent scrollbar-thumb-rounded-lg scrollbar-thin
        ">
              { !files && 
                ( <div className="h-full w-full my-auto flex justify-center items-center">
                        <FallingLines
                            color="#4fa94d"
                            width="100"
                            visible={true}
                        />
                    </div>
                )
              }

              {files && files.map((file, index) => (
                  <File key={file.id} file={file} />
                ))}
        </div>
    )
}