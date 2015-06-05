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
  save(contract) {
    let validatorFn = this.getValidator();

    let formValues = {
      work_week_duration: contract.work_week_duration,
      valid_work_schedule: contract.valid_work_schedule
    };

    let isValid = t.validate(formValues, validatorFn()).isValid();

    this.setState({isValid})

    // if fieldValidation fails, value will be null
    if (isValid) {
      // TODO: call the contract action creator to update the contract
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
      <ActionBar handleSave={this.save.bind(this, this.props.contract)}/>
    </div>
  }
}