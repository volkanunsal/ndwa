import React from 'react';

export default class ActionBar extends React.Component {

  render(){

    // <a className='btn btn-danger navbar-btn' onClick={this.handleValidate.bind(this)}>Validate</a>
    return <div className='navbar navbar-default navbar-fixed-bottom action-bar'>
      <div className='container-fluid'>
        <a href='http://www.faircarelabs.org/' target='_blank' className='pull-left'>
          <img src={require('../images/greyfcl.png')} style={{height: 50}}/>
        </a>
        <a className='btn btn-yesno navbar-btn pull-right' onClick={this.props.onSave}>CONTINUE</a>
      </div>
    </div>
  }
}
