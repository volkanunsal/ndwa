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
        worker_privacy: {
          label: ' ',
          template: function(locals){
            return <div>
              {React.addons.createFragment(locals.inputs)}
            </div>
          },
          fields: {
            info_disclosure_permitted: {
              label: <p className='lead'>{"Will the EMPLOYEE disclose any and all private information obtained about the EMPLOYER during the course of employment, including but not limited to medical, financial, legal, and career information?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            family_pics_sharing_permitted: {
              label: <p className='lead'>{"Will the EMPLOYEE share pictures of the EMPLOYER, their home or children on social media networks or with the EMPLOYEE's friends and family?"}</p>,
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
              label: <p className='lead'>{"Will the EMPLOYER restrict or interfere with the EMPLOYEE's means of private communications?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            surveillance: {
              label: <p className='lead'>{"Will the EMPLOYER employ surveillance technology to monitor the EMPLOYEE?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            take_away_personal_docs: {
              label: <p className='lead'>{"Will the EMPLOYER take the EMPLOYEE's documents or personal effects, without the EMPLOYEE's permission?"}</p>,
              template: function(locals){
                return <div>
                  <YesNo flux={flux} {...locals}/>
                </div>
              }
            },
            force_service: {
              label: <p className='lead'>{"Will the EMPLOYER engage in conduct that constitutes forced services?"}</p>,
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
      <ActionBar onSave={this.save.bind(this)}/>
    </div>
  }
}