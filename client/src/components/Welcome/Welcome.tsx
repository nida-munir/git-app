import React, { Component } from "react";
import GitHubLogin from "react-github-login";
import SocialButton from "../SocialButton/SocialButton";

const handleSocialLogin = (user: any) => {
  console.log(user);
};

const handleSocialLoginFailure = (err: any) => {
  console.error(err);
};
const onSuccess = (response: any) => {
  fetch("http://localhost:9999/authenticate/" + response.code)
    .then(function(data) {
      return data.json();
    })
    .then(function(res) {
      console.log(res.token);
      // store in local storage
    });
};
const onFailure = (response: any) => {
  console.log(response);
};
const CLIENT_ID = "92bfb1aa190ee8615b78";
const REDIRECT_URI = "http://localhost:3000/redirect";
class Welcome extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        {/* <a
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
        >
          Login
        </a> */}
        <GitHubLogin
          clientId="92bfb1aa190ee8615b78"
          onSuccess={onSuccess}
          onFailure={onFailure}
          redirectUri="http://localhost:3000/redirect"
        />
        ;
      </div>
    );
  }
}

export default Welcome;
