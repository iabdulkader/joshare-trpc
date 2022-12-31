import File from "./File";

export default function Files(){
    return(
        <div className="my-5 lg:h-[calc(100vh-17rem)] min-h-[200px] w-full flex flex-col px-4 lg:overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-900 scrollbar-track-transparent scrollbar-thumb-rounded-lg scrollbar-thin
        ">
              <File />
              <File />
        </div>
    )
}