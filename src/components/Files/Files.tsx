import { useContext } from "react";
import { FallingLines } from "react-loader-spinner";
import { FilesContext } from "../../context/filesContext/filesContext";
import File from "./File";

export default function Files({ auth = true }: { auth?: boolean }){
    const { files } = useContext(FilesContext);

    console.log(files);
    
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
              {
                files && Object.keys(files).map((key) => {
                    if(auth){
                        if(!('progress' in files[key])){
                            return <File key={key} file={files[key]} />
                        }
                    } else {
                        return <File key={key} auth={auth} file={files[key]} />
                    }
                })
              }
                
        </div>
    )
}