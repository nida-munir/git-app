import {
  IncrementAction,
  UpdateGreetingAction
} from "../action-creators/index";
import * as ActionTypes from "../action-types/index";
type Action = UpdateGreetingAction | IncrementAction;
import { ApplicationState, defaultState } from "../application-state";

const updateState = (
  state: ApplicationState = defaultState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_GREETING:
      return {
        greeting: action.greeting,
        count: state.count
      };
    case ActionTypes.INCREMENT:
      return {
        greeting: state.greeting,
        count: state.count + 1
      };
    default:
      return state;
  }
};

export default updateState;
