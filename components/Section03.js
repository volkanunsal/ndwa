import React from 'react';
import t from 'tcomb-form';
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import FluxComponent from 'flummox/component';
import ActionBar from './ActionBar';
import decorators from '../utils/decorators';
import WorkWeekTimePicker from './WorkWeekTimePicker';

var TNonZero = t.subtype(t.Num, function(value){
  return value > 0
})


export default class SectionPage extends React.Component {
  constructor(flux){
    super();
    this.state = {errorMsg: 'The schedule you specified is not valid.', isValid: true};
  }
  save(calendar) {
    let WorkSchedule = t.struct({
      work_duration: TNonZero
    });

    let formValues = {
      work_duration: calendar.total_time_in_ms
    };

    let fieldValidation = t.validate(formValues, WorkSchedule);
    let isValid = fieldValidation.isValid() && calendar.all_dates_valid;
    this.setState({isValid})

    // if fieldValidation fails, value will be null
    if (isValid) {
      // TODO: call the contract action creator to update the contract
      router.transitionTo('page', nextPageOrSection(this.props));
    }
  }

  render() {
    let page = (this.props.params.pageName || 1) - 1;
    let errorMsg = this.state.isValid ? null : <div className='alert alert-danger'>{this.state.errorMsg}</div>

    return <div className='form-section'>
      <div className='container-fluid'>
        {errorMsg}
        <FluxComponent
          connectToStores={{calendar: store => ({ calendar: store.state })}}
          {...this.props}>
          <WorkWeekTimePicker/>
        </FluxComponent>
      </div>
      <ActionBar handleSave={this.save.bind(this, this.props.calendar)}/>
    </div>
  }
}