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
  //   columns = [
  //     {
  //       title: "Id",
  //       dataIndex: "id",
  //       key: "id",
  //       render: (text: string) => <a>{text}</a>
  //     },
  //     {
  //       title: "Name",
  //       dataIndex: "description",
  //       key: "description",
  //       render: (text: string) => <a>{text}</a>
  //     },
  //     {
  //       title: "Files Count",
  //       dataIndex: "filesCount",
  //       key: "filesCount",
  //       render: (text: string) => <a>{text}</a>
  //     },
  //     {
  //       title: "Status",
  //       dataIndex: "public",
  //       key: "public",
  //       render: (text: boolean) => {
  //         if (text == true) return <a>Public</a>;
  //         else {
  //           return <a>Private</a>;
  //         }
  //       }
  //     },
  //     {
  //       title: "Created At",
  //       dataIndex: "createdAt",
  //       key: "createdAt",
  //       render: (text: string) => <a>{text}</a>
  //     },
  //     {
  //       title: "Action",
  //       key: "action",
  //       render: (text: string, record: any) => (
  //         <span>
  //           <a>Edit</a>
  //           <Divider type="vertical" />
  //           <a onClick={() => this.handleDelete(record)}>Delete</a>
  //           <Divider type="vertical" />

  //           <a onClick={() => this.showGistUrl(record)}>Share</a>
  //         </span>
  //       )
  //     }
  //   ];

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
    return (
      <div>
        <div />
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
