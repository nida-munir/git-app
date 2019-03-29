// lib
const queryString = require("query-string");
import { Dispatch } from "redux";
import { connect } from "react-redux";
import React from "react";
import { Table, Divider, Tag, Modal, Button, Input } from "antd";

// src
import { getFiles, deleteFile } from "../../action-creators/index";
import { ApplicationState, Gist } from "../../application-state";

// define column structure to antd table

class FilesList extends React.Component<FileProps, {}> {
  parsed = queryString.parse(this.props.location.search);
  columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text: string, record: any) => (
        <span>
          <a>Edit</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(record)}>Delete</a>
        </span>
      )
    }
  ];

  handleDelete = (rec: any) => {
    const { gistId } = this.parsed;
    const { deleteFile } = this.props;
    console.log("handle delete");
    deleteFile(gistId, rec.name);
  };

  componentDidMount() {
    const { getFiles } = this.props;
    const { gistId } = this.parsed;
    getFiles(gistId);
  }

  public render() {
    console.log("gists: ", this.props.selectedGist.files);
    const { files = [] } = this.props.selectedGist;
    return (
      <div>
        <Table
          columns={this.columns}
          expandedRowRender={record => (
            <p style={{ margin: 0 }}>{record.content}</p>
          )}
          dataSource={files}
          rowKey="raw_url"
        />
      </div>
    );
  }
}
//  all notebook props
interface FileProps {
  location: any;
  getFiles: (id: string) => void;
  deleteFile: (id: string, fileName: string) => void;
  selectedGist: ApplicationState["selectedGist"];
}
type FileStateProps = Pick<FileProps, "location" | "selectedGist">;
type FileDispatchProps = Pick<FileProps, "getFiles" | "deleteFile">;
// interface FileDispatchProps {
//   getFiles: (id: string) => void;
// }
function mapStateToProps(
  state: ApplicationState,
  ownProps: any
): FileStateProps {
  const { selectedGist } = state;
  return {
    location: ownProps.location,
    selectedGist
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): FileDispatchProps {
  return {
    getFiles: async (id: string) => {
      await dispatch(getFiles(id));
    },
    deleteFile: async (id: string, fileName: string) => {
      await dispatch(deleteFile(id, fileName));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilesList);
