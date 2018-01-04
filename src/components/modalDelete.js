import React, { Component } from 'react';
import { Modal,  } from 'material-ui'

class modalDelete extends Component {

  handleOpen = () => {

  };

  handleClose = () => {
    
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Alert" onClick={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        Delete {}
        </Dialog>
      </div>
    );
  }
}