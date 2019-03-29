import * as Actions from "../action-creators/index";
import * as ActionTypes from "../action-types/index";
type Action =
  | Actions.UpdateGreetingAction
  | Actions.IncrementAction
  | Actions.UpdateLocalStorage
  | Actions.UpdateGistsAction
  | Actions.DeleteGistAction
  | Actions.CreateGistAction
  | Actions.GetFilesAction
  | Actions.DeleteFileAction
  | Actions.UpdateIsAuthenticatedAction
  | Actions.UpdateIsLoadingAction;
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
    case ActionTypes.UPDATE_IS_AUTHENTICATED:
      const { isAuthenticated } = action;
      return {
        ...state,
        isAuthenticated
      };

    case ActionTypes.UPDATE_IS_LOADING:
      const { isLoading } = action;
      console.log("return state: ", isLoading);
      return {
        ...state,
        isLoading
      };

    case ActionTypes.UPDATE_GISTS:
      return {
        ...state,
        gists: action.gists
      };
    case ActionTypes.UPDATE_LOCAL_STORAGE:
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
      console.log("updating gists..." + action.id);
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
      // update gists here, when returning
      return {
        ...state
      };
    case ActionTypes.GET_FILES:
      console.log("updating currently selected gist", action.selectedGist);
      const { selectedGist } = action;
      // const { gists } = state;
      return {
        ...state,
        selectedGist
      };
    case ActionTypes.DELETE_FILE:
      console.log("deleted file fist id", action.fileName);
      const { fileName } = action;
      // const { gists } = state;
      const { files = [] } = state.selectedGist;
      const filteredFiles = files.filter(f => f.name !== fileName);
      const { selectedGist: updatedGist } = state;
      updatedGist.files = filteredFiles;
      return {
        ...state,
        selectedGist: updatedGist
      };
    default:
      return state;
  }
};

export default updateState;
