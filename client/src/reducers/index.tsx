import {
  IncrementAction,
  UpdateGreetingAction,
  UpdateTokenAction,
  UpdateUserAction
} from "../action-creators/index";
import * as ActionTypes from "../action-types/index";
type Action =
  | UpdateGreetingAction
  | IncrementAction
  | UpdateTokenAction
  | UpdateUserAction;
import { ApplicationState, defaultState } from "../application-state";

const updateState = (
  state: ApplicationState = defaultState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_GREETING:
      return {
        ...state,
        greeting: action.greeting,
        count: state.count
      };
    case ActionTypes.INCREMENT:
      return {
        ...state,
        greeting: state.greeting,
        count: state.count + 1
      };
    case ActionTypes.UPDATE_TOKEN:
      console.log("updating token, " + action.token);

      return {
        ...state,
        token: action.token
      };
    case ActionTypes.UPDATE_USER:
      console.log("updating user, " + action.user);

      return {
        ...state,
        name: action.user.username,
        avatar: action.user.avatar
      };
    default:
      return state;
  }
};

export default updateState;
