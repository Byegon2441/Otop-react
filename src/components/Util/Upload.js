import React, { Component } from 'react'
import { FilePond, File, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  /*
  Example Send This Function IN Page to this.props

    handleFileChange = (data) => {
    this.setState({ files: data });
  };
  */

  render() {
    return (
      <div>
        <FilePond
          ref={ref => (this.pond = ref)}
          allowMultiple={true}
          maxFiles={this.props.maximum}
          onupdatefiles={fileItems => {
            // this.setState({
            //
            // });
            this.props.handleFile(fileItems.map(fileItem => fileItem.file));
          }}
        >
          {this.state.files.map(file => (
            <File key={file} src={file} origin="local" />
          ))}
        </FilePond>
      </div>
    );
  }
}

export default Upload
