import { FileType } from './../../types/index';
import pLimit from "p-limit";
import { upload } from "./uploadFile";

let promises: any = [];
const limit = pLimit(3);

export const handleFiles = async (files: any, uploadFile: (file: FileType) => void) => {

    for(let file of files){
        
        promises.push(limit(() => upload(file, uploadFile)));
      }
      
      await Promise.all(promises);

}