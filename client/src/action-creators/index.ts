import * as ActionTypes from "../action-types/index";
import { Dispatch } from "redux";
import axios from "axios";

const apiUrl = "http://localhost:5000";
export type UpdateGreetingAction = {
  type: ActionTypes.UPDATE_GREETING;
  greeting: string;
};

// export type UpdateTokenAction = {
//   type: ActionTypes.UPDATE_TOKEN;
//   token: string;
// };

export type UpdateUserAction = {
  type: ActionTypes.UPDATE_USER;
  user: { username: string; avatar: string; token: string };
};
export type UpdateGistsAction = {
  type: ActionTypes.UPDATE_GISTS;
  gists: [];
};

export type IncrementAction = {
  type: ActionTypes.INCREMENT;
};

export type updateGreeting = typeof updateGreeting;
export type increment = typeof increment;
export type updateUser = typeof updateUser;
export type updateGists = typeof updateGists;

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
      .post("http://localhost:5000/api/getuser", options)
      .then(function(response) {
        // console.log("/api/getUser response", response);
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
        // dispatch({
        //   type: ActionTypes.UPDATE_TOKEN,
        //   token
        // });
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
    console.log("State in update gists action: ", getState());
    const { token, username } = getState();
    const options = {
      token: token,
      name: username
    };
    axios
      .post(`${apiUrl}/api/getAllGists`, options)
      .then(function(response) {
        console.log("api/getAllGists response", response.data);
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
