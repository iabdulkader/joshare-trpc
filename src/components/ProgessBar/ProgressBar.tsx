"use client"

import { FileIcon, defaultStyles } from "react-file-icon";

export default function ProgressBar() {
    let progress: number = 37 / 100;

    const progressStyle: { transform: string } = {
        transform: `scaleX(${progress})`
      }

    return (
       <div className="mt-2 w-full bg-secondaryBg-light dark:bg-secondaryBg-dark p-4 rounded-lg">
            <div className="border border-slate-400 dark:border-slate-500 rounded-lg h-14 relative overflow-hidden">

               <div 
                style={progressStyle} 
                className="w-full h-full bg-[#e0e2e7] dark:bg-[#303e61] rounded-lg origin-left scale-x-[0] transition-all duration-300 ease-in-out"
               >

               </div>

               <div className="absolute top-0 left-0 flex h-full w-full">
                 <div className="h-[18px] w-[18px] my-auto ml-3">
                    <FileIcon {...defaultStyles[ "docx"]}/>
                 </div>

                 <div className='ml-3 flex-col flex justify-center h-full w-full flex-grow-1'>
                    <input 
                    className="bg-transparent w-full text-sm border-none outline-none" 
                    type="text" 
                    name="" 
                    value={"file.jpg"} 
                    readOnly 
                    />

                    <input 
                    className="bg-transparent w-full text-[10px] border-none outline-none font-light text-slate-600 dark:text-slate-300" 
                    type="text" 
                    name="" 
                    value={"5.3MB"} 
                    readOnly />
                </div>

                <div className='flex items-center mr-3 w-12'>
                    <p className="text-xs ">{progress * 100} %</p>
                </div>

                <div 
                    style={progressStyle} 
                    className="absolute left-0 bottom-1.5 h-[2px] rounded-[1px] bg-[#03a9f4] w-[calc(100%-1.5rem)] scale-x-0 ml-3 origin-left transition-all duration-300 ease-in-out"
                >
                </div>

               </div>

            </div>
       </div>
      )
}