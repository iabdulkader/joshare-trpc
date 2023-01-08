import { AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { FileType } from '../../types';
import { downloadFile } from '../../utlis/download';
import { trpc } from '../../utlis/trpc/trpc';
import { useContext } from 'react';
import { FilesContext } from '../../context/filesContext/filesContext';

export default function File({ file }: { file: FileType}){
    const iconStyles = (defaultStyles as any)[file.ext || "docx"] || {};
    const { deleteFileByID } = useContext(FilesContext);

    const { mutate, isLoading } = trpc.files.deleteFile.useMutation({
      onSuccess: (data) => {
        if(data.id){
          deleteFileByID!(data.id)
        }
      }
    })

    const deleteFile = () => {
      mutate({ 
        id: file.id, 
        url: file.url 
      })
    }


    return(
        <div className="mb-2 w-full flex justify-center">
            <div className="w-full bg-secondaryBg-light dark:bg-secondaryBg-dark flex py-3 rounded-lg">

              <div className='ml-4 flex items-center h-[25px] w-[25px] my-auto'>
                <FileIcon extension={file.ext} {...iconStyles} key={file.id} />
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
                { isLoading ? (
                  <svg xmlSpace="preserve" width="14" height="14">
                    <path className="fill-slate-900 group-hover:fill-slate-50 dark:fill-slate-50 dark:group-hover:fill-slate-900" d="M0 0h2v8H0z">
                        <animateTransform attributeName="transform" attributeType="xml" begin="0" dur="0.6s" repeatCount="indefinite" type="translate" values="0 0; 0 15; 0 0"/>
                    </path>
                    <path className="fill-slate-900 group-hover:fill-slate-50 dark:fill-slate-50 dark:group-hover:fill-slate-900" d="M10 0h2v8h-2z">
                        <animateTransform attributeName="transform" attributeType="xml" begin="0.2s" dur="0.6s" repeatCount="indefinite" type="translate" values="0 0; 0 15; 0 0"/>
                    </path>
                    <path className="fill-slate-900 group-hover:fill-slate-50 dark:fill-slate-50 dark:group-hover:fill-slate-900" d="M20 0h2v8h-2z">
                        <animateTransform attributeName="transform" attributeType="xml" begin="0.4s" dur="0.6s" repeatCount="indefinite" type="translate" values="0 0; 0 15; 0 0"/>
                    </path>
                  </svg>
                ) :
                  <AiOutlineDelete className='cursor-pointer' onClick={deleteFile} />               
                }
                <AiOutlineDownload className='cursor-pointer' onClick={() => downloadFile(file.id, file.name)} />
              </div>
            </div>
        </div>
    )
}