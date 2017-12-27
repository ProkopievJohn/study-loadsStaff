import React, { Component } from 'react';
import {FlatButton} from 'material-ui';

class Button extends Component {
  
  render() {
    return <FlatButton onClick={this.props.showModal} className='btn_top' label={this.props.btnName}/>
  }
/*
  render() {
    return <button onClick={this.props.showModal} className='btn_top'>{this.props.btnName}</button>
  }*/
}

export default Button;