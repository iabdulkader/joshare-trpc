import { createContext, useContext } from "react";
import UserReducer from "./userReducer";
import { ActionType, User, UserKeys, UserValues } from "../../types";
import { useImmerReducer } from "use-immer";

const initialState: User = {
  pin: "",
  expire: new Date(0),
  emailRemaining: 2,
  timeExtRemaining: 2
}

export const UserContext = createContext(initialState);

export const useUserContext = () => {
  return useContext(UserContext);
}

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useImmerReducer(UserReducer, initialState);

    const rawStateUpdate = ({ payload, field }: { payload: UserValues, field: UserKeys}) => {
      dispatch({ type: ActionType.RAW_UPDATE_STATE, payload, field });
    }
  
  
    const value = {
      pin: state.pin,
      expire: state.expire,
      emailRemaining: state.emailRemaining,
      timeExtRemaining: state.timeExtRemaining,
      rawStateUpdate
    }
  
    return (
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>)
}