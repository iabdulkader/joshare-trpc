import { AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';
import { FileIcon, defaultStyles, DefaultExtensionType, FileIconProps  } from 'react-file-icon';
import { FileType } from '../../types';

export default function File({ file }: { file: FileType}){
  const iconStyles = (defaultStyles as any)[file.ext || "docx"] || {};


    return(
        <div className="mb-2 w-full flex justify-center">
            <div className="w-full bg-secondaryBg-light dark:bg-secondaryBg-dark flex py-3 rounded-lg">

              <div className='ml-4 flex items-center h-[25px] w-[25px] my-auto'>
                <FileIcon extension={file.ext} {...iconStyles} />
              </div>

              <div className='flex-grow flex-col flex'>
                <input 
                  className="bg-transparent ml-3 text-sm border-none outline-none" 
                  type="text" 
                  name="" 
                  value={file.name} 
                  readOnly 
                />

                <input 
                  className="bg-transparent w-full ml-3 text-[10px] border-none outline-none font-light text-slate-600 dark:text-slate-300" 
                  type="text" 
                  name="" 
                  value={file.size} 
                  readOnly />
              </div>

              <div className='ml-3 flex items-center gap-3 mr-4'>
                <AiOutlineDelete />
                <AiOutlineDownload />
              </div>
            </div>
        </div>
    )
}