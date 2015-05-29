import React from 'react';
var t = require('tcomb-form');
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import assign from 'object-assign';
// import Tweenable from '../utils/Tweenable';
//     "react-tween-state": "0.5.3",

var TMinute = t.subtype(t.Str, function(val){
  // assert both hour and minute are numbers
  return val != '' && !isNaN(Number(val)) && Number(val) < 60 && Number(val) >= 0
})

var lpad = (num)=>{
  if (String(num).split('').length == 1) { num = '0' + num};
  return num
}

// @Tweenable
class TimePicker extends React.Component {
  constructor(flux){
    super();
    // console.log(this.props)
    this.state = {
      active: false,
      meridiem: 'AM'
    };
  }

  componentWillMount(){
    this.setState({
      hours: this.props.value.getHours(),
      minutes: lpad(this.props.value.getMinutes())
    })
  }

  handleClick(){
    if (!this.state.active) {
      this.setState({active: true})
    };

  }

  handleRemoveDayClick(){
    this.setState({active: false})
  }

  handleMinuteChange(e){
    e.preventDefault();
    if (TMinute.is(e.target.value) || e.target.value == '') {
      this.setState({minutes: e.target.value})
    };

  }

  handleMinuteBlur(){
    let val = this.state.minutes;
    if (TMinute.is(this.state.minutes)) {
      this.setState({minutes: lpad(this.state.minutes)})
    }else{
      this.setState({minutes: lpad("0")})
    }
  }

  handleMeridiemClick(){
    this.setState({meridiem: this.state.meridiem == 'AM' ? 'PM' : 'AM'})
  }

  render(){
    let {minutes,hours} = this.state;
    // let numStyle = {};
    let time = <div className='time-input-wrapper'>
      <input type='number' className='time-input-field left' min={1} max={12} defaultValue={hours}/><span>:</span><input className='time-input-field right' defaultValue={lpad(minutes)} onChange={this.handleMinuteChange.bind(this)} value={this.state.minutes} onBlur={this.handleMinuteBlur.bind(this)}/><span onClick={this.handleMeridiemClick.bind(this)} ref='meridiem' className='time-input-meridiem'><span>{this.state.meridiem}</span></span>
    </div>

    // console.log(this.props.value);
    let cs = this.state.active ? 'time-picker-cell active' : 'time-picker-cell';
    let value = this.state.active ? time : ' day off';
    let controls = this.state.active ? <div className='time-picker-controls'>
      <a className='fa fa-times close remove-day' onClick={this.handleRemoveDayClick.bind(this)}/>
      <a className='fa fa-repeat close repeat-day'/>
    </div> : null;
    return <div className={cs} onClick={this.handleClick.bind(this)}>
        {value}
        {controls}
      </div>

  }
}

class WorkDayTimePicker extends React.Component {
  render(){
    let work_days = this.props.work_days.map((day,i) => {
      return <div className='col-lg-1' key={i}>
          <ul className='list-unstyled'>
            <li><b>{day.name}</b></li>
            <li><TimePicker value={day.start_time}/></li>
            <li><TimePicker value={day.end_time}/></li>
          </ul>
        </div>
    })
    return <div>
      <h3>What are the hours employee is scheduled to work?</h3>
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
            <li className='label-warning label'>Weekly Total</li>
          </ul>
        </div>
        <div className='col-lg-1'>
          <ul className='list-unstyled'>
            <li><input type='text' readOnly={true} tabIndex={-1} className='form-control' style={{height: 'inherit', textAlign: 'right', outline: 'none'}} defaultValue={0} /></li>
          </ul>
        </div>
      </div>
    </div>
  }
}

export default class SectionPage extends React.Component {
  save() {
    // call getValue() to get the values of the form
    // var value = this.refs.form.getValue();
    let value = null;

    // if validation fails, value will be null
    if (value) {
      // TODO: call the contract action creator to update the contract
      router.transitionTo('page', nextPageOrSection(this.props));
    }
  }

  getPage(){
    let page = (this.props.params.pageName || 1) - 1;
    let day = {
              name: 'Monday',
              start_time: new Date(2015,1,0,8,0),
              end_time: new Date(2015,1,0,5,0)
            };
    let work_days = [
      assign({}, day, {name: 'Monday'}),
      assign({}, day, {name: 'Tuesday'}),
      assign({}, day, {name: 'Wednesday'}),
      assign({}, day, {name: 'Thursday'}),
      assign({}, day, {name: 'Friday'}),
      assign({}, day, {name: 'Saturday'}),
      assign({}, day, {name: 'Sunday'})
    ];

    return <WorkDayTimePicker work_days={work_days} />
  }
  render() {
    return <div className='form-section'>
      <div className='container-fluid'>
        {this.getPage()}
        <a className='btn btn-primary' onClick={this.save.bind(this)}>Save</a>
      </div>
    </div>
  }
}