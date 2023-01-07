import { FilesAction, FilesActionType, FilesContextType } from "../../types";

export function FilesReducer(state: FilesContextType, action: FilesAction): FilesContextType {
  switch (action.type) {
    case FilesActionType.UPLOAD_FILES:
      return {
        ...state,
        files: action.payload,
      };

    default:
      return state;
  }
}