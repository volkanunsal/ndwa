import React from 'react';
import I from 'immutable';
import moment from 'moment';
import { Store } from 'flummox';
import assign from 'object-assign';

export default class CalendarStore extends Store {
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
          work_day = work_day.set('valid', this.getWorkDayValidity(work_day.get('times').toJS()))
        };
        return work_day
      })
      return work_days
    })
    let total_time_in_ms = this.getWorkWeekInMS(work_days.toJS());
    this.setState({work_days: work_days.toJS(), total_time_in_ms, all_dates_valid: this.getWorkWeekValidity(work_days.toJS())})
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
    let total_time_in_ms = this.getWorkWeekInMS(work_days.toJS());
    this.setState({work_days: work_days.toJS(), total_time_in_ms, all_dates_valid: this.getWorkWeekValidity(work_days.toJS())})
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
    let total_time_in_ms = 0;
    work_days.filter(day => day.active).forEach(day => {
      let time_diff = this.getWorkDayDuration(day.times);
      total_time_in_ms += time_diff;
    })
    return total_time_in_ms
  }
}