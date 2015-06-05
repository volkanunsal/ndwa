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
    var Page1 = {
      fields: {
        deductions_taken: {
          label: <p className='lead'>{'Will the employer take deductions from the employee\'s wages?'}</p>,
          template: function(locals){
            return <div className='text-center'>
              <YesNo flux={flux} {...locals}/>
            </div>
          }
        },
        deductions: {
          label: 'Which of the following deductions will made?',
          config: {
            horizontal: {
              lg: [2, 10],
              md: [2, 10],
              sm: [6, 6]
            }
          },
          fields: {
            state_income_tax: {
              type: 'number',
              attrs: {
                min: 0
              },
              config: {
                addonAfter: <i>frequency</i>
              }
            },
            federal_income_tax: {
              type: 'number',
              attrs: {
                min: 0
              },
              label: 'Federal Income Tax',
              config: {
                addonAfter: <i>frequency</i>
              }
            },
            health_insurance: {
              type: 'number',
              attrs: {
                min: 0
              },
              label: "Employee contribution to Health Insurance",
              config: {
                addonAfter: <i>frequency</i>
              }
            },
            food: {
              type: 'number',
              attrs: {
                min: 0
              },
              label: "Food and Beverages",
              config: {
                addonAfter: <i>frequency</i>
              }
            },
            lodging: {
              type: 'number',
              attrs: {
                min: 0
              },
              label: "Lodging/Living Accommodations",
              config: {
                addonAfter: <i>frequency</i>
              }
            },
            other: {
              type: 'number',
              attrs: {
                min: 0
              },
              config: {
                addonAfter: <i>frequency</i>
              }
            }
          },
          template: function(locals){
            return <div className='form-horizontal'>
              <p className='lead'>{locals.label}</p>
              {React.addons.createFragment(locals.inputs)}
            </div>
          }
        }
      }
    };

    return [Page1]
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