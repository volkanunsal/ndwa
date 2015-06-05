import React from 'react';
import t from 'tcomb-form';
var {nextPageOrSection} = require('../utils/NavUtils');
var {Form} = t.form;
var router = require('../router');
import YesNo from './YesNo'
import ActionBar from './ActionBar';
import decorators from '../utils/decorators';

@decorators.getForm
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

  getPageOptions(contract, flux){
    var Page1 = {
      fields: {
        termination_notice_length: {
          label: <p className='lead'>{"If either party wishes to terminate this agreement, how much notice will be provided?"}</p>,
          type: "number",
          attrs: {
            min: 0
          },
          config: {
            addonAfter: <i>weeks</i>
          }
        },
        termination_severance_length: {
          label: <p className='lead'>{"If the employee is terminated with or without cause, the employer shall provide the employee with how much severance pay?"}</p>,
          type: "number",
          attrs: {
            min: 0
          },
          config: {
            addonAfter: <i>weeks</i>
          }
        },
        termination_accom_eviction_notice_length: {
          label: <p className='lead'>{"And if living accommodations have been provided by the employer, how many days of lodging will the employee be given if the employee is terminated?"}</p>,
          type: "number",
          attrs: {
            min: 0
          },
          config: {
            addonAfter: <i>days of lodging</i>
          }
        },
        termination_paid_if_evicted_early: {
          label: <p className='lead'>{"If the employee is asked to leave before the notice period is up, will the employee be paid for that amount of time?"}</p>,
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
          label: <p className='lead'>{"There may be cases when there are grounds or cause for immediate termination without notice. the employee and the employer should discuss (and be as concrete as possible) what these might grounds or cause for immediate termination without notice will be, and list them here:"}</p>,
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
      <ActionBar handleSave={this.save.bind(this)}/>
    </div>
  }
}