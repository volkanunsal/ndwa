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
      config: {
        horizontal: {
          lg: [2, 4],
          md: [2, 4],
          sm: [6, 6]
        }
      },
      fields: {
        workers_comp_insurance: {
          label: <div className='lead'><TipTrigger anchorText='21' modalContent={<div>
                  Employees have the right to collect worker compensation if injured on the job. Note: some homeowners and renters insurance cover workers comp, but not all; if you use a payroll system, please make sure to ask your provider or vendor about this.
                </div>}/> What are the Employer's workers' compensation company and information?</div>,
          template: function(locals){
            return <div>
              <p className='lead'>{locals.label}</p>
              {React.addons.createFragment(locals.inputs)}
            </div>
          },
          fields: {
            company: {
              label: 'Insurance Company'
            },
            policy: {
              label: 'Insurance Policy'
            }
          }
        },
        benefits: {
          label: 'Which benefits will the Employer offer the Employee during the Employee\'s employment?',
          template: function(locals){
            return <div>
              <p className='lead'>{locals.label}</p>
              {React.addons.createFragment(locals.inputs)}
            </div>
          },
          fields: {
            health: {
              label: "Paid Health Insurance?",
              template: function(locals){
                return <YesNo flux={flux} {...locals}/>
              }
            },
            transportation: {
              label: <div>Transportation costs? <TipTrigger anchorText='20' modalContent={<div>
                  These would be additional transportation costs exclusive of mileage/car use for on-the-job related tasks. Examples: train fare, gas/mileage/wear and tear on employee’s car for travel to and from work, etc
                </div>}/></div>,
              template: function(locals){
                return <YesNo flux={flux} {...locals}/>
              }
            },
            notes: {
              label: ' ',
              type: 'textarea',
              attrs: {
                placeholder: "￼Further details (i.e., if certain benefits are not paid, not paid in full, etc., or additional benefits)"
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