import React from 'react';
var t = require('tcomb-form');
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');

var Days = t.enums({
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday'
});

var Holidays = t.struct({
  "New Year's Day": t.Bool,
  "MLK Birthday": t.Bool,
  'Presidents Day': t.Bool,
  "Memorial Day": t.Bool,
  "Independence Day": t.Bool,
  "Labor Day": t.Bool,
  'Christmas Day': t.Bool,
  'Other': t.Bool
})

var Page1Form = t.struct({
  hourly_rate: t.Num,
  payment_frequency: t.enums({weekly: 'Weekly', monthly: 'Monthly'}),
  payday: Days,
  overtime_rate: t.Num,
  overtime_notice_length: t.Str,
  overtime_holidays: Holidays
});

var Page2Form = t.struct({
  vacation_days: t.Num,
  personal_days: t.Num,
  parental_leave_notice_length: t.Num,
  parental_leave_paid: t.Bool,
  parental_leave_paid_note: t.Str,
  parental_leave_length: t.Num,
  reduced_hours_reg_wage: t.Bool
});

var Page3Form = t.struct({
  cancelled_day_paid: t.Bool,
  bad_weather_day_paid: t.Bool
});

var Page4Form = t.struct({
  room_provided: t.Bool,
  room_size: t.Num,
  room_num_beds: t.Num,
  room_working_heat: t.Bool,
  room_heat_controlled: t.Bool,
  room_clean: t.Bool,
  room_entry_notice_length: t.Str,
  room_entry_emergency_repairs: t.Bool,
  room_entry_specific_repairs: t.Bool,
  room_entry_other: t.Bool,
  room_num_people: t.Num
});

var Page5Form = t.struct({
  board_provided: t.Bool,
  board_provided_house_food: t.Bool,
  board_provided_free_food: t.Bool,
  board_provided_bring_own_food: t.Bool,
  board_provided_paid_food_agreed: t.Bool,
  board_provided_paid_food_agreed_notes: t.Str
});


export default class SectionPage extends React.Component {
  save() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();

    // if validation fails, value will be null
    if (value) {
      // TODO: call the contract action creator to update the contract
      router.transitionTo('page', nextPageOrSection(this.props));
    }
  }

  getPage(){
    let formOptions = [
      {
        type: Page1Form,
        options: {
          fields: {
            overtime_holidays: {
              items: {
                factory: t.form.Checkbox
              }
            }
          }
        }
      },
      {
        type: Page2Form,
        options: {}
      },
      {
        type: Page3Form,
        options: {}
      },
      {
        type: Page4Form,
        options: {}
      },
      {
        type: Page5Form,
        options: {}
      }

      ];

    let page = (this.props.params.pageName || 1) - 1;
    return <Form
      ref="form"
      type={formOptions[page].type}
      options={formOptions[page].options}
    />
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