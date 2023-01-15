import { FilesAction, FilesActionType, FilesContextType } from "../../types";

export function FilesReducer(draft: FilesContextType, action: FilesAction) {
  switch (action.type) {
    case FilesActionType.UPLOAD_FILES:
       draft.files = action.payload;
       break;

    case FilesActionType.UPLOAD_FILE:
      draft.files!.push(action.payload);
      break;

    case FilesActionType.DELETE_FILE:
      draft.files = draft.files!.filter((file) => file.id !== action.payload);
      break;

    case FilesActionType.UPDATE_PROGRESS:
      if(draft.pendingFiles![action.id]){
        draft.pendingFiles![action.id]!.progress = action.payload!.progress;
      } else {
        draft.pendingFiles! = {
          ...draft.pendingFiles,
          [action.id]: action.payload,
        }
      }

      break;

    case FilesActionType.ADD_FILES_TO_PENDING:
      draft.pendingFiles! = {
        ...draft.pendingFiles,
        ...action.payload,
      }
      break;

    case FilesActionType.REMOVE_FILES_FROM_PENDING:
      if(draft.pendingFiles![action.payload]){
        delete draft.pendingFiles![action.payload];
      }
      break;

    default:
      break;
  }
}