import { useRef } from "react";
import FileIcon from "../Icons/FileIcon"
import ProgressBar from "../ProgessBar/ProgressBar"

export default function UploadBox(){
    const fileRef = useRef<HTMLInputElement>(null);
    const dragRef = useRef<HTMLDivElement >(null);

    const triggerFile = () => {
        if(fileRef.current){
            fileRef.current.click()
        }
      }

    const dragOver = (e: any) => {
        e.preventDefault();
        if (dragRef.current) {        
            dragRef.current.classList.add("drag");
        }
      }
    
      const dragEnter = (e: any) => {
          e.preventDefault();
          if (dragRef.current) {        
              dragRef.current.classList.add("drag");
          }
      }
      
      const dragLeave = (e: any) => {
          e.preventDefault();
          
          if (dragRef.current) {        
            dragRef.current.classList.remove("drag");
          }
      }
      
      const fileDrop = (e: any) => {
          e.preventDefault();
          if (dragRef.current) {        
            dragRef.current.classList.remove("drag");
          }
      }

    return(
        <div className="w-full px-4 top-[70vh] mb-24 lg:mb-8">
           <div className="w-full p-4 flex justify-between items-center bg-secondaryBg-light dark:bg-secondaryBg-dark  rounded-lg">
                <div 
                    className="w-full h-full border border-dashed border-[#4fa94d] rounded-lg group"
                    ref={dragRef}
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                >
                    <div className="w-full flex justify-center pt-8">
                        <FileIcon className="group-[.drag]:rotate-12 group-[.drag]:scale-90 group-[.drag]:translate-x-5" />
                        <FileIcon className="group-[.drag]:-rotate-12 group-[.drag]:scale-90 group-[.drag]:-translate-x-5" />
                        <FileIcon className="group-[.drag]:-translate-y-1.5" />
                    </div>

                    <div className="flex flex-col items-center w-full mt-24 mb-4">
                    <input 
                        className="hidden"
                        ref={fileRef} 
                        type="file" 
                        multiple
                    />
                        <p className="text-sm">Drag & Drop Your Files Or <span className="text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer" onClick={triggerFile}>Browse</span></p>
                        <p className="text-[10px] font-light text-slate-600 dark:text-slate-300">Max file size 30MB.</p>
                    </div>
                </div>
           </div>

           <div className="lg:h-[calc(100vh-30rem)] lg:overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-900 scrollbar-track-transparent scrollbar-thumb-rounded-lg scrollbar-thin
            ">
              <ProgressBar />
              <ProgressBar />

                <div className="group">
                    <div className="hidden group-[.is-published]:block">
                        Published
                    </div>
                </div>
           </div>
        </div>
    )
}