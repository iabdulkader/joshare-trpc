import { createContext, useContext } from "react";
import { FilesReducer } from "./filesReducer";
import { FileType, FilesActionType, FilesContextType, FilesType } from "../../types";
import { useImmerReducer } from "use-immer";

const initialState: FilesContextType = {
    files: null,
};

export const FilesContext = createContext(initialState);

export const useFilesContext = () => {
    return useContext(FilesContext);
};

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

    const addFilesToPending = (files: FilesType) => {
        dispatch({
            type: FilesActionType.ADD_FILES_TO_PENDING,
            payload: files,
        });
    };

    const removeFilesFromPending = (id: string) => {
        dispatch({
            type: FilesActionType.REMOVE_FILES_FROM_PENDING,
            payload: id,
        });
    };
    
    const updateProgress = (file: FileType, id: string) => {
        dispatch({
            type: FilesActionType.UPDATE_PROGRESS,
            payload: file,
            id
        });
    };
  
    let value = {
        files: state.files,
        uploadFiles,
        uploadFile,
        deleteFileByID,
        addFilesToPending,
        updateProgress,
        removeFilesFromPending
    };
    
    return (
      <FilesContext.Provider value={value}>
        {children}
      </FilesContext.Provider>)
}