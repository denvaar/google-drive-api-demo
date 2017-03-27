import React, { Component } from 'react';
import { ipcRenderer } from  'electron';

import { ICONS } from '../utils';
import Modal from './modal';
import FileItem from './fileItem';


const uploadButton = {
  cursor: "pointer",
  display: "block",
  background: "aliceblue",
  fontWeight: "bold",
  textAlign: "center"
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      showDownloadModal: true,
      showVideoModal: '',
      expanded: null
    };

    ipcRenderer.on('load-files', (event, data, token) => {
      this.setState({ files: data, token: token });
    });
    
    ipcRenderer.on('load-export-formats', (event, data) => {
      this.setState({ exportFormats: data });
    });

  }

  expandFile(id) {
    if (id === this.state.expanded) {
      this.setState({ expanded: null });
    } else {
      this.setState({
        expanded: id
      });
    }
  }

  createFile() {
    ipcRenderer.send('create-file', {});
  }

  downloadFile() {
    if (this.state.downloadData.method) {
      this.setState({ showDownloadModal: false });
      ipcRenderer.send('download-file', JSON.stringify(this.state.downloadData));
    } else {
      const method = this.state.downloadData.mimeType.includes('vnd') ? 'export' : 'get';
      if (method === 'get') {
        let data = { ...this.state.downloadData, method: method };
        ipcRenderer.send('download-file', JSON.stringify(data));
      } else {
        this.setState({
          showDownloadModal: true,
          mimeTypes: this.state.exportFormats[this.state.downloadData.mimeType],
          downloadData: {
            ...this.state.downloadData,
            method: method
          }
        });
      }
    }
  }

  showVideoModal(fileId) {
    this.setState({
      showVideoModal: fileId
    });
  }

  render() {
    const files = this.state.files.map(file => {
      let icon = <i className="fa fa-2x fa-file-o"></i>;
      if (ICONS[file.mimeType]) {
        icon = <i className={ICONS[file.mimeType]}></i>;
      }
      return (
        <FileItem
          key={file.id}
          playVideo={() => this.showVideoModal(file.id)}
          downloadFile={() =>
            this.setState({ downloadData: { fileId: file.id, mimeType: file.mimeType } }, () => this.downloadFile())}
          expand={() => this.expandFile(file.id)}
          isExpanded={file.id === this.state.expanded}
          file={
            {
              ...file,
              icon: icon
            }
          } />
      );
    });
    
    return (
      <div className="center">
        <Modal isVisible={this.state.showVideoModal.length > 0}
               onClose={() => this.setState({ showVideoModal: '' })}>
          <h2>Stream Video</h2>
          <video style={{width: "100%"}} controls="controls">
            <source src={`https://drive.google.com/uc?id=${this.state.showVideoModal}&export=view&access_token=${this.state.token}`} type='video/mp4'/>
          </video>
        </Modal>
        <h2>Google Drive API Demo</h2>
        {this.state.exportFormats && this.state.mimeTypes ? 
          <Modal
            isVisible={this.state.showDownloadModal}
            onClose={() => this.setState({ showDownloadModal: false })}>
            <h2>Export File</h2>
            <p>Choose a mime type for the export:</p>
            {
              (() => {
                const mimeTypes = this.state.mimeTypes.map((mimeType, i) => 
                  <div key={i}>
                    <input type="radio"
                           name="mime"
                           value={mimeType}
                           onChange={(e) => this.setState({ downloadData: { ...this.state.downloadData, mimeType: e.target.value } })} /> {mimeType}<br/>
                  </div>);
                return (
                  <div>
                    {mimeTypes}
                  </div>
                );
              })()
            }
            <div style={{textAlign: "right", width: "100%"}}>
              <button onClick={() => this.setState({ showDownloadModal: false })}>Cancel</button>
              <button onClick={() => this.downloadFile()}>OK</button>
            </div>
          </Modal>
        :
          null
        }
        <div>
          <div className="file" style={uploadButton} onClick={() => this.createFile()}>
            <i className="fa fa-plus-square-o"></i> Upload File to Drive
          </div>
          {files}
        </div>
      </div>
    );
  }

}
