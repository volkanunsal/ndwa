import React from 'react';
  
export default class ActionBar extends React.Component {
  render(){
    return <div className='navbar navbar-default navbar-fixed-bottom'>
      <div className='container-fluid'>
        <a className='btn btn-primary navbar-btn' onClick={this.props.handleSave}>Save</a>
      </div>
    </div>
  }
}