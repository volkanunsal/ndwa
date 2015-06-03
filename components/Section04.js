import React from 'react';
var t = require('tcomb-form');
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import cx from 'classnames';
// var Days = t.enums({
//   monday: 'Monday',
//   tuesday: 'Tuesday',
//   wednesday: 'Wednesday',
//   thursday: 'Thursday',
//   friday: 'Friday',
//   saturday: 'Saturday',
//   sunday: 'Sunday'
// });
function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key)){return false;}
  }
  return true;
}

function compact(obj) {
  let ret = {}
  for(var key in obj) {
    if(obj[key] != false){
      ret[key] = obj[key];
    }
  }
  return ret;
}

class YesNo extends React.Component {
  handleYesClick(){
    let {path, value, flux} = this.props;
    flux.getActions('contract_actions').setIn(path, true)
  }
  handleNoClick(){
    let {path, value, flux} = this.props;
    flux.getActions('contract_actions').setIn(path, false)
  }
  render(){
    let {value, hasError, label, attrs} = this.props;

    let cs = cx({
      'has-error': hasError,
      'form-group':true,
      'form-group-depth-2': true
    })
    let yesClasses = cx({
      'btn': true,
      'btn-primary': value,
      'btn-link': !value
    })
    let noClasses = cx({
      'btn': true,
      'btn-primary': !value,
      'btn-link': value
    })
    return <div className={cs}>
      <label className='control-label col-sm-6 col-md-3 col-lg-3'>
        {label}
      </label>
      <div className='col-sm-6 col-md-9 col-lg-9'>
        <ul className='list-inline'>
          <li>
            <a className={yesClasses}
              onClick={this.handleYesClick.bind(this)}>Yes</a>
          </li>
          <li>
            <a className={noClasses}
              onClick={this.handleNoClick.bind(this)}>No</a>
          </li>
        </ul>
        <input type='hidden' name={attrs.name} />
      </div>
    </div>
  }
}



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
    let {parental_leave} = contract;
    
    let paid_note = parental_leave && parental_leave.paid ? t.Str : false;

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

    let Page5 = t.struct({
      board_provided: t.Bool,
      board_provided_house_food: t.Bool,
      board_provided_free_food: t.Bool,
      board_provided_bring_own_food: t.Bool,
      board_provided_paid_food_agreed: t.Bool,
      board_provided_paid_food_agreed_notes: t.Str
    })

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
          label: 'When possible, the Family will provide the employee with notice how far in advance, prior to requesting the employee to work overtime?',
          config: {
            addonAfter: <i>days</i>
          },
          attrs: {
            min: 0
          }
        },
        overtime_holidays: {
          label: 'The employee and the Family agree that the employee will be paid when working which of the following holidays?',
          // factory: t.form.Select,
          help: <i>Hold down Shift to select multiple items.</i>,
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
          label: 'The family agrees to provide the employee with how many vacation days?',
          config: {
            addonAfter: <i>days</i>
          },
          attrs: {
            min: 0
          }
        },
        personal_days: {
          type: 'number',
          label: 'The Family agrees to provide the employee with how many personal/sick days?',
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
              label: 'How much notice will the employee provide the Family, prior to taking her parental leave?',
              help: <i>Minimum 2 weeks</i>,
              config: {
                addonAfter: <i>weeks</i>
              },
              attrs: {
                min: 2
              }
            },
            paid: {
              label: 'Will the Family pay the employee for parental leave?',
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
          }
        },
        reduced_hours_reg_wage: {
          label: "In the event that the Family temporarily reduces employee's hours will they to continue to pay employee regular wages?",
          template: function(locals){
            return <YesNo flux={props.flux} {...locals}/>
          }
        }

      }
    };

    let Page3, Page4, Page5 = {};
    return [ Page1, Page2, Page3, Page4, Page5];
  }

  getPage(){
    let pageNum = (this.props.params.pageName || 1) - 1;
    let {contract} = this.props;

    return <Form
      ref="form"
      type={this.getPageTypes(contract)[pageNum]}
      options={this.getPageOptions(contract)[pageNum]}
      value={contract}
    />
  }

  render() {
    return <div className='form-section'>
      <div className='container-fluid'>
        <div className='form-horizontal'>
          {this.getPage()}
        </div>
        <a className='btn btn-primary' onClick={this.save.bind(this)}>Save</a>
      </div>
    </div>
  }
}