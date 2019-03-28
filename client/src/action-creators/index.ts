import * as ActionTypes from "../action-types/index";
import { Dispatch } from "redux";
import axios from "axios";

export type UpdateGreetingAction = {
  type: ActionTypes.UPDATE_GREETING;
  greeting: string;
};

export type IncrementAction = {
  type: ActionTypes.INCREMENT;
};

export type updateGreeting = typeof updateGreeting;
export type increment = typeof increment;

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
  // return {
  //   type: ActionTypes.UPDATE_GREETING,
  //   greeting
  // };
}

export function increment(): IncrementAction {
  return {
    type: ActionTypes.INCREMENT
  };
}
