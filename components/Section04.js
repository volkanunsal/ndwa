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
import {MyModal, TipTrigger} from '../components/MyModal';


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
          label: 'How often will the EMPLOYEE be paid?',
          factory: t.form.Radio
        },
        payday: {
          label: 'When will the EMPLOYEE be paid?',
          factory: t.form.Radio
        },
        hourly_rate: {
          type: 'number',
          label: 'How much will the EMPLOYEE be paid on an hourly basis?',
          help: <span><i>Minimum $9/hour</i> <TipTrigger anchorText='10' modalContent={<div>
            <p>
              Under current law, you must already pay at least the minimum wage in Massachusetts ($9/hour) as well as overtime ('time and a half') for each hour over 40 hours worked in one week. Please consider finding the <a href='http://livingwage.mit.edu/states/25/locations'>living wage</a> in your community, if you haven’t already done so. While the minimum wage sets an earnings threshold, it fails to approximate the basic expenses of families. Consequently, many working adults must seek public assistance and/or hold multiple jobs in order to afford to feed, clothe, house, and provide medical care for themselves and their families.
            </p>
            <p>
              And if applicable, house cleaners must be paid for time traveling between jobs.
            </p>
          </div>}/></span>,
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
          label: 'When the EMPLOYEE works more than 40 hours a week, what will the overtime rate be?',
          help: <span><i>Overtime rate must be at least 1.5 times the regular hourly rate</i> <TipTrigger anchorText='11' modalContent={<div>
            <p>
              Under current law, you must already pay overtime ("time and a half") for each hour over 40 hours worked in one week.</p>
          </div>}/></span>,
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
          label: 'When possible, the EMPLOYER will provide the EMPLOYEE with notice how far in advance, prior to requesting the EMPLOYEE to work overtime?',
          config: {
            addonAfter: <i>days</i>
          },
          attrs: {
            min: 0
          }
        },
        overtime_holidays: {
          label: 'The EMPLOYEE and the EMPLOYER agree that the EMPLOYEE will be paid when working which of the following holidays?',
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
                <br/>
                <TipTrigger anchorText='12' modalContent={<div>
                  <p>
                    {"Where possible, a rest period should accommodate religious worship, including the domestic worker's attendance at a place of worship, if any. A domestic worker may voluntarily agree to work during a previously designated rest period, provided that the agreement: (a) is in writing, in a language easily understood by the domestic worker, and made prior to performance of services during the previously designated rest period; (b) specifies the particular rest period(s) during which the domestic worker agrees to work; and (c) is signed or acknowledged (whether in writing or by means of electronic communication) by the domestic worker and the employer. "}
                  </p>
                </div>}/>
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
          label: 'The EMPLOYER agrees to provide the EMPLOYEE with how many vacation days?',
          config: {
            addonAfter: <i>days</i>
          },
          attrs: {
            min: 0
          }
        },
        personal_days: {
          type: 'number',
          label: <div>The EMPLOYER agrees to provide the EMPLOYEE with how many personal/sick days? <TipTrigger anchorText='13' modalContent={<div>
                  <p>
                    {"Effective July 1, 2015, domestic workers have the right to earn and use up to 40 hours of sick time in a calendar year. M.G.L. c. 149, § 148C."}
                  </p>
                </div>}/></div>,
          config: {
            addonAfter: <i>days</i>
          },
          attrs: {
            min: 0
          }
        },
        parental_leave: {
          label: <div>If the EMPLOYEE requests parental leave for the birth or adoption of a child: <TipTrigger anchorText='14' modalContent={<div>
              <p>
                {"Domestic workers who are employees are entitled to take up to eight weeks of unpaid, job-protected leave for the birth or adoption of a child, in accordance with the Parental Leave Act, M.G.L. c. 149, § 105D. Employees must give at least two weeks’ notice of anticipated date of departure and intention to return."}
              </p>
            </div>}/>
          </div>,
          fields: {
            notice_length: {
              type: 'number',
              label: 'How much notice will the EMPLOYEE provide the EMPLOYER, prior to taking her parental leave?',
              help: <i>Minimum 2 weeks</i>,
              config: {
                addonAfter: <i>weeks</i>
              },
              attrs: {
                min: 2
              }
            },
            paid: {
              label: 'Will the EMPLOYER pay the EMPLOYEE for parental leave?',
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
          label: <div>{"In the event that the EMPLOYER temporarily reduces employee's hours will they to continue to pay employee regular wages?"} <TipTrigger anchorText='15' modalContent={<div>
              <p>
                {"Example: Employer takes a personal day or the employer comes home early from work and allows domestic worker employee to take the day off or go home early, but the employer guarantees to continue to pay the employee her regular wages for this time. Choosing “No” does not mean that the employer will not pay the employee for hours actually worked under the state’s reporting to work laws."}
              </p>
            </div>}/>

          </div>,
          template: function(locals){
            return <YesNo flux={flux} {...locals}/>
          }
        }

      }
    };

    let Page3 = {
      fields: {
        cancelled_day_paid: {
          label: <div><p className='lead'>{"If the EMPLOYER has to cancel one or more days of the EMPLOYEE's work week, will the EMPLOYEE be paid as usual?"}</p> <TipTrigger anchorText='16' modalContent={<div>
              <p>
                {"Example: Employer is sick and has to remain home and allows domestic worker employee to take the day(s) off or go home early, but the employer guarantees to continue to pay the employee her regular wages for this time. Choosing “No” does not mean that the employer will not pay the employee for hours actually worked under the state’s reporting to work laws."}
              </p>
            </div>}/></div>,
          template: function(locals){
            return <YesNo flux={flux} {...locals}/>
          }
        },
        bad_weather_day_paid: {
          label: <p className='lead'>{"The EMPLOYER expects that the EMPLOYEE will make every effort to come to work during bad weather. When a city or region is shutdown due to poor weather conditions, will the EMPLOYER pay the EMPLOYEE for days of missed work?"}</p>,
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
              label: <div><p className='lead'>{"Will the EMPLOYER provide the EMPLOYEE with living accommodations?"}</p> <TipTrigger anchorText='17' modalContent={<div>
              <p>
                {"Employers cannot deduct (or charge) for lodging unless the employee freely accepts, wants, and uses it, and it’s for his/her benefit (i.e., she is in your home as a convenience to her, not to you).  Charges must be reasonable and cannot exceed $35/week for a room used by one person, $30/week for a room occupied by two people, $25/week for a room occupied by three or more persons. The lodging must comply with the state sanitary codes."}
              </p>
            </div>}/>

              </div>,
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
                  label: 'Number of people living in the room besides the EMPLOYEE?',
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
                  label: 'Does the EMPLOYEE control the heat?',
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
                      label: 'Will the EMPLOYER provide the EMPLOYEE with at least 24 hours notice?',
                      template: function(locals){
                        return <YesNo flux={flux} {...locals}/>
                      }
                    },
                    emergency_repairs: {
                      label: "Will the EMPLOYER enter the EMPLOYEE's living space in cases of emergencies or repairs?",
                      template: function(locals){
                        return <YesNo flux={flux} {...locals}/>
                      }
                    },
                    specific_repairs: {
                      label: "Will the EMPLOYER enter the EMPLOYEE's living space at the EMPLOYEE's request for specific repairs?",
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
                      <p className='lead'>{"The EMPLOYER may enter the EMPLOYEE's living accommodations only under the following agreed upon circumstances"}</p> <TipTrigger anchorText='18' modalContent={<div>
              <p>
                {"Employer’s providing living accommodations the employer shall not monitor or record, in any manner, a domestic worker's use of restroom or bathing facilities, sleeping or private living quarters, or any activities associated with the worker's dressing, undressing, or changing clothes. The employer shall provide the domestic worker with the ability and reasonable opportunity to access telephone and internet services and permit the domestic worker to send and receive communications by text message, social media, electronic or regular mail, and telephone, without the employer's interference. If the employer has telephone or internet services, the employer shall provide reasonable access to the telephone and/or internet service without charge to the domestic worker. If the employer does not have telephone and/or internet services, the employer shall provide the domestic worker with a reasonable opportunity to access telephone and/or internet service at another location at the domestic worker's expense."}
              </p>
            </div>}/>
                      {React.addons.createFragment(locals.inputs)}
                    </fieldset>
                  }
                }
              },
              template: function(locals){

                return <div className='form-horizontal'>
                  <p className='lead'>{'Describe the living accommodations provided by the EMPLOYER for the EMPLOYEE'}</p>
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
          label: <div><p className='lead'>{'Will the EMPLOYEE be provided with board (food/beverages) at work?'}</p> <TipTrigger anchorText='19' modalContent={<div>
              <p>
                {"Employers cannot charge (or deduct from wages) for meals unless the domestic worker employee agrees and freely chooses the food and drink, and it’s for her benefit. The price must accurately reflect the cost of food and cannot exceed $1.50 for breakfast, $2.25 for lunch, and $2.25 for dinner per day. An employer may not charge for meals if the employee cannot easily bring meals to or prepare meals on the premises."}
              </p>
              <p>{"An employer may deduct from a domestic worker's wages for the costs of food and beverages actually provided to the domestic worker provided that: (a) the food and beverages are voluntarily and freely chosen by the domestic worker; (b) the domestic worker can easily bring and prepare meals on the premises; (c) working conditions caused by the employer's or another household member's dietary restrictions or other related preferences do not prevent a domestic worker from storing, preparing, or consuming meals of his or her preference."}</p>
            </div>}/></div>,
          template: function(locals){
            return <div className='text-center'>
              <YesNo flux={flux} {...locals}/>
            </div>
          }
        },
        board_yes: {
          fields: {
            house_food: {
              label: 'May the EMPLOYEE eat/drink household foods or beverages?',
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
              label: "May the EMPLOYEE bring own food to work?",
              template: function(locals){
                return <YesNo flux={flux} {...locals}/>
              }
            },
            food_paid: {
              label: "Have the EMPLOYEE and the EMPLOYER agreed that the EMPLOYEE will pay for the EMPLOYEE's own food?",
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
      <ActionBar {...this.props} onSave={this.save.bind(this)}/>
    </div>
  }
}