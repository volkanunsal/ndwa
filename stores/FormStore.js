import React from 'react';
import I from 'immutable';
import moment from 'moment';
import { Store } from 'flummox';
import assign from 'object-assign';
import t from 'tcomb-form';
import {TRecipient, TStartDate, TNonZero, TValidWorkSchedule} from '../lib/tcomb-types';
import Tabletop from '../lib/tabletop';

export default class FormStore extends Store {

  handleValidateSection(sectionNum){

    let contract = this.contractStore.state;

    let state = I.fromJS(this.state).update('sections', sections => {
      sections = sections.update(sectionNum, section => {
        let isSectionValid = true;

        section = section.update('pages', pages => {
          pages = pages.map(page => {
            let valid = t.validate(contract, page.toJS().types(contract)).isValid();
            isSectionValid = isSectionValid && valid;
            page = page.set('valid', valid)
            page = page.set('validated', true)
            return page
          })
          return pages
        })
        section = section.set('valid', isSectionValid)
        section = section.set('validated', true)
        return section
      })
      return sections
    })
    this.setState(state.toJS());
  }

  handleValidateSections(contract){
    let state = I.fromJS(this.state).update('sections', sections => {
      // console.log(section)
      sections = sections.map(section => {
        let isSectionValid = true;
        section = section.update('pages', pages => {
          pages = pages.map(page => {
            let valid = t.validate(contract, page.toJS().types(contract)).isValid();
            isSectionValid = isSectionValid && valid;
            page = page.set('valid', valid)
            page = page.set('validated', true)
            return page
          })
          return pages
        })
        section = section.set('valid', isSectionValid)
        section = section.set('validated', true)
        return section
      })
      return sections
    })
    this.setState(state.toJS());
  }

  configureFeatureToggles(cells, tt) {
    let _phoneNumVisible = cells.reduce((sum, a) => (a.footer_phone_num === 'TRUE') && sum, true);

    if (_phoneNumVisible !== this.state.featureToggles.phoneNumVisible) {
      this.setState({featureToggles: {phoneNumVisible: _phoneNumVisible}});
    }

    // let showPhoneSessionVar = sessionStorage.getItem('phoneNumVisible');
    // let showPhoneThisSession;
    // if (showPhoneSessionVar) {
    //   showPhoneThisSession = showPhoneSessionVar === 'true';
    // }
    // if (showPhoneSessionVar && showPhoneThisSession !== phoneNumVisible) {
    //   phoneNumVisible = showPhoneThisSession;
    //   this.forceUpdate();
    // }
  }

  constructor(flux){
    super();

    const FORM_ACTION_IDS = flux.getActionIds('form_actions');
    this.register(FORM_ACTION_IDS.validateSections, this.handleValidateSections);
    this.register(FORM_ACTION_IDS.validateSection, this.handleValidateSection);

    this.contractStore = flux.getStore('contract');

    Tabletop.init({key: 'https://docs.google.com/spreadsheets/d/1ZNsQFNMNDl8j6PTvkldCI7QBHvDroGqNsppjGJQvccU/pubhtml',
                     callback: ::this.configureFeatureToggles,
                     simpleSheet: true})

    this.state = {
      featureToggles: {
        phoneNumVisible: false
      },
      sections: [
        {
          name: 'Getting Started',
          pages: [
            {
              name: 'About you',
              types: (contract) => t.struct({
                user_type: t.enums({
                  W: 'Employee',
                  E: 'Employer'
                })
              })
            },
            {
              name: 'Parties',
              types: () => t.struct({
                employer: t.struct({
                  name: t.Str,
                  address: t.Str,
                  phone: t.Str,
                  additional_info: t.maybe(t.Str)
                }),
                employee: t.struct({
                  name: t.Str,
                  address: t.Str,
                  phone: t.Str,
                  additional_info: t.maybe(t.Str)
                })
              })
            },
            {
              name: 'Location',
              types: (contract) => t.struct({
                work_address: t.Str,
                start_date: TStartDate
              })
            }
          ]
        },
        {
          name: 'Responsibilities',
          pages: [
            {
              name: 'Job Description',
              types: () => t.struct({
                children: t.list(TRecipient),
                childcare_tasks: t.list(t.Str),
                cleaning_tasks: t.list(t.Str)
              })
            },
            {
              name: 'Additional Tasks',
              types: (contract) => t.struct({
                additional_tasks: t.maybe(t.Str)
              })
            }
          ]
        },
        {
          name: 'Scheduling',
          pages: [
            {
              types: (contract) => t.struct({
                work_week_duration: TNonZero,
                valid_work_schedule: TValidWorkSchedule
              })
            }
          ]
        },
        {
          name: 'Compensation & Provisions',
          pages: [
            {
              name: 'Pay Rate',
              types: (contract) => {
                return t.struct({
                  hourly_rate: t.subtype(t.Num, n => n >= 9 ),
                  overtime_rate: t.Num,
                  payment_frequency: t.enums({
                    daily: 'Daily',
                    weekly: 'Weekly',
                    biweekly: 'Bi-weekly',
                    monthly: 'Monthly',
                    other: 'Other'
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
                    "New Year's Day": t.Bool,
                    "MLK Birthday": t.Bool,
                    'Presidents Day': t.Bool,
                    "Memorial Day": t.Bool,
                    "Independence Day": t.Bool,
                    "Labor Day": t.Bool,
                    "Thanksgiving Day": t.Bool,
                    'Christmas Day': t.Bool
                  })),
                  overtime_holidays_other: t.maybe(t.Str)
                });
              }
            },
            {
              name: 'Time Off',
              types: (contract) => {
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
              types: (contract) => {
                return t.struct({
                  cancelled_day_paid: t.Bool,
                  bad_weather_day_paid: t.Bool
                })
              }
            },
            {
              name: 'Room',
              types: (contract) => {
                let {room} = contract;

                let room_struct = t.struct({
                  provided: t.Bool
                });

                if (room && room.provided) {
                  let living_accommodations_struct = t.struct({
                    size: t.Num,
                    num_beds: t.Num,
                    working_heat: t.Bool,
                    clean: t.Bool,
                    num_people: t.Num,
                    entry: t.struct({
                      notice_length: t.Bool,
                      emergency_repairs: t.Bool,
                      specific_repairs: t.Bool,
                      other: t.maybe(t.Str)
                    })
                  });
                  if (room.living_accommodations && room.living_accommodations.working_heat) {
                    living_accommodations_struct = living_accommodations_struct.extend({
                      heat_controlled: t.Bool
                    })
                  };
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
              types: (contract) => {
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
              types: (contract) => {
                return t.struct({
                  benefits: t.struct({
                    health: t.Bool,
                    transportation: t.Bool,
                    notes: t.maybe(t.Str)
                  }),
                  workers_comp_insurance: t.maybe(t.struct({
                    company: t.Str,
                    policy: t.Str
                  })),
                  unemployment_insurance: t.maybe(t.struct({
                    company: t.Str,
                    policy: t.Str
                  }))
                });
              }
            }
          ]
        },
        {
          name: 'Deductions',
          pages: [
            {
              types: (contract) => {
                let Page = t.struct({
                  deductions_taken: t.Bool
                });
                if (contract.deductions_taken) {
                  Page = Page.extend({
                    deductions: t.struct({
                      state_income_tax: t.maybe(t.Str),
                      federal_income_tax: t.maybe(t.Str),
                      health_insurance: t.maybe(t.Str),
                      food: t.maybe(t.Str),
                      lodging: t.maybe(t.Str),
                      other: t.maybe(t.Str)
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
              types: (contract) => {
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
              types: (contract) => {
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
              types: (contract) => {
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
              types: (contract) => {
                return t.struct({
                  termination_notice_length: t.Num,
                  termination_severance_length: t.Num,
                  termination_lodging_length: t.Num,
                  termination_paid_if_evicted_early: t.Bool
                })
              }
            },
            {
              name: 'Immediate Termination',
              types: (contract) => {
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
              types: (contract) => {
                return t.struct({})
              }
            }
          ]
        }
      ]
    }
  }

}
