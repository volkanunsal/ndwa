import React from 'react';

export default class ActionBar extends React.Component {
  handleValidate(){
    let {contract, flux} = this.props;
    flux.getActions('form_actions').validateSections(contract)
  }
  render(){
    return <div className='navbar navbar-default navbar-fixed-bottom'>
      <div className='container-fluid'>
        <div className='btn-group'>
          <a className='btn btn-primary navbar-btn' onClick={this.props.onSave}>Save</a>
          <a className='btn btn-danger navbar-btn' onClick={this.handleValidate.bind(this)}>Validate</a>
        </div>
      </div>
    </div>
  }
}