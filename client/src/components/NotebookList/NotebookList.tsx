// lib
import axios from "axios";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import React from "react";
import { Table, Divider, Tag, Modal, Button, Input } from "antd";
// src
import "./NotebookList.css";
import {
  updateGists,
  deleteGist,
  createGist
} from "../../action-creators/index";
import { ApplicationState, Gist } from "../../application-state";

// define column structure to antd table

class NotebookList extends React.Component<NotebookProps, {}> {
  state = {
    visible: false,
    confirmLoading: false,
    userInput: ""
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    const { createGist } = this.props;
    const { userInput } = this.state;
    createGist(userInput);
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };
  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };
  columns = [
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
          <a onClick={() => this.handleDelete(record)}>Delete</a>
          <Divider type="vertical" />

          <a onClick={() => this.showGistUrl(record)}>Share</a>
        </span>
      )
    }
  ];

  showGistUrl = (record: any) => {
    Modal.success({
      title: "Url genrated successfully.",
      content: record.html_url
    });
  };

  handleDelete = (rec: any) => {
    const { deleteGist } = this.props;
    deleteGist(rec.id);
    console.log(rec);
  };
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState({
      userInput: value
    });
    console.log("changing");
  };
  componentDidMount() {
    const { updateGists } = this.props;
    // get updated gists
    updateGists();
  }

  public render() {
    const { visible, confirmLoading } = this.state;
    const { gists } = this.props;
    return (
      <div>
        <div>
          <Button type="primary" onClick={this.showModal}>
            Add new Gist
          </Button>
          <Modal
            title="Add new gist"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <Input
              placeholder="Gist Name"
              id="gistName"
              onChange={this.handleInputChange}
            />
          </Modal>
        </div>
        <Table columns={this.columns} dataSource={gists} rowKey="id" />,
      </div>
    );
  }
}
//  all notebook props
interface NotebookProps {
  id: number;
  url: string;
  gists: Array<Gist>;
  token: string;
  isAuthenticated: boolean;
  updateGists: () => void;
  deleteGist: (id: string) => void;

  createGist: (id: string) => void;
}
// get state and dispatch props from notebook props

interface NoteBookDispatchProps {
  updateGists: () => void;
  deleteGist: (id: string) => void;
  createGist: (id: string) => void;
}
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
    },
    deleteGist: async (id: string) => {
      await dispatch(deleteGist(id));
    },
    createGist: async (name: string) => {
      await dispatch(createGist(name));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotebookList);
