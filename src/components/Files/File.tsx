import { AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { FileType } from '../../types';
import { trpc } from '../../utlis/trpc/trpc';
import { useState } from 'react';
import { useFilesContext } from '../../context/filesContext/filesContext';
import ButtonWithIcon from '../Button/ButtonWithIcon';
import Link from 'next/link';
import { useUserContext } from '../../context/userContext/userContext';
import { useSocketContext } from '../../context/socketContext/SocketContext';

export default function File({ file, auth = true }: { file: FileType, auth?: boolean}){
    const iconStyles = (defaultStyles as any)[file.ext || "docx"] || {};
    const { deleteFileByID } = useFilesContext();
    const { pin } = useUserContext();
    const { socket } = useSocketContext();

    const [isDeleting, setIsDeleting] = useState(false);
    

    const { mutate, isLoading } = trpc.files.deleteFile.useMutation({
      onSuccess: (data) => {
        if(data.id){
          setIsDeleting(true)
          setTimeout(() => {
            deleteFileByID!(data.id)
          }, 300)
          socket!.emit("delete-file", { id: data.id, pin: pin! })
        }
      }
    })

    const deleteFile = () => {
      mutate({ 
        id: file.id, 
        url: file.url! 
      })

    }


    return(
        <div className={`file_animate mb-2 w-full flex justify-center transition-all duration-500 ${isDeleting ? 'file_deleting' : ''}`}>
            <div className={`w-full bg-secondaryBg-light dark:bg-secondaryBg-dark flex py-3 rounded-lg hover:bg-stone-300 hover:dark:bg-slate-700 duration-300 transition-all ${file.progress ? "file_uploading" : ""}`}>

              <div className='ml-4 flex items-center h-[20px] w-[24px] my-auto'>
                <FileIcon extension={file.ext} {...iconStyles} key={file.id} />
              </div>

              <div className='w-full flex-grow flex-col flex'>
                <input 
                  className="w-full bg-transparent ml-3 text-xs border-none outline-none pr-2" 
                  type="text" 
                  name="" 
                  value={file.name} 
                  readOnly 
                />

                <input 
                  className="bg-transparent w-full ml-3 text-[9px] border-none outline-none font-light text-slate-600 dark:text-slate-300" 
                  type="text" 
                  name="" 
                  value={file.size} 
                  readOnly />
              </div>

              <div className='ml-3 flex items-center gap-3 mr-4'>

                {
                  "progress" in file ? (
                    <p className='text-xs flex'>{file.progress} <span className='ml-1'>%</span></p>
                  ) : (
                  <>
                    { auth && (<ButtonWithIcon loading={isLoading}>
                                  <AiOutlineDelete className='cursor-pointer' onClick={deleteFile} />  
                              </ButtonWithIcon>)
                    }

                    <Link href={`${process.env.NEXT_PUBLIC_FILES_SERVER}/api/download/${file.id}?pin=${pin}`}>
                      <AiOutlineDownload 
                        className='cursor-pointer'
                      />
                    </Link>
                  </>
                  )
                    

                }

                
              </div>
            </div>
        </div>
    )
}