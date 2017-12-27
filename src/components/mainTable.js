import React, { Component } from 'react';

class Table extends Component {


  render() {
    const { data } = this.props;
    let tbody;
    let counter = 0;
    if (data.users && data.users.length > 0) {
      tbody = data.users.map(item => {
        let proj;
        let hours;
        counter++;
        if (item.projects.length > 0) {
          proj = item.projects.map(elem => {
            return <div style={{height: '20px'}} key={item._id + item.projects.id}>{elem.name}</div>
          })  
          hours = item.projects.map(elem => {
            return <div style={{height: '20px'}} key={item.projects.id + elem.hours}>{elem.hours}</div>
          })
        }
        console.log(item._id + 'proj');
        return  <tr key={item._id + counter}>
                  <td key={item._id + item.name}>{item.name}</td>
                  <td key={item._id + 'proj'}>{proj}</td>
                  <td key={item._id + 'hours'}>{hours}</td>
                </tr>
      })
    } else {
      tbody = <tr>No data</tr>
    }
    return  <table className='mainTable'>
              <thead><th>User</th><th>Projects</th><th>Hours</th></thead>
              <tbody>{tbody}</tbody>
            </table>
  }
}

export default Table;
