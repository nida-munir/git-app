import axios from "axios";
import { ApplicationState } from "../../application-state";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../action-creators/index";
import React from "react";
import { updateGreeting } from "../../action-creators/index";
// import { connect } from "tls";

interface NotebookProps {
  id: number;
  url: string;
  notes: Array<Note>;
  notesCount: number;
  token: string;
}

interface Note {
  name: string;
  content: string;
}
const apiUrl = "http://localhost:5000";

class NotebookList extends React.Component<NotebookProps, {}> {
  //   state = {
  //     greeting: ""
  //   };
  //   public updateGreetingAction = (e: React.FormEvent<HTMLFormElement>) => {
  //     // this.props.updateGreeting(this.refs.greetingInputRef.value);
  //     e.preventDefault();
  //     console.log("greeting props", this.props);
  //     this.props.updateGreeting(this.state.greeting);
  //   };

  //   handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     // console.log("greeting props", this.props);
  //     // this.props.updateGreeting(this.refs.greetingInputRef.value);
  //     // console.log("greeting updated");
  //     this.setState({
  //       greeting: e.currentTarget.value
  //     });
  //     // console.log("greeting updated", this.state);
  //   };

  componentDidMount() {
    console.log("getting all gists");
    const options = {
      token: this.props.token,
      name: "nida-munir"
    };
    axios
      .post(`${apiUrl}/api/getAllGists`, options)
      .then(function(response) {
        console.log("response from get all gists", response.data);
      })
      .catch(function(error) {
        console.log("Error while getting gist", error);
      });
  }
  public render() {
    // console.log("greeting props", this.props);
    const { id, url } = this.props;
    console.log("props in notebook list", this.props);
    return (
      <div>Note book list</div>
      //   <form id="greeting" onSubmit={this.updateGreetingAction}>
      //     <h1 id="greeting-text">{this.props.greeting}</h1>
      //     <input id="greeting" type="text" onChange={this.handleChange} />
      //     <input id="greeting-button" type="submit" value="Submit" />
      //   </form>
    );
  }
}

// type StateProps = Pick<GreetingProps, "greeting">;
// type DispatchProps = Pick<GreetingProps, "updateGreeting">;

function mapStateToProps(state: ApplicationState): NotebookProps {
  return {
    id: state.id,
    url: state.url,
    notes: state.notes,
    notesCount: state.notesCount,
    token: state.token
  };
}

// function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
//   return {
//     // updateGreeting: (newGreeting: string) => {
//     //   dispatch(Actions.updateGreeting(newGreeting));
//     // }
//     updateGreeting: async (g: string) => {
//       await dispatch(updateGreeting(g));
//     }
//   };
// }

// const Greeting = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )<{}>(Greeting);

export default connect(mapStateToProps)(NotebookList);
