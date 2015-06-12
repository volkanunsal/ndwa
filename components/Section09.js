import React from 'react';
import t from 'tcomb-form';
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import YesNo from './YesNo'
import ActionBar from './ActionBar';
import decorators from '../utils/decorators';
import {MyModal, TipTrigger} from '../components/MyModal';


@decorators.getForm
export default class SectionPage extends React.Component {


  getPageOptions(contract, flux){
    var Page1 = {
      fields: {
        termination_notice_length: {
          label: <p className='lead'>{"If either party wishes to terminate this agreement, how much notice will be provided?"}</p>,
          type: "number",
          attrs: {
            min: 0,
            className: 'input-lg'
          },
          config: {
            addonAfter: <i>weeks</i>

          }
        },
        termination_severance_length: {
          label: <div><p className='lead'><TipTrigger anchorText='32' modalContent={<div>
                  {"Regulations require that the Employer must give written notice AND 30 days lodging or 2 weeks salary as severance if the Domestic Worker is a live-in employee. If Domestic Worker resides in Employer’s household and Employer terminates employment, Employer must provide written notice and either 30 days of lodging, either on-site or off-site, or severance pay equivalent to Domestic Worker’s average earnings during the last two weeks of employment, pursuant to M.G.L. c. 149, § 190(k)."}
                </div>}/> {"If the Employee is terminated with or without cause, the Employer shall provide the Employee with how much severance pay?"}</p> </div>,
          type: "number",
          attrs: {
            min: 0,
            className: 'input-lg'
          },
          config: {
            addonAfter: <i>weeks</i>
          }
        },
        termination_lodging_length: {
          label: <div><p className='lead'><TipTrigger anchorText='33' modalContent={<div>
                  {"No advance notice or severance payment shall be required where the employer provides a good faith allegation that the domestic worker has abused, neglected, or caused any other harmful conduct against the employer, members of the employer’s family, or individuals residing in the employer’s household, as described in 940 C.M.R. 32.03(19). "}
                </div>}/> {"And if living accommodations have been provided by the Employer, how many days of lodging will the Employee be given if the Employee is terminated?"}</p> </div>,
          type: "number",
          attrs: {
            min: 0,
            className: 'input-lg'
          },
          config: {
            addonAfter: <i>days of lodging</i>
          }
        },
        termination_paid_if_evicted_early: {
          label: <p className='lead'>{"If the Employee is asked to leave before the notice period is up, will the Employee be paid for that amount of time?"}</p>,
          template: function(locals){
            return <div>
              <YesNo flux={flux} {...locals}/>
            </div>
          }
        }
      }
    }
    var Page2 = {
      fields: {
        immediate_termination_grounds: {
          label: <p className='lead'>{"There may be cases when there are grounds or cause for immediate termination without notice. the Employee and the Employer should discuss (and be as concrete as possible) what these might grounds or cause for immediate termination without notice will be, and list them here:"}</p>,
          type: 'textarea'

        }
      }
    }
    return [Page1, Page2]
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