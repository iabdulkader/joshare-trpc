import axios from 'axios';
import cookie from 'js-cookie';
import { nanoid } from 'nanoid';
import { FileType } from '../../types';


export const upload = async (file: File, uploadFile: (file: FileType) => void) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileId', nanoid(5));

    axios.request({
        method: "post", 
        url: `${process.env.NEXT_PUBLIC_FILES_SERVER}/api/upload`, 
        data: formData, 
        headers: {
            "x-authorization": `Bearer ${cookie.get('token')}`,
        },
        onUploadProgress: (p) => {
          console.log("progress", p.loaded / p.total!); 
        }
    }).then (data => {
        uploadFile!(data.data.data)
    })
   
};