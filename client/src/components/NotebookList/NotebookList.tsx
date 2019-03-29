// lib
import axios from "axios";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import React from "react";
import { Table, Divider, Spin, Modal, Button, Input } from "antd";
// src
import "./NotebookList.css";
import {
  updateGists,
  deleteGist,
  createGist
} from "../../action-creators/index";
import { ApplicationState, Gist } from "../../application-state";

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
      title: "Name",
      dataIndex: "description",
      key: "description",
      render: (text: string, record: any) => (
        <a onClick={() => this.handleNameClick(record)}>{text}</a>
      )
    },
    {
      title: "Files Count",
      dataIndex: "filesCount",
      key: "filesCount",
      render: (text: string) => <p>{text}</p>
    },
    {
      title: "Status",
      dataIndex: "public",
      key: "public",
      render: (text: boolean) => {
        if (text == true) return <p>Public</p>;
        else {
          return <p>Private</p>;
        }
      }
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => <p>{text}</p>
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

  handleNameClick = (record: any) => {
    this.props.history.push({
      pathname: "/files",
      search: `?gistId=${record.id}`
    });
  };
  componentDidMount() {
    const { updateGists } = this.props;
    // get updated gists
    updateGists();
  }

  public render() {
    const { visible, confirmLoading } = this.state;
    const { gists } = this.props;
    console.log(this.props);
    return (
      <div>
        <Spin spinning={this.props.isLoading}>
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
        </Spin>
      </div>
    );
  }
}
//  all notebook props
interface NotebookProps {
  gists: Array<Gist>;
  updateGists: () => void;
  deleteGist: (id: string) => void;
  history: any;
  createGist: (id: string) => void;
  isLoading: boolean;
}
// get state and dispatch props from notebook props
type NoteBookDispatchProps = Pick<
  NotebookProps,
  "updateGists" | "deleteGist" | "createGist"
>;
type NoteBookStateProps = Pick<
  NotebookProps,
  "gists" | "history" | "isLoading"
>;

function mapStateToProps(
  state: ApplicationState,
  ownProps: any
): NoteBookStateProps {
  const { gists, isLoading } = state;
  return {
    gists,
    history: ownProps.history,
    isLoading
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
