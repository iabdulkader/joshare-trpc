import { FilesAction, FilesActionType, FilesContextType } from "../../types";

export function FilesReducer(state: FilesContextType, action: FilesAction): FilesContextType {
  switch (action.type) {
    case FilesActionType.UPLOAD_FILES:
      return {
        ...state,
        files: action.payload,
        currentPin: action.pin,
      };

    case FilesActionType.UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files!, action.payload],
      };

    case FilesActionType.DELETE_FILE:
      return {
        ...state,
        files: state.files!.filter((file) => file.id !== action.payload),
      };

    default:
      return state;
  }
}