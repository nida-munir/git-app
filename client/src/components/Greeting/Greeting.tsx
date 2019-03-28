import { ApplicationState } from "../../application-state";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import React from "react";
import { updateGreeting } from "../../action-creators/index";
// import { connect } from "tls";

export interface GreetingProps {
  greeting: string;
  updateGreeting: (greeting: string) => void;
}

class Greeting extends React.Component<GreetingProps, {}> {
  state = {
    greeting: ""
  };
  public updateGreetingAction = (e: React.FormEvent<HTMLFormElement>) => {
    // this.props.updateGreeting(this.refs.greetingInputRef.value);
    e.preventDefault();
    console.log("greeting props", this.props);
    this.props.updateGreeting(this.state.greeting);
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("greeting props", this.props);
    // this.props.updateGreeting(this.refs.greetingInputRef.value);
    // console.log("greeting updated");
    this.setState({
      greeting: e.currentTarget.value
    });
    // console.log("greeting updated", this.state);
  };

  public render() {
    // console.log("greeting props", this.props);
    return (
      <form id="greeting" onSubmit={this.updateGreetingAction}>
        <h1 id="greeting-text">{this.props.greeting}</h1>
        <input id="greeting" type="text" onChange={this.handleChange} />
        <input id="greeting-button" type="submit" value="Submit" />
      </form>
    );
  }
}

type StateProps = Pick<GreetingProps, "greeting">;
type DispatchProps = Pick<GreetingProps, "updateGreeting">;

function mapStateToProps(state: ApplicationState): StateProps {
  return { greeting: state.greeting };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
  return {
    // updateGreeting: (newGreeting: string) => {
    //   dispatch(Actions.updateGreeting(newGreeting));
    // }
    updateGreeting: async (g: string) => {
      await dispatch(updateGreeting(g));
    }
  };
}

// const Greeting = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )<{}>(Greeting);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);
