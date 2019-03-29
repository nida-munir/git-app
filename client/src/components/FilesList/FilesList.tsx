// lib
const queryString = require("query-string");
import { Dispatch } from "redux";
import { connect } from "react-redux";
import React from "react";
import { Table, Divider, Tag, Modal, Button, Input } from "antd";
// src
import { getFiles } from "../../action-creators/index";
import { ApplicationState, Gist } from "../../application-state";

// define column structure to antd table

class FilesList extends React.Component<FileProps, {}> {
  columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <a href="javascript:;">Delete</a>
    }
  ];

  //   handleDelete = (rec: any) => {
  //     const { deleteGist } = this.props;
  //     deleteGist(rec.id);
  //     console.log(rec);
  //   };

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    console.log("Parse gist id", parsed.gistId);
    const { getFiles } = this.props;
    getFiles(parsed.gistId);
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
  selectedGist: ApplicationState["selectedGist"];
}
type FileStateProps = Pick<FileProps, "location" | "selectedGist">;
type FileDispatchProps = Pick<FileProps, "getFiles">;
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
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilesList);
