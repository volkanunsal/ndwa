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
    var Page1 = {
      fields: {
        deductions_taken: {
          label: <div><p className='lead'><TipTrigger anchorText='22' modalContent={<div>
                  {"Other than food and living accommodations specified and agreed upon in writing by both employer and employee, no other deductions shall be made from a domestic worker's wages other than for specifically named, identified and agreed-upon purposes, or goods or services required or expressly authorized by law.  An employer's dissatisfaction with the quality of a domestic worker's services shall not be a basis for withholding, or taking deductions from, a domestic worker's compensation. "}
                </div>}/> {'Will the Employer take deductions from the Employee\'s wages?'} </p></div>,
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
              },
              label: <div>State income tax <TipTrigger anchorText='23' modalContent={<div>
                  {"Employing a domestic worker may implicate various state and federal tax laws. The these taxes are a combination of taxes you withhold from your employee and the taxes you pay as the employer. Typically, Social Security and Medicare (collectively known as FICA) and federal and state income taxes are withheld from your employee each pay period. Employers would also pay a matching portion of FICA, as well as federal and state unemployment insurance taxes. "}
                </div>}/></div>
            },
            federal_income_tax: {
              type: 'number',
              attrs: {
                min: 0
              },
              label: <div>Federal Income Tax <TipTrigger anchorText='24' modalContent={<div>
                  {"Employing a domestic worker may implicate various state and federal tax laws. The these taxes are a combination of taxes you withhold from your employee and the taxes you pay as the employer. Typically, Social Security and Medicare (collectively known as FICA) and federal and state income taxes are withheld from your employee each pay period. Employers would also pay a matching portion of FICA, as well as federal and state unemployment insurance taxes."}
                </div>}/></div>,
              config: {
                addonAfter: <i>frequency</i>
              }
            },
            health_insurance: {
              type: 'number',
              attrs: {
                min: 0
              },
              label: <div>Employee contribution to Health Insurance <TipTrigger anchorText='25' modalContent={<div>
                  {"There are different ways an employer can provide health insurance: provide health insurance yourself, support or assist a domestic worker by accessing new exchanges created by the Affordable Care Act, augment wages on an hourly basis to cover medical costs, or pay for a preset number of doctor visits and up to a certain monetary amount."}
                </div>}/></div>,
              config: {
                addonAfter: <i>frequency</i>
              }
            },
            food: {
              type: 'number',
              attrs: {
                min: 0
              },
              label: <div>Food and Beverages <TipTrigger anchorText='26' modalContent={<div>
                  {"Employers cannot charge (or deduct from wages) for meals unless the domestic worker employee agrees and freely chooses the food and drink, and it’s for her benefit. The price must accurately reflect the cost of food and cannot exceed $1.50 for breakfast, $2.25 for lunch, and $2.25 for dinner per day. An employer may not charge for meals if the employee cannot easily bring meals to or prepare meals on the premises. "}
                </div>}/></div>,
              config: {
                addonAfter: <i>frequency</i>
              }
            },
            lodging: {
              type: 'number',
              attrs: {
                min: 0
              },
              label: <div>Lodging/Living Accommodations <TipTrigger anchorText='27' modalContent={<div>
                  {"Employers cannot deduct (or charge) for lodging unless the employee freely accepts, wants, and uses it, and it’s for his/her benefit (i.e., she is in your home as a convenience to her, not to you).  Charges must be reasonable and cannot exceed $35/week for a room used by one person, $30/week for a room occupied by two people, $25/week for a room occupied by three or more persons. "}
                </div>}/></div>,
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
              },
              label: 'Other'
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
      <ActionBar {...this.props} onSave={this.save.bind(this)}/>
    </div>
  }
}