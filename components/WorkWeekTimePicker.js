import React from 'react';
import t from 'tcomb-form';
import moment from 'moment';
import cx from 'classnames';
import {MyModal, TipTrigger} from '../components/MyModal';

var THour = t.subtype(t.Str, function(val){
  // assert both hour and minute are numbers
  return val != '' && !isNaN(Number(val)) && Number(val) <= 12 && Number(val) >= 0
})

var TMinute = t.subtype(t.Str, function(val){
  // assert both hour and minute are numbers
  return val != '' && !isNaN(Number(val)) && Number(val) < 60 && Number(val) >= 0
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
    return <span
      className={cs}
      onClick={this.toggleDay.bind(this)}>
        {this.props.value.name}
    </span>
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

export default class WorkWeekTimePicker extends React.Component {

  render(){
    let {flux, contract} = this.props;
    let {work_week_duration, work_days} = contract;
    work_days = work_days.map((day,i) => {
      let {name, times, valid} = day;
      let {active} = day;

      return <div className='col-lg-1 col-md-12 col-sm-12 col-xs-12' key={i}>
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



    let totalHours = Math.round(moment.duration(work_week_duration, 'milliseconds').asHours());

    let weeklyTotalHours = <input
      type='text'
      readOnly={true}
      tabIndex={-1}
      value={totalHours}
      className='form-control total-hours'
      style={{height: 'inherit', textAlign: 'right', outline: 'none'}}/>

    return <div>
      <p className='lead'>What are the hours employee is scheduled to work?</p>
      <div className='row calendar-row'>
        <div className='col-lg-1'>
          <ul className='list-unstyled'>
            <li className='label-yellow label'>Day</li>
            <li className='label-green label'>Start</li>
            <li className='label-red label'>End</li>
          </ul>
        </div>
        {work_days}
      </div>
      <div className='row calendar-row'>
        <div className='col-lg-2'>
          <ul className='list-unstyled'>
            <li className='label-blue label'>Weekly Total (in hours)</li>
          </ul>
        </div>
        <div className='col-lg-1'>
          <ul className='list-unstyled'>
            <li>{weeklyTotalHours}</li>
          </ul>
          <TipTrigger anchorText='9' modalContent={<div>
            <p>Domestic workers who work at least 40 hours a week are entitled to 24 consecutive hours of rest each week and 48 consecutive hours of rest each month.</p>
          </div>}/>
        </div>
      </div>
    </div>
  }
}
