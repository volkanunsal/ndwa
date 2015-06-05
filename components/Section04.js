import React from 'react';
import t from 'tcomb-form';
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import cx from 'classnames';
import isEmpty from '../utils/isEmpty';
import YesNo from './YesNo'
import ActionBar from './ActionBar';
import decorators from '../utils/decorators';


@decorators.getForm
export default class SectionPage extends React.Component {

  getPageOptions(contract, flux){

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
          help: <i>Overtime rate must be at least 1.5 times the regular hourly rate</i>,
          attrs: {
            min: 13.5
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
                return <YesNo flux={flux} {...locals}/>
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
            return <YesNo flux={flux} {...locals}/>
          }
        }

      }
    };

    let Page3 = {
      fields: {
        cancelled_day_paid: {
          label: <p className='lead'>{"If the employer has to cancel one or more days of the employee's work week, will the employee be paid as usual?"}</p>,
          template: function(locals){
            return <YesNo flux={flux} {...locals}/>
          }
        },
        bad_weather_day_paid: {
          label: <p className='lead'>{"The employer expects that the employee will make every effort to come to work during bad weather. When a city or region is shutdown due to poor weather conditions, will the employer pay the employee for days of missed work?"}</p>,
          template: function(locals){
            return <YesNo flux={flux} {...locals}/>
          }
        }
      }
    }
    let Page4 = {

      fields: {
        room: {
          fields: {
            provided: {
              label: <p className='lead'>{"Will the employer provide the employee with living accommodations?"}</p>,
              template: function(locals){
                return <div className='text-center'>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            living_accommodations: {
              order: [
                'size',
                'num_beds',
                'num_people',
                'working_heat',
                'heat_controlled',
                'clean',
                'entry'
              ],
              config: {
                horizontal: {
                  lg: [4, 8],
                  md: [4, 8],
                  sm: [6, 6]
                }
              },
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
                    return <YesNo flux={flux} {...locals}/>
                  }
                },
                heat_controlled: {
                  label: 'Does the employee control the heat?',
                  template: function(locals){
                    return <YesNo flux={flux} {...locals}/>
                  }
                },
                clean: {
                  label: 'Room free of dust, bugs and mold?',
                  template: function(locals){
                    return <YesNo flux={flux} {...locals}/>
                  }
                },
                entry: {
                  fields: {
                    notice_length: {
                      label: 'Will the employer provide the employee with at least 24 hours notice?',
                      template: function(locals){
                        return <YesNo flux={flux} {...locals}/>
                      }
                    },
                    emergency_repairs: {
                      label: "Will the employer enter the employee's living space in cases of emergencies or repairs?",
                      template: function(locals){
                        return <YesNo flux={flux} {...locals}/>
                      }
                    },
                    specific_repairs: {
                      label: "Will the employer enter the employee's living space at the employee's request for specific repairs?",
                      template: function(locals){
                        return <YesNo flux={flux} {...locals}/>
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

                return <div className='form-horizontal'>
                  <p className='lead'>{'Describe the living accommodations provided by the employer for the employee'}</p>
                  {locals.order.map(key => {
                    return locals.inputs[key]
                  })}
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
            console.log(locals.value)
            return <div className='text-center'>
              <YesNo flux={flux} {...locals}/>
            </div>
          }
        },
        board_yes: {
          fields: {
            house_food: {
              label: 'May the employee eat/drink household foods or beverages?',
              template: function(locals){
                return <YesNo flux={flux} {...locals}/>
              }
            },
            free_food: {
              label: 'Are the food/beverages provided free of charge?',
              template: function(locals){
                return <YesNo flux={flux} {...locals}/>
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
                return <YesNo flux={flux} {...locals}/>
              }
            },
            food_paid: {
              label: "Have the employee and the employer agreed that the employee will pay for the employee’s own food?",
              template: function(locals){
                return <YesNo flux={flux} {...locals}/>
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
  render() {
    return <div className='form-section'>
      <div className='container-fluid'>
        {this.getForm()}
      </div>
      <ActionBar onSave={this.save.bind(this)}/>
    </div>
  }
}