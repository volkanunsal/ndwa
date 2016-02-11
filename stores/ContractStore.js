import React from 'react';
import I from 'immutable';
import moment from 'moment';
import { Store } from 'flummox';
import assign from 'object-assign';
import { contractPropTypes } from 'schema';
import request from 'superagent';

export default class ContractStore extends Store {

  constructor(flux) {
    super(); // Don't forget this step
    this.flux = flux;

    const APP_ACTION_IDS = flux.getActionIds('app');
    const CONTRACT_ACTION_IDS = flux.getActionIds('contract_actions');
    this.register(CONTRACT_ACTION_IDS.setIn, this.handleSetIn);
    this.register(CONTRACT_ACTION_IDS.merge, this.handleMerge);
    this.register(CONTRACT_ACTION_IDS.addParties, this.handleAddParties);

    const CAL_ACTION_IDS = flux.getActionIds('calendar_actions');
    this.register(CAL_ACTION_IDS.toggleDay, this.handleToggleDay);
    this.register(CAL_ACTION_IDS.updateDay, this.handleUpdateDay);


    let day = { times: ['8:00 AM','5:00 PM'], active: false, valid: true };
    let work_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(name => assign({}, day, {name}));


    this.state = {
      work_days,
      work_week_duration: 0,
      valid_work_schedule: true,
      hourly_rate: 18,
      overtime_rate: 18*1.5,
      vacation_days: 2,
      personal_days: 2,
      parental_leave: {
        notice_length: 2,
        paid: false
      },
      reduced_hours_reg_wage: true,
      board_provided: true,
      termination_notice_length: 2,
      termination_severance_length: 4,
      termination_lodging_length: 30,
      room: {
        provided: true,
        living_accommodations: {}
      },
      deductions_taken: true,
      cancelled_day_paid: true,
      bad_weather_day_paid: true,
      benefits: {
        health: true,
        transportation: true
      },
      evaluation_after_three_months: true,
      evaluation_every_year: true,
      termination_paid_if_evicted_early: true
    };
  }

  handleSetIn({path, value}){
    this.setState(I.fromJS(this.state).setIn(path, value).toJS())
  }

  handleMerge(value){
    this.setState(I.fromJS(this.state).merge(value).toJS())
    // Check the invariants
    let {overtime_rate, hourly_rate} = this.state;
    if (Number(overtime_rate) <= (Number(hourly_rate) * 1.5)) {
      this.setState({overtime_rate: hourly_rate * 1.5})
    };
  }

  handleAddParties(){
    let {employer, employee} = this.state;
    let {additional_info, name, phone, address} = employer;
    this.addPartiesToMailingList(additional_info, name, phone, 'employer', address);
    this.addPartiesToMailingList(employee.additional_info, employee.name, employee.phone, 'employee', employee.address);
  }

  addPartiesToMailingList(additional_info, NAME, PHONE, USER_TYPE, ADDR1){
    let url = 'https://us10.api.mailchimp.com/2.0/lists/subscribe';

    let args = {};

    request
      .post(url)
      .query(args)
      .end(function(err, res){
         console.log(res)
      });
  }

  handleToggleDay(day){
    let work_days = I.fromJS(this.state.work_days).update(work_days => {
      work_days = work_days.map(work_day => {
        if (work_day.get('name') == day.name) {
          work_day = work_day.set('active', !work_day.get('active'))
          work_day = work_day.set('valid', this.getWorkDayValidity(work_day.get('times').toJS()))
        };
        return work_day
      })
      return work_days
    })
    let work_week_duration = this.getWorkWeekInMS(work_days.toJS());
    this.setState({work_days: work_days.toJS(), work_week_duration, valid_work_schedule: this.getWorkWeekValidity(work_days.toJS())})
  }

  handleUpdateDay({day, position, hours}){
    let work_days = I.fromJS(this.state.work_days).update(work_days => {
      work_days = work_days.map(work_day => {
        if (work_day.get('name') == day) {
          work_day = work_day.update('times', old_hours => old_hours.set(position, hours))
          work_day = work_day.set('valid', this.getWorkDayValidity(work_day.get('times').toJS()))
        };
        return work_day
      })
      return work_days
    })
    let work_week_duration = this.getWorkWeekInMS(work_days.toJS());
    this.setState({work_days: work_days.toJS(), work_week_duration, valid_work_schedule: this.getWorkWeekValidity(work_days.toJS())})
  }

  getWorkDayDuration(times){
    return moment(times[1], 'hh:mm A').diff(moment(times[0], 'hh:mm A')) ;
  }

  getWorkDayValidity(times){
    // The start time is after the end time
    return moment(times[0], 'hh:mm A').isBefore(moment(times[1], 'hh:mm A'));
  }

  getWorkWeekValidity(work_days){
    // Active workdays are all valid
    return work_days.filter(day => day.active).reduce((prev, day) => prev && day.valid, true)
  }

  getWorkWeekInMS(work_days){
    let work_week_duration = 0;
    work_days.filter(day => day.active).forEach(day => {
      let time_diff = this.getWorkDayDuration(day.times);
      work_week_duration += time_diff;
    })
    return work_week_duration
  }
}
ContractStore.propTypes = contractPropTypes;
