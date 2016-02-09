import React from 'react';
import { PropTypes } from 'react/addons';
var T = PropTypes;


var TRecipient = T.shape({
  name: T.string,
  age: T.string,
  description_of_care: T.string
});

var TWorkDay = T.shape({
  times: T.array,
  name: T.string
});

module.exports = {
  additional_tasks: T.string,
  bad_weather_day_paid: T.bool,
  benefits: T.shape({
    health: T.bool,
    transportation: T.bool,
    notes: T.string
  }),
  board_no: T.shape({
    bring_own_food: T.bool,
    food_paid: T.bool,
    food_paid_notes: T.string
  }),
  board_provided: T.bool,
  board_yes: T.shape({
    house_food: T.bool,
    free_food: T.bool
  }),
  cancelled_day_paid: T.bool,
  childcare_tasks: T.arrayOf(T.string),
  children: T.arrayOf(TRecipient),
  cleaning_tasks: T.arrayOf(T.string),
  complaint_handling_process: T.string,
  deductions: T.shape({
    state_income_tax: T.string,
    federal_income_tax: T.string,
    health_insurance: T.string,
    food: T.string,
    lodging: T.string,
    other: T.string
  }),
  employee: T.shape({
    name: T.string,
    address: T.string,
    phone: T.string,
    additional_info: T.string
  }).isRequired,
  employer: T.shape({
    name: T.string,
    address: T.string,
    phone: T.string,
    additional_info: T.string
  }).isRequired,
  evaluation_after_three_months: T.bool,
  evaluation_every_year: T.bool,
  family_privacy: T.shape({
    restrict_private_comm: T.bool,
    surveillance: T.bool,
    take_away_personal_docs: T.bool,
    force_service: T.bool,
    notes: T.string
  }),
  hourly_rate: T.number,
  immediate_termination_grounds: T.string,
  overtime_holidays: T.shape({
    "New Year's Day": T.bool,
    "MLK Birthday": T.bool,
    "Presidents Day": T.bool,
    "Memorial Day": T.bool,
    "Independence Day": T.bool,
    "Labor Day": T.bool,
    "Thanksgiving Day": T.bool,
    "Christmas Day": T.bool
  }),
  overtime_holidays_other: T.string,
  overtime_notice_length: T.string,
  overtime_rate: T.number,
  parental_leave: T.shape({
    notice_length: function(props, propName, componentName) {
      if (props[propName] < 2) {
        return new Error('Parental leave norice length must be at least 2 weeks!');
      }
    },
    paid: T.bool,
    paid_note: T.string
  }),
  payday: T.oneOf([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ]),
  payment_frequency: T.oneOf([
    'daily',
    'weekly',
    'biweekly',
    'monthly',
    'other'
  ]),
  personal_days: T.number,
  reduced_hours_reg_wage: T.bool,
  room: T.shape({
    provided: T.bool,
    living_accomodations: T.shape({
      size: T.number,
      num_beds: T.number,
      working_heat: T.bool,
      heat_controlled: T.bool,
      clean: T.bool,
      num_people: T.number,
      entry: T.shape({
        notice_length: T.bool,
        emergency_repairs: T.bool,
        specific_repairs: T.bool,
        other: T.string
      })
    })
  }),
  start_date: T.any,
  termination_lodging_length: T.number,
  termination_notice_length: T.number,
  termination_paid_if_evicted_early: T.bool,
  termination_severance_length: T.number,
  vacation_days: T.number,
  valid_work_schedule: T.bool,
  work_address: T.string.isRequired,
  work_days: T.arrayOf(TWorkDay).isRequired,
  work_week_duration: T.number,
  worker_privacy: T.shape({
    info_disclosure_permitted: T.bool,
    family_pics_sharing_permitted: T.bool,
    notes: T.string
  }),
  workers_comp_insurance: T.shape({
    company: T.string,
    policy: T.string
  })
}