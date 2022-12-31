import { Action, ActionType, User } from "../../types";

export default function UserReducer(state: User, action: Action): User {

    switch (action.type) {
        case ActionType.UPDATE_PIN:
            return {
                ...state,
                pin: action.payload
            };

        case ActionType.UPDATE_EXPIRE:
            return {
                ...state,
                expire: action.payload
            };

        default:
            return state; 

        }
}
