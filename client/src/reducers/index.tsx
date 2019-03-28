import {
  IncrementAction,
  UpdateGreetingAction,
  UpdateUserAction,
  UpdateGistsAction
} from "../action-creators/index";
import * as ActionTypes from "../action-types/index";
type Action =
  | UpdateGreetingAction
  | IncrementAction
  | UpdateUserAction
  | UpdateGistsAction;
import { ApplicationState, defaultState } from "../application-state";

const updateState = (
  state: ApplicationState = defaultState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_GREETING:
      console.log("updating greeting ");

      return {
        ...state
      };

    case ActionTypes.UPDATE_GISTS:
      console.log("updating gists, ", action);
      return {
        ...state
        // notes: action.notes
      };
    case ActionTypes.UPDATE_USER:
      console.log("updating user, " + action.user);
      const { username, avatar, token } = action.user;
      return {
        ...state,
        username,
        avatar,
        token,
        isAuthenticated: true
      };
    default:
      return state;
  }
};

export default updateState;
