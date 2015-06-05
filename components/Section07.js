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

  getPageOptions(contract, flux){
    var Page1 = {
      fields: {
        evaluation_after_three_months: {
          label: <p className='lead'>{"Will the employer will give the employee a written job evaluation after the first three months of employment?"}</p>,
          template: function(locals){
            return <div>
              <YesNo flux={flux} {...locals}/>
            </div>
          }
        },
        evaluation_every_year: {
          label: <p className='lead'>{"Will the employer also provide a written job evaluation every year thereafter?"}</p>,
          template: function(locals){
            return <div>
              <YesNo flux={flux} {...locals}/>
            </div>
          }
        },
        complaint_handling_process: {
          label: <p className='lead'>{'The employer and the employee shall establish a process for addressing complaints and￼increasing pay and/or benefits. Please describe that process:'}</p>,
          type: 'textarea',
          help: <i>During these reviews, both parties will have the opportunity to evaluate the contract and propose changes.</i>
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
      <ActionBar onSave={this.save.bind(this)}/>
    </div>
  }
}