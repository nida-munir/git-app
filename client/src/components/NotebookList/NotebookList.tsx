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
    title: "Name",
    dataIndex: "description",
    key: "description",
    render: (text: string) => <a>{text}</a>
  },
  {
    title: "Files Count",
    dataIndex: "filesCount",
    key: "filesCount",
    render: (text: string) => <a>{text}</a>
  },
  {
    title: "Status",
    dataIndex: "public",
    key: "public",
    render: (text: boolean) => {
      if (text == true) return <a>Public</a>;
      else {
        return <a>Private</a>;
      }
    }
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
  componentDidMount() {
    const { updateGists } = this.props;
    console.log("did mount");
    updateGists();
  }

  public render() {
    const { id, url, gists, isAuthenticated } = this.props;
    console.log("updated props in notebook list", this.props);
    let dataSource = [];
    console.log("gists in notebook list: ", gists);

    // const list = gist.gists
    // map((g: Gist) => console.log(g.id));
    // gists.map(g => {
    //   dataSource.push(g);
    // });

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
        <Table columns={columns} dataSource={gists} rowKey="id" />,
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
