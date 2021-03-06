// lib
import { Dispatch } from "redux";
import axios from "axios";
// src
import * as ActionTypes from "../action-types/index";
import { ApplicationState } from "../application-state";

const apiUrl = "http://localhost:5000/api";
export type UpdateGreetingAction = {
  type: ActionTypes.UPDATE_GREETING;
  greeting: string;
};

export type UpdateLocalStorage = {
  type: ActionTypes.UPDATE_LOCAL_STORAGE;
  user: { username: string; avatar: string; token: string };
};
export type UpdateIsAuthenticatedAction = {
  type: ActionTypes.UPDATE_IS_AUTHENTICATED;
  isAuthenticated: boolean;
};
export type UpdateGistsAction = {
  type: ActionTypes.UPDATE_GISTS;
  gists: [];
};

export type DeleteGistAction = {
  type: ActionTypes.DELETE_GIST;
  id: string;
};
export type DeleteFileAction = {
  type: ActionTypes.DELETE_FILE;
  fileName: string;
};
export type GetFilesAction = {
  type: ActionTypes.GET_FILES;
  selectedGist: ApplicationState["selectedGist"];
};

export type CreateGistAction = {
  type: ActionTypes.CREATE_GIST;
  name: string;
};

export type IncrementAction = {
  type: ActionTypes.INCREMENT;
};
export type UpdateIsLoadingAction = {
  type: ActionTypes.UPDATE_IS_LOADING;
  isLoading: boolean;
};

export type updateGreeting = typeof updateGreeting;

export type updateIsLoading = typeof updateIsLoading;
export type increment = typeof increment;
export type updateLocalStorage = typeof updateLocalStorage;
export type updateGists = typeof updateGists;
export type deleteGist = typeof deleteGist;
export type createGist = typeof createGist;

export function updateGreeting(name: string) {
  return (dispatch: Dispatch, getState: any) => {};
}

export function updateLocalStorage(code: string) {
  return (dispatch: Dispatch, getState: any) => {
    fetch("http://localhost:9999/authenticate/" + code)
      .then(function(data) {
        return data.json();
      })
      .then(function(res) {
        const { token } = res;
        const options = {
          token
        };
        axios
          .post(`${apiUrl}/getuser`, options)
          .then(function(response) {
            const { username, avatar_url } = response.data;
            // update local storage
            var gitHubUser = {
              token,
              username,
              avatar_url,
              isAuthenticated: true
            };
            localStorage.setItem("gitHubUser", JSON.stringify(gitHubUser));
            // update is Authenticated in store
            dispatch({
              type: ActionTypes.UPDATE_IS_AUTHENTICATED,
              isAuthenticated: true
            });
            // update is loading to false
            console.log(
              "user is authenticated: set is loading to false in localstorage"
            );
            dispatch({
              type: ActionTypes.UPDATE_IS_LOADING,
              isLoading: false
            });
          })
          .catch(function(error) {
            console.log("Error while getting user profile", error);
          });
      })
      .catch(function(err) {
        console.log("Error while getting access token. ", err);
      });
  };
}

export function increment(): IncrementAction {
  return {
    type: ActionTypes.INCREMENT
  };
}
export function updateIsLoading(isLoading: boolean) {
  return (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: ActionTypes.UPDATE_IS_LOADING,
      isLoading
    });
  };
}

export function updateGists() {
  // get taken and username from localstorage
  const localStorageItem = localStorage.getItem("gitHubUser") || "";
  const gitHubUser = JSON.parse(localStorageItem);

  return (dispatch: Dispatch, getState: any) => {
    // post to api to get all gists of a user
    const { token = "", username = "" } = gitHubUser;
    const options = {
      token,
      username
    };
    axios
      .post(`${apiUrl}/gists`, options)
      .then(function(response) {
        dispatch({
          type: ActionTypes.UPDATE_GISTS,
          gists: response.data
        });
      })
      .catch(function(error) {
        console.log("Error while getting gists", error);
      });
  };
}

export function deleteGist(id: string) {
  const localStorageItem = localStorage.getItem("gitHubUser") || "";
  const gitHubUser = JSON.parse(localStorageItem);

  return (dispatch: Dispatch, getState: any) => {
    const { token } = gitHubUser;
    const options = {
      token,
      id
    };
    dispatch({
      type: ActionTypes.UPDATE_IS_LOADING,
      isLoading: true
    });
    axios
      .post(`${apiUrl}/deleteGist`, options)
      .then(function(response) {
        const id = response.data;
        dispatch({
          type: ActionTypes.DELETE_GIST,
          id
        });
        dispatch({
          type: ActionTypes.UPDATE_IS_LOADING,
          isLoading: false
        });
      })
      .catch(function(error) {
        console.log("Error while getting gist", error);
      });
  };
}

export function deleteFile(id: string, fileName: string) {
  return (dispatch: Dispatch, getState: any) => {
    console.log("dis delete");
    const { token } = getState();
    const options = {
      token,
      id,
      fileName
    };
    axios
      .post(`${apiUrl}/deleteFile`, options)
      .then(function(response) {
        console.log("dis delete response", response.data);
        const id = response.data;
        dispatch({
          type: ActionTypes.DELETE_FILE,
          id: id
        });
      })
      .catch(function(error) {
        console.log("Error while getting gist", error);
      });
  };
}

export function createGist(name: string) {
  return (dispatch: Dispatch, getState: any) => {
    const { token } = getState();
    const options = {
      token: token,
      name: name
    };
    axios
      .post(`${apiUrl}/createGist`, options)
      .then(function(response) {
        const name = response.data;
        dispatch({
          type: ActionTypes.DELETE_GIST,
          name: name
        });
      })
      .catch(function(error) {
        console.log("Error while creating gist", error);
      });
  };
}

export function getFiles(id: string) {
  return (dispatch: Dispatch, getState: any) => {
    console.log("get files action dispatched");
    const { token } = getState();
    const options = {
      token: token,
      id: id
    };
    axios
      .post(`${apiUrl}/files`, options)
      .then(function(response) {
        const selectedGist = response.data;
        dispatch({
          type: ActionTypes.GET_FILES,
          selectedGist: selectedGist
        });
      })
      .catch(function(error) {
        console.log("Error while getting gist", error);
      });
  };
}
