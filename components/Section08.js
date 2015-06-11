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
        worker_privacy: {
          label: ' ',
          template: function(locals){
            return <div>
              {React.addons.createFragment(locals.inputs)}
            </div>
          },
          fields: {
            info_disclosure_permitted: {
              label: <p className='lead'>{"Will the Employee disclose any and all private information obtained about the Employer during the course of employment, including but not limited to medical, financial, legal, and career information?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            family_pics_sharing_permitted: {
              label: <p className='lead'>{"Will the Employee share pictures of the Employer, their home or children on social media networks or with the Employee's friends and family?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            notes: {
              type: 'textarea',
              label: ' ',
              attrs: {
                placeholder: "Comments"
              }
            }
          }
        }
      }
    };

    var Page2 = {
      fields: {
        family_privacy: {
          label: ' ',
          template: function(locals){
            return <div>
              {React.addons.createFragment(locals.inputs)}
            </div>
          },
          fields: {
            restrict_private_comm: {
              label: <div><p className='lead'>{"Will the Employer restrict or interfere with the Employee's means of private communications?"}</p> <TipTrigger anchorText='30' modalContent={<div>
                  {"Employers cannot restrict or interfere with the domestic employees’ means of private communications. This means employers cannot monitor the employee’s private communications (phone calls, texts, emails, conversations etc) and cannot take employee’s documents or personal effects."}
                </div>}/></div>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            surveillance: {
              label: <p className='lead'>{"Will the Employer employ surveillance technology to monitor the Employee?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            take_away_personal_docs: {
              label: <p className='lead'>{"Will the Employer take the Employee's documents or personal effects, without the Employee's permission?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            force_service: {
              label: <div><p className='lead'>{"Will the Employer engage in conduct that constitutes forced services?"}</p> <TipTrigger anchorText='31' modalContent={<div>
                  {"Employers and cannot engage in conduct that constitutes forced services. Example: Employer can tell domestic worker employee not to use her cell phone while working (unless for an emergency) but cannot take away her cell phone. If domestic worker doesn’t have a phone and she needs to make calls, she should be able to use the employer’s phone (with her own phone card, if need be)."}
                </div>}/></div>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            notes: {
              type: 'textarea',
              label: ' ',
              attrs: {
                placeholder: "Comments"
              }
            }
          }
        }
      }
    };

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