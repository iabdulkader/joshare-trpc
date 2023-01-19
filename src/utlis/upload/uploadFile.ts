import axios from 'axios';
import cookie from 'js-cookie';
import { FileType } from '../../types';


export const upload = async (file: FileType, socket: any, pin: string) => {
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('fileId', file.id);


    axios.request({
        method: "post", 
        url: `${process.env.NEXT_PUBLIC_FILES_SERVER}/api/upload`, 
        data: formData, 
        headers: {
            "x-authorization": `Bearer ${cookie.get('token')}`,
        },
        onUploadProgress: (p) => {
            socket.current.on("connect", () => {

                socket.current.emit('upload-progress', {
                    pin,
                    id: file.id,
                    file: {
                        id: file.id,
                        progress: Math.round((p.loaded / p.total!) * 100),
                        name: file.name,
                        ext: file.ext,
                        size: file.size,
                    }
                })
            })

          }
    }).then (data => {
        socket.current.emit('upload-complete', {
            pin,
            file: data?.data?.data as FileType,
        })
    })
   
};