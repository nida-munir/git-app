import React from "react";
import SocialLogin from "react-social-login";

const Button = (props: any) => (
  <button onClick={props.triggerLogin} {...props}>
    {props.children}
  </button>
);

export default SocialLogin(Button);
