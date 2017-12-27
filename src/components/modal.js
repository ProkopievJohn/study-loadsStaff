import React, { Component } from 'react';
import {Dialog, Divider, TextField, RaisedButton, DropDownMenu, MenuItem} from 'material-ui';


class Modal extends Component {
  state = {
    preset: {
      name: '',
      id: '',
      projects: [],
      users: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  options = () => {
    let options;
    if (this.props.data[this.props.list]) {
      options = this.props.data[this.props.list].map(item => {
        return <MenuItem key={item._id} value={item._id} primaryText={item.name} />
      });
      options.unshift(<MenuItem key='1' value='1' primaryText={`Choose ${this.props.list}`} />)
    } else {
      options = <MenuItem key='1' value='1' primaryText='Empty' />
    }
    return options;
  }

  inputHandler = (event, newValue) => {
    const { preset, list } = this.state;
    this.state.preset[list].map((item, idx) => {
      if (item.id === event.target.id) {
        preset[list][idx].hours = newValue;
      }
    })
    this.setState({preset: preset});
  }

  selectHandler = (event, index, value) => {
    const { list, elementAction, data } = this.props;
    const { preset } = this.state;
    let newPreset = preset;
    let doAdd = true;
    let findId = () => {
      if (doAdd) {
        data[`${list}`].map(item => {
          if (item._id === value) {
            newPreset[`${list}`].push({id: item._id, name: item.name, hours: 0 })
            this.setState({preset: newPreset});
          }
        })
      }
    };
    if (elementAction === 'Update') {
      newPreset[`${list}`] = preset[`${list}`];
      if (preset[`${list}`]) {
        preset[`${list}`].map((item, idx) => {
          console.log(value);
          console.log(item.id);
          item.id === value ? doAdd = false : null;
        })
        findId();
      } else {
        findId();
      }  
    } else {
      newPreset[`${list}`] = [];
      findId();
    }
  }

  handlerKeyPress = (event) => {
    console.log(event.keyCode)
    if (event.target.keyCode === '13') {
      this.props.closeModal();
    }
  }

  handlerClose = () => {
    this.props.closeModal();
  }

  handlerSubmit = () => {
    const { handlerSubmit } = this.props
    handlerSubmit(this.state.preset)
  }

  doAddItems = () => {
    let elements = []
    const { preset, list } = this.state;
    console.log(preset);
    console.log(list);
    if (preset && list) {
      elements = preset[`${list}`].map((item, idx) => {

        return (<div
                style={{marginTop: '20px', width: '150px', marginLeft: '10px', display: 'inline-block'}}
              >
                <i class='material-icons' stype={{display: 'flex-end'}}>close</i>
                {item.name}
                <br />
                <Divider />
                <TextField 
                          id={item.id}
                          type='number'
                          defaultValue={item.hours}
                          style={{width: '150px', marginTop: '17px'}}
                          floatingLabelText={`${list} hours`}
                          onChange={this.inputHandler}
                />
              </div>)
      })
    }
    return elements
  }

  render() {
    const { preset, list } = this.state
    const { open, elementType, elementAction } = this.props
    console.log(preset);

    return (
      <Dialog
        title={`${elementAction}  ${elementType}`}
        modal={false}
        open={open}
        onRequestClose={this.handlerClose}
      >
        <form onKeyPress={this.handlerKeyPress}>
          <div style={{display: 'flex'}}>
            <div style={{marginLeft: '10px', display: 'inline-block'}}>
              <TextField
                className='targetName'
                type='text'
                ref='name'
                placeholder={`${elementType} name`}
                style={{marginLeft: '23px', width: '150px'}}
                floatingLabelText={`${elementType} name`}
                defaultValue={preset.name}
              />
              <br />
              <DropDownMenu
                value='1'
                onChange={this.selectHandler}
                style={{width: '200px'}}
              >
                {this.options()}
              </DropDownMenu>
            </div>
            <div style={{float: 'top', display: 'flex'}}>
              {this.doAddItems()}
            </div>
          </div>
          <br />
          <div style={{float: 'bottom'}}>  
            <RaisedButton onClick={this.handlerSubmit} label={elementAction} />
            <RaisedButton onClick={this.handlerClose} label='Cancel' />
          </div>
        </form>
      </Dialog>
    )
  }
}

export default Modal