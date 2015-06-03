import React from 'react';
import { Flux, Actions, Store } from 'flummox';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';
import { PropTypes } from 'react';
import { contractPropTypes } from 'schema';
require('font-awesome-webpack');
require('./styles/Main.scss');
import assign from 'object-assign';
import I from 'immutable';
import moment from 'moment';


//================ ACTIONS =======================
export class CalendarActions extends Actions {
  toggleDay(day){ return day }
  updateDay(day, position, hours){ return {day, position, hours} }
}

export class ContractActions extends Actions {
  setIn(path, value){
    return {path, value}
  }

  merge(value){
    return value
  }
}

// //================ STORES =======================
class CalendarStore extends Store {
  constructor(flux) {
    super(); // Don't forget this step
    const CAL_ACTION_IDS = flux.getActionIds('calendar_actions');
    this.register(CAL_ACTION_IDS.toggleDay, this.handleToggleDay);
    this.register(CAL_ACTION_IDS.updateDay, this.handleUpdateDay);

    let day = { times: ['8:00 AM','5:00 PM'], active: false, valid: true };
    let work_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(name => assign({}, day, {name}));
    this.state = { work_days, total_time_in_ms: 0, all_dates_valid: true };
  }

  handleToggleDay(day){
    let work_days = I.fromJS(this.state.work_days).update(work_days => {
      work_days = work_days.map(work_day => {
        if (work_day.get('name') == day.name) {
          work_day = work_day.set('active', !work_day.get('active'))
          work_day = work_day.set('valid', this.getValidity(work_day.get('times').toJS()))
        };
        return work_day
      })
      return work_days
    })
    let total_time_in_ms = this.getTotalWorkDuration(work_days.toJS());
    this.setState({work_days: work_days.toJS(), total_time_in_ms, all_dates_valid: this.getTotalValidity(work_days.toJS())})
  }

  handleUpdateDay({day, position, hours}){
    let work_days = I.fromJS(this.state.work_days).update(work_days => {
      work_days = work_days.map(work_day => {
        if (work_day.get('name') == day) {
          work_day = work_day.update('times', old_hours => old_hours.set(position, hours))
          work_day = work_day.set('valid', this.getValidity(work_day.get('times').toJS()))
        };
        return work_day
      })
      return work_days
    })
    let total_time_in_ms = this.getTotalWorkDuration(work_days.toJS());
    this.setState({work_days: work_days.toJS(), total_time_in_ms, all_dates_valid: this.getTotalValidity(work_days.toJS())})
  }

  getWorkDuration(times){
    return moment(times[1], 'hh:mm A').diff(moment(times[0], 'hh:mm A')) ;
  }

  getValidity(times){
    // The start time is after the end time
    return moment(times[0], 'hh:mm A').isBefore(moment(times[1], 'hh:mm A'));
  }

  getTotalValidity(work_days){
    return work_days.reduce((prev, day) => prev && day.valid, true)
  }

  getTotalWorkDuration(work_days){
    let total_time_in_ms = 0;
    work_days.filter(day => day.active).forEach(day => {
      let time_diff = this.getWorkDuration(day.times);
      total_time_in_ms += time_diff;
    })
    return total_time_in_ms
  }
}
export class NavigationStore extends Store {
  constructor(flux){
    super();
    this.state = {
      sections: [
        {pages: ['About you', 'Parties', 'Location'], name: 'Getting Started'},
        {pages: ['Job Description', 'Additional Tasks'], name: 'Responsibilities'},
        {pages: [], name: 'Scheduling'},
        {pages: ['Pay Rate', 'Time Off', 'Cancellations', 'Room', 'Board'], name: 'Compensation & Provisions'},
        {pages: [], name: 'Insurance'},
        {pages: [], name: 'Deductions'},
        {pages: [], name: 'Evaluation'},
        {pages: ['Worker', 'Family'], name: 'Privacy & Confidentiality'},
        {pages: ['Severance & Lodging', 'Immediate Termination'], name: 'Termination'},
        {pages: [], name: 'Finish'}
      ]
    }
  }

}
class ContractStore extends Store {

  constructor(flux) {
    super(); // Don't forget this step
    const APP_ACTION_IDS = flux.getActionIds('app');
    const CONTRACT_ACTION_IDS = flux.getActionIds('contract_actions');
    this.register(CONTRACT_ACTION_IDS.setIn, this.handleSetIn);
    this.register(CONTRACT_ACTION_IDS.merge, this.handleMerge);


    this.state = {
      hourly_rate:9,
      overtime_rate:18,
      vacation_days: 2,
      personal_days: 2,
      parental_leave: {
        notice_length: 2,
        paid: false
      },
      reduced_hours_reg_wage: true,
      room: {
        provided: true,
        living_accommodations: {
        }

      }
    };
  }

  handleSetIn({path, value}){
    this.setState(I.fromJS(this.state).setIn(path, value).toJS())
  }

  handleMerge(value){
    this.setState(I.fromJS(this.state).merge(value).toJS())
  }
}
ContractStore.propTypes = contractPropTypes;


//================ APP =======================
export class AppFlux extends Flux {
  constructor() {
    super();
    // actions
    this.createActions('calendar_actions', CalendarActions);
    this.createActions('contract_actions', ContractActions);
    // stores
    this.createStore('nav', NavigationStore, this);
    this.createStore('contract', ContractStore, this);
    this.createStore('calendar', CalendarStore, this);
    // this.createStore('employee', EmployeeStore, this);
    // this.createStore('employer', EmployerStore, this);
  }
}
const flux = new AppFlux();

// The App
export default class App extends React.Component {

  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  }

  render() {
    return (
      <DocumentTitle title={'National Domestic Workers Alliance'}>
        <div>
          <RouteHandler {...this.props} />
        </div>
      </DocumentTitle>
    );
  }
}


App.defaultProps = {flux};