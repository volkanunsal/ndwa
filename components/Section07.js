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
@decorators.googleAnalytics
export default class SectionPage extends React.Component {

  componentDidMount() {
    this.sendPageViewToGA()
  }

  getPageOptions(contract, flux){
    var Page1 = {
      fields: {
        evaluation_after_three_months: {
          label: <div><p className='lead'><TipTrigger anchorText='28' modalContent={<div>
                  Massachusetts regulations provide that domestic worker has the right to request a written evaluation after the first 3 months of employment. If you would like to see an example of a performance review form please click <a href='http://www.massdomesticworkers.org/sample/'>HERE</a>.
                </div>}/> {"Will the Employer will give the Employee a written job evaluation after the first three months of employment?"} </p>

          </div>,
          template: function(locals){
            return <div>
              <YesNo flux={flux} {...locals} />
            </div>
          }
        },
        evaluation_every_year: {
          label: <p className='lead'>{"Will the Employer also provide a written job evaluation every year thereafter?"}</p>,
          template: function(locals){
            return <div>
              <YesNo flux={flux} {...locals} />
            </div>
          }
        },
        complaint_handling_process: {
          label: <div><p className='lead'><TipTrigger anchorText='29' modalContent={<div>
                  {"Be sure to complete/fill in this sample section, if applicable, to fit your own situation, and be as specific as possible. If the Employer completes a written evaluation, the Domestic Worker has the right to review and receive a copy of the evaluation. If the Domestic Worker disagrees with any information in their performance evaluation, the Domestic Worker and the Employer may mutually agree to make appropriate changes. If no agreement is made, the Domestic Worker may submit a written statement to the Employer explaining their position, which must be included as part of the personnel file; any statement submitted must be included whenever the performance evaluation is provided to anyone else. M.G.L. c. 149, § 52C."}
                </div>}/> The Employer and the Employee shall establish a process for addressing complaints and increasing pay and/or benefits. Please describe that process:</p></div>,
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
      <ActionBar {...this.props} onSave={this.save.bind(this)}/>
    </div>
  }
}