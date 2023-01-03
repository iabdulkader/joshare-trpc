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
    files?: File[],
    rawStateUpdate?: ({ field, payload }: { field: UserKeys, payload: UserValues }) => void,
}

export type UserValues = User[keyof User];
export type UserKeys = keyof User;


export interface File {
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

