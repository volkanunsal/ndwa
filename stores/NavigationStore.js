import React from 'react';
import I from 'immutable';
import moment from 'moment';
import { Store } from 'flummox';
import assign from 'object-assign';
import t from 'tcomb-form';

var Recipient = t.struct({
  name: t.Str,
  age: t.Num,
  description_of_care: t.Str
});


export default class NavigationStore extends Store {
  constructor(flux){
    super();
    this.state = {
      sections: [
        {
          name: 'Getting Started',
          pages: [
            {
              name: 'About you',
              types: function(contract){
                return t.struct({
                  user_type: t.enums({
                    W: 'Domestic Worker',
                    E: 'Employer'
                  })
                });
              }
            },
            {
              name: 'Parties',
              types: function(contract){
                return t.struct({
                  employer: t.struct({
                    name: t.Str,
                    address: t.Str,
                    phone: t.Str,
                    email: t.maybe(t.Str)
                  }),
                  employee: t.struct({
                    name: t.Str,
                    address: t.Str,
                    phone: t.Str,
                    email: t.maybe(t.Str)
                  })
                });
              }
            },
            {
              name: 'Location',
              types: function(contract){
                return t.struct({
                  work_address: t.Str,
                  start_date: t.Dat
                });
              }
            }
          ]
        },
        {
          name: 'Responsibilities',
          pages: [
            {
              name: 'Job Description',
              types: function(contract){
                return t.struct({
                  children: t.list(Recipient),
                  childcare_tasks: t.list(t.Str),
                  cleaning_tasks: t.list(t.Str),
                  home_care_recipients: t.list(Recipient),
                  home_care_tasks: t.list(t.Str)
                })
              }
            },
            {
              name: 'Additional Tasks',
              types: function(contract){
                return t.struct({
                  description: t.maybe(t.Str)
                });
              }
            }
          ]
        },
        {
          name: 'Scheduling',
          pages: [
            {
              types: function(contract){
                // TODO: encode the schedule type
              }
            }
          ]
        },
        {
          name: 'Compensation & Provisions',
          pages: [
            {
              name: 'Pay Rate',
              types: function(contract){
                return t.struct({
                  hourly_rate: t.subtype(t.Num, n => n > 9 ),
                  overtime_rate: t.Num,
                  payment_frequency: t.enums({
                    weekly: 'Weekly',
                    monthly: 'Monthly'
                  }),
                  payday: t.enums({
                    monday: 'Monday',
                    tuesday: 'Tuesday',
                    wednesday: 'Wednesday',
                    thursday: 'Thursday',
                    friday: 'Friday',
                    saturday: 'Saturday',
                    sunday: 'Sunday'
                  }),
                  overtime_notice_length: t.Str,
                  overtime_holidays: t.maybe(t.struct({
                    "New Year's Day":t.Bool,
                    "MLK Birthday":t.Bool,
                    'Presidents Day':t.Bool,
                    "Memorial Day":t.Bool,
                    "Independence Day":t.Bool,
                    "Labor Day":t.Bool,
                    'Christmas Day':t.Bool
                  }))
                });
              }
            },
            {
              name: 'Time Off',
              types: function(contract){
                let {parental_leave} = contract;

                let parental_leave_struct = t.struct({
                  notice_length: t.subtype(t.Num, n => Number(n) >= 2),
                  paid: t.Bool
                });

                if (parental_leave && parental_leave.paid) {
                  parental_leave_struct = parental_leave_struct.extend({paid_note: t.Str})
                };

                return t.struct({
                  vacation_days: t.Num,
                  personal_days: t.Num,
                  parental_leave: parental_leave_struct,
                  reduced_hours_reg_wage: t.Bool
                });
              }
            },
            {
              name: 'Cancellations',
              types: function(contract){
                return t.struct({
                  cancelled_day_paid: t.Bool,
                  bad_weather_day_paid: t.Bool
                })
              }
            },
            {
              name: 'Room',
              types: function(contract){
                let {room} = contract;

                let room_struct = t.struct({
                  provided: t.Bool
                });

                if (room && room.provided) {
                  let living_accommodations_struct = t.struct({
                    size: t.Num,
                    num_beds: t.Num,
                    working_heat: t.Bool
                  });
                  if (room.living_accommodations && room.living_accommodations.working_heat) {
                    living_accommodations_struct = living_accommodations_struct.extend({
                      heat_controlled: t.Bool
                    })
                  };
                  // HACK: This is a bit of a hack, but the order option is not working for nested forms.
                  living_accommodations_struct = living_accommodations_struct.extend({
                    clean: t.Bool,
                    num_people: t.Num,
                    entry: t.struct({
                      notice_length: t.Bool,
                      emergency_repairs: t.Bool,
                      specific_repairs: t.Bool,
                      other: t.maybe(t.Str)
                    })
                  })
                  room_struct = room_struct.extend({
                    living_accommodations: living_accommodations_struct
                  });
                };

                return t.struct({
                  room: room_struct
                });
              }
            },
            {
              name: 'Board',
              types: function(contract){
                let {board_provided} = contract;

                let Page = t.struct({
                  board_provided: t.Bool
                });

                if (board_provided == true) {
                  Page = Page.extend({
                    board_yes: t.struct({
                      house_food: t.Bool,
                      free_food: t.Bool
                    })
                  })
                };

                if (board_provided == false) {
                  Page = Page.extend({
                    board_no: t.struct({
                      bring_own_food: t.Bool,
                      food_paid: t.Bool,
                      food_paid_notes: t.Str
                    })
                  });
                };
                return Page
              }
            }
          ]
        },
        {
          name: 'Insurance',
          pages: [
            {
              types: function(contract){
                return t.struct({
                  benefits: t.struct({
                    health: t.Bool,
                    transportation: t.Bool,
                    notes: t.maybe(t.Str)
                  }),
                  workers_comp_insurance: t.struct({
                    company: t.Str,
                    policy: t.Str
                  })
                });
              }
            }
          ]
        },
        {
          name: 'Deductions',
          pages: [
            {
              types: function(contract){
                let Page = t.struct({
                  deductions_taken: t.Bool
                });
                if (contract.deductions_taken) {
                  Page = Page.extend({
                    deductions: t.struct({
                      state_income_tax: t.Str,
                      federal_income_tax: t.Str,
                      health_insurance: t.Str,
                      food: t.Str,
                      lodging: t.Str,
                      other: t.Str
                    })
                  });
                };
                return Page
              }
            }
          ]
        },
        {
          name: 'Evaluation',
          pages: [
            {
              types: function(contract){
                return t.struct({
                  evaluation_after_three_months: t.Bool,
                  evaluation_every_year: t.Bool,
                  complaint_handling_process: t.Str
                });
              }
            }
          ]
        },
        {
          name: 'Privacy & Confidentiality',
          pages: [
            {
              name: 'Worker',
              types: function(contract){
                return t.struct({
                  worker_privacy: t.struct({
                    info_disclosure_permitted: t.Bool,
                    family_pics_sharing_permitted: t.Bool,
                    notes: t.maybe(t.Str)
                  })
                })
              }
            },
            {
              name: 'Family',
              types: function(contract){
                return t.struct({
                  family_privacy: t.struct({
                    restrict_private_comm: t.Bool,
                    surveillance: t.Bool,
                    take_away_personal_docs: t.Bool,
                    force_service: t.Bool,
                    notes: t.maybe(t.Str)
                  })
                });
              }
            }
          ]
        },
        {
          name: 'Termination',
          pages: [
            {
              name: 'Severance & Lodging',
              types: function(contract){
                return t.struct({
                  termination_notice_length: t.Str,
                  termination_severance_length: t.Str,
                  termination_accom_eviction_notice_length: t.Str,
                  termination_paid_if_evicted_early: t.Bool
                })
              }
            },
            {
              name: 'Immediate Termination',
              types: function(contract){
                return t.struct({
                  immediate_termination_grounds: t.Str
                });
              }
            }
          ]
        },
        {
          name: 'Finish',
          pages: [
            {
              types: function(contract){}
            }
          ]
        }
      ]
    }
  }

}