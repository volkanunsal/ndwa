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
@decorators.googleAnalytics
export default class SectionPage extends React.Component {

  componentDidMount() {
    this.sendPageViewToGA()
  }

  getPageOptions(contract, flux){

    var Page1 = {
      config: {
        horizontal: {
          lg: [2, 5],
          md: [2, 5],
          sm: [6, 6]
        }
      },
      fields: {
        workers_comp_insurance: {
          label: <div className='lead'><TipTrigger anchorText='21' modalContent={<div>
                  Employees have the right to collect worker compensation if injured on the job. Note: some homeowners and renters insurance cover workers comp, but not all; if you use a payroll system, such as <a href='http://www.myhomepay.com/Answers/WorkersCompensation'>HomePay</a>, please make sure to ask your provider about how to obtain workers compensation insurance.
                </div>}/> What are the Employer's workers' compensation company and information?</div>,
          fields: {
            company: {
              label: 'Insurance Company',
              attrs: {
                className: 'input-lg'
              }
            },
            policy: {
              label: 'Insurance Policy',
              attrs: {
                className: 'input-lg'
              }
            }
          }
        },
        benefits: {
          label: <p className='lead'>{"Which benefits will the Employer offer the Employee during the Employee's employment?"}</p>,
          fields: {
            health: {
              label: "Paid Health Insurance?",
              template: function(locals){
                return <YesNo flux={flux} {...locals} value={true} />
              }
            },
            transportation: {
              label: <div>Transportation costs? <TipTrigger anchorText='20' modalContent={<div>
                  These would be additional transportation costs exclusive of mileage/car use for on-the-job related tasks. Examples: train fare, gas/mileage/wear and tear on employee’s car for travel to and from work, etc
                </div>}/></div>,
              template: function(locals){
                return <YesNo flux={flux} {...locals} value={true}/>
              }
            },
            notes: {
              config: {
                horizontal: {
                  lg: [2, 8],
                  md: [2, 8],
                  sm: [6, 6]
                }
              },
              label: ' ',
              type: 'textarea',
              attrs: {
                placeholder: "￼Further details (i.e., if certain benefits are not paid, not paid in full, etc., or additional benefits)",
                className: 'input-lg'
              }
            }
          }
        }

      }
    }
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