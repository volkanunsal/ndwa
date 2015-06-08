import React from 'react';

export default class ActionBar extends React.Component {
  handleValidate(){
    let {contract, flux} = this.props;
    flux.getActions('form_actions').validateSections(contract)
  }
  render(){
    // <a className='btn btn-danger navbar-btn' onClick={this.handleValidate.bind(this)}>Validate</a>
    return <div className='navbar navbar-default navbar-fixed-bottom'>
      <div className='container-fluid'>
        <a className='btn btn-primary navbar-btn' onClick={this.props.onSave}>Save</a>
      </div>
    </div>
  }
}