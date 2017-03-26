import React, { Component } from 'react';


const modalContainer = {
  position: "fixed",
  zIndex: 100,
  paddingTop: "100px",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(36, 36, 36, 0.78)"
};

const modalContent = {
  textAlign: "left",
  backgroundColor: "#fff",
  margin: "15% auto",
  padding: "20px",
  width: "80%",
  maxWidth: "500px",
  borderRadius: "3px"
};

const closeButton = {
  color: "#e26c6c",
  float: "right",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: "pointer",
  border: "3px solid #e26c6c",
  borderRadius: "4px",
  width: "25px",
  height: "25px",
  textAlign: "center"
};

export default class Modal extends Component {
  
  static propTypes = {
    onClose: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      closeButtonMouseOver: false
    };
  }

  render() {
    if (this.props.isVisible) {
      return (
        <div style={modalContainer} className="modal--container" onClick={this.props.onClose}>
          <div style={modalContent} className="modal--content" onClick={(e) => e.stopPropagation()}>
            <span style={{...closeButton, background: this.state.closeButtonMouseOver ? "#f9d4d4" : ""}}
                  onClick={this.props.onClose}
                  onMouseEnter={() => this.setState({ closeButtonMouseOver: true })}
                  onMouseLeave={() => this.setState({ closeButtonMouseOver: false })}>
              <i className="fa fa-times"></i>
            </span>
            {this.props.children} 
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
