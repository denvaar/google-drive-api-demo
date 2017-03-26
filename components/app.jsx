import React, { Component } from 'react';
import {ipcRenderer} from  'electron';

import Modal from './modal';

const ICONS = {
  'application/vnd.google-apps.spreadsheet': "fa fa-2x fa-table",
  'application/vnd.google-apps.document':    "fa fa-2x fa-file-text-o",
  'application/pdf':                         "fa fa-2x fa-file-pdf-o",
  'application/vnd.google-apps.drawing':     "fa fa-2x fa-paint-brush",
  'application/vnd.google-apps.presentation':"fa fa-2x fa-file-powerpoint-o",
  'image/png':                               "fa fa-2x fa-file-image-o",
  'image/jpg':                               "fa fa-2x fa-file-image-o",
  'image/jpeg':                              "fa fa-2x fa-file-image-o",
  'video/mp4':                               "fa fa-2x fa-file-video-o"
}

const humanFileSize = (bytes, si) => {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}

const FileItem = (props) => {
  const { id, icon, webContentLink, name, mimeType,
          size, createdTime, modifiedTime, kind,
          thumbnailLink, webViewLink } = props.file;
  return (
    <div className={props.isExpanded ? "cancel-border" : ""}>
      <div className="file">
        <span className="file-icon">{icon}</span>
        <span className="file-name">{name}</span>
        <span className="file-size">
          {size ? humanFileSize(size, true) : '--'}
        </span>
        <span className="file-action-icon" onClick={props.downloadFile}>
          <i className="fa fa-download"></i>
        </span>
        <span className="file-action-icon" onClick={props.expand}>
          <i className="fa fa-ellipsis-v"></i>
        </span>
      </div>
        {props.isExpanded ?
          <div className="expanded">
            <p>Thumbnail:</p>
            <img src={thumbnailLink} />
            <p>Created Time: {createdTime}</p>
            <p>Last Modified Time: {modifiedTime}</p>
            <p>Mime Type: {mimeType}</p>
            <p>Kind of Resource: {kind}</p>
            <p>File ID: {id}</p>
            <p>Web Content Link: {webContentLink || '--'}</p>
            <p>Web View Link: {webViewLink || '--'}</p>
            <p>Thumbnail Link: {thumbnailLink || '--'}</p>
          </div>
        :
          null
        }
    </div>
  );
}

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      showDownloadModal: true,
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

  render() {
    const files = this.state.files.map(file => {
      let icon = <i className="fa fa-2x fa-file-o"></i>;
      if (ICONS[file.mimeType]) {
        icon = <i className={ICONS[file.mimeType]}></i>;
      }
      return (
        <FileItem
          key={file.id}
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
        {/*
        {this.state.token ? 
          <video controls="controls">
            <source src={`https://drive.google.com/uc?id=0B6DmS8Tq6scFXzI5clNjWGZQUWc&export=view&access_token=${this.state.token}`} type='video/mp4'/>
          </video>
        :
          null
        }*/}
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
        {files ? files : <p>LOADING...</p>}
      </div>
    );
  }

}
