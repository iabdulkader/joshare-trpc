import { createContext, useReducer } from "react";
import UserReducer from "./userReducer";
import { ActionType, User } from "../../types";

const initialState: User = {
  pin: "",
  expire: new Date(0),
  emailSent: 0,
  timeExtented: 0
}

export const UserContext = createContext(initialState);

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  

  const updatePin = (pin: string): void => {
    dispatch({ type: ActionType.UPDATE_PIN, payload: pin });
    }

  const updateExpire = (expire: Date): void => {
    dispatch({ type: ActionType.UPDATE_EXPIRE, payload: expire });
    }
  
  
  const value = {
    pin: state.pin,
    expire: state.expire,
    emailSent: state.emailSent,
    timeExtented: state.timeExtented,
    updatePin,
    updateExpire
  }
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>)
}