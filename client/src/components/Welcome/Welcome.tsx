import { updateToken, updateUser } from "../../action-creators/index";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import React, { Component } from "react";
import GitHubLogin from "react-github-login";

class Welcome extends Component<WelcomeProps, {}> {
  onSuccess = (response: any) => {
    const { history } = this.props;
    fetch("http://localhost:9999/authenticate/" + response.code)
      .then(function(data) {
        console.log("success response", data);
        return data.json();
      })
      .then(function(res) {
        console.log(res.token);
        // store in local storage
        var gitHubUser = {
          token: res.token,
          code: response.code,
          isAuthenticate: true
        };

        // Put the token into storage
        localStorage.setItem("gitHubUser", JSON.stringify(gitHubUser));
        updateUser(res.token);
        updateToken(res.token);
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
    this.props.history;
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
  //history: any;
}

function mapDispatchToProps(dispatch: Dispatch<any>, ownProps: WelcomeProps) {
  return {
    history: ownProps.history,
    // updateGreeting: async (g: string) => {
    //   await dispatch(updateToken(g));
    // }
    updateToken: (token: string) => {
      dispatch(updateToken(token));
    },
    updateUser: (token: string) => {
      dispatch(updateUser(token));
    }
  };
}
export default connect(
  null,
  mapDispatchToProps
)(Welcome);
