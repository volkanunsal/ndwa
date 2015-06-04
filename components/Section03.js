import React from 'react';
var t = require('tcomb-form');
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import FluxComponent from 'flummox/component';
import cx from 'classnames';
import moment from 'moment';
import ActionBar from './ActionBar';


var THour = t.subtype(t.Str, function(val){
  // assert both hour and minute are numbers
  return val != '' && !isNaN(Number(val)) && Number(val) <= 12 && Number(val) >= 0
})

var TMinute = t.subtype(t.Str, function(val){
  // assert both hour and minute are numbers
  return val != '' && !isNaN(Number(val)) && Number(val) < 60 && Number(val) >= 0
})

var TNonZero = t.subtype(t.Num, function(value){
  return value > 0
})

var lpad = (num)=>{
  if (String(num).split('').length == 1) { num = '0' + num};
  return num
}

class DayPicker extends React.Component {

  toggleDay(){
    this.props.flux.getActions('calendar_actions').toggleDay(this.props.value)
  }

  render(){
    let {active} = this.props;

    let cs = cx({
      active, 'day-name': true
    })
    return <b
      className={cs}
      onClick={this.toggleDay.bind(this)}>
        {this.props.value.name}
    </b>
  }
}

// @Tweenable
class TimePicker extends React.Component {

  componentWillMount(){
    let {time} = this.props;
    this.normalizeTime(time)
  }

  shouldComponentUpdate(np,ns){
    return this.isUpdated(ns, np)
  }

  componentDidUpdate(prevProps, prevState){
    if (this.isUpdatedLocally(prevState, prevProps)) {
      this.props.flux.getActions('calendar_actions').updateDay(this.props.day, this.props.position, this.toString())
    };
  }

  isUpdated(ns, np){
    return this.isUpdatedLocally(ns, np) || np.active != this.props.active || np.valid != this.props.valid
  }

  isUpdatedLocally(ns, np){
    return ns.hours != this.state.hours || ns.minutes != this.state.minutes || ns.meridiem != this.state.meridiem
  }

  normalizeTime(time){
    let mtime     = moment(time, 'hh:mm A')
    let meridiem  = this.meridiem(mtime.hours());
    let hours     = lpad(this.normalizeHours(mtime.hours()));
    let minutes   = lpad(mtime.minutes());
    this.setState({minutes, hours, meridiem})
  }

  meridiem(hours) {
    return hours < 12 ? 'AM' : 'PM';
  }

  normalizeHours(hours){
    return hours > 12 ? hours - 12 : hours;
  }

  toString(){
    let {minutes, hours, meridiem} = this.state;
    return `${hours}:${minutes} ${meridiem}`
  }

  handleHourChange(e){
    let hours = e.target.value;
    if (hours.length > 2) { return false };
    if (THour.is(e.target.value) || e.target.value == '') {
      this.setState({hours})
    }
  }

  handleMinuteChange(e){
    e.preventDefault();
    let minutes = e.target.value;
    if (minutes.length > 2) { return false };
    if (TMinute.is(e.target.value) || e.target.value == '') {
      this.setState({minutes})
    };
  }

  handleMinuteBlur(){
    let {minutes} = this.state;
    minutes = TMinute.is(minutes) ? lpad(minutes) : lpad(0);
    this.setState({minutes})
  }

  handleHourBlur(){
    let {hours} = this.state;
    hours = TMinute.is(hours) ? lpad(hours) : lpad(0);
    this.setState({hours})
  }

  handleMeridiemClick(){
    let {meridiem} = this.state;
    this.setState({meridiem: meridiem == 'AM' ? 'PM' : 'AM'})
  }

  render(){
    let {minutes, hours, meridiem} = this.state;
    let {active, valid} = this.props;

    let hourField = <input
      type='number'
      className='time-input-field left'
      value={hours}
      min={0}
      max={12}
      onChange={this.handleHourChange.bind(this)}
      onBlur={this.handleHourBlur.bind(this)}/>;

    let minuteField = <input
      type='number'
      className='time-input-field right'
      onChange={this.handleMinuteChange.bind(this)}
      value={minutes}
      min={0}
      max={59}
      step={10}
      onBlur={this.handleMinuteBlur.bind(this)}/>;

    let meridiemField = <span
      className='time-input-meridiem'
      onClick={this.handleMeridiemClick.bind(this)}>
        <span>{meridiem}</span>
      </span>;

    let time = <div className='time-input-wrapper'>
      {hourField}<span>:</span>{minuteField}{meridiemField}
    </div>

    let cs = cx({
      active,
      invalid: !valid,
      'time-picker-cell': true
    })

    let value = active ? time : ' day off';
    return <div className={cs}>
      {value}
    </div>

  }
}

class WorkWeekTimePicker extends React.Component {

  render(){
    let {flux, calendar} = this.props;
    let work_days = this.props.calendar.work_days.map((day,i) => {
      let {name, times, valid} = day;
      let {active} = day;

      return <div className='col-lg-1' key={i}>
          <ul className='list-unstyled'>
            <li>
              <DayPicker
                value={day}
                active={active}
                flux={flux} />
            </li>
            <li>
              <TimePicker
                time={times[0]}
                position={0}
                day={name}
                flux={flux}
                valid={valid}
                active={active} />
            </li>
            <li>
              <TimePicker
                time={times[1]}
                position={1}
                day={name}
                flux={flux}
                valid={valid}
                active={active} />
            </li>
          </ul>
        </div>
    })

    let totalHours = Math.round(moment.duration(calendar.total_time_in_ms, 'milliseconds').asHours());

    let weeklyTotalHours = <input
      type='text'
      readOnly={true}
      tabIndex={-1}
      value={totalHours}
      className='form-control'
      style={{height: 'inherit', textAlign: 'right', outline: 'none'}}/>

    let weeklyTotalMS = <input
      type='hidden'
      tabIndex={-1}
      value={calendar.total_time_in_ms}/>;

    return <div>
      <p className='lead'>What are the hours employee is scheduled to work?</p>
      <div className='row calendar-row'>
        <div className='col-lg-1'>
          <ul className='list-unstyled'>
            <li className='label-danger label'>Day</li>
            <li className='label-warning label'>Start</li>
            <li className='label-success label'>End</li>
          </ul>
        </div>
        {work_days}
      </div>
      <div className='row calendar-row'>
        <div className='col-lg-2'>
          <ul className='list-unstyled'>
            <li className='label-warning label'>Weekly Total (in hours)</li>
          </ul>
        </div>
        <div className='col-lg-1'>
          <ul className='list-unstyled'>
            <li>{weeklyTotalHours}</li>
          </ul>
        </div>
      </div>
      {weeklyTotalMS}
    </div>
  }
}

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
      work_duration: this.props.calendar.total_time_in_ms
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
          connectToStores={{calendar: store => ({ calendar: store.state })}} {...this.props}>
          <WorkWeekTimePicker/>
        </FluxComponent>
      </div>
      <ActionBar handleSave={this.save.bind(this, this.props.calendar)}/>
    </div>
  }
}