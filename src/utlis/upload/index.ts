import axios from 'axios';
import cookie from 'js-cookie';
import { nanoid } from 'nanoid';

export const upload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileId', nanoid(5));

    axios.request({
        method: "post", 
        url: "http://localhost:5000/upload", 
        data: formData, 
        headers: {
            "x-authorization": `Bearer ${cookie.get('token')}`,
        },
        onUploadProgress: (p) => {
          console.log("progress", p.loaded / p.total!); 
        }
    }).then (data => {
        console.log(data.data);
    })
   
};