// lib
import { Dispatch } from "redux";
import axios from "axios";
// src
import * as ActionTypes from "../action-types/index";

const apiUrl = "http://localhost:5000/api";
export type UpdateGreetingAction = {
  type: ActionTypes.UPDATE_GREETING;
  greeting: string;
};

export type UpdateUserAction = {
  type: ActionTypes.UPDATE_USER;
  user: { username: string; avatar: string; token: string };
};
export type UpdateGistsAction = {
  type: ActionTypes.UPDATE_GISTS;
  gists: [];
};

export type DeleteGistAction = {
  type: ActionTypes.DELETE_GIST;
  id: string;
};

export type CreateGistAction = {
  type: ActionTypes.CREATE_GIST;
  name: string;
};

export type IncrementAction = {
  type: ActionTypes.INCREMENT;
};

export type updateGreeting = typeof updateGreeting;
export type increment = typeof increment;
export type updateUser = typeof updateUser;
export type updateGists = typeof updateGists;
export type deleteGist = typeof deleteGist;
export type createGist = typeof createGist;

export function updateGreeting(name: string) {
  return (dispatch: Dispatch, getState: any) => {
    const gist = {
      name: name
    };
    axios
      .post("http://localhost:3000/addGist", gist)
      .then(function(response) {
        console.log("response", response);
        dispatch({
          type: ActionTypes.UPDATE_GREETING,
          greeting: name
        });
      })
      .catch(function(error) {
        console.log("Error while creating gist", error);
      });
  };
}

export function updateUser(token: string) {
  return (dispatch: Dispatch, getState: any) => {
    // add a new gist
    const options = {
      token: token
    };
    axios
      .post(`${apiUrl}/getuser`, options)
      .then(function(response) {
        const { username, avatar } = response.data;
        var user = {
          username,
          avatar,
          token
        };
        dispatch({
          type: ActionTypes.UPDATE_USER,
          user: user
        });
      })
      .catch(function(error) {
        console.log("Error while getting user profile", error);
      });
  };
}

export function increment(): IncrementAction {
  return {
    type: ActionTypes.INCREMENT
  };
}

export function updateGists() {
  return (dispatch: Dispatch, getState: any) => {
    const { token, username } = getState();
    const options = {
      token: token,
      name: username
    };
    axios
      .post(`${apiUrl}/getAllGists`, options)
      .then(function(response) {
        dispatch({
          type: ActionTypes.UPDATE_GISTS,
          gists: response.data
        });
      })
      .catch(function(error) {
        console.log("Error while getting gist", error);
      });
  };
}

export function deleteGist(id: string) {
  return (dispatch: Dispatch, getState: any) => {
    const { token } = getState();
    const options = {
      token: token,
      id: id
    };
    axios
      .post(`${apiUrl}/deleteGist`, options)
      .then(function(response) {
        const id = response.data;
        dispatch({
          type: ActionTypes.DELETE_GIST,
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
