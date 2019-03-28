import { updateUser } from "../../action-creators/index";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import React, { Component } from "react";
import GitHubLogin from "react-github-login";

class Welcome extends Component<WelcomeProps, {}> {
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
        history.push("/notebooks");
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

    return (
      <div>
        {/* <a
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
        >
          Login
        </a> */}
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
export interface WelcomeProps extends RouteComponentProps<any> {
  updateUser: (token: string) => void;
}

export interface WelcomeDispatchProps {
  history: any;
  updateUser: (token: string) => void;
}
// type WelcomeDispatchProps = Pick<WelcomeProps, "updateUser,updateToken">;
// type OwnProps = Pick<WelcomeProps, "history">;
function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: WelcomeProps
): WelcomeDispatchProps {
  return {
    history: ownProps.history,
    updateUser: async (token: string) => {
      await dispatch(updateUser(token));
    }
  };
}
export default connect(
  null,
  mapDispatchToProps
)(Welcome);
