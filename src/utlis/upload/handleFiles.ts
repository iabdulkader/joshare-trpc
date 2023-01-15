import pLimit from "p-limit";
import { FileType } from './../../types/index';
import { upload } from "./uploadFile";

let promises: any = [];
const limit = pLimit(3);

export const handleFiles = async (files: FileType[], socket: any, pin: string) => {

    for(let key in files){
        
        promises.push(limit(() => upload(files[key], socket, pin)));
      }
      
      await Promise.all(promises);
}