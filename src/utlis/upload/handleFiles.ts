import pLimit from "p-limit";
import { upload } from "./";

let promises: any = [];
const limit = pLimit(3);

export const handleFiles = async (files: any) => {

    for(let file of files){
        
        promises.push(limit(() => upload(file)));
      }
      
      await Promise.all(promises);

}