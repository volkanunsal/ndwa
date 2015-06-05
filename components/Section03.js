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

  saveSchedule() {
    let {contract} = this.props;
    let validatorFn = this.getValidator();
    let {work_week_duration, valid_work_schedule} = contract;
    let isValid = t.validate({work_week_duration, valid_work_schedule}, validatorFn()).isValid();
    this.setState({isValid})

    // if fieldValidation fails, value will be null
    if (isValid) {
      router.transitionTo('page', nextPageOrSection(this.props));
    }
  }

  render() {
    let errorMsg = this.state.isValid ? null : <div className='alert alert-danger'>{this.state.errorMsg}</div>
    return <div className='form-section'>
      <div className='container-fluid'>
        {errorMsg}
        <WorkWeekTimePicker {...this.props}/>
      </div>
      <ActionBar onSave={this.saveSchedule.bind(this)}/>
    </div>
  }
}