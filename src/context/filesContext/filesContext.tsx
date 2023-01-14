import { createContext } from "react";
import { FilesReducer } from "./filesReducer";
import { FileType, FilesActionType, FilesContextType } from "../../types";
import { useImmerReducer } from "use-immer";

const initialState: FilesContextType = {
    files: null,
};

export const FilesContext = createContext(initialState);

export default function FilesContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useImmerReducer(FilesReducer, initialState);

    const uploadFiles = (files: FileType[] | null) => {
        dispatch({
            type: FilesActionType.UPLOAD_FILES,
            payload: files,
        });
    };

    const uploadFile = (file: FileType) => {
        dispatch({
            type: FilesActionType.UPLOAD_FILE,
            payload: file,
        });
    };

    const deleteFileByID = (id: string) => {
        dispatch({
            type: FilesActionType.DELETE_FILE,
            payload: id,
        });
    };
  
    let value = {
        files: state.files,
        uploadFiles,
        uploadFile,
        deleteFileByID,
    };
    
    return (
      <FilesContext.Provider value={value}>
        {children}
      </FilesContext.Provider>)
}