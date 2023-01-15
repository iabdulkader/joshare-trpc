import { Socket } from "socket.io-client";

export enum Path {
    home = "/",
    terms = "/terms",
    support = "/support",
    about = "/about",
    guide = "/guide"
}

export interface User {
    pin: string,
    expire: Date,
    emailRemaining?: number,
    timeExtRemaining?: number,
    files?: FileType[],
    rawStateUpdate?: ({ field, payload }: { field: UserKeys, payload: UserValues }) => void,
}

export type UserKeys = keyof User;
export type UserValues = User[UserKeys];

export interface FileType {
    id: string;
    name: string;
    ext: string;
    size: string;
    url?: string;
    progress?: number;
    file?: any;
}

export type Action =
    | {
          type: ActionType.RAW_UPDATE_STATE;
          field: UserKeys;
          payload: UserValues;
      }

export enum ActionType {
    UPDATE_PIN = "UPDATE_PIN",
    UPDATE_EXPIRE = "UPDATE_EXPIRE",
    UPDATE_EMAIL_REMAINING = "UPDATE_EMAIL_REMAINING",
    RAW_UPDATE_STATE = "RAW_UPDATE_STATE",
}

export interface emailService {
    from?: string;
    to: string;
    pin: string;
    expire: Date;
}

export interface FilesType {
    [key: string]: FileType;
}

export interface FilesContextType {
    files: FilesType | null;
    pendingFiles: FilesType;
    uploadFiles?: (files: FileType[] | null) => void;
    uploadFile?: (file: FileType) => void;
    deleteFileByID?: (id: string) => void;
    addFilesToPending?: (files: FilesType) => void;
    updateProgress?: (file: FileType, id: string) => void;
    removeFilesFromPending?: (id: string) => void;
}

export enum FilesActionType {
    UPLOAD_FILES = "UPLOAD_FILES",
    UPLOAD_FILE = "UPLOAD_FILE",
    DELETE_FILE = "DELETE_FILE",
    UPDATE_PROGRESS = "UPDATE_PROGRESS",
    ADD_FILES_TO_PENDING = "ADD_FILES_TO_PENDING",
    REMOVE_FILES_FROM_PENDING = "REMOVE_FILES_FROM_PENDING",
}

export type FilesAction =
    | {
          type: FilesActionType.UPLOAD_FILES;
          payload: FileType[] | null;
      }
    | {
          type: FilesActionType.UPLOAD_FILE;
          payload: FileType;
    }
    | {
          type: FilesActionType.DELETE_FILE;
          payload: string;
    }
    | {
          type: FilesActionType.UPDATE_PROGRESS;
          payload: FileType;
          id: string;
    }
    | {
          type: FilesActionType.ADD_FILES_TO_PENDING;
          payload: FilesType;
    }
    | {
          type: FilesActionType.REMOVE_FILES_FROM_PENDING;
          payload: string;
    }
    

