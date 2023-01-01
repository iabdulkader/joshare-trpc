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
    updatePin?: (pin: string) => void,
    updateExpire?: (expire: Date) => void,
}


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

export enum ActionType {
    UPDATE_PIN = "UPDATE_PIN",
    UPDATE_EXPIRE = "UPDATE_EXPIRE",
}

