import axios from "axios";
import { ApplicationState } from "../../application-state";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../action-creators/index";
import React from "react";
import { updateGists } from "../../action-creators/index";
// import { connect } from "tls";
import Button from "antd/lib/button";
import "./NotebookList.css";
import { Table, Divider, Tag } from "antd";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text: string) => <a>{text}</a>
  },
  {
    title: "Action",
    key: "action",
    render: (text: string, record: any) => (
      <span>
        <a>Edit</a>
        <Divider type="vertical" />
        <a>Delete</a>
        <Divider type="vertical" />
        <a>Share</a>
      </span>
    )
  }
];
const data = [
  {
    key: "1",
    id: "John Brown"
  },
  {
    key: "2",
    id: "Jim Green"
  },
  {
    key: "3",
    id: "Joe Black"
  }
];

interface NotebookProps {
  id: number;
  url: string;
  notes: Array<Note>;
  notesCount: number;
  token: string;
  updateGists: () => void;
  isAuthenticated: boolean;
}

interface Note {
  name: string;
  content: string;
}
const apiUrl = "http://localhost:5000";

class NotebookList extends React.Component<NotebookProps, {}> {
  componentDidUpdate() {
    console.log("will receive props");

    const { updateGists, isAuthenticated } = this.props;
    //updateGists();
    console.log(isAuthenticated);

    if (isAuthenticated) {
      console.log("fetching gists");
      updateGists();
    }
  }
  public render() {
    // console.log("greeting props", this.props);
    const { id, url } = this.props;
    console.log("updated props in notebook list", this.props);
    return (
      <div>
        <Button type="primary">Button</Button>
        <Table columns={columns} dataSource={data} />,
      </div>
    );
  }
}

type NoteBookDispatchProps = Pick<NotebookProps, "updateGists">;
// type NoteBookStateProps = Pick<
//   NotebookProps,
//   ["url", "id", "notes", "notesCount", "token"]
// >;

interface NoteBookStateProps {
  id: number;
  url: string;
  notes: Array<Note>;
  notesCount: number;
  token: string;
  username: string;
  avatar: String;
  isAuthenticated: boolean;
}
function mapStateToProps(state: ApplicationState): NoteBookStateProps {
  const {
    id,
    url,
    notes,
    notesCount,
    token,
    username,
    avatar,
    isAuthenticated
  } = state;
  return {
    id,
    url,
    notes,
    notesCount,
    token,
    username,
    avatar,
    isAuthenticated
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): NoteBookDispatchProps {
  return {
    updateGists: async () => {
      await dispatch(updateGists());
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotebookList);
