import { ApplicationState } from "../../application-state";

import { updateUser } from "../../action-creators/index";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import React, { Component } from "react";
import GitHubLogin from "react-github-login";

class Welcome extends Component<WelcomeProps, WelcomeProps> {
  componentDidUpdate() {
    const { isAuthenticated, ownProps } = this.props;
    console.log(ownProps);
    if (isAuthenticated) {
      console.log("pushing");
      this.props.history.push("/notebooks");
    }
    console.log(this.props);
    //updateGists();
  }
  onSuccess = (response: any) => {
    const { history, updateUser } = this.props;
    fetch("http://localhost:9999/authenticate/" + response.code)
      .then(function(data) {
        return data.json();
      })
      .then(function(res) {
        // store in local storage
        var gitHubUser = {
          token: res.token,
          code: response.code,
          isAuthenticate: true
        };

        // Put the token into storage
        localStorage.setItem("gitHubUser", JSON.stringify(gitHubUser));
        //updateToken(res.token);
        updateUser(res.token);
        // navigate to notebook list page
      })
      .catch(function(err) {
        console.log("err: ", err);
      });
  };
  onFailure = (response: any) => {
    console.log(response);
  };
  constructor(props: WelcomeProps) {
    super(props);
  }

  render() {
    const CLIENT_ID = "92bfb1aa190ee8615b78";
    const REDIRECT_URI = "http://localhost:3000/redirect";
    console.log(this.props);
    return (
      <div>
        <GitHubLogin
          clientId={CLIENT_ID}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          redirectUri={REDIRECT_URI}
          scope="user,gist"
        />
        ;
      </div>
    );
  }
}
export interface WelcomeProps {
  updateUser: (token: string) => void;
  history: any;
  ownProps: any;
  username: string;
  avatar: string;
  isAuthenticated: boolean;
}

export interface WelcomeStateProps {
  ownProps: any;
  username: string;
  avatar: string;
  isAuthenticated: boolean;
}

export interface WelcomeDispatchProps {
  history: any;
  updateUser: (token: string) => void;
}
// type WelcomeState = {
//   username: string;
//   avatar: string;
//   isAuthenticated: boolean;
//   ownProps: any;
//   updateUser: (token: string) => void;
// };
// type WelcomeDispatchProps = Pick<WelcomeProps, "updateUser,updateToken">;
// type OwnProps = Pick<WelcomeProps, "history">;
function mapStateToProps(
  state: ApplicationState,
  ownProps: any
): WelcomeStateProps {
  const { username, avatar, isAuthenticated } = state;
  return {
    username,
    avatar,
    isAuthenticated,
    ownProps
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: any
): WelcomeDispatchProps {
  return {
    history: ownProps.history,
    updateUser: async (token: string) => {
      await dispatch(updateUser(token));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
