import React, { Component } from 'react';
import { 
        DropDownMenu, 
        TextField, 
        FloatingActionButton, 
        RaisedButton
      }  from 'material-ui';
import KeyDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';


class LeftMenu extends Component {

  render() {
    const { label } = this.props;
    return (  <div>
                    <RaisedButton
                      className='raised_button_employers'
                      label={label}
                      labelPosition='before'
                      style={{width: '200px'}}
                      icon={<KeyDown style={{right: '0', top: '0', bottom: '0'}} />}
                    />
              </div>)
  }
}

export default LeftMenu;
