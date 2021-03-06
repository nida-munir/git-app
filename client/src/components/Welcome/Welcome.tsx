// lib
import { connect } from "react-redux";
import { Dispatch } from "redux";
import React, { Component } from "react";
import GitHubLogin from "react-github-login";
import { Spin } from "antd";
// src
import { ApplicationState } from "../../application-state";
import {
  updateLocalStorage,
  updateIsLoading
} from "../../action-creators/index";
import "./Welcome.css";

class Welcome extends Component<WelcomeProps> {
  componentDidUpdate() {
    // if user is authenticated, navigate to notebooks page
    const localStorageItem = localStorage.getItem("gitHubUser") || "";
    const { isAuthenticated } = JSON.parse(localStorageItem);
    if (isAuthenticated) {
      this.props.history.push("/notebooks");
    }
  }
  onSuccess = (response: any) => {
    const { updateIsLoading } = this.props;
    console.log("fetching token: set is loading to true");

    updateIsLoading(true);
    // dispatch action is loading
    const { code } = response;
    const { updateLocalStorage } = this.props;
    updateLocalStorage(code);
  };
  onFailure = (response: any) => {
    console.log("Error while getting code. ", response);
  };

  render() {
    const CLIENT_ID = "92bfb1aa190ee8615b78";
    const REDIRECT_URI = "http://localhost:3000/redirect";
    const { isLoading } = this.props;
    return (
      <div id="welcome">
        <Spin spinning={isLoading}>
          <GitHubLogin
            clientId={CLIENT_ID}
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            redirectUri={REDIRECT_URI}
            scope="user,gist"
          />
        </Spin>
      </div>
    );
  }
}

export interface WelcomeProps {
  updateLocalStorage: (code: string) => void;
  history: any;
  ownProps: any;
  isLoading: boolean;
  updateIsLoading: (isLoading: boolean) => void;
}
// pick
type WelcomeStateProps = Pick<WelcomeProps, "ownProps" | "isLoading">;
type WelcomeDispatchProps = Pick<
  WelcomeProps,
  "history" | "updateLocalStorage" | "updateIsLoading"
>;

function mapStateToProps(
  state: ApplicationState,
  ownProps: any
): WelcomeStateProps {
  const { isLoading } = state;
  return {
    ownProps,
    isLoading
  };
}
// remove username, avatarurl, is authenticated from state

function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: any
): WelcomeDispatchProps {
  return {
    history: ownProps.history,
    updateLocalStorage: async (code: string) => {
      await dispatch(updateLocalStorage(code));
    },
    updateIsLoading: async (isLoading: boolean) => {
      await dispatch(updateIsLoading(isLoading));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
