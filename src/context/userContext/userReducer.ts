import { Draft } from "immer";
import { Action, ActionType, User } from "../../types";

export default function UserReducer(draft: User, action: Action): void {
  switch (action.type) {
    case ActionType.RAW_UPDATE_STATE:
      updateData(action.payload, draft, action.field);

    default:
      break;
  }
}

function updateData<
  OBJ extends User,
  KEY extends keyof OBJ,
  VAL extends OBJ[KEY]
>(value: VAL, obj: OBJ, prop: KEY) {
  obj[prop] = value;
}
