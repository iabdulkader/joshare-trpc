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

export type UserValues = User[keyof User];
export type UserKeys = keyof User;


export interface FileType {
    id: string;
    name: string;
    ext: string;
    size: string;
    url: string;
}

export type Action =
    | {
          type: ActionType.UPDATE_PIN;
          payload: string;
      }
    | {
          type: ActionType.UPDATE_EXPIRE;
          payload: Date;
      }
    | {
          type: ActionType.UPDATE_EMAIL_REMAINING;
          payload: number;
      }
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


export interface FilesContextType {
    files: FileType[] | null;
    currentPin: string | null;
    uploadFiles?: (files: FileType[] | null, pin: string) => void;
    uploadFile?: (file: FileType) => void;
    deleteFileByID?: (id: string) => void;
}

export enum FilesActionType {
    UPLOAD_FILES = "UPLOAD_FILES",
    UPLOAD_FILE = "UPLOAD_FILE",
    DELETE_FILE = "DELETE_FILE",
}

export type FilesAction =
    | {
          type: FilesActionType.UPLOAD_FILES;
          payload: FileType[] | null;
          pin: string;
      }
    | {
          type: FilesActionType.UPLOAD_FILE;
          payload: FileType;
    }
    | {
          type: FilesActionType.DELETE_FILE;
          payload: string;
    }
    

