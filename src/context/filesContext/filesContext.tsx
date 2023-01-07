import { createContext, useReducer } from "react";
import { FilesReducer } from "./filesReducer";
import { ActionType, FileType, FilesActionType, FilesContextType, UserKeys, UserValues } from "../../types";

const initialState: FilesContextType = {
    files: null,
};

export const FilesContext = createContext(initialState);

export default function FilesContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(FilesReducer, initialState);

    const uploadFiles = (files: FileType[]) => {
        dispatch({
            type: FilesActionType.UPLOAD_FILES,
            payload: files,
        });
    };
  
    let value = {
        files: state.files,
        uploadFiles,
    };
    
    return (
      <FilesContext.Provider value={value}>
        {children}
      </FilesContext.Provider>)
}