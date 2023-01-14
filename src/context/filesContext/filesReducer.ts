import { FilesAction, FilesActionType, FilesContextType } from "../../types";

export function FilesReducer(draft: FilesContextType, action: FilesAction): void {
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

    default:
      break;
  }
}