import React, { Component } from 'react';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainTable from './components/mainTable';
import Button from './components/button';
import Modal from './components/modal';
import LeftMenu from './components/leftMenu'
import controller from './controller';
import axios from 'axios';

 
const apiUri = 'http://localhost:3001/api';
const appUrl = 'http://localhost:3000';

class App extends Component {
  state = {
    renderData: { users: [], projects: [] },
    showModal: false,
    list: 'users',
    preset: {
      id: '',
      name: '',
      users: [],
      projects: []
    }
  }
 
  componentDidCatch(err, info) {
    console.log(err);
    console.log(info);
  }


  componentDidMount() {
    this.getData();
  }

  showModal = (type, action, preset, list) => {
    console.log(list);

    this.setState({ 
      showModal: true, 
      elementType: type, 
      elementAction: action,
      preset: preset, 
      list: list
    })
  }

  closeModal = () => {
    this.setState({ showModal: false});
    this.getData();
  }

  getData = async () => {
    let data = {users: [], projects: []};

    try {
      data.projects = await controller(apiUri + '/projects', {method: 'GET'});
      data.users = await controller(apiUri + '/users', {method: 'GET'});
      if (data.projects && data.users) {
        data.projects.map(async proj => {
          data.users.map((user, i) => {
            if (user.projects || user.projects.length > 0) {
              for (let project in user.projects) {
                if (project.id === proj._id) {
                  data.users[i].project.name = proj.name;
                }
              }
            }
          })
        })
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({renderData: data});
  }

  updateElement = (type, action, id, list) => {
    let target;

    this.state.renderData[`${type}s`].map(item => {
      if (id === item._id) {
        return target = item;
      }
    })
    this.showModal(type, action, target, list);
  }

  handlerSubmit = async (preset) => {
    const { list, elementAction, elementType, renderData } = this.props;
    const method = elementAction === 'Add' ? 'post' : 'put';
    let data = {};
    let config = {
      method: method,
      url: '',
      data: data
    }
    let arr = preset[list];
    console.log(preset);
    if (elementType === 'user') {
      data = {
        name: preset.name,
        projects: arr
      };
      config.url = `${apiUri} /user/ ${preset._id}`;
      await axios(config);
    } else {
      data = {
        name: preset.name
      };
      config.url = `${apiUri} /project/ ${preset._id}`;
      axios(config);
      if (arr && arr.length > 0) {
        arr.map((item) => {
          data = renderData[`${elementType} s`].map(user => {
            if (user._id === item.id) {
              data = user;
              if (data.projects &&  data.projects.length > 0) {
                return data.projects.map((project, idx) => {
                  if (project.id === preset._id) {
                    return data.projects[idx].hours = item.hours
                  }
                })
              } else {
                return data.projects.push({
                  id: preset.id,
                  hours: item.hours
                });
              }
            }
          })
          console.log(data);
          config.url = `${apiUri} /users/ ${item._id}`;
          //axios(config);
        })
      }
    }
    this.getData();
  }

  removeElement = async (event) => {
    console.log(event.target.id);
    const id = event.target.id;
    let config = {
      method: 'delete',
      url: apiUri + id
    };
      await axios(config);
      this.getData.call(this);
  }

  render() {
    const { showModal, elementType, elementAction, list, renderData, preset } = this.state
    console.log('preset: ', preset)

    return (
      <div>
        <header className='header' >
          <a href={appUrl}>
            <img className='devico_logo' src='./img/devico_logo.svg'/>
          </a>
        </header>
        <MuiThemeProvider className='App'>

          <div style={{height: '100%', width: '100%'}}>
            <div className='left-menu'>
              <LeftMenu 
                label='Employeers'
                data={renderData.users}

              />
              <LeftMenu 
                label='Projects'
                data={renderData.users}

              />
            </div>
            <div className='main-space'>
              <div className='btn_panel'>
                <Button btnName='Show users' className='top_btn'/>
                <Button btnName='Show projects' className='top_btn'/>
              </div>

              <div>
                <MainTable className='main' data={renderData} />
              </div>

              <Modal 
                    data={renderData}
                    preset={preset}
                    handlerSubmit={this.handlerSubmit}
                    closeModal={this.closeModal} 
                    elementType={elementType}
                    elementAction={elementAction}
                    open={showModal}
                    list={list}
              /> 

            </div>
          </div>  
        </MuiThemeProvider>
        <footer className='footer'>
              <p className='company-copyright'>© DEVICO</p>
              <p className='version'>v0.1.0-develop</p>
        </footer>
      </div>
    )
  }
}

export default App;
