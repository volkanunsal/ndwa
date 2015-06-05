import React from 'react';
import t from 'tcomb-form';
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import cx from 'classnames';
import compact from '../utils/compact';
import isEmpty from '../utils/isEmpty';
import YesNo from './YesNo'
import ActionBar from './ActionBar';

// const THourlyRate = t.subtype(t.Num, n => n > 9 )
// const TPayment = t.subtype(t.struct({
//   hourly_rate: THourlyRate,
//   overtime_rate: t.Num
// }), s => Number(s.overtime_rate) >= 2 * Number(s.hourly_rate));

export default class SectionPage extends React.Component {
  save() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();

    // if validation fails, value will be null
    if (value) {
      // Update the contract
      this.props.flux.getActions('contract_actions').merge(value)
      router.transitionTo('page', nextPageOrSection(this.props));
    }
  }

  getPageTypes(contract){
    let {parental_leave, room, board_provided} = contract;
    let paid_note = parental_leave && parental_leave.paid ? t.Str : false;
    let heat_controlled = room && room.living_accommodations && room.living_accommodations.working_heat ? t.Bool : false;

    let living_accommodations = room && room.provided ? t.struct(compact({
      size: t.Num,
      num_beds: t.Num,
      working_heat: t.Bool,
      heat_controlled,
      clean: t.Bool,
      num_people: t.Num,
      entry: t.struct({
        notice_length: t.Bool,
        emergency_repairs: t.Bool,
        specific_repairs: t.Bool,
        other: t.maybe(t.Str)
      })
    })) : false;

    let board_yes = board_provided == true ? t.struct({
        house_food: t.Bool,
        free_food: t.Bool
      }) : false;

    let board_no = board_provided == false ? t.struct({
        bring_own_food: t.Bool,
        food_paid: t.Bool,
        food_paid_notes: t.Str
      }) : false;

    let Page1 = t.struct({
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

    let Page2 = t.struct({
      vacation_days: t.Num,
      personal_days: t.Num,
      parental_leave: t.struct(compact({
        notice_length: t.subtype(t.Num, n => Number(n) >= 2),
        paid: t.Bool,
        paid_note
      })),
      reduced_hours_reg_wage: t.Bool
    });

    let Page3 = t.struct({
      cancelled_day_paid: t.Bool,
      bad_weather_day_paid: t.Bool
    });

    let Page4 = t.struct({
      room: t.struct(compact({
        provided: t.Bool,
        living_accommodations
      }))
    });

    let Page5 = t.struct(compact({
      board_provided: t.Bool,
      board_yes,
      board_no
    }))

    return [Page1, Page2, Page3, Page4, Page5]
  }

  getPageOptions(contract){
    let props = this.props;

    // Only display the field when the paid is true
    let Page1 = {
      config: {
        // for each of lg md sm xs you can specify the columns width
        horizontal: {
          lg: [3, 9],
          md: [3, 9],
          sm: [6, 6]
        }
      },
      fields: {
        payment_frequency: {
          label: 'How often will the employee be paid?',
          factory: t.form.Radio
        },
        payday: {
          label: 'When will the employee be paid?',
          factory: t.form.Radio
        },
        hourly_rate: {
          type: 'number',
          label: 'How much will the employee be paid on an hourly basis?',
          help: <i>Minimum $9/hour</i>,
          attrs: {
            min: 9,
            max: 20
          },
          config: {
            addonBefore: <b>$</b>,
            addonAfter: <b>per hour</b>
          }
        },
        overtime_rate: {
          type: 'number',
          label: 'When the employee works more than 40 hours a week, what will the overtime rate be?',
          help: <i>Overtime rate must be at least twice the regular hourly rate</i>,
          attrs: {
            min: 9
          },
          config: {
            addonBefore: <b>$</b>,
            addonAfter: <b>per hour</b>
          }
        },

        overtime_notice_length: {
          type: 'number',
          label: 'When possible, the employer will provide the employee with notice how far in advance, prior to requesting the employee to work overtime?',
          config: {
            addonAfter: <i>days</i>
          },
          attrs: {
            min: 0
          }
        },
        overtime_holidays: {
          label: 'The employee and the employer agree that the employee will be paid when working which of the following holidays?',
          attrs: {
            style: {height: 130}
          },
          config: {
            horizontal: {
              lg: [0,12]
            }
          },
          template: function(locals){
            return <div className='form-group form-group-depth-2'>
              <label className='control-label col-sm-6 col-md-3 col-lg-3'>
                {locals.label}
              </label>
              <div className='col-sm-6 col-md-9 col-lg-9'>
                {React.addons.createFragment(locals.inputs)}
              </div>
            </div>
          }
        }
      }
    };

    let Page2 = {
      config: {
        // for each of lg md sm xs you can specify the columns width
        horizontal: {
          lg: [3, 9],
          md: [3, 9],
          sm: [6, 6]
        }
      },
      fields: {
        vacation_days: {
          type: 'number',
          label: 'The employer agrees to provide the employee with how many vacation days?',
          config: {
            addonAfter: <i>days</i>
          },
          attrs: {
            min: 0
          }
        },
        personal_days: {
          type: 'number',
          label: 'The employer agrees to provide the employee with how many personal/sick days?',
          config: {
            addonAfter: <i>days</i>
          },
          attrs: {
            min: 0
          }
        },
        parental_leave: {
          label: 'If the employee requests parental leave for the birth or adoption of a child:',
          fields: {
            notice_length: {
              type: 'number',
              label: 'How much notice will the employee provide the employer, prior to taking her parental leave?',
              help: <i>Minimum 2 weeks</i>,
              config: {
                addonAfter: <i>weeks</i>
              },
              attrs: {
                min: 2
              }
            },
            paid: {
              label: 'Will the employer pay the employee for parental leave?',
              template: function(locals){
                return <YesNo flux={props.flux} {...locals}/>
              }
            },
            paid_note: {
              label: ' ',
              attrs: {
                placeholder: 'Please describe',
              },
              type: 'textarea'
            }
          },
          template: function(locals){
            return <fieldset>
              <hr/>
              <p className='lead'>{locals.label}</p>
              {React.addons.createFragment(locals.inputs)}
            </fieldset>
          }
        },
        reduced_hours_reg_wage: {
          label: "In the event that the employer temporarily reduces employee's hours will they to continue to pay employee regular wages?",
          template: function(locals){
            return <YesNo flux={props.flux} {...locals}/>
          }
        }

      }
    };

    let Page3 = {
      // config: {
      //   horizontal: {
      //     lg: [5, 7],
      //     md: [5, 7],
      //     sm: [6, 6]
      //   }
      // },
      fields: {
        cancelled_day_paid: {
          label: "If the employer has to cancel one or more days of the employee's work week, will the employee be paid as usual?",
          template: function(locals){
            return <YesNo flux={props.flux} {...locals} label={<p className='lead'>{locals.label}</p>}/>
          }
        },
        bad_weather_day_paid: {
          label: "The employer expects that the employee will make every effort to come to work during bad weather. When a city or region is shutdown due to poor weather conditions, will the employer pay the employee for days of missed work?",
          template: function(locals){
            return <YesNo flux={props.flux} {...locals} label={<p className='lead'>{locals.label}</p>}/>
          }
        }
      }
    }
    let Page4 = {
      config: {
        horizontal: {
          lg: [4, 8],
          md: [4, 8],
          sm: [6, 6]
        }
      },
      fields: {
        room: {
          fields: {
            provided: {
              label: "Will the employer provide the employee with living accommodations?",
              template: function(locals){
                return <YesNo flux={props.flux} {...locals}/>
              }
            },
            living_accommodations: {
              fields: {
                size: {
                  label: 'Room Size?',
                  type: 'number',
                  config: {
                    addonAfter: <i>sq feet</i>
                  }
                },
                num_beds: {
                  label: 'Number of beds in room?',
                  type: 'number',
                  config: {
                    addonAfter: <i>beds</i>
                  }
                },
                num_people: {
                  label: 'Number of people living in the room besides the employee?',
                  type: 'number',
                  config: {
                    addonAfter: <i>people</i>
                  }
                },
                working_heat: {
                  label: 'Working heat?',
                  template: function(locals){
                    return <YesNo flux={props.flux} {...locals}/>
                  }
                },
                heat_controlled: {
                  label: 'Does the employee control the heat?',
                  template: function(locals){
                    return <YesNo flux={props.flux} {...locals}/>
                  }
                },
                clean: {
                  label: 'Room free of dust, bugs and mold?',
                  template: function(locals){
                    return <YesNo flux={props.flux} {...locals}/>
                  }
                },
                entry: {
                  fields: {
                    notice_length: {
                      label: 'Will the employer provide the employee with at least 24 hours notice?',
                      template: function(locals){
                        return <YesNo flux={props.flux} {...locals}/>
                      }
                    },
                    emergency_repairs: {
                      label: "Will the employer enter the employee's living space in cases of emergencies or repairs?",
                      template: function(locals){
                        return <YesNo flux={props.flux} {...locals}/>
                      }
                    },
                    specific_repairs: {
                      label: "Will the employer enter the employee's living space at the employee's request for specific repairs?",
                      template: function(locals){
                        return <YesNo flux={props.flux} {...locals}/>
                      }
                    },
                    other: {
                      label: ' ',
                      type: 'textarea',
                      attrs: {
                        placeholder: 'Other'
                      }
                    }
                  },
                  template: function(locals){
                    return <fieldset>
                      <hr/>
                      <p className='lead'>{"The employer may enter the employee's living accommodations only under the following agreed upon circumstances"}</p>
                      {React.addons.createFragment(locals.inputs)}
                    </fieldset>
                  }
                }
              },
              template: function(locals){
                return <div>
                  <p className='lead'>{'Describe the living accommodations provided by the employer for the employee'}</p>
                  {React.addons.createFragment(locals.inputs)}
                </div>
              }
            }
          },
          template: function(locals){
            return <div>
              {React.addons.createFragment(locals.inputs)}
            </div>
          }
        }
      }
    };
    let Page5 = {
      fields: {
        board_provided: {
          label: <p className='lead'>{'Will the employee be provided with board (food/beverages) at work?'}</p>,
          template: function(locals){
            return <div className='text-center'>
              <YesNo flux={props.flux} {...locals}/>
            </div>
          }
        },
        board_yes: {
          fields: {
            house_food: {
              label: 'May the employee eat/drink household foods or beverages?',
              template: function(locals){
                return <YesNo flux={props.flux} {...locals}/>
              }
            },
            free_food: {
              label: 'Are the food/beverages provided free of charge?',
              template: function(locals){
                return <YesNo flux={props.flux} {...locals}/>
              }
            }
          },
          template: function(locals){
            return <div>
              <p className='lead'>Food & Drinks</p>
              {React.addons.createFragment(locals.inputs)}
            </div>
          }
        },
        board_no: {
          fields: {
            bring_own_food: {
              label: "May the employee bring own food to work?",
              template: function(locals){
                return <YesNo flux={props.flux} {...locals}/>
              }
            },
            food_paid: {
              label: "Have the employee and the employer agreed that the employee will pay for the employee’s own food?",
              template: function(locals){
                return <YesNo flux={props.flux} {...locals}/>
              }
            },
            food_paid_notes: {
              label: ' ',
              type: 'textarea',
              attrs: {
                placeholder: "Additional notes concerning provision of food and mealtime"
              }
            }
          },
          template: function(locals){
            return <div>
              {React.addons.createFragment(locals.inputs)}
            </div>
          }
        }
      }
    };
    return [ Page1, Page2, Page3, Page4, Page5];
  }

  getPage(){
    let pageNum = (this.props.params.pageName || 1) - 1;
    let {contract} = this.props;
    let pageOptions = this.getPageOptions(contract)[pageNum];

    let form = <Form
      ref="form"
      type={this.getPageTypes(contract)[pageNum]}
      options={pageOptions}
      value={contract}
    />;

    let page = form;

    if(pageOptions && pageOptions.config && pageOptions.config.horizontal){
      page = <div className='form-horizontal'>
        {form}
      </div>
    }

    return page
  }

  render() {
    return <div className='form-section'>
      <div className='container-fluid'>
        {this.getPage()}

      </div>
      <ActionBar handleSave={this.save.bind(this, this.props.calendar)}/>
    </div>
  }
}