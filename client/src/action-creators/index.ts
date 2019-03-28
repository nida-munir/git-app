import * as ActionTypes from "../action-types/index";
import { Dispatch } from "redux";
import axios from "axios";

export type UpdateGreetingAction = {
  type: ActionTypes.UPDATE_GREETING;
  greeting: string;
};

export type UpdateTokenAction = {
  type: ActionTypes.UPDATE_TOKEN;
  token: string;
};

export type UpdateUserAction = {
  type: ActionTypes.UPDATE_USER;
  user: { username: string; avatar: string };
};

export type IncrementAction = {
  type: ActionTypes.INCREMENT;
};

export type updateGreeting = typeof updateGreeting;
export type updateToken = typeof updateToken;
export type increment = typeof increment;
export type updateUser = typeof updateUser;

export function updateGreeting(name: string) {
  return (dispatch: Dispatch, getState: any) => {
    // add a new gist

    const gist = {
      name: name
    };
    axios
      .post("http://localhost:3000/addGist", gist)
      .then(function(response) {
        console.log("response", response);
      })
      .catch(function(error) {
        console.log("Error while creating gist", error);
      });
    dispatch({
      type: ActionTypes.UPDATE_GREETING,
      greeting: name
    });
  };
}

export function updateUser(token: string) {
  console.log("Creating action update user");
  return (dispatch: Dispatch, getState: any) => {
    // add a new gist
    const { token = "" } = getState();
    const options = {
      token: token
    };
    axios
      .post("localhost:5000/api/getuser", options)
      .then(function(response) {
        console.log("response", response);
        dispatch({
          type: ActionTypes.UPDATE_USER,
          user: response
        });
      })
      .catch(function(error) {
        console.log("Error while getting user profile", error);
      });
  };
}
export function updateToken(token: string) {
  // return (dispatch: Dispatch, getState: any) => {
  //   dispatch({
  //     type: ActionTypes.UPDATE_GREETING,
  //     greeting: name
  //   });
  // };
  console.log("Creating action update token");
  return {
    type: ActionTypes.UPDATE_TOKEN,
    token
  };
}

export function increment(): IncrementAction {
  return {
    type: ActionTypes.INCREMENT
  };
}
