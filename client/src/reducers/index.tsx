import {
  IncrementAction,
  UpdateGreetingAction,
  UpdateUserAction,
  UpdateGistsAction,
  DeleteGistAction,
  CreateGistAction
} from "../action-creators/index";
import * as ActionTypes from "../action-types/index";
type Action =
  | UpdateGreetingAction
  | IncrementAction
  | UpdateUserAction
  | UpdateGistsAction
  | DeleteGistAction
  | CreateGistAction;
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
        ...state,
        gists: action.gists
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
    case ActionTypes.DELETE_GIST:
      console.log("Deleting gist...case" + action.id);
      const { id } = action;
      const { gists } = state;
      return {
        ...state,
        gists: gists.filter(g => g.id !== id)
      };
    case ActionTypes.CREATE_GIST:
      console.log("updating state with new gist..., " + action.name);
      const { name } = action;
      // const { gists } = state;
      return {
        ...state
      };
    default:
      return state;
  }
};

export default updateState;
