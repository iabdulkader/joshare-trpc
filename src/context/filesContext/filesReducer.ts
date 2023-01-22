import { FileType } from './../../types/index';
import { FilesAction, FilesActionType, FilesContextType } from "../../types";

export function FilesReducer(draft: FilesContextType, action: FilesAction) {

  switch (action.type) {
    case FilesActionType.UPLOAD_FILES:    
       if(action.payload){
          draft.files! = {
            ...draft.files,
            ...action.payload!.reduce((acc: any, file: FileType) => {
              acc[file.id] = file;
              return acc;
            }
            , {})
          }
          
          break;
      } else {
        draft.files = action.payload;
      }
       break;

    case FilesActionType.UPLOAD_FILE:
      draft.files![action.payload.id] = action.payload;
      break;

    case FilesActionType.DELETE_FILE:
      delete draft.files![action.payload];
      break;

    case FilesActionType.ADD_FILES_TO_PENDING:
      draft.files! = {
        ...draft.files,
        ...action.payload,
      }
      break;

    case FilesActionType.UPDATE_PROGRESS:
      if(draft.files![action.id]){
        draft.files![action.id]!.progress = action.payload!.progress;
      } else {
        draft.files![action.id] = action.payload
      }
      break;

    case FilesActionType.REMOVE_FILES_FROM_PENDING:
      if(draft.files![action.payload]){
        delete draft.files![action.payload].progress;
      }
      break;

    default:
      break;
  }
}