import React from 'react';
import t from 'tcomb-form';
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import FluxComponent from 'flummox/component';
import ActionBar from './ActionBar';
import decorators from '../utils/decorators';
import WorkWeekTimePicker from './WorkWeekTimePicker';

@decorators.getForm
export default class SectionPage extends React.Component {
  constructor(flux){
    super();
    this.state = {errorMsg: 'The schedule you specified is not valid.', isValid: true};
  }

  render() {
    let errorMsg = this.state.isValid ? null : <div className='alert alert-danger'>{this.state.errorMsg}</div>
    return <div className='form-section'>
      <div className='container-fluid'>
        {errorMsg}
        <WorkWeekTimePicker {...this.props}/>
      </div>
      <ActionBar {...this.props} onSave={this.saveSchedule.bind(this)}/>
    </div>
  }
}