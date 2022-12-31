import { AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';
import { FileIcon, defaultStyles  } from 'react-file-icon';

export default function File(){
    return(
        <div className="mb-2 w-full flex justify-center">
            <div className="w-full bg-secondaryBg-light dark:bg-secondaryBg-dark flex py-3 rounded-lg">

              <div className='ml-4 flex items-center h-[28px] w-[25px] my-auto'>
                <FileIcon {...defaultStyles[ "docx"]}/>
              </div>

              <div className='flex-grow flex-col flex'>
                <input 
                  className="bg-transparent w-full ml-3 text-sm border-none outline-none" 
                  type="text" 
                  name="" 
                  value={"file.jpg"} 
                  readOnly 
                />

                <input 
                  className="bg-transparent w-full ml-3 text-[10px] border-none outline-none font-light text-slate-600 dark:text-slate-300" 
                  type="text" 
                  name="" 
                  value={"5.3MB"} 
                  readOnly />
              </div>

              <div className='flex items-center gap-3 mr-4'>
                <AiOutlineDelete />
                <AiOutlineDownload />
              </div>
            </div>
        </div>
    )
}