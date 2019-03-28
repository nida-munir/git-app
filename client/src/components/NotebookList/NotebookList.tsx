import axios from "axios";
import { ApplicationState, Gist } from "../../application-state";
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
    title: "Public",
    dataIndex: "public",
    key: "public",
    render: (text: string) => <a>{text}</a>
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
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
    id: "John Brown",
    public: true,
    createdAt: "das"
  },
  {
    key: "2",
    id: "Jim Green",
    public: true,
    createdAt: "das"
  },
  {
    key: "3",
    id: "Joe Black",
    public: true,
    createdAt: "das"
  }
];

interface NotebookProps {
  id: number;
  url: string;
  gists: Array<Gist>;
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
    const { updateGists, isAuthenticated } = this.props;
    //updateGists();

    // if (isAuthenticated) {
    //   console.log("fetching gists");
    //   updateGists();
    // }
  }
  componentDidMount() {
    console.log("did mount");

    const { updateGists, isAuthenticated } = this.props;
    //updateGists();

    if (isAuthenticated) {
      console.log("fetching gists");
      updateGists();
    }
  }

  getUpdatedGist = () => {
    console.log("getting updated gists");
    updateGists();
  };

  public render() {
    // console.log("greeting props", this.props);
    const { id, url, gists, isAuthenticated } = this.props;
    console.log("updated props in notebook list", this.props);
    if (isAuthenticated) {
      this.getUpdatedGist();
    }
    // map gist data to data source for table
    // {
    //     key: "3",
    //     id: "Joe Black",
    //     public: true,
    //     createdAt: "das"
    //   }

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
  gists: Array<Gist>;
  token: string;
  username: string;
  avatar: String;
  isAuthenticated: boolean;
}
function mapStateToProps(state: ApplicationState): NoteBookStateProps {
  const { id, url, gists, token, username, avatar, isAuthenticated } = state;
  return {
    id,
    url,
    gists,
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
