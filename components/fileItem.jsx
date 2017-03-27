import React from 'react';

import { humanFileSize } from '../utils';


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
            {mimeType.includes('video') ? 
              <div style={{position: "relative"}}>
                <span className="play-overlay" onClick={props.playVideo}></span>
                <img src={thumbnailLink} />
              </div>  
            :
              <img src={thumbnailLink} />
            }
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

export default FileItem;
